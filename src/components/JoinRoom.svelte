<script lang="ts">
  import { connectWebSocket } from '../stores/websocketStore';
  import { navigate } from 'svelte-routing';
  let playerName: string = '';
  let roomId: string = '';

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    const queryParams = `room_id=${roomId}&player_name=${playerName}`;
    const websocketUrl = `ws://localhost:8000/join?${queryParams}`;
    console.log('Connecting to WebSocket:', websocketUrl);
    connectWebSocket(websocketUrl);
    navigate('/game');
  };
</script>

<style>
  body, html {
    height: 100%;
    margin: 0;
    display: grid;
    place-items: center;
    background-color: #f3f3f3;
  }

  .nes-container {
    max-width: 400px;
    padding: 1.5em;
    border-radius: 1em;
    background-color: white;
  }

  .title {
    font-size: 1.5em;
    margin-bottom: 1em;
  }

  .nes-field {
    margin-bottom: 1.5em;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input {
    width: 100%;
  }

  button {
    margin-top: 1em;
  }
</style>

<div class="nes-container with-title is-centered">
  <form on:submit={handleSubmit}>
    <p class="title">Join Room</p>
    <div class="nes-field">
      <label for="playerName">Player Name:</label>
      <input type="text" id="playerName" class="nes-input" bind:value={playerName} required />
    </div>
    <div class="nes-field">
      <label for="roomId">Room Code:</label>
      <input type="text" id="roomId" class="nes-input" bind:value={roomId} required />
    </div>
    <button type="submit" class="nes-btn is-primary">Join Room</button>
  </form>
</div>
