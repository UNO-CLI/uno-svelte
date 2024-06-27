<!-- Game.svelte -->

<script lang="ts">
    import { websocket } from '../stores/websocketStore';
    import { onMount } from 'svelte';
  
    let gameState: any = null; // Define your game state structure here
    let connectionDTO: any = null; // Define your game state structure here
  
    onMount(() => {
      const unsubscribe = websocket.subscribe((socket) => {
        if (socket) {
          socket.onmessage = (event) => {
            const incomingData = JSON.parse(event.data);

            if (incomingData.type = 'connection') {
              connectionDTO= incomingData;
            } else if(incomingData.type = 'sync') {
              gameState = incomingData;
            }
          };
        }
      });
  
      return unsubscribe;
    });
  </script>
  
  <div class="container">
    <h1>{JSON.stringify(connectionDTO)}</h1>
  </div>

  <div class="container">
    <h1>{JSON.stringify(gameState)}</h1>
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
  