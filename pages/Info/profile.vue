<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <v-card>
          <v-card-title class="text-center">
            <h2>ຂໍ້ມູນຜູ້ໃຊ້</h2>
          </v-card-title>
          <v-card-text>
            <v-card v-for="(post, index) in posts" :key="index" class="mb-3">
              <v-row no-gutters>
                <v-col cols="2" class="d-flex align-center ml-6">
                  <v-img :src="post.cover" height="80%" width="100%"></v-img>
                </v-col>

                <v-col cols="8">
                  <v-card-text class="custom-line-spacing">
                    <p>ຊື່ຜູ້ໃຊ້:</p>
                    <p>ເພດ:</p>
                    <p>ທີ່ຢູ່:</p>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn text color="primary" @click="edit_profile">ແກ້ໄຂຂໍ້ມູນສ່ວນຕົວ</v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <v-card>
          <v-tabs fixed-tabs background-color="indigo" dark>
            <v-tab> ກະທູ້ທີ່ຕັ້ງ </v-tab>
            <v-tab> ກະທູ້ທີ່ມັກ </v-tab>
            <v-tab> ປະຫວັດການເຂົ້າອ່ານ </v-tab>
            <v-tab> ແທັກທີ່ຕິດຕາມ </v-tab>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import edit_profile from "~/components/edit_profile"
export default {
  components: { edit_profile},
  data() {
    return {
      posts: [
        {
          cover: "https://www.newshub.co.nz/home/lifestyle/2019/08/the-top-five-cat-memes-of-all-time-rated/_jcr_content/par/video/image.dynimg.1280.q75.jpg/v1565234972425/KNOWYOURMEME-sad-cat-crying-1120.jpg",
        },
      ],
    };
  },
  methods: {
    editprofile() {
            this.edit_profile = true;
        }
  }
};
</script>

<style>
.custom-line-spacing p {
  margin-bottom: 6px; /* Adjust the margin-bottom value as needed */
}
</style>
