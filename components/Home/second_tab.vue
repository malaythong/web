<template>
  <v-container>
    <v-row justify="center">
      <!-- <v-btn class="mt-8" @click="getIdFor()">ass</v-btn>
      <v-btn class="mt-4" @click="combinedArray1([4,5,6],[5,8])">run</v-btn> -->
      <!-- <p>{{recommendations}}</p>
      <p>{{  getIdForumTag  }}</p>
      <p>{{ uniqueForumIds }}{{ combinedArray }}</p> -->
   
      <v-col cols="12" sm="12">
        <v-card elevation="0">
          <v-card elevation="1"> </v-card>
          <ratingDialog
            v-model="dialog"
          :forumId="userTemp"
          :object="selectedCard"
          @updateData="updateData"
          @save-status="saveStatus"
          />
          <!-- <Rating v-model="ratingDialog" /> -->
          <v-card-text class="mx-0 ma-0 pa-0 mt-12">
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
                      {{ post.forum_details[0]?.tag?.category?.name }}
                    </p>
                    <p class="ml-6 mt-2">ໂດຍ {{ post.user?.username }}</p>
                    <p
                      class="ml-6 mt-2"
                      v-if="checkDate(post.created_at) === 0"
                    >
                      ມື້ນີ້.
                    </p>
                    <p
                      class="ml-6 mt-2"
                      v-else-if="checkDate(post.created_at) === 1"
                    >
                      1 ມື້ກ່ອນ.
                    </p>
                    <p class="ml-6 mt-2" v-else>
                      {{ checkDate(post.created_at) }} ມື້ກ່ອນ.
                    </p>
                  </v-row>
                </v-col>

                <v-col no-gutters cols="2">
                  <v-row no-gutters class="mt-2 d-flex justify-end">
                    <!-- <p>{{ post.ratings }}</p> -->
                    <v-icon
                      v-if="post.ratings_aggregate.aggregate.count != 0"
                      color="primary"
                      class="mr-4"
                      >mdi-thumb-up-outline</v-icon
                    >

                    <v-icon
                      v-else
                      class="mr-4"
                      @click=";[openDialog(post), getUserId(post.id)]"
                      >mdi-thumb-up-outline</v-icon
                    ></v-row
                  >
                </v-col>
              </v-row>
              <v-row @click="goToForum(post.id)" no-gutters>
                <v-col cols="12">
                  <v-card-title>{{ post.topic }}</v-card-title>
                </v-col>
              </v-row>
              <v-row
                @click="goToForum(post.id)"
                no-gutters
                class="d-flex justify-center"
              >
                <v-col cols="10" sm="4">
                  <v-img :src="post.image" height="100%" width="100%"></v-img>
                </v-col>
              </v-row>
              <v-row @click="goToForum(post.id)" no-gutters>
                <v-col cols="12">
                  <v-row no-gutters class="mt-4 d-flex justify-end">
                    <v-icon class="mr-2">mdi-message-text-outline</v-icon>
                    <p class="mr-4 mt-3">
                      {{ post.comments_aggregate.aggregate.count }} ຄວາມຄິດເຫັນ
                    </p></v-row
                  >
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
import api from '~/plugins/api';
//import ratingD from "~/components/rating.vue"
import ratingDialog from '~/components/dialog_rating.vue'
import axios from 'axios';
//import { gql } from '@apollo/client/core';
import gql from 'graphql-tag'
export default {
  components: { ratingDialog },
  data() {
    return {
      recommendations: [],
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

      ratingDialog: false,
      getIdForumTag:null,
      localeId:null,
      combinedArray:null
     // uniqueForumIds:[2]
    };
    
  },
  computed: {
    uniqueForumIds() {
      const forumIds = new Set();

      // Check if jsonData is available before processing
      if (this.getIdForumTag) {
        for (const item of this.getIdForumTag) {
          const forumDetails = item.tag.forum_details;
          for (const detail of forumDetails) {
            forumIds.add(detail.forum_id);
          }
        }
      }

      return Array.from(forumIds);
    },
    image() {
      return require('@/assets/images/Group 32.png')
    },
    comment() {
      return require('@/assets/images/message-circle.png')
    },
  },
  created() {
    // Get the data from Local Storage when the component is created
   // this.retrievedData = localStorage.getItem("userData");
    this.localeId = localStorage.getItem("userDatId");
        // this.localeUsername = localStorage.getItem("userDataUserName");
        // this.localeEmail = localStorage.getItem("userDataEmail");
         this.localeRole = localStorage.getItem("userDataRole");
        
  },
  mounted(){
  //  this.getDataAll()
    // this.queryData(),
    this.getIdFor()
    
  },
  // created() {
  //   // Assign the handleResponse function to the global context
  //   window.handleResponse = this.handleResponse;
  // },
  // beforeDestroy() {
  //   // Clean up the global function when the component is destroyed
  //   delete window.handleResponse;
  // },
  methods: {
    async asyncData() {
    try {
      const response = await api.get('/recommendations', {
        params: {
          target_user: this.localeId,
         
        }
      });
      console.log("test recommendations",response.data)
      return   [this.recommendations= response.data,this.combinedArray1(response.data,this.uniqueForumIds)]
      ;
    } catch (error) {
     // console.error('Error fetching recommendations:', error);
      
      return  this.combinedArray1([],this.uniqueForumIds);
    }
  },
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

    async getIdFor() {
      console.log('run this.localeId',this.localeId)
      await this.$apollo
        .query({
          query: require('~/gql/queries/home/get_forum_id_by_res.gql').MyQuery,
          fetchPolicy: 'no-cache',
          variables:{
            userId:this.localeId
          }
        })
        .then((result) => {
          console.log('run result tag forum', result.data.tag_follows)
          this.getIdForumTag = result.data.tag_follows
          this.asyncData()
          //  console.log("run",getData)
        })
        .catch((error) => {
          console.log(error)
        })
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
          //  console.log("run",getData)
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
    // Swal.fire({
    //   icon: 'info',
    //   title: 'Something went wrong!',
    //   text: 'Please try again later',
    //   confirmButtonText: 'Reload',
    //   confirmButtonColor: '#08b89d',
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     window.location.href = '/'
    //   }
    // })
    goToForum(id) {
      this.$router.push('/content/Forum?id=' + id)
    },
    async queryData() {
      console.log("test query")
      try {
        const res = await this.$apollo.query({
          query: gql`
         query getForumAll ($aId:[Int]){
  forum (where: {id: {_in: $aId}}) {
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
    ratings(where: {user_id: {_eq: 1}}, limit: 1) {
        forum_id
        id
        score
        user_id
      }
       ratings_aggregate {
      aggregate {
        count(columns: id)
      }
    }
  }
}

          `,
          variables: {
            aId:this.combinedArray
          },
        })

        //TRY TO SEE IN console.log()
        console.log(res.data.forum)
        this.getData = res.data.forum
      } catch (e) {
        console.error(e)
      }
    },
    combinedArray1(A, B) {
      const combinedArray = [...new Set([...A, ...B])];
    //  return console.log("temp",combinedArray) 
       this.combinedArray = combinedArray;
       return this.queryData()

    },
    async updateData() {
      // console.log(`data tables:`, dataTables)
      // this.data = dataTables
      try {
        const res = await this.$apollo.query({
          query: gql`
         query getForumAll {
  forum (order_by: {ratings_aggregate: {count: asc}}) {
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
    ratings(where: {user_id: {_eq: 1}}, limit: 1) {
        forum_id
        id
        score
        user_id
      }
       ratings_aggregate {
      aggregate {
        count(columns: id)
      }
    }
  }
}

          `,
          // variables: {
            
            
          //   userId:this.localeId
          // },
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
