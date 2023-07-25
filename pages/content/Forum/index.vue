
  <template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8">
          <v-card elevation="0">
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
                      <p class="ml-2 mt-2">{{ posts[1].title }}</p>
                      <p class="ml-6 mt-2">{{ posts[1].post_by }}</p>
                      <p class="ml-6 mt-2">{{ posts[1].date }}</p>
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
                      <v-icon class="mr-4" @click=""
                        >mdi-thumb-up-outline</v-icon
                      ></v-row
                    >
                  </v-col>
                </v-row>
                <v-row no-gutters class="d-flex justify-center">
                 
                  <v-col cols="11">
                    <v-card-title>{{ posts[1].title }}</v-card-title>
                    <v-row no-gutters class="d-flex justify-center">
                 
                  <v-col no-gutters cols="11">
                    
                    <v-card-text>{{ posts[1].content }}</v-card-text>
                   
                  </v-col>
                </v-row>
                  </v-col>
                </v-row>
                <v-row no-gutters class="d-flex justify-center">
                  <v-col cols="10" sm="4">
                    <v-img :src="posts[1].cover" height="100%" width="100%"></v-img>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="0"> </v-col>
                  <v-col cols="11">
                   <v-row no-gutters class="mt-4 d-flex justify-start">  <v-icon class="mr-2">mdi-message-text-outline</v-icon>
                      <p class="mr-4 mt-2">{{ posts[1].comment }} ຄວາມຄິດເຫັນ</p></v-row> 
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
              <v-card v-for="(post, index) in posts" :key="index" class="mb-3">
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
                      
                      <p class="ml-2 mt-2">{{ post.post_by }}</p>
                      <p class="ml-6 mt-2">{{ post.date }}</p>
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
                      <v-icon class="mr-4" @click=""
                        >mdi-thumb-up-outline</v-icon
                      ></v-row
                    >
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <!-- <v-col cols="4">
                      <v-img :src="post.cover" height="100%" width="100%"></v-img>
                    </v-col> -->
                  <v-col cols="12">
                    <v-card-title>{{ post.title }}</v-card-title>
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
  export default {
    data() {
      return {
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
      image() {
        return require("@/assets/images/Group 32.png");
      },
      comment() {
        return require("@/assets/images/message-circle.png");
      },
    },
    methods: {
      goToCreatePost() {
        // Add your navigation logic to the create post page here
        console.log("Create Post clicked");
      },
    },
  };
  </script>
  
