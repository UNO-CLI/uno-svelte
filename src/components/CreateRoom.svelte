<script lang="ts">
  import { connectWebSocket } from '../stores/websocketStore';
  import { navigate } from 'svelte-routing';
  import { onMount } from 'svelte';
  let playerName: string = '';
  let numPlayers: number = 2; // default to 2 players

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    const queryParams = `max_players=${numPlayers}&player_name=${playerName}`;
    const websocketUrl = `ws://localhost:8000/create?${queryParams}`;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center; /* Center align text inside container */
  }

  .title {
    font-size: 1.5em;
    margin-bottom: 1em;
  }

  .nes-field {
    margin-bottom: 1.5em;
    text-align: left; /* Align text inside NES field to the left */
  }

  form {
    width: 100%; /* Ensure form takes full width of container */
  }

  input {
    width: 100%;
    box-sizing: border-box;
    padding: 0.5em;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    margin-top: 1em;
    padding: 0.7em 1em;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
</style>

<div class="nes-container with-title">
  <form on:submit={handleSubmit}>
    <p class="title">Create Room</p>
    <div class="nes-field">
      <label for="playerName">Player Name:</label>
      <input type="text" id="playerName" class="nes-input" bind:value={playerName} required />
    </div>
    <div class="nes-field">
      <label for="numPlayers">Number of Players:</label>
      <input type="number" id="numPlayers" class="nes-input" bind:value={numPlayers} required />
    </div>
    <button type="submit" class="nes-btn is-primary">Create Room</button>
  </form>
</div>
