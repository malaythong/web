<template>
  <div>
    <v-row justify="center">
      <v-col class=" mt-10" cols="12" sm="9">
        <h2 class="mb-5">ຕິດຕໍ່ທີມງານ</h2>
        <v-card elevation="1" class="mb-5"><v-card-text>
            <div class="text-h6 text--primary">ໝາຍເຫດ:</div>

            <p>ທ່ານສາມາດຕິດຕໍ່ເພື່ອແຈ້ງປັນຫາການໃຊ້ງານ, ແຈ້ງຂໍ້ຜິດພາດຕ່າງໆ ໃນລະບົບ ສະເໜີຄວາມຄິດເຫັນເພື່ອປັບປຸງລະບົບ
              ໂດຍກົງຜ່ານໜ້ານີ້</p>
          </v-card-text></v-card>

        <v-card elevation="1"><v-card-text>
            <v-row>
              <v-col cols="2">
                <v-subheader>ເລື່ອງ:</v-subheader>
              </v-col>
              <v-col cols="9" sm="9">
                <v-text-field single-line outlined></v-text-field>
                <div>
                  <p col="6" class="text-lg-left">**ກະລຸນາໃສ່ອີເມວ ທີ່ສະດວກໃຫ້ທີມງານຕິດຕໍ່ກັບ</p>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2" class=" d-flex align-center" no-gutters>
                <v-row>
                  <v-subheader hide-details>ອີເມວຜູ້ສົ່ງ:</v-subheader>
                </v-row>

              </v-col>
              <v-col cols="9" sm="9">
                <v-text-field hide-details="auto" single-line outlined></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2" no-gutters>
                <v-row>
                  <v-subheader hide-details>ລາຍລະອຽດ:</v-subheader>
                </v-row>
              </v-col>
              <v-col cols="9" md="9">
                <v-textarea outlined name="input-7-4"></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2" gutters>
                <v-subheader hide-detai>ຮູບພາບ:</v-subheader>
              </v-col>
              <v-col cols="6" md="9" class="d-flex align-center">
                <input type="file" ref="fileInput"  accept="image/*" @change="onFileChange" />
              </v-col>
              
              <!-- <v-btn outlined @click="triggerFileInput" class="mt-3">
                <v-icon left>mdi-camera</v-icon>
                Select Avatar
              </v-btn> -->
            </v-row>
            <v-row>
              <v-col cols="9" md="9" class="d-flex justify-end">
                <v-btn depressed color="error">ຍົກເລີກ
                </v-btn>

              </v-col>
              <v-col cols="2" md="2" class="d-flex justify-end">
                <v-btn depressed color="primary">ຕົກລົງ
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text></v-card>

      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };

  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        this.avatar = e.target.result;
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>
