<template>
  <div class="pagination-container">
    <h2 class="header4">Pages</h2>
    <p class="body-text--xs">Current page: {{ currentPage }}</p>
    <hr>
    <div class="pagination__section">
      <button v-for="index in pagesNumber" :key="'button'+index" @click="loadPage(index)"
              class="pagination__btn" :class="{'current-page': index === parseInt(currentPage) }">
        {{ index }}
      </button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Pagination",
  data() {
    return {}
  },
  computed: {
    ...mapGetters(["getPages"]),
    pagesNumber() {
      return this.getPages.totalPages;
    },
    currentPage() {
      return this.getPages.currentPage;
    }
  },
  methods: {
    loadPage(index) {
      const url = new URL(window.location);
      url.searchParams.set("page", index);
      window.history.pushState({}, '', url);
      this.$store.dispatch('loadCharacters', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 240px;
  padding: 20px;
  margin: 0 auto;
  border: 1px solid #CACBCD;
  border-radius: 4px;
  text-align: left;
}

hr {
  width: 100%;
  border: none;
  border-top: 1px solid #CACBCD;
  margin: 8px 0;
}

.pagination__section {
  margin-bottom: 8px;
}

.pagination__btn {
  background-color: white;
  border: 1px solid gray;
  margin: 4px;
  width: 40px;
}

.current-page {
  background: yellow;
}
</style>