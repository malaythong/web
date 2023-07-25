<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="12">
        <v-card elevation="0">
          <v-card elevation="1"> </v-card>
          
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
                    <p class="ml-2 mt-2">{{post.topic }}</p>
                    <p class="ml-6 mt-2">{{ post.create_by }}</p>
                    <p class="ml-6 mt-2">{{ post.created_at }}</p>
                    </v-row
                  >
                </v-col>
               
                <v-col no-gutters cols="2">
                  <v-row no-gutters class="mt-2 d-flex justify-end">
                    <v-icon class="mr-4" @click="rating"
                      >mdi-thumb-up-outline</v-icon
                    ></v-row
                  >
                </v-col>
              </v-row>
              <v-row no-gutters>

                <v-col cols="12">
                  <v-card-title>{{ post.title }}</v-card-title>
                </v-col>
              </v-row>
              <v-row no-gutters class="d-flex justify-center">
                  <v-col cols="10" sm="4">
                  <v-img :src="post.cover" height="100%" width="100%"></v-img>
                </v-col>
              </v-row>
              <v-row no-gutters>
             
              <v-col cols="12">
               <v-row no-gutters class="mt-4 d-flex justify-end">  <v-icon class="mr-2">mdi-message-text-outline</v-icon>
                  <p class="mr-4 mt-2">{{ post.comment }} ຄວາມຄິດເຫັນ</p></v-row> 
              </v-col>
            </v-row>
            </v-card>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="primary" @click="goToCreatePost"
              >Create Post</v-btn
            >
            <!-- <rating v-model="ratingDialog"></rating> -->
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import rating from "./../rating.vue"
//import { gql } from '@apollo/client/core';
import gql from 'graphql-tag'
export default {
  components:{rating},
  data() {
    return {
        getData:null,
      items: [
        { tab: "ທັງໝົດ", content: "Policy" },
        { tab: "ແນະນຳ", content: "CancelHistory" },
        { tab: "ນິຍົມ", content: "CancelHistory2" },
      ],
      posts: [
        {
          title: "ການສຶກສາ",
          header: "ແບບຟອມການລົງທະບຽນເຂົ້າເສັງ ມຊ ຊື້ຢູ່ໃສ?",
          date: "2 ມື້ກ່ອນ",
          comment: 1,
          post_by: "ໂດຍ admin123",
          profile: "data:image/jpeg;base64,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",
          content:
            "ສິ່ງທີ່ຄວນຮູ້ກ່ອນຈະຕັດສິນໃຈເລືອກສາຍການຮຽນ",
        },
        {
          title: "ການສຶກສາ",
          header: "ການສຶກສາ",
          date: "3 ມື້ກ່ອນ",
          comment: 2,
          post_by: "ໂດຍ Toxin3344",
          profile: "https://steamuserimages-a.akamaihd.net/ugc/2062128696797027728/47EEA2E6CFABBEE1035EBC2DEC315AB5DF1CB622/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
          content:
            "ເຫດຜົນທີ່ຕ້ອງເລືອກລະຫວ່າງສາຍທີ່ຢາກຮຽນ ແລະສາຍຮຽນທີ່ພໍ່ແມ່ເລືອກໃຫ້",
          // cover: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        },
        {
          title: "ອາຊີບ",
          header: "Song",
          date: "4 ມື້ກ່ອນ",
          comment: 4,
          post_by: "ໂດຍ Bill3344",
          profile: "https://imgix.ranker.com/list_img_v2/9099/309099/original/the-absolute-best-of-the-business-cat-meme?fit=crop&fm=pjpg&q=60&dpr=2&w=1200&h=720",
          content:
            "10 ອາຊີບທີ່ເງິນເດືອນສູງທີ່ສຸດໃນລາວ",
          // cover: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        },
      ],
      ratingDialog: false,
    };
    
  },
  computed: {
    image() {
      return require("@/assets/images/Group 32.png");
    },
    comment() {
      return require("@/assets/images/message-circle.png");
    },
  },
  mounted(){
    this.getDataAll()
    //this.queryData()
  },
  methods: {
    getDataAll() {
      console.log("run test")
            this.$apollo.query({
                query: require('~/gql/queries/home/get_all_forum.gql')
                  .MyQuery,
                fetchPolicy: 'no-cache',
              })
              .then((result) => {
                console.log("run result",result.data.forum)
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
    goToForum() {
      this.$router.push("/content/Forum");
    },
    async queryData() {
      try {
        const res = await this.$apollo.query({
          query: gql`
          query MyQuery {
  forum {
    detail
    iamge
    id
    tag_id
    topic
    updated_at
    created_at
    create_by
  }
}

          `,
        })

        //TRY TO SEE IN console.log()
        console.log(res.data)
      } catch (e) {
        console.error(e)
      }
    },
    goToCreatePost() {
      // Add your navigation logic to the create post page here
      console.log("Create Post clicked");
    },
    rating() {
      console.log("open dialog")
        this.ratingDialog = true
    }
  },
};
</script>
