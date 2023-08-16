<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card elevation="0">
          <v-card-text>
            <v-card>
              <v-row align="center" class="spacer" no-gutters>
                <v-col>
                  <v-avatar size="36px" class="mr-2">
                    <img
                      alt="Avatar"
                      src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"/>
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
    };
  },
  methods: {
    goToCreatePost() {
      console.log("Create Post clicked");
    },
  },
};
</script>
