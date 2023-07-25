<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card elevation="0">
          <v-card-text>
            <!-- <v-expansion-panel-header>
              <v-row align="center" class="spacer" no-gutters>
                <v-col>
                  <v-avatar size="36px">
                    <img
                      alt="Avatar"
                      src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                    />
                  </v-avatar>
                </v-col>
              </v-row>
            </v-expansion-panel-header> -->
            <v-card>
              <v-row align="center" class="spacer" no-gutters>
                <v-col>
                  <v-avatar size="36px" class="mr-2">
                    <img
                      alt="Avatar"
                      src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                    />
                  </v-avatar>
                  <strong class="mr-2">name of topic</strong>
                  <strong class="mr-2">username</strong>
                  <strong>date</strong>
                </v-col>
                <v-col class="hidden-xs-only d-flex justify-end">
                  <v-icon> mdi-thumb-up </v-icon>
                </v-col>
              </v-row>
              <v-card v-for="(post, index) in posts" :key="index" class="mb-3">
              <v-row no-gutters>
                <v-col cols="8">
                  <v-card-title>{{ post.title }}</v-card-title>
                  <v-card-text>{{ post.content }}</v-card-text>
                </v-col>
              </v-row>
            </v-card>
            </v-card>

            <!-- <v-card v-for="(post, index) in posts" :key="index" class="mb-3">
              <v-row no-gutters>
                <v-col cols="8">
                  <v-card-title>{{ post.title }}</v-card-title>
                  <v-card-text>{{ post.content }}</v-card-text>
                </v-col>
              </v-row>
            </v-card> -->
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
      messages: [
        {
          avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          name: "John Leider",
          title: "Welcome to Vuetify!",
          excerpt: "Thank you for joining our community...",
        },
        {
          color: "red",
          icon: "mdi-account-multiple",
          name: "Social",
          new: 1,
          total: 3,
          title: "Twitter",
        },
        {
          color: "teal",
          icon: "mdi-tag",
          name: "Promos",
          new: 2,
          total: 4,
          title: "Shop your way",
          exceprt: "New deals available, Join Today",
        },
      ],
      lorem:
        "Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.",
      posts: [
        {
          title: "First Post",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque aliquet lobortis sem, et fringilla ligula tristique in.",
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
