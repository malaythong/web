
<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8">
        <v-card elevation="0">
          <ratingDialog
            v-model="dialog"
            :forumId="userTemp"
            :object="selectedCard"
            @updateData="updateData"
            @save-status="saveStatus"
            :userId="localeId"
          />
          <v-card-text class="mx-0 ma-0 pa-0 mt-4">
            <v-card class="mb-3">
              <v-row no-gutters>
                <v-col cols="10">
                  <v-row no-gutters class="mt-2">
                    <v-avatar color="primary" size="43" class="mx-2">
                      <v-img
                        :src="image"
                        alt="Uploaded Image"
                        class="uploaded-image rounded-lg"
                      ></v-img>
                    </v-avatar>
                    <p class="ml-2 mt-2">
                      {{ getData?.forum_details[0]?.tag?.category?.name }}
                    </p>
                    <p class="ml-6 mt-2">ໂດຍ {{ getData.user?.username }}</p>
                    <p
                      class="ml-6 mt-2"
                      v-if="checkDate(getData.created_at) === 0"
                    >
                      ມື້ນີ້.
                    </p>
                    <p
                      class="ml-6 mt-2"
                      v-else-if="checkDate(getData.created_at) === 1"
                    >
                      1 ມື້ກ່ອນ.
                    </p>
                    <p class="ml-6 mt-2" v-else>
                      {{ checkDate(getData.created_at) }} ມື້ກ່ອນ.
                    </p>
                  </v-row>
                </v-col>
                <v-col v-if="checkRole2 != 3" no-gutters cols="2">
                  <v-row no-gutters class="mt-2 d-flex justify-end">
                    <v-icon v-if="checkLike != 0" color="primary" class="mr-4"
                      >mdi-thumb-up-outline</v-icon
                    >

                    <v-icon
                      v-else
                      class="mr-4"
                      @click="openDialog(getData), getUserId(getData.id)"
                      >mdi-thumb-up-outline</v-icon
                    >
                  </v-row>
                </v-col>
              </v-row>
              <v-row no-gutters class="d-flex justify-center">
                <v-col cols="11">
                  <v-card-title>{{ getData.topic }}</v-card-title>
                  <v-row no-gutters class="d-flex justify-center">
                    <v-col no-gutters cols="11">
                      <v-card-text>{{ getData.detail }}</v-card-text>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row
                v-if="getData.image"
                no-gutters
                class="d-flex justify-center"
              >
                <v-col cols="10" sm="4">
                  <v-img
                    :src="getData.image"
                    height="100%"
                    width="100%"
                  ></v-img>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="0"> </v-col>
                <v-col cols="11">
                  <v-row no-gutters class="mt-4 d-flex justify-start">
                    <v-icon class="mr-2">mdi-message-text-outline</v-icon>
                    <p class="mr-4 mt-3">
                      {{
                        getData?.comments_aggregate?.aggregate?.count
                      }}
                      ຄວາມຄິດເຫັນ
                    </p></v-row
                  >
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="1"> </v-col>
                <v-col cols="10">
                  <v-row no-gutters class="mt-4 d-flex justify-start">
                    <v-textarea
                      v-model="textComment"
                      outlined
                      hide-details="auto"
                    ></v-textarea
                  ></v-row>
                </v-col>
                <v-col cols="1"> </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col no-gutters cols="1"> </v-col>
                <v-col no-gutters cols="10">
                  <v-row no-gutters class="mt-1 mb-8 d-flex justify-end">
                    <v-btn @click="InsertComment()" color="primary"
                      >ສົ່ງຄຳຄິດເຫັນ</v-btn
                    ></v-row
                  >
                </v-col>
                <v-col no-gutters cols="1"> </v-col>
              </v-row>
            </v-card>
          </v-card-text>
          <v-card-text class="mx-0 ma-0 pa-0 mt-4">
            <v-card
              v-for="(post, index) in getData.comments"
              :key="index"
              class="mb-3"
            >
              <v-row no-gutters>
                <v-col cols="10">
                  <v-row no-gutters class="mt-2">
                    <v-avatar color="primary" size="43" class="mx-2">
                      <v-img
                        :src="image"
                        alt="Uploaded Image"
                        class="uploaded-image rounded-lg"
                      ></v-img>
                    </v-avatar>

                    <p class="ml-2 mt-2">{{ post?.user?.username }}</p>
                    <p
                      class="ml-6 mt-2"
                      v-if="checkDate(post?.created_at) === 0"
                    >
                      ມື້ນີ້.
                    </p>
                    <p
                      class="ml-6 mt-2"
                      v-else-if="checkDate(post?.created_at) === 1"
                    >
                      1 ມື້ກ່ອນ.
                    </p>
                    <p class="ml-6 mt-2" v-else>
                      {{ checkDate(post?.created_at) }} ມື້ກ່ອນ.
                    </p>
                  </v-row>
                </v-col>
                <v-col no-gutters cols="2">
                  <v-row no-gutters class="mt-2 d-flex justify-end"> </v-row>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="1"> </v-col>
                <v-col cols="11">
                  <v-card-title>{{ post.detail }}</v-card-title>
                </v-col>
              </v-row>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import insert_comment from '~/gql/mutations/insert/insert_comment.gql'
import insert_history from '~/gql/mutations/insert/insert_history.gql'
import gql from 'graphql-tag'
import ratingDialog from '~/components/dialog_rating.vue'
export default {
  created() {
    this.localeId = localStorage.getItem('userDatId')
    this.localeRole = localStorage.getItem('userDataRole')
  },
  components: { ratingDialog },
  data() {
    return {
      localeRole: null,
      textComment: null,
      userTemp: 1,
      dialog: false,
      getData: {
        forum_details: {},
      },
      selectedCard: null,
      items: [
        { tab: 'ທັງໝົດ', content: 'Policy' },
        { tab: 'ແນະນຳ', content: 'CancelHistory' },
        { tab: 'ນິຍົມ', content: 'CancelHistory2' },
      ],
      localeId: null,
    }
  },
  computed: {
    checkRole2() {
      if (this.localeRole === 'user') {
        return 1
      } else if (this.localeRole === 'admin') {
        return 2
      } else {
        return 3
      }
    },
    checkLike() {
      return this.getData?.ratings_aggregate?.aggregate?.count
    },
    image() {
      return require('@/assets/images/Group 32.png')
    },
    comment() {
      return require('@/assets/images/message-circle.png')
    },
  },
  mounted() {
    this.checkRole()
  },
  created() {
    this.localeId = localStorage.getItem('userDatId')
    this.localeRole = localStorage.getItem('userDataRole')
  },
  methods: {
    checkRole() {
      if (this.localeRole === 'user') {
        return this.getDataAll()
      } else if (this.localeRole === 'admin') {
        return this.getDataAll()
      } else {
        return this.getDataNull()
      }
    },
    InsertComment() {
      this.$apollo
        .mutate({
          mutation: gql`
            ${insert_comment.MyMutation}
          `,
          variables: {
            forum_id: this.$route.query.id,
            detail: this.textComment,
            user_id: this.localeId,
          },
          fetchPolicy: 'no-cache',
        })
        .then((result) => {
          console.log('seccess', result)
          this.getDataAll()
          this.textComment = null
        })
        .catch((error) => {
          console.log(error)
        })
    },
    InsertHistory() {
      this.$apollo
        .mutate({
          mutation: gql`
            ${insert_history.MyMutation}
          `,
          variables: {
            forumId: this.$route.query.id,
            userId: this.localeId,
          },
          fetchPolicy: 'no-cache',
        })
        .then((result) => {
          console.log('seccess record', result)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    saveStatus(newStatus) {
      if (this.selectedCard) {
        this.selectedCard.ratings_aggregate.aggregate.count = newStatus
      }
    },
    openDialog(post) {
      this.selectedCard = post
      this.dialog = true
    },
    getUserId(id) {
      console.log('id', id)
      this.userTemp = id
      console.log('id temp', this.userTemp)
    },
    checkDate(createdAtDate) {
      const dateParts = new Date(createdAtDate)
        .toLocaleDateString('en-GB')
        .split('/')
      if (dateParts.length !== 3) {
        this.result = null
        return
      }

      const day = parseInt(dateParts[0])
      const month = parseInt(dateParts[1]) - 1 // Month is zero-indexed in JavaScript
      const year = parseInt(dateParts[2])

      const createdAt = new Date(year, month, day)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const timeDiff = today.getTime() - createdAt.getTime()
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24))

      return daysDiff
    },
    getDataAll() {
      console.log('run test')
      this.$apollo
        .query({
          query: require('~/gql/queries/home/get_forum_by_id.gql').MyQuery,
          fetchPolicy: 'no-cache',
          variables: {
            id: this.$route.query.id,
            userId: this.localeId,
          },
        })
        .then((result) => {
          console.log('run result', result.data.forum)
          this.getData = result.data.forum[0]
          console.log(
            'count lenght',
            result.data.forum[0].forum_histories.length
          )
          if (result.data.forum[0].forum_histories.length == 0) {
            return this.InsertHistory()
          } else {
            return console.log('not insert history')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getDataNull() {
      console.log('run null', this.localeRole)
      this.$apollo
        .query({
          query: require('~/gql/queries/home/get_forum_by_null.gql').MyQuery,
          fetchPolicy: 'no-cache',
          variables: {
            id: this.$route.query.id,
          },
        })
        .then((result) => {
          console.log('run result', result.data.forum)
          this.getData = result.data.forum[0]
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateData(dataTables) {
      console.log(`data tables:`, dataTables)
      this.data = dataTables
      console.log('run test')
      this.$apollo
        .query({
          query: require('~/gql/queries/home/get_forum_by_id.gql').MyQuery,
          fetchPolicy: 'no-cache',
          variables: {
            id: this.$route.query.id,
          },
        })
        .then((result) => {
          console.log('run result', result.data.forum)
          this.getData = result.data.forum[0]
        })
        .catch((error) => {
          console.log(error)
        })
    },
    goToCreatePost() {
      console.log('Create Post clicked')
    },
  },
}
</script>
