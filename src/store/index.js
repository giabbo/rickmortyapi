import Vue from "vue"
import Vuex from "vuex"
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    characters: [],
    locations: [],
    episodes: [],
    pages: {},
    loadCharactersError: "",
    loadLocationsError: "",
    loadEpisodesError: ""
  },

  getters: {
    getCharacters: (state) => state.characters,
    getLocations: (state) => state.locations,
    getEpisodes: (state) => state.episodes,
    getPages: (state) => state.pages,
    getLoadCharactersError: (state) => state.loadCharactersError,
    getLoadLocationsError: (state) => state.loadLocationsError,
    getLoadEpisodesError: (state) => state.loadEpisodesError
  },

  mutations: {
    setCharacters(state, payload) {
      state.characters = payload;
    },
    setLocations(state, payload) {
      state.locations = payload;
    },
    setEpisodes(state, payload) {
      state.episodes = payload;
    },
    setPages(state, payload) {
      state.pages = payload;
    },
    setLoadCharactersError(state, payload) {
      state.loadCharactersError = payload;
    },
    setLoadLocationsError(state, payload) {
      state.loadCharactersError = payload;
    },
    setLoadEpisodesError(state, payload) {
      state.loadCharactersError = payload;
    }
  },

  actions: {
    async loadCharacters(context, page = 1) {
      const locations = new Set();
      const episodes = new Set();
      let characters;
      const apiLength = process.env.VUE_APP_rickandmorty_episode_API.length
      const locationApiLength = process.env.VUE_APP_rickandmorty_location_API.length
      await axios.get(`${process.env.VUE_APP_rickandmorty_character_API}?page=${page}`).then(function (response) {

        context.commit('setPages', {totalPages: response.data.info.pages, currentPage: page});
        characters = response.data.results.map(character => {
          if (character.location.url) locations.add(character.location.url.substr(locationApiLength));
          if (character.origin.url) locations.add(character.origin.url.substr(locationApiLength));
          if (character.episode.length) {
            character.episode.forEach(episode => {
              episodes.add(episode.substr(apiLength))
            })
          }
          return character;
        })
      }).catch(
        function (error) {
          context.commit('setLoadCharactersError', 'error on loading');
          return Promise.reject(error)
        }
      );
      context.commit('setCharacters', characters);
      await context.dispatch('loadLocations', locations);
      await context.dispatch('loadEpisodes', episodes);
    },
    async loadLocations(context, locationsList) {
      const locations = {};
      await axios.get(`${process.env.VUE_APP_rickandmorty_location_API}${Array.from(locationsList)}`).then(function (response) {

        response.data.map(location => locations[location.name] = location);
      }).catch(
        function (error) {
          context.commit('setLoadLocationsError', 'error on loading');
          return Promise.reject(error)
        }
      );
      context.commit('setLocations', locations);
    },
    async loadEpisodes(context, episodesList) {
      const episodes = {};
      await axios.get(`${process.env.VUE_APP_rickandmorty_episode_API}${Array.from(episodesList)}`).then(function (response) {
        (Array.isArray(response.data) && response.data.map(episode => episodes[episode.id] = episode)) || (episodes[response.data.id] = response.data)
      }).catch(
        function (error) {
          context.commit('setLoadEpisodesError', 'error on loading');
          return Promise.reject(error)
        }
      );
      context.commit('setEpisodes', episodes);
    },
  }
})