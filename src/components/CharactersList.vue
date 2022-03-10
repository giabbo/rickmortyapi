<template>
  <ul v-if="charactersReady" class="characters-container">
    <character-card v-for="character in charactersList" :character="character" :key="character.id"/>
  </ul>
</template>

<script>
import CharacterCard from "./CharacterCard";
import {mapGetters} from "vuex";

export default {
  name: 'CharactersList',
  components: {
    CharacterCard
  },
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters(["getCharacters"]),
    charactersList() {
      return this.getCharacters;
    },
    charactersReady() {
      return !!this.charactersList.length;
    }
  },

  mounted() {
  }
}
</script>

<style scoped lang="scss">
.characters-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
