<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title>
            <h2>ລົງຊື່ເຂົ້າໃຊ້</h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit="login">
              <v-text-field
                v-model="username"
                label="ຊື່ຜູ້ໃຊ້"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="ລະຫັດຜ່ານ"
                type="password"
                required
              ></v-text-field>
              <v-btn @click="getUserData()" color="primary" block
                >ເຂົ້າສູ່ລະບົບ</v-btn
              >
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex justify-between">
            <router-link to="/auth/register"
              >ຍັງບໍ່ມີບັນຊີ? ລົງທະບຽນ</router-link
            >
            <v-spacer></v-spacer>
            <router-link to="/auth/reset">ລືມລະຫັດຜ່ານ</router-link>
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
      userData: null,
      getUser: {},
      username: '',
      password: '',
      retrievedData: null,
      localeId: null,
      localeUsername: null,
      localeEmail: null,
      localeRole: null,
      localeGender: null,
    }
  },
  created() {
    this.retrievedData = localStorage.getItem('userData')
    this.localeId = localStorage.getItem('userDatId')
    this.localeUsername = localStorage.getItem('userDataUserName')
    this.localeEmail = localStorage.getItem('userDataEmail')
    this.localeRole = localStorage.getItem('userDataRole')
    this.localeGender = localStorage.getItem('userDataGender')
  },
  mounted() {
    this.logoutData()
  },
  methods: {
    logoutData() {
      localStorage.setItem('userData', null)
      localStorage.setItem('userDatId', null)
      localStorage.setItem('userDataUserName', null)
      localStorage.setItem('userDataEmail', null)
      localStorage.setItem('userDataRole', null)
    },
    async getUserData() {
      console.log('run user')
      await this.$apollo
        .query({
          query: require('~/gql/queries/register/get_user.gql').MyQuery,
          fetchPolicy: 'no-cache',
          variables: {
            password: this.password,
            username: this.username,
          },
        })
        .then((result) => {
          console.log('run result gender', result.data.user)
          this.getUser = result.data.user

          this.localeId = result.data.user[0]?.id
          this.localeUsername = result.data.user[0]?.username
          this.localeEmail = result.data.user[0]?.email
          this.localeRole = result.data.user[0]?.role
          this.localeGender = result.data.user[0]?.gender
          this.saveData()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    saveData() {
      console.log('test use locale storage', this.localeGender)
      localStorage.setItem('userData', this.userData)
      localStorage.setItem('userDatId', this.localeId)
      localStorage.setItem('userDataUserName', this.localeUsername)
      localStorage.setItem('userDataEmail', this.localeEmail)
      localStorage.setItem('userDataRole', this.localeRole)
      localStorage.setItem('userDataGender', this.localeGender)
      this.gotoMain()
    },
    gotoMain() {
      if (this.localeRole == 'user') {
        window.location.href = '/content'
      } else if (this.localeRole == 'admin') {
        window.location.href = '/report/dashboard'
      }
    },
    login() {
      console.log('Login clicked')
      console.log('Username:', this.username)
      console.log('Password:', this.password)
    },
    register() {
      console.log('Register clicked')
    },
  },
}
</script>
  