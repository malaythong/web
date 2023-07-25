<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="12">
          <v-card elevation="0">
            <v-card elevation="1"> </v-card>
            <v-card-text class="mx-0 ma-0 pa-0 mt-12">
              <v-card v-for="(post, index) in posts" :key="index" class="mb-3" @click="">
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
                    <p class="ml-2 mt-2">{{ post.title }}</p>
                    <p class="ml-6 mt-2">{{ post.post_by }}</p>
                    <p class="ml-6 mt-2">{{ post.date }}</p>
                    </v-row
                  >
                </v-col>
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
            </v-card-actions>
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
  