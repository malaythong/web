<template>
  <div>
    <div class="my-4">
      <h1 class="primary--text">ລາຍງານຂໍ້ມູນແທັກ</h1>
    </div>
    <v-card>
      <v-card-title>
        <v-row>
          <v-col cols="5">
            <v-text-field
              v-model="search"
              label="Search"
              single-line
              outlined
              hide-details
            ></v-text-field>
          </v-col>

          <v-col>
            <v-btn height="55" outlined color="primary" @click="searchDate">
              <v-icon>mdi-magnify</v-icon> ຄົ້ນຫາ
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="data"
        sort-by="id"
        :search="search"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  data() {
    return {
      search: '',
      data: [], // Initialize data as an empty array
      headers: [
        // Define table headers with label and corresponding value property
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Category Name', value: 'categoryName' },
        { text: 'Count', value: 'count' },
      ],
    };
  },
  apollo: {
    data: {
      query: gql`
        query allTag {
          tag (where: { status: { _gte: 1, _lte: 2 } }){
            id
            name
            category {
              name
            }
            forum_details_aggregate {
              aggregate {
                count
              }
            }
          }
        }
      `,
      result({ data }) {

        this.data = data.tag.map((tag) => ({
          id: tag.id,
          name: tag.name,
          categoryName: tag.category.name,
          count: tag.forum_details_aggregate.aggregate.count,
        }));
      },
    },
  },
  methods: {
    searchDate() {
    },
  },
};
</script>
