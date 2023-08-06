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
                          <v-list-item-title v-text="item.tag.name" ></v-list-item-title>
                          <!-- <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle> -->
                        </v-col>
                      </v-row>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-btn
                        depressed
                        @click="DeleteTag(item.tag.id)"
                        color="error"
                        >ຍົກເລີກຕິດຕາມ
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
                          </v-row> </v-col
                        ><v-col>
                          <v-list-item-title
                            v-text="item.name"
                          ></v-list-item-title>
                          <!-- <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle> -->
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
      posts: [
        {
          title: 'First Post',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque aliquet lobortis sem, et fringilla ligula tristique in.',
          //cover: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'
        },
        {
          title: 'Second Post',
          content:
            'Sed eu odio ac felis tincidunt volutpat non vitae lacus. Aenean dapibus, tellus vitae ultrices luctus, purus felis volutpat ipsum, nec volutpat purus ex id justo.',
          cover: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        },
        {
          title: 'Third Post',
          content:
            'Nunc accumsan libero non mauris laoreet, non lacinia lectus maximus. Etiam sagittis ipsum a volutpat auctor.',
          cover: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        },
      ],
      selected: [2],
      items: [
        {
          action: '15 min',
          headline: 'Brunch this weekend?',
          subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
          title: 'Ali Connors',
        },
        {
          action: '2 hr',
          headline: 'Summer BBQ',
          subtitle: `Wish I could come, but I'm out of town this weekend.`,
          title: 'me, Scrott, Jennifer',
        },
        {
          action: '6 hr',
          headline: 'Oui oui',
          subtitle: 'Do you have Paris recommendations? Have you ever been?',
          title: 'Sandra Adams',
        },
        {
          action: '12 hr',
          headline: 'Birthday gift',
          subtitle:
            'Have any ideas about what we should get Heidi for her birthday?',
          title: 'Trevor Hansen',
        },
        {
          action: '18hr',
          headline: 'Recipe to try',
          subtitle:
            'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          title: 'Britta Holt',
        },
      ],
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
      // console.log("test obid",this.object.id)
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
          // this.goToForum(result.data.insert_forum.returning[0].id)
          //this.$router.push('/content/Forum?id=' + id)

          // this.$emit('updateData', result.data.forum)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    DeleteTag(id) {
      // console.log("test obid",this.object.id)
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
          // this.goToForum(result.data.insert_forum.returning[0].id)
          //this.$router.push('/content/Forum?id=' + id)

          // this.$emit('updateData', result.data.forum)
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
          //  console.log("run",getData)
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
          //  console.log("run",getData)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>
  