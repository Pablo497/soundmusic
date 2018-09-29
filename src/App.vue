<template>
  <div id="app">
    <img src="https://pablo497.github.io/soundmusic/dist/logo.png">
    <h1>SoundMusic</h1>
    <select v-model="selectedCountry"> 
      <option v-for="country in countries" :value="country.value">
        {{ country.name }}
      </option>
    </select>
    <spinner v-show="loading"></spinner>

    <ul>
      <artist v-for="artist in artists" v-bind:artist="artist" v-bind:key="artist.mbid"></artist>
    </ul>
  </div>
</template>

<script>

import artist from './components/artist.vue'
import getArtists from './api'
import spinner from './components/spinner.vue'

export default {
  name: 'app',
  data () {
    return {
      artists: [],
      countries: [
        {name: 'Argentina', value: 'argentina'},
        {name: 'Colombia', value: 'Colombia'},
        {name: 'spain', value: 'spain'}
      ],
      selectedCountry: 'colombia',
      loading: true
    }
  },

  components: {
    artist,
    spinner
  },
  methods:{
    refreshArtists() {
      const self = this
      this.loading = true
      this.artists = []
      getArtists(this.selectedCountry)
        .then( function (artists) {
          self.loading = false
          self.artists = artists
      })
    }
  },
  mounted() {
    this.refreshArtists()
  },
  watch: {
    selectedCountry: function() {
      this.refreshArtists()
    }
  }


}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
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

ul {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
}
</style>
