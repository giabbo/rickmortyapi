<template>
  <li class="character-card">
    <img :src="character.image" class="character-card__img" alt=""/>
    <div class="character-card__data-container">
      <p class="bold body-text--medium">{{ character.name }}</p>
      <p class="secondary-font secondary-color body-text--small">{{ character.status }} - {{ character.species }}</p>
      <hr class="orange-line">
      <div class="character-card__data--details">
        <p class="details__paragraph"><span class="secondary-font secondary-color body-text--small starts-from">Last Known Location</span><span
            class="bold d-block body-text--medium"> {{ character.location.name }}</span></p>
      </div>
      <div class="character-card__data--location-details" v-if="getLocations[character.location.name]">
        <p class="body-text--xs">
          Type:
          <span class="bold">{{ getLocations[character.location.name].type }}</span>
        </p>
        <p class="body-text--xs">
          Dimension:
          <span class="bold">{{ getLocations[character.location.name].dimension }}</span>
        </p>
        <p class="body-text--xs">
          Residents number:
          <span class="bold">{{ getLocations[character.location.name].residents.length }}</span>
        </p>
      </div>
      <hr>
      <div class="character-card__data--details">
        <p class="details__paragraph"><span class="secondary-font secondary-color body-text--small starts-from">Origin</span><span
            class="bold d-block body-text--medium"> {{ character.origin.name }}</span></p>
      </div>
      <div class="character-card__data--location-details" v-if="getLocations[character.origin.name]">
        <p class="body-text--xs">
          Type:
          <span class="bold">{{ getLocations[character.origin.name].type }}</span>
        </p>
        <p class="body-text--xs">
          Dimension:
          <span class="bold">{{ getLocations[character.origin.name].dimension }}</span>
        </p>
        <p class="body-text--xs">
          Residents number:
          <span class="bold">{{ getLocations[character.origin.name].residents.length }}</span>
        </p>
      </div>
      <hr>
      <div class="character-card__data--details">
        <p class="details__paragraph"><span class="secondary-font secondary-color body-text--small starts-from">Featured in episodes:</span>
        </p>
      </div>
      <div class="character-card__data--location-details">
        <template v-for="episode in character.episode">
          <p :key="character.name + episode" class="body-text--xs" v-if="episodesList[episode.substr(apiEpisodeLength)]">
            {{ episodesList[episode.substr(apiEpisodeLength)].name }}</p>
        </template>
      </div>
    </div>
  </li>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "CharacterCard",
  props: {
    character: {
      require: true,
      type: Object
    }
  },
  data() {
    return {
      apiEpisodeLength: process.env.VUE_APP_rickandmorty_episode_API.length
    }
  },
  computed: {
    ...mapGetters(["getLocations", "getEpisodes"]),

    episodesList() {
      return this.getEpisodes;
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.character-card {
  position: relative;
  grid-column: span 4;
  border: 1px solid #CACBCD;
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 767px) {
    grid-column: span 12;
  }

  .character-card__img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    vertical-align: middle;
  }

  .character-card__data-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
  }

  .orange-line {
    width: 55px;
    border: none;
    border-top: 2px solid #F89F1C;
    margin: 16px auto 16px 0;
  }

  .character-card__data--details {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .details__paragraph {
      margin: 0;
    }
  }

  .d-block {
    display: block;
  }

  .character-card__data--location-details {
    background-color: #F1F1F2;
    padding: 8px;
  }
}
</style>