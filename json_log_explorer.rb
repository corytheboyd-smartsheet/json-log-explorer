class JsonLogExplorer < Formula
    version :latest
    sha256 :no_check

    url "https://github.com/corytheboyd-smartsheet/json-log-explorer/releases/latest/download/json-log-explorer.tar.gz"
    name "json_log_explorer"
    homepage "https://github.com/corytheboyd-smartsheet/json-log-explorer"

    bin "server", target: "json_log_explorer"
end
