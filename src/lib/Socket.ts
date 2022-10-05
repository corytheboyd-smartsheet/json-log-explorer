import { useStore } from "./store";

export class Socket {
  public address: string;
  public status: "initial" | "open" | "closed";
  public messageCount: number;
  private socket: WebSocket;

  constructor(address: string) {
    this.address = address;
    this.status = "initial";
    this.messageCount = 0;
    this.socket = this.createSocket();
  }

  private createSocket() {
    const socket = new WebSocket(`ws://${this.address}`);

    socket.onclose = () => {
      useStore.getState().updateConnection(this.address, { status: "closed" });
    };
    socket.onopen = () => {
      useStore.getState().updateConnection(this.address, { status: "open" });
    };
    socket.onmessage = (event) => {
      this.messageCount += 1;

      // TODO: decouple parsing from socket wrapper class
      try {
        const raw = JSON.parse(event.data);
        if (Object.keys(raw).length > 0) {
          useStore.getState().addLog(raw);
        }
      } catch (e) {
        // nothing
      }
    };

    return socket;
  }
}
