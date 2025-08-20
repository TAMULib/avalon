class EnvironmentConfigurator < ActiveFedora::FileConfigurator
  def initialize
    reset!
  end

# DCH changes to account for NULL url
def load_fedora_config
  return @fedora_config unless @fedora_config.is_a?(Hash) && @fedora_config.empty?

  fedora_setting = Settings.fedora&.url || ENV['FEDORA_URL'] || "http://127.0.0.1:8983/fedora4/rest"
  fedora_timeout = Settings.fedora&.timeout || ENV['FEDORA_TIMEOUT']

  if fedora_setting.present?
    ActiveFedora::Base.logger&.info("ActiveFedora: loading fedora config from FEDORA_URL")

    fedora_url = URI.parse(fedora_setting)
    user = fedora_url.user
    pass = fedora_url.password
    fedora_url.userinfo = ''  # don’t store creds in the URL

    base_path = ENV['FEDORA_BASE_PATH'].to_s
    base_path = "/#{base_path}" unless base_path.empty? || base_path.start_with?('/')

    @fedora_config = {
      user: user || ENV['FEDORA_USER'],
      password: pass || ENV['FEDORA_PASSWORD'],
      base_path: base_path,
      url: fedora_url.to_s
    }

    unless fedora_timeout.to_s.empty?
      t = Float(fedora_timeout)
      @fedora_config[:request] = { timeout: t, open_timeout: t }
    end

    ENV['FEDORA_URL'] ||= fedora_setting
  else
    super
  end

  @fedora_config
end


  def load_solr_config
    return @solr_config unless @solr_config.empty?

    solr_setting = Settings.solr_url || ENV['SOLR_URL']
    if solr_setting.present?
      ActiveFedora::Base.logger.info("ActiveFedora: loading solr config from SOLR_URL") if ActiveFedora::Base.logger
      @solr_config = { url: solr_setting }
      ENV['SOLR_URL'] ||= solr_setting
    else
      super
    end
    Blacklight.connection_config.merge!(@solr_config)
    @solr_config
  end
end
ActiveFedora.configurator = EnvironmentConfigurator.new
ActiveFedora.init
