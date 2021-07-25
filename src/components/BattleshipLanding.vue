<template>
  <div>
    <h1>Welcome to Battleship!</h1>
    <div v-if="nothingInProgress">
      <form v-on:submit.prevent="newStagingGame">
        <label>Player ID: </label><input type="number" id="playerId" />
        <div>
          <input type="submit" value="New Game"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BattleshipLanding',
  data: function() {
    return {
      stagingGameId: null
    }
  },
  methods: {
    newStagingGame: function( submitEvent ) {
      const postBody = {
        playerId: submitEvent.target.elements.playerId.value
      }
      fetch(
        '/battleship/api/stagingGame',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( postBody )
        }
      )
        .then( response => response.json() )
        .then( json => console.log( json ) )
    }
  },
  computed: {
    nothingInProgress: function() {
      return this.stagingGameId === null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
