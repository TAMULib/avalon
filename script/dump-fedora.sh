#!/usr/bin/env bash
set -euo pipefail

# The Fedora URL 
BASE=""
OUTDIR="fcrepo-dump"
AUTH_HEADER=""   # e.g., AUTH_HEADER="-H 'Authorization: Bearer ...'"

PREF='Prefer: return=representation; include="http://www.w3.org/ns/ldp#PreferContainment http://www.w3.org/ns/ldp#PreferMembership http://fedora.info/definitions/v4/repository#InboundReferences"'
ACPT='Accept: application/n-triples, */*;q=0.5'

mkdir -p "$OUTDIR"
touch "$OUTDIR/_all.nq"

# queue & visited
declare -a Q=("$BASE")
declare -A VISITED=()

fetch() {
  local url="$1"
  local safe
  # turn URL into a filesystem-safe path
  safe=$(echo "$url" | sed 's#https\?://##; s#[^A-Za-z0-9._-]#_#g')
  local outfile="$OUTDIR/${safe}.nt"

  if [[ -n "${VISITED[$url]+x}" ]]; then return 0; fi
  VISITED["$url"]=1

  echo "GET $url"
  # fetch RDF
  curl -sfL \
    -H "$ACPT" \
    -H "$PREF" \
    $AUTH_HEADER \
    "$url" > "$outfile"

  # append to big combined file (as N-Quads-ish: add <url> as graph name)
  # N-Triples -> N-Quads by adding graph IRI:
  awk -v g="<${url}>" '{print $0" "g" ."}' "$outfile" >> "$OUTDIR/_all.nq"

  # extract children from ldp:contains triples (object position)
  awk '$2=="<http://www.w3.org/ns/ldp#contains>" {print $3}' "$outfile" \
    | sed -E 's/[<>]//g' \
    | sort -u
}

# BFS crawl
while ((${#Q[@]})); do
  url="${Q[0]}"; Q=("${Q[@]:1}")

  children=$(fetch "$url" || true)
  while IFS= read -r child; do
    # Skip non-HTTP IRIs and blank nodes
    [[ "$child" =~ ^https?:// ]] || continue
    # Only crawl Fedora resources (skip binaries’ bitstreams; we’ll still save their /fcr:metadata when we hit them as resources)
    Q+=("$child")
  done <<< "$children"

  # If this is a binary (NonRDFSource), also grab its metadata node
  meta="${url%/}/fcr:metadata"
  if curl -sfI -H "$ACPT" -H "$PREF" $AUTH_HEADER "$meta" >/dev/null 2>&1; then
    # enqueue metadata if not visited
    if [[ -z "${VISITED[$meta]+x}" ]]; then Q+=("$meta"); fi
  fi
done

echo "Done."
echo "Per-resource files in: $OUTDIR/"
echo "Combined graph (N-Quads-ish) in: $OUTDIR/_all.nq"
