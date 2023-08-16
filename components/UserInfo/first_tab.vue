<template>
    <v-container>
      <v-row no-gutters justify="center">
        <v-col no-gutters cols="12" sm="12">
        <v-card outlined class="ml-0   mr-0">
            <v-list no-gutters class="ma-0 pa-0" two-line>
              <div v-if="getData.length !== 0">
                <div class="ma-0 pa-0 mt-0" v-for="(item, index) in getData" :key="index">
                </div>
              </div>
        <v-list-item no-gutters
        class=" ma-0 pa-0 mt-0 "
          :key="item.topic">
          <v-list-item-content no-gutters class="mx-0  ">
            <v-col no-gutters  class="px-0 pa-0  " >
                <v-row class="mx-4  mb-3" no-gutters>
                <p>{{ item.topic }}</p>  <p class="ml-4" v-if="checkDate(item.created_at)  === 0" >.ມື້ນີ້</p>
                      <p class="ml-4" v-else-if="checkDate(item.created_at) === 1">.1 ມື້ກ່ອນ</p>
        <p class="ml-4" v-else>.{{ checkDate(item.created_at) }} ມື້ກ່ອນ</p> <v-spacer></v-spacer>
                <p>{{ item.forum_details[0]?.tag?.category?.name }}</p>
            </v-row>
            <v-divider></v-divider>
            </v-col>
          </v-list-item-content>
        </v-list-item>
      </template>
<template >
  <center v-if="getData.length == 0">
    <p class="mt-4">ຍັງບໍ່ມີການສ້າງກະທູ້</p>
  </center>
</template>
    </v-list>
        </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  <script>

import ratingDialog from '~/components/dialog_rating.vue'
import gql from 'graphql-tag'
export default {
  components: { ratingDialog },
  data() {
    return {
      selectedCard: null,
      // rating:null,
      dialog: false,
      getData: {},
      userTemp: 1,
      items: [
        { tab: 'ທັງໝົດ', content: 'Policy' },
        { tab: 'ແນະນຳ', content: 'CancelHistory' },
        { tab: 'ນິຍົມ', content: 'CancelHistory2' },
      ],
      localeId: null,
      ratingDialog: false,
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
    //this.getDataAll()
    this.queryData()
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
      // this.closeDialog();
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
        // Handle invalid date format
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

    async getDataAll() {
      console.log('run test')
      await this.$apollo
        .query({
          query: require('~/gql/queries/home/get_all_forum.gql').MyQuery,
          fetchPolicy: 'no-cache',
        })
        .then((result) => {
          console.log('run result', result.data.forum)
          this.getData = result.data.forum
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateData2(dataTables) {
      console.log(`data tables:`, dataTables)
      this.data = dataTables
      this.$apollo
        .query({
          query: require('~/gql/queries/home/get_all_forum.gql').MyQuery,
          fetchPolicy: 'no-cache',
        })
        .then((result) => {
          console.log('run result', result.data.forum)
          this.getData = result.data.forum
          //  console.log("run",getData)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    goToForum(id) {
      this.$router.push('/content/Forum?id=' + id)
    },
    async queryData() {
      try {
        const res = await this.$apollo.query({
          query: gql`
            query getForumAll($userId: Int) {
              forum(where: { create_by: { _eq: $userId } }) {
                updated_at
                topic
                id
                tag_id
                image
                detail
                created_at
                create_by
                user {
                  email
                  id
                  profile
                  username
                  role
                }
                forum_details {
                  id
                  tag_id
                  forum_id
                  tag {
                    id
                    name
                    created_at
                    category_id
                    category {
                      id
                      name
                    }
                  }
                }
                comments_aggregate {
                  aggregate {
                    count(columns: detail)
                  }
                }
                ratings(where: { user_id: { _eq: $userId } }, limit: 1) {
                  forum_id
                  id
                  score
                  user_id
                }
                ratings_aggregate(where: { user_id: { _eq: $userId } }) {
                  aggregate {
                    count(columns: id)
                  }
                }
              }
            }
          `,
          variables: {
            userId: this.localeId,
          },
        })

        //TRY TO SEE IN console.log()
        console.log(res.data.forum)
        this.getData = res.data.forum
      } catch (e) {
        console.error(e)
      }
    },
    async updateData(dataTables) {
      console.log(`data tables:`, dataTables)
      this.data = dataTables
      try {
        const res = await this.$apollo.query({
          query: gql`
            query getForumAll($userId: Int) {
              forum(where: { create_by: { _eq: $userId } }) {
                updated_at
                topic
                id
                tag_id
                image
                detail
                created_at
                create_by
                user {
                  email
                  id
                  profile
                  username
                  role
                }
                forum_details {
                  id
                  tag_id
                  forum_id
                  tag {
                    id
                    name
                    created_at
                    category_id
                    category {
                      id
                      name
                    }
                  }
                }
                comments_aggregate {
                  aggregate {
                    count(columns: detail)
                  }
                }
                ratings(where: { user_id: { _eq: $userId } }, limit: 1) {
                  forum_id
                  id
                  score
                  user_id
                }
                ratings_aggregate(where: { user_id: { _eq: $userId } }) {
                  aggregate {
                    count(columns: id)
                  }
                }
              }
            }
          `,
          variables: {
            userId: this.localeId,
          },
        })

        //TRY TO SEE IN console.log()
        console.log(res.data.forum)
        this.getData = res.data.forum
      } catch (e) {
        console.error(e)
      }
    },
    goToCreatePost() {
      // Add your navigation logic to the create post page here
      console.log('Create Post clicked')
    },
    ratingF() {
      console.log('open dialog', this.ratingDialog)
      this.ratingDialog = true
    },
  },
}
</script>
  