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
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn
          icon
          :style="isAdmin === true ? 'display:none;' : ''"
          @click="performSearch"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
  
  <script>
export default {
  props: {
    isAdmin: Boolean,
  },
  data() {
    return {
      search: '',
    }
  },
  methods: {
    performSearch() {
      this.$emit('perform-search', this.search)
    },
    search:{}
  },
}
</script>
  