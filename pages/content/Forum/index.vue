
  <template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8">
          <v-card elevation="0">
            <ratingDialog
            v-model="dialog"
          
           
          />
            <v-card-text class="mx-0 ma-0 pa-0 mt-4">
              <v-card  class="mb-3">
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
                      <p class="ml-2 mt-2">{{ getData?.forum_details[0]?.tag?.category?.name  }}</p>
                      <p class="ml-6 mt-2">ໂດຍ {{ getData.user?.username }}</p>
                      <p class="ml-6 mt-2" v-if="checkDate(getData.created_at)  === 0" >ມື້ນີ້.</p>
                    <p class="ml-6 mt-2" v-else-if="checkDate(getData.created_at) === 1"> 1 ມື້ກ່ອນ.</p>
      <p class="ml-6 mt-2" v-else> {{ checkDate(getData.created_at) }} ມື້ກ່ອນ.</p>
                      </v-row
                    >
                  </v-col>
                  <!-- <v-col cols="2">
                    <v-card-text>{{ post.post_by }}</v-card-text>
                  </v-col>
                  <v-col cols="2">
                    <v-card-text>{{ post.date }}</v-card-text>
                  </v-col>
                  <v-col cols="4"> </v-col> -->
                  <v-col no-gutters cols="2">
                    <v-row no-gutters class="mt-2 d-flex justify-end">
                      <!-- <v-icon class="mr-4" @click=""
                        >mdi-thumb-up-outline</v-icon
                      > -->
                      <v-icon v-if="checkLike!=0" color="primary" class="mr-4" 
                        >mdi-thumb-up-outline</v-icon
                      >
                  
                    <v-icon v-else class="mr-4" @click="dialog = true"
                      >mdi-thumb-up-outline</v-icon
                    >
                      </v-row
                    >
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
                <v-row v-if="getData.iamge" no-gutters class="d-flex justify-center">
                  <v-col cols="10" sm="4">
                    <v-img :src="getData.iamge" height="100%" width="100%"></v-img>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="0"> </v-col>
                  <v-col cols="11">
                   <v-row no-gutters class="mt-4 d-flex justify-start">  <v-icon class="mr-2">mdi-message-text-outline</v-icon>
                      <p class="mr-4 mt-3">{{ getData?.comments_aggregate?.aggregate?.count }} ຄວາມຄິດເຫັນ</p></v-row> 
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="1"> </v-col>
                  <v-col cols="10">
                   <v-row no-gutters class="mt-4 d-flex justify-start">   <v-textarea outlined hide-details="auto"></v-textarea></v-row> 
                     
                  </v-col>
                  <v-col cols="1"> </v-col>
                </v-row>
                <v-row  no-gutters>
                  <v-col no-gutters cols="1"> </v-col>
                  <v-col no-gutters cols="10">
                   <v-row no-gutters class="mt-1 mb-8 d-flex justify-end">   <v-btn color="primary">ສົ່ງຄຳຄິດເຫັນ</v-btn></v-row> 
                     
                  </v-col>
                  <v-col no-gutters cols="1"> </v-col>
                </v-row>
                
              </v-card>
            </v-card-text>
            <v-card-text class="mx-0 ma-0 pa-0 mt-4">
              <v-card v-for="(post, index) in getData.comments" :key="index" class="mb-3">
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
                      <p class="ml-6 mt-2" v-if="checkDate(post?.created_at)  === 0" >ມື້ນີ້.</p>
                    <p class="ml-6 mt-2" v-else-if="checkDate(post?.created_at) === 1"> 1 ມື້ກ່ອນ.</p>
      <p class="ml-6 mt-2" v-else> {{ checkDate(post?.created_at) }} ມື້ກ່ອນ.</p>
                      </v-row
                    >
                  </v-col>
                  <!-- <v-col cols="2">
                    <v-card-text>{{ post.post_by }}</v-card-text>
                  </v-col>
                  <v-col cols="2">
                    <v-card-text>{{ post.date }}</v-card-text>
                  </v-col>
                  <v-col cols="4"> </v-col> -->
                  <v-col no-gutters cols="2">
                    <v-row no-gutters class="mt-2 d-flex justify-end">
                      </v-row
                    >
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="1">
                      <!-- <v-img :src="post.cover" height="100%" width="100%"></v-img> -->
                    </v-col>
                  <v-col cols="11">
                    <v-card-title>{{ post.detail }}</v-card-title>
                    <!-- <v-card-text>{{ post.content }}</v-card-text> -->
                    <!-- <v-card-actions>
                        <v-btn text color="primary">Read More</v-btn>
                      </v-card-actions> -->
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
  import gql from 'graphql-tag'
  import ratingDialog from "~/components/dialog_rating.vue"
  export default {
    components:{ratingDialog},
    data() {
      return {
        dialog:false,
        getData:{
          forum_details:{}
        },
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
            comment: 10,
            post_by: "ໂດຍ ວຽງເທບ3344",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque aliquet lobortis sem, et fringilla ligula tristique in.",
            //cover: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'
          },
          {
            title: "ກິລາ",
            header: "Game",
            date: "3 ມື້ກ່ອນ",
            comment: 20,
            post_by: "ໂດຍ Toxin3344",
            content:
              "Sed eu odio ac felis tincidunt volutpat non vitae lacus. Aenean dapibus, tellus vitae ultrices luctus, purus felis volutpat ipsum, nec volutpat purus ex id justo.",
            cover: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
          },
          {
            title: "ເກມ",
            header: "Song",
            date: "4 ມື້ກ່ອນ",
            comment: 30,
            post_by: "ໂດຍ Bill3344",
            content:
              "Nunc accumsan libero non mauris laoreet, non lacinia lectus maximus. Etiam sagittis ipsum a volutpat auctor.",
            cover: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
          },
        ],
      };
    },
    computed: {
      checkLike(){
        return this.getData?.ratings_aggregate?.aggregate?.count
      },
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
      checkDate(createdAtDate) {
      const createdAt = new Date(createdAtDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const timeDiff = today.getTime() - createdAt.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      return daysDiff;
    },
      getDataAll() {
      console.log("run test")
            this.$apollo.query({
                query: require('~/gql/queries/home/get_forum_by_id.gql')
                  .MyQuery,
                fetchPolicy: 'no-cache',
                variables: {
            
            id: this.$route.query.id,
          },
                
              })
              .then((result) => {
                console.log("run result",result.data.forum)
                this.getData = result.data.forum[0]
              //  console.log("run",getData)
               
               
              })
              .catch((error) => {
                console.log(error)
               
              })
          },
      goToCreatePost() {
        // Add your navigation logic to the create post page here
        console.log("Create Post clicked");
      },
    },
  };
  </script>
  
