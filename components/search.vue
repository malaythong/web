<template>
  <div>
    <v-row>
      <v-col>
        <v-text-field
          label="Search"
          v-model="search"
          placeholder="ຊື່ກະທູ້, ຊື່ແທັກ, ໝວດໝູ່"
          outlined
          hide-details
          solo
          dense
          class="custom-text-field"
          :style="isAdmin === true ? 'display:none;' : ''"
          @input="performSearch"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-menu
      v-model="showResults"
      transition="slide-y-transition"
      class="search-results"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="purple"
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          v-if="searchResults.length > 0">
          Show Search Results
        </v-btn>
      </template>
      <v-list v-if="searchResults.length > 0" >
        <v-list-item
          v-for="(result, i) in searchResults" 
          :key="i">
          <v-list-item-title>{{ result.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  data() {
    return {
      search: '',
      isAdmin: false, // Set this to true if the user is an admin
      showResults: false,
      searchResults: [],
    };
  },
  methods: {
    async performSearch() {
      if (this.search.trim() === '') {
        this.searchResults = [];
        return;
      }

      try {
        const response = await this.$apollo.query({
          query: gql`
            query SearchQuery($searchText: String!) {
              forum(where: { status: { _gte: 1, _lte: 2 }, topic: { _ilike: $searchText } }) {
                id
                topic
              }
              tag(where: { status: { _gte: 1, _lte: 2 }, name: { _ilike: $searchText } }) {
                id
                name
              }
              categories(where: { status: { _gte: 1, _lte: 2 }, name: { _ilike: $searchText } }) {
                id
                name
              }
            }
          `,
          variables: {
            searchText: `%${this.search}%`,
          },
        });
        const forumResults = response.data.forum.map(item => ({
          title: item.topic,
        }));
        const tagResults = response.data.tag.map(item => ({
          title: item.name,
        }));
        const categoryResults = response.data.categories.map(item => ({
          title: item.name,
        }));
        this.searchResults = [...forumResults, ...tagResults, ...categoryResults];
        this.showResults = true;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style scoped>
.search-results {
  position: absolute;
  width: 100%;
  z-index: 999;
  margin-top: 10px; /* Adjust the margin as needed */
}
</style>
