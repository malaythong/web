<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card>
            <v-card-title>
              <h2>ລົງຊື່ເຂົ້າໃຊ້</h2>
              <!-- <p> {{ localeId }} : {{ localeUsername }} : {{ localeEmail }} : {{ localeRole }}</p> -->
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
                <v-btn @click="getUserData()" color="primary" block>ເຂົ້າສູ່ລະບົບ</v-btn>
              </v-form>
            </v-card-text>
            <v-card-actions>
                <router-link to="/auth/register">ຍັງບໍ່ມີບັນຊີ? ລົງທະບຽນ</router-link>
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
        getUser:{},
        username: '',
        password: '',
        retrievedData: null,
        localeId : null,
        localeUsername : null,
        localeEmail : null,
        localeRole : null,
        localeGender:null,
        
      }
    },
    created() {
    // Get the data from Local Storage when the component is created
    this.retrievedData = localStorage.getItem("userData");
    this.localeId = localStorage.getItem("userDatId");
        this.localeUsername = localStorage.getItem("userDataUserName");
        this.localeEmail = localStorage.getItem("userDataEmail");
        this.localeRole = localStorage.getItem("userDataRole");
        
  },
    saveData() {
      console.log("test use locale storage", this.userData)
      // Save the data to Local Storage
      localStorage.setItem("userData", this.userData);
      localStorage.setItem("userDatId", this.localeId);
      localStorage.setItem("userDataUserName", this.localeUsername);
      localStorage.setItem("userDataEmail", this.localeEmail);
      localStorage.setItem("userDataRole", this.localeRole);
    },
    created() {
    // Get the data from Local Storage when the component is created
    this.retrievedData = localStorage.getItem("userData");
    this.localeId = localStorage.getItem("userDatId");
        this.localeUsername = localStorage.getItem("userDataUserName");
        this.localeEmail = localStorage.getItem("userDataEmail");
        this.localeRole = localStorage.getItem("userDataRole");
  },
    methods: {
      async getUserData() {
      console.log("run user")
           await this.$apollo.query({
                query: require('~/gql/queries/register/get_user.gql')
                  .MyQuery,
                fetchPolicy: 'no-cache',
                variables: { 
           
            password: this.password,
            username: this.username.toUpperCase(),
           // role:"user"
         
          },
              })
              .then((result) => {
                console.log("run result",result.data.user)
                this.getUser = result.data.user

                this.localeId = result.data.user[0]?.id;
        this.localeUsername = result.data.user[0]?.username;
        this.localeEmail = result.data.user[0]?.email;
        this.localeRole = result.data.user[0]?.role;
          //       this.userData = result.data.insert_user.returning[0]
          // this.localeId = result.data.insert_user.returning[0].id,
          // this.localeUsername = result.data.insert_user.returning[0].username,
          // this.localeEmail = result.data.insert_user.returning[0].email,
          // this.localeRole = result.data.insert_user.returning[0].role
              //  console.log("run",getData)
             
              this.saveData()
              })
              .catch((error) => {
                console.log(error)
               
              })
          },
          saveData() {
      console.log("test use locale storage", this.userData)
      // Save the data to Local Storage
      localStorage.setItem("userData", this.userData);
      localStorage.setItem("userDatId", this.localeId);
      localStorage.setItem("userDataUserName", this.localeUsername);
      localStorage.setItem("userDataEmail", this.localeEmail);
      localStorage.setItem("userDataRole", this.localeRole);
      this.gotoMain()
    },
    gotoMain(){
     
     this.$router.push("/content");
   },
      login() {
        // Add your login logic here
        console.log('Login clicked');
        console.log('Username:', this.username);
        console.log('Password:', this.password);
      },
      register() {
        // Add your register logic here
        console.log('Register clicked');
      }
    }
  }
  </script>
  