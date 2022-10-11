cask "json_log_explorer" do
    version :latest
    sha256 :no_check

    url "https://github.com/corytheboyd-smartsheet/json-log-explorer/releases/latest/download/json-log-explorer.tar.gz"
    name "json-log-explorer"
    desc "A UI for exploring JSON logs"
    homepage "https://github.com/corytheboyd-smartsheet/json-log-explorer"

    binary "server", target: 'json-log-explorer'
end