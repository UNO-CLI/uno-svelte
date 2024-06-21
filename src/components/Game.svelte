<!-- Game.svelte -->

<script lang="ts">
    import { websocket } from '../stores/websocketStore';
    import { onMount } from 'svelte';
  
    let gameData: any = null; // Define your game state structure here
  
    onMount(() => {
      const unsubscribe = websocket.subscribe((socket) => {
        if (socket) {
          socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            // Update gameData with incoming data from WebSocket
            gameData = data;
          };
        }
      });
  
      return unsubscribe;
    });
  </script>
  
  <div class="container">
    <h1>{JSON.stringify(gameData)}</h1>
  </div>
  
  <style>
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f0f0f0;
    }

    h1 {
      font-size: 3rem;
      text-align: center;
      color: #333;
    }
  </style>
  