# JSON Log Explorer

A web UI for exploring JSON logs.

## Usage

1. Use `websocketd` to publish log lines through a WebSocket server
    ```
    brew install websocketd
    
    websocketd --port=3100 tail -f ~/code/boulder/log/development.log
    ```
2. Start this application
    ```
    npm start
    ```
3. View logs in web application