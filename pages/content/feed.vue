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
            @save-status="saveStatus"/>
          <v-card-title class="text-center">
            <v-row><h2 class="primary--text">ປະຫວັດການເຂົ້າອ່ານ</h2></v-row>
          </v-card-title>
          <v-card-text class="mx-0 ma-0 pa-0 mt-4">
            <v-card v-for="(post, index) in getData" :key="index" class="mb-3">
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
                      {{ post.forum.forum_details[0]?.tag?.category?.name }}
                    </p>
                    <p class="ml-6 mt-2">ໂດຍ {{ post.forum.user?.username }}</p>
                    <p
                      class="ml-6 mt-2"
                      v-if="checkDate(post.forum.created_at) === 0">ມື້ນີ້.
                    </p>
                    <p
                      class="ml-6 mt-2"
                      v-else-if="checkDate(post.forum.created_at) === 1">1 ມື້ກ່ອນ.
                    </p>
                    <p class="ml-6 mt-2" v-else>
                      {{ checkDate(post.forum.created_at) }} ມື້ກ່ອນ.
                    </p>
                  </v-row>
                </v-col>
                <v-col no-gutters cols="2">
                  <v-row no-gutters class="mt-2 d-flex justify-end">
                    <v-icon
                      v-if="post.forum.ratings_aggregate.aggregate.count != 0"
                      color="primary"
                      class="mr-4"
                      >mdi-thumb-up-outline</v-icon>
                    <v-icon
                      v-else
                      class="mr-4"
                      @click="openDialog(post), getUserId(post.forum.id)"
                      >mdi-thumb-up-outline</v-icon>
                  </v-row>
                </v-col>
              </v-row>
              <v-row @click="goToForum(post.forum.id)" no-gutters>
                <v-col cols="12">
                  <v-card-title>{{ post.forum.topic }}</v-card-title>
                </v-col>
              </v-row>
              <v-row
                @click="goToForum(post.forum.id)"
                no-gutters
                class="d-flex justify-center">
                <v-col cols="10" sm="4">
                  <v-img
                    :src="post.forum.image"
                    height="100%"
                    width="100%">
                  </v-img>
                </v-col>
              </v-row>
              <v-row @click="goToForum(post.forum.id)" no-gutters>
                <v-col cols="0"> </v-col>
                <v-col cols="12">
                  <v-row no-gutters class="mt-4 d-flex justify-end">
                    <v-icon class="mr-2">mdi-message-text-outline</v-icon>
                    <p class="mr-4 mt-3">
                      {{
                        post.forum.comments_aggregate.aggregate.count
                      }}
                      ຄວາມຄິດເຫັນ
                    </p></v-row>
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
import ratingDialog from '~/components/dialog_rating.vue'
export default {
  components: { ratingDialog },
  data() {
    return {
      selectedCard: null,
      dialog: false,
      getData: {},
      localeId: null,
      items: [
        { tab: 'ທັງໝົດ', content: 'Policy' },
        { tab: 'ແນະນຳ', content: 'CancelHistory' },
        { tab: 'ນິຍົມ', content: 'CancelHistory2' },
      ],
      userTemp: 1,
    }
  },
  computed: {
    image() {
      return require('@/assets/images/Group 32.png')
    },
    comment() {
      return require('@/assets/images/message-circle.png')
    },
  },
  mounted() {
    this.getDataAll()
  },
  created() {
    // Get the data from Local Storage when the component is created
    // this.retrievedData = localStorage.getItem("userData");
    this.localeId = localStorage.getItem('userDatId')
    // this.localeUsername = localStorage.getItem("userDataUserName");
    // this.localeEmail = localStorage.getItem("userDataEmail");
    // this.localeRole = localStorage.getItem("userDataRole");
  },
  methods: {
    saveStatus(newStatus) {
      if (this.selectedCard) {
        this.selectedCard.ratings_aggregate.aggregate.count = newStatus
      }
    },
    openDialog(post) {
      this.selectedCard = post.forum
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
    updateData(dataTables) {
      console.log(`data tables:`, dataTables)
      this.data = dataTables
      console.log('run test')
      this.$apollo
        .query({
          query: require('~/gql/queries/history/get_history.gql').MyQuery,
          fetchPolicy: 'no-cache',
          variables: {
            userId: this.localeId,
          },
        })
        .then((result) => {
          console.log('run result', result.data.forum_histories)
          this.getData = result.data.forum_histories
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getDataAll() {
      console.log('run test')
      this.$apollo
        .query({
          query: require('~/gql/queries/history/get_history.gql').MyQuery,
          fetchPolicy: 'no-cache',
          variables: {
            userId: this.localeId,
          },
        })
        .then((result) => {
          console.log('run result', result.data.forum_histories)
          this.getData = result.data.forum_histories
        })
        .catch((error) => {
          console.log(error)
        })
    },
    goToForum(id) {
      this.$router.push('/content/Forum?id=' + id)
    },
    goToCreatePost() {
      console.log('Create Post clicked')
    },
  },
}
</script>
  
