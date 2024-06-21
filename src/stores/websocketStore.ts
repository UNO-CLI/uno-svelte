// websocketStore.ts

import { writable } from 'svelte/store';

let socket: WebSocket | null = null;

export const websocket = writable<WebSocket | null>(null);

export function connectWebSocket(url: string) {
  socket = new WebSocket(url);

  socket.onopen = () => {
    websocket.set(socket);
  };

  socket.onclose = () => {
    websocket.set(null);
  };

  socket.onerror = (error) => {
    console.error('WebSocket Error:', error);
    socket?.close();
  };
}
