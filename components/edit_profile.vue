<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card id="card">
        <v-row>
          <v-col class="d-flex justify-end mr-3 pt-6">
            <v-icon color="primary" @click="close"> mdi-close </v-icon>
          </v-col>
        </v-row>
        <v-card-title>
          <v-row>
            <v-col class="d-flex justify-center" no-gutters>
              <h2>ແກ້ໄຂຂໍ້ມູນສ່ວນຕົວ</h2>
            </v-col>
          </v-row>
        </v-card-title>
        <v-row>
          <v-col class="d-flex justify-center" no-gutters>
            <div>
              <v-avatar size="70" @click="triggerFileInput">
                <img v-if="avatar" :src="avatar" alt="Avatar" />
                <v-icon v-else size="100">mdi-account-circle</v-icon>
              </v-avatar>
              <input
                type="file"
                ref="fileInput"
                style="display: none"
                accept="image/*"
                @change="onFileChange"/>
            </div>
          </v-col>
        </v-row>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="2" class="d-flex align-center" no-gutters>
                <v-row>
                  <v-subheader hide-details>ຊື່ຜູ້ໃຊ້:</v-subheader>
                </v-row>
              </v-col>
              <v-col cols="9" sm="9">
                <v-text-field
                  v-model="localeUsername"
                  readonly
                  hide-details="auto"
                  single-line
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="2" class="d-flex align-center" no-gutters>
                <v-row>
                  <v-subheader hide-details>ອີເມວ:</v-subheader>
                </v-row>
              </v-col>
              <v-col cols="9" sm="9">
                <v-text-field
                  v-model="localeEmail"
                  readonly
                  hide-details="auto"
                  single-line
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="2" class="d-flex align-center" no-gutters>
                <v-row>
                  <v-subheader hide-details>ເພດ:</v-subheader>
                </v-row>
              </v-col>
              <v-col cols="9" sm="9">
                <v-radio-group
                  :disabled="localeGender != null"
                  v-model="localeGender"
                  row
                >
                  <v-radio label="ຍິງ" value="ຍິງ"></v-radio>
                  <v-radio label="ຊາຍ" value="ຊາຍ"></v-radio>
                  <v-radio label="LGBTQ+" value="LGBTQ+"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="11" sm="11">
                <!-- <v-btn text @click="settingaccount">
                                    <small class="d-flex justify-end">*ປ່ຽນຊື່ຜູ້ໃຊ້ອີເມວ ແລະ ລະຫັດຜ່ານໃໝ່</small>
                                </v-btn> -->
              </v-col>
            </v-row>

            <v-row>
              <v-col class="d-flex justify-center">
                <v-btn
                  v-if="localeGender == null"
                  depressed
                  color="primary"
                  class="mt-12"
                  @click="dialog = false"
                  >ຕົກລົງ
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import gql from 'graphql-tag'
import settingAccount from './settingAccount.vue'
const MY_QUERY = gql`
  query {
    title
    description
  }
`
export default {
  components: { settingAccount },
  data: () => ({
    row: null,
    avatar: null,
    localeId: null,
    localeUsername: null,
    localeEmail: null,
    localeRole: null,
    localeGender: null,
  }),
  props: {
    value: Boolean,
  },
  created() {
    this.localeId = localStorage.getItem('userDatId')
    this.localeUsername = localStorage.getItem('userDataUserName')
    this.localeEmail = localStorage.getItem('userDataEmail')
    this.localeRole = localStorage.getItem('userDataRole')
    this.localeGender = localStorage.getItem('userDataGender')
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    onFileChange(event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        this.avatar = e.target.result
      }
      if (file) {
        reader.readAsDataURL(file)
      }
    },
    close() {
      this.dialog = false
      this.$emit('update:edit_profile', false)
    },
    settingaccount() {
      this.dialog = false
      this.settingAccount = true
    },
  },
  computed: {
    dialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>
<style scoped>
#card {
  overflow-y: hidden;
  overflow-x: hidden;
}
</style>