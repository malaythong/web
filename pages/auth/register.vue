<template>
  <v-container>
    <v-form lazy-validation ref="form" v-model="valid">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <genDialog v-model="dialog" :id="localeId" @openTag="openTag" />
            <tagDialog
              v-model="dialogTag"
              :id="localeId"
              @gotoMain="gotoMain"/>
            <v-card-title class="text-center">
              <h2>ລົງທະບຽນ</h2>
            </v-card-title>
            <v-card-text>
              <v-form @submit="ລົງທະບຽນ">
                <v-text-field
                  :rules="[rules.required]"
                  v-model="email"
                  label="ອີເມວ"
                ></v-text-field>
                <v-text-field
                  :rules="[rules.required]"
                  v-model="username"
                  label="ຊື່ຜູ້ໃຊ້">
                </v-text-field>
                <v-text-field
                  :rules="[rules.required]"
                  v-model="password"
                  label="ລະຫັດຜ່ານ"
                ></v-text-field>
                <v-text-field
                  :rules="[rules.required]"
                  v-model="confirmPassword"
                  label="ໃສ່ລະຫັດຜ່ານອີກຄັ້ງ">
                </v-text-field>
                <v-btn color="primary" block @click="myMethod()">ດຳເນີນການຕໍ່</v-btn>
                <center>
                  <h4 v-if="valid == false" class="red--text mt-2">
                    !! ກະລຸນາຕື່ມຂໍ້ມູນໃຫ້ຄົບຖ້ວນ !!
                  </h4>
                </center>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <a @click="gotoLogin" class="ml-2">ມີບັນຊີແລ້ວ ເຂົ້າສູ່ລະບົບ</a>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
import insert_forum_detail from '~/gql/mutations/insert/admin/insert_forum_detail.gql'
import Swal from 'sweetalert2'
import insert_new_user from '~/gql/mutations/insert/insert_new_user.gql'
import genDialog from '~/components/selectGender.vue'
import tagDialog from '~/components/interestItem.vue'
import gql from 'graphql-tag'
export default {
  components: { genDialog, tagDialog },
  data() {
    return {
      tagSelected: null,
      valid: true,
      dialog: false,
      dialogTag: false,
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      userData: {},
      retrievedData: null,
      localeId: null,
      localeUsername: null,
      localeEmail: null,
      localeRole: null,
      rules: {
        requiredName: (value) => !!value || 'name_is_required',
        required: (value) => !!value || 'ⓘ validate_fill_data .',
      },
    }
  },
  created() {
    this.retrievedData = localStorage.getItem('userData')
    this.localeId = localStorage.getItem('userDatId')
    this.localeUsername = localStorage.getItem('userDataUserName')
    this.localeEmail = localStorage.getItem('userDataEmail')
    this.localeRole = localStorage.getItem('userDataRole')
  },
  computed: {
    result() {
      if (this.tagSelected === null) {
        return [] // Return an empty array if hat is null
      }
      return this.tagSelected.map((tag_id) => ({
        tag_id,
        forum_id: this.forum_id1,
      }))
    },
  },
  methods: {
    InsertForumDetail() {
      this.$apollo
        .mutate({
          mutation: gql`
            ${insert_forum_detail.MyMutation2}
          `,
          variables: {
            objects: this.result,
          },
          fetchPolicy: 'no-cache',
        })
        .then((result) => {
          console.log('seccess')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    myMethod() {
      if (this.email === '' || this.password === '' || this.username === '') {
        console.log('0111')
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '!! ກະລຸນາຕື່ມຂໍ້ມູນໃຫ້ຄົບຖ້ວນ !!',
        })
        return this.validate()
      } else {
        console.log('0222')
        return this.register()
      }
    },
    validate() {
      console.log('validate')
      this.valid = false
      this.$refs.form.validate()
    },
    register() {
      this.valid = true
      this.$apollo
        .mutate({
          mutation: gql`
            ${insert_new_user.MyMutation}
          `,
          variables: {
            email: this.email.toUpperCase(),
            password: this.password,
            username: this.username.toUpperCase(),
            role: 'user',
          },
          fetchPolicy: 'no-cache',
        })
        .then((result) => {
          console.log(result.data.insert_user.returning[0])
          this.userData = result.data.insert_user.returning[0]
          ;(this.localeId = result.data.insert_user.returning[0].id),
            (this.localeUsername =
              result.data.insert_user.returning[0].username),
            (this.localeEmail = result.data.insert_user.returning[0].email),
            (this.localeRole = result.data.insert_user.returning[0].role)
          this.saveData()
          this.dialog = true
        })
        .catch((error) => {
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'ບັນຊີ Email ນີ້ ເຄີຍຖືກສ້າງແລ້ວ',
          })
        })
    },
    openTag(dialogTag) {
      this.dialogTag = dialogTag
    },
    gotoMain() {
      this.$router.push('/content')
    },
    gotoLogin() {
      this.$router.push('/auth/login')
    },
    saveData() {
      console.log('test use locale storage', this.userData)
      localStorage.setItem('userData', this.userData)
      localStorage.setItem('userDatId', this.localeId)
      localStorage.setItem('userDataUserName', this.localeUsername)
      localStorage.setItem('userDataEmail', this.localeEmail)
      localStorage.setItem('userDataRole', this.localeRole)
    },
  },
}
</script>
  