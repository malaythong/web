<template>
  <div>
    <v-row justify="center">
      <v-col class="mt-10" cols="12" sm="9">
        <v-text-field
          label="Search"
          placeholder="ຊື່ແທັກ"
          outlined
          hide-details
          solo
          dense
          class="custom-text-field mb-12"
          append-icon="mdi-magnify"
        ></v-text-field>
        <v-card elevation="0">
          <v-toolbar flat color="primary" dark>
            <!-- <v-btn @click="InsertTag">test</v-btn> -->
            <v-toolbar-title>ແທັກທີ່ຕິດຕາມ </v-toolbar-title>
          </v-toolbar>
          <v-list>
            <v-list-item-group>
              <template>
                <v-list-item
                  v-for="(item, index) in getUserTagAll"
                  :key="index"
                >
                  <template>
                    <v-list-item-content>
                      <v-row>
                        <v-col sm="1" class="d-flex align-center">
                          <v-row class="d-flex justify-center">
                            <v-icon color="primary"> mdi-tag-outline </v-icon>
                          </v-row> </v-col
                        ><v-col>
                          <v-list-item-title>{{ item.tag.name }}</v-list-item-title>
                        </v-col>
                      </v-row>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn
                        depressed
                        @click="DeleteTag(item.tag.id)"
                        color="error">ຍົກເລີກຕິດຕາມ
                      </v-btn>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-card>
        <v-card elevation="0">
          <v-toolbar flat color="primary" dark>
            <v-toolbar-title>ແທັກທັງໝົດ</v-toolbar-title>
          </v-toolbar>
          <v-list>
            <v-list-item-group>
              <template>
                <v-list-item v-for="(item, index) in filteredTags" :key="index">
                  <template>
                    <v-list-item-content>
                      <v-row>
                        <v-col sm="1" class="d-flex align-center">
                          <v-row class="d-flex justify-center">
                            <v-icon color="primary"> mdi-tag-outline </v-icon>
                          </v-row> 
                        </v-col>
                        <v-col>
                          <v-list-item-title>{{ item.name }}</v-list-item-title>
                        </v-col>
                      </v-row>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn
                        depressed
                        @click="InsertTag(item.id)"
                        color="primary"
                        >ຕິດຕາມ
                      </v-btn>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
  
<script>
import insert_tag from '~/gql/mutations/insert/insert_tag_user.gql'
import delete_tag from '~/gql/mutations/delete/delete_tag_user.gql'
import gql from 'graphql-tag'
export default {
  data() {
    return {
      selected: [2],
      getTagAll: null,
      localeId: null,
      getUserTagAll: null,
      temp: [5, 4, 3, 6, 7, 8],
    }
  },
  created() {
    // Get the data from Local Storage when the component is created
    // this.retrievedData = localStorage.getItem("userData");
    this.localeId = localStorage.getItem('userDatId')
    // this.localeUsername = localStorage.getItem("userDataUserName");
    // this.localeEmail = localStorage.getItem("userDataEmail");
    // this.localeRole = localStorage.getItem("userDataRole");
  },
  mounted() {
    this.getTagData()
    this.getUserTagData()
  },
  computed: {
    filteredTags() {
      return this.getTagAll
        ? this.getTagAll.filter((tagItem) => !this.tagIds.includes(tagItem.id))
        : []
    },
    tagIds() {
      if (this.getUserTagAll) {
        return this.getUserTagAll.map((ftag) => ftag.tag.id)
      } else {
        return []
      }
    },
  },
  methods: {
    InsertTag(id) {
      this.$apollo
        .mutate({
          mutation: gql`
            ${insert_tag.MyMutation}
          `,
          variables: {
            userId: this.localeId,
            tagId: id,
          },
          fetchPolicy: 'no-cache',
        })
        .then((result) => {
          console.log('seccess', result.data)
          this.getUserTagData()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    DeleteTag(id) {
      this.$apollo
        .mutate({
          mutation: gql`
            ${delete_tag.MyMutation}
          `,
          variables: {
            userId: this.localeId,
            tagId: id,
          },
          fetchPolicy: 'no-cache',
        })
        .then((result) => {
          console.log('seccess', result.data)
          this.getUserTagData()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getTagData() {
      console.log('run test')
      await this.$apollo
        .query({
          query: require('~/gql/queries/register/get_tag.gql').MyQuery,
          fetchPolicy: 'no-cache',
          variables: {
            id: this.cateId,
          },
        })
        .then((result) => {
          console.log('run result', result.data.tag)
          this.getTagAll = result.data.tag
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getUserTagData() {
      console.log('run test tag')
      await this.$apollo
        .query({
          query: require('~/gql/queries/home/get_al_tag_by_user.gql').MyQuery,
          fetchPolicy: 'no-cache',
          variables: {
            userId: this.localeId,
          },
        })
        .then((result) => {
          console.log('run result tag', result.data.tag_follows)
          this.getUserTagAll = result.data.tag_follows
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>
  