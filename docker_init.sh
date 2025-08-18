#!/bin/bash

yarn install
bundle install

SECRET_KEY_BASE=$(ruby -r 'securerandom' -e 'puts SecureRandom.hex(64)') bundle exec rake assets:precompile

cp config/controlled_vocabulary.yml.tamu config/controlled_vocabulary.yml

rm -f tmp/pids/server.pid
bundle exec rake db:migrate

