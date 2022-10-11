# JSON Log Explorer

A UI for exploring JSON logs.

![Screenshot of UI](demo-image.png)

## Install

No funny stuff, Lebowski.

1. Download and extract
   ```
    mkdir ~/json-log-explorer
    cd ~/json-log-explorer
    wget https://github.com/corytheboyd-smartsheet/json-log-explorer/releases/latest/download/json-log-explorer.tar.gz
    tar -xf json-log-explorer.tar.gz
    rm json-log-explorer.tar.gz
    ```
2. Run the JSON Log Explorer web app:
    ```
   # cd ~/json-log-explorer
   bin/server -port 8081 -address localhost
   # 2022/10/11 15:37:48 Starting server: address=`localhost:8081` publicPath=`/Users/cboyd/json-log-explorer/public`
   ```
3. Open address in browser http://localhost:8081

## Usage

To see some logs, you must do at least:
1. Add a Connection
2. Send logs to JSON Log Viewer through a Connection
3. Select Paths to begin showing logs in the table 

### Connection

You need to bring your own WebSocket server that emits log lines to JSON Log Explorer.

Luckily that's pretty darn easy to do. For example, Boulder logs:
```
brew install websocketd
websocketd -p 7000 tail -f ~/path/to/boulder/log/development.log
```

This creates a WebSocket server on port 7000. Now just add it as a Connection:

![Adding a connection](add-connection.png)

## Development

Release a new build:

1. Increment `VERSION.txt`
2. Run scripts
   ```
   bin/build
   
   # Must have `gh` CLI installed and authorized to run release script
   bin/release
   ```
