import { useStore } from "./lib/store";

const socket = new WebSocket('ws://localhost:3100')
socket.onopen = (event) => {
  console.log('open', event)
}
socket.onclose = (event) => {
  console.log('close', event)
}
socket.onmessage = (event) => {
  try {
    const raw = JSON.parse(event.data);
    useStore.getState().addLog(raw)
  } catch (e) {
    // nothing
  }
}
