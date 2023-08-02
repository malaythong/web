<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <editprofile v-model="edit_profile"></editprofile>
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
                    <p>ຊື່ຜູ້ໃຊ້:{{ localeUsername }}</p>
                    <p>Email:{{ localeEmail }}</p>
                    <p>Role: {{ localeRole }}</p>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn text color="primary" @click="editprofile">ແກ້ໄຂຂໍ້ມູນສ່ວນຕົວ</v-btn>
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
          <v-tabs  v-model="tab" fixed-tabs background-color="indigo" dark>
              <v-tab v-for="(item, index) in items" :key="index">
                <v-col no-gutters>
                 
                  <h5 style="font-weight: normal !important">{{ item.tab }}</h5>
                </v-col>
              </v-tab>
            </v-tabs>
          <!-- <v-tabs fixed-tabs background-color="indigo" dark>
            <v-tab> ກະທູ້ທີ່ຕັ້ງ </v-tab>
            <v-tab> ກະທູ້ທີ່ມັກ </v-tab>
            <v-tab> ປະຫວັດການເຂົ້າອ່ານ </v-tab>
            <v-tab> ແທັກທີ່ຕິດຕາມ </v-tab>
          </v-tabs> -->
        </v-card>
       
            <v-tabs-items v-model="tab">
              <v-tab-item v-for="(item, index) in items" :key="index">
                <div class="ma-0 mt-0 pa-0 " >
                  <v-row no-gutters >
                    <component class=" mx-0  pa-0" :is="item.content"></component>
                  </v-row>
                </div>
              </v-tab-item>
            </v-tabs-items>
         
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import editprofile from "~/components/edit_profile"
import First from "~/components/UserInfo/first_tab.vue";
import Second from "~/components/UserInfo/second_tab.vue";
import Third from "~/components/UserInfo/third_tab.vue";

export default {
  components: { 
    editprofile, 
    First,
    Second,
    Third
  },
  data() {
    return {
      edit_profile:false,
      localeId:null,
      localeUsername:null,
      localeEmail:null,
      localeRole:null,
      tab:0,
      items: [
        { tab: "ກະທູ້ທີ່ຕັ້ງ", content: First },
        { tab: "ກະທູ້ທີ່ມັກ", content: Second },
        { tab: "ປະຫວັດການເຂົ້າອ່ານ", content: Third },
       
      ],
      posts: [
        {
          cover: "https://www.newshub.co.nz/home/lifestyle/2019/08/the-top-five-cat-memes-of-all-time-rated/_jcr_content/par/video/image.dynimg.1280.q75.jpg/v1565234972425/KNOWYOURMEME-sad-cat-crying-1120.jpg",
        },
      ],
    };
  },
  created() {
    // Get the data from Local Storage when the component is created
   // this.retrievedData = localStorage.getItem("userData");
    this.localeId = localStorage.getItem("userDatId");
        this.localeUsername = localStorage.getItem("userDataUserName");
        this.localeEmail = localStorage.getItem("userDataEmail");
        this.localeRole = localStorage.getItem("userDataRole");
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
