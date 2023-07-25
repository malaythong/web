<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card elevation="0">
          <v-card-title class="text-center">
            <h2>Explore</h2>
          </v-card-title>
          <v-tabs fixed-tabs background-color="primary" dark>
            <v-tab> ທັງໝົດ </v-tab>
            <v-tab> ແນະນຳ </v-tab>
            <v-tab> ນິຍົມ </v-tab>
          </v-tabs>
          <v-card-text>
            <v-card v-for="(post, index) in posts" :key="index" class="mb-3">
              <v-row no-gutters>
                <v-col cols="4">
                  <v-img :src="post.cover" height="100%" width="100%"></v-img>
                </v-col>
                <v-col cols="8">
                  <v-card-title>{{ post.title }}</v-card-title>
                  <v-card-text>{{ post.content }}</v-card-text>
                  <v-card-actions>
                    <v-btn text color="primary">Read More</v-btn>
                  </v-card-actions>
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
      posts: [
        {
          title: "First Post",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque aliquet lobortis sem, et fringilla ligula tristique in.",
          //cover: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'
        },
        {
          title: "Second Post",
          content:
            "Sed eu odio ac felis tincidunt volutpat non vitae lacus. Aenean dapibus, tellus vitae ultrices luctus, purus felis volutpat ipsum, nec volutpat purus ex id justo.",
          cover: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        },
        {
          title: "Third Post",
          content:
            "Nunc accumsan libero non mauris laoreet, non lacinia lectus maximus. Etiam sagittis ipsum a volutpat auctor.",
          cover: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        },
      ],
    };
  },
  methods: {
    goToCreatePost() {
      // Add your navigation logic to the create post page here
      console.log("Create Post clicked");
    },
  },
};
</script>
