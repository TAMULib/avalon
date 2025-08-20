server_options = Settings.domain

server_options = case server_options
when String
  uri = URI.parse(server_options)
  {
    host: uri.host || "localhost",
    port: uri.port || 3000,
    protocol: uri.scheme || "http"
  }
when Hash
  {
    host: server_options[:host].presence || "localhost",
    port: server_options[:port].presence || 3000,
    protocol: server_options[:protocol].presence || "http"
  }
else
  # Covers nil or anything unexpected
  {
    host: "localhost",
    port: 3000,
    protocol: "http"
  }
end

if server_options
  server_options.symbolize_keys!
  server_options.slice!(:host, :port, :protocol)

  Rails.application.config.to_prepare do
    Rails.application.routes.default_url_options.merge!( server_options )
    ActionMailer::Base.default_url_options.merge!( server_options )
    ApplicationController.default_url_options = server_options
    ActionController::Base.asset_host = URI("#{server_options[:protocol]}://#{server_options[:host]}:#{server_options[:port]}").to_s
  end

  # Required for rails 6+
  # See https://blog.saeloun.com/2019/10/31/rails-6-adds-guard-against-dns-rebinding-attacks.html
  Rails.application.config.hosts << server_options[:host]
  Rails.application.config.hosts << ENV['RAILS_ADDITIONAL_HOSTS'] if ENV['RAILS_ADDITIONAL_HOSTS'].present?
end
