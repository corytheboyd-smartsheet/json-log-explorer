import { useStore } from "./store/useStore";

export class Socket {
  public address: string;
  private socket: WebSocket;

  constructor(address: string) {
    this.address = address;
    this.socket = this.createSocket();
  }

  public static serialize(socket: Socket): string {
    return JSON.stringify({ address: socket.address });
  }

  public static deserialize(string: string): Socket {
    const data = JSON.parse(string);
    return new Socket(data.address);
  }

  public reset() {
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
