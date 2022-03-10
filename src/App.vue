<template>
  <div id="app">
    <h1 class="app__header bold header1">Rick And Morty Characters</h1>
    <div class="container justify--center">
      <aside>
        <pagination></pagination>
      </aside>
      <main>
        <p v-if="loadCharactersError" class="error-p"> Sorry, it wasn't possible to load characters. Please reload the page. If
          error
          persist, please
          report to us this code: {{ loadCharactersError }}</p>
        <characters-list v-else></characters-list>
      </main>
    </div>
  </div>
</template>

<script>
import CharactersList from './components/CharactersList';
import Pagination from './components/Pagination';
import {mapGetters} from "vuex";


export default {
  name: 'App',

  components: {
    CharactersList,
    Pagination
  },

  data() {
    return {
      apiCalls: [{storeAction: 'loadCharacters'}]
    }
  },
  computed: {
    ...mapGetters(["getLoadCharactersError"]),
    loadCharactersError() {
      return this.getLoadCharactersError;
    }
  },
  created() {
    this.apiCalls.forEach(async call => {
      const urlParams = new URLSearchParams(window.location.search);
      const page = urlParams.get('page') ? urlParams.get('page') : undefined;
      this.$store.dispatch(call.storeAction, page);
    })
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Hind&family=Montserrat:wght@400;700&display=swap');

#app {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #313336;
  margin-top: 60px;

  * {
    box-sizing: border-box;
  }

  .secondary-font {
    font-family: 'Hind', sans-serif;
  }

  .secondary-color {
    color: #606164;
  }

  .bold {
    font-weight: bold;
  }

  .header1 {
    font-size: 32px;
    line-height: 35px;
  }

  .header3 {
    font-size: 20px;
    line-height: 22px;
  }

  .header4 {
    font-size: 16px;
    line-height: 22px;
    margin: 12px 0;
  }

  .body-text--medium {
    font-size: 14px;
    line-height: 20px;
    margin: 0 0 2px;
  }

  .body-text--small {
    font-size: 12px;
    line-height: 16px;
    margin: 0 0 2px;
  }

  .body-text--xs {
    font-size: 11px;
    line-height: 14px;
    margin: 0 0 2px;
  }

  .error-p {
    color: red;
  }

  .app__header {
    text-align: center;
  }

  .container {
    display: flex;
    max-width: 1366px;
    margin: 0 auto;
    @media screen and (max-width: 767px) {
      display: block;
    }
  }

  .justify--center {
    justify-content: center;
  }

  aside {
    padding: 15px;
    margin: 20px 0;
  }

  main {
    flex-basis: 100%;
    padding: 15px;
  }
}
</style>
