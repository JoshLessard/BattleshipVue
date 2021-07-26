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
    <div v-if="! nothingInProgress">
      Game ID: {{ stagingGameId }}
      <br/>
      Place your ships!
      <form v-on:submit.prevent="placeShip">
        <select id="ship">
          <option disabled selected value="">Ship</option>
          <option v-for="ship in ships" v-bind:value="ship.value" v-bind:key="ship.value">{{ ship.name }}</option>
        </select>
        <select id="row">
          <option disabled selected value="">Row</option>
          <option v-for="row in rows" v-bind:value="row" v-bind:key="row">{{ row }}</option>
        </select>
        <select id="column">
          <option disabled selected value="">Col</option>
          <option v-for="column in columns" v-bind:value="column" v-bind:key="column">{{ column }}</option>
        </select>
        <select id="direction">
          <option disabled selected value="">Choose direction</option>
          <option value="RIGHT">Right</option>
          <option value="DOWN">Down</option>
        </select>
        <br/>
        <input type="submit" value="Place Ship"/>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BattleshipLanding',
  data: function() {
    return {
      ships: [
        {
          name: 'Carrier',
          value: 'CARRIER'
        },
        {
          name: 'Battleship',
          value: 'BATTLESHIP'
        },
        {
          name: 'Cruiser',
          value: 'CRUISER'
        },
        {
          name: 'Submarine',
          value: 'SUBMARINE'
        },
        {
          name: 'Destroyer',
          value: 'DESTROYER'
        }
      ],
      rows: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ],
      columns: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
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
        .then( json => this.updateStagingGame( json.gameId ) )
    },
    updateStagingGame: function( stagingGameId ) {
      this.stagingGameId = stagingGameId
    },
    placeShip: function( submitEvent ) {
      console.log( submitEvent.target.elements.ship.value )
      console.log( submitEvent.target.elements.row.value )
      console.log( submitEvent.target.elements.column.value )
      console.log( submitEvent.target.elements.direction.value )
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
