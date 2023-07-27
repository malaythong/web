<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <genDialog
            v-model="dialog"
         :id="localeId"
          />
            <v-card-title class="text-center">
              <h2>Register</h2>
              <p>{{ localeId }}:{{ localeUsername }}:{{ localeEmail }}:{{ localeRole }}</p>
             
            </v-card-title>
            <v-card-text>
              <v-form @submit="ລົງທະບຽນ">
                <v-text-field
                  v-model="email"
                  label="ອີເມວ"
                  type="ອີເມວ"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="username"
                  label="ຊື່ຜູ້ໃຊ້"
                  required
                ></v-text-field>
                
                <v-text-field
                  v-model="password"
                  label="ລະຫັດຜ່ານ"
                  type="ລະຫັດຜ່ານ"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="confirmPassword"
                  label="ໃສ່ລະຫັດຜ່ານອີກຄັ້ງ"
                  type="ລະຫັດຜ່ານ"
                  required
                ></v-text-field>
                <v-btn color="primary" block @click="register()">ດຳເນີນການຕໍ່</v-btn>
                <v-btn @click="dialog=true">dialog</v-btn>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <router-link to="/login">ມີບັນຊີແລ້ວ ເຂົ້າສູ່ລະບົບ</router-link>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import Swal from "sweetalert2";
  import insert_new_user from "~/gql/mutations/insert/insert_new_user.gql";
  import genDialog from "~/components/selectGender.vue"
  import gql from 'graphql-tag'
  export default {
    components:{genDialog},
    data() {
      return {
        dialog:false,
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        userData:{},
        retrievedData:null,
        localeId:null,
        localeUsername:null,
        localeEmail:null,
        localeRole:null,
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
    methods: {
      register() {
         // console.log("test obid",this.object.id)
      this.$apollo
        .mutate({
          mutation: gql`
            ${insert_new_user.MyMutation}
          `,
          variables: { 
            email: this.email.toUpperCase(),
            password: this.password,
            username: this.username,
            role:"user"
         
          },
          fetchPolicy: "no-cache",
          
        }).then((result) => {
          console.log(result.data.insert_user.returning[0])
          this.userData = result.data.insert_user.returning[0]
          this.localeId = result.data.insert_user.returning[0].id,
          this.localeUsername = result.data.insert_user.returning[0].username,
          this.localeEmail = result.data.insert_user.returning[0].email,
          this.localeRole = result.data.insert_user.returning[0].role
          Swal.fire({
            position: "center",
            icon: "success",
            title: "ສ້າງຂໍ້ມູນຜູ້ໃຊ້ສຳເລັດ",
            showConfirmButton: false,
            timer: 1500,
          });
          this.saveData()
          this.dialog=true
           // this.$emit('updateData', result.data.forum)
        })
        .catch((error) => {
     console.log(error)
     Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'ບັນຊີ Email ນີ້ ເຄີຍຖືກສ້າງແລ້ວ',
        });
    });
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
      // register() {
      //   // Add your register logic here
      //   console.log('Register clicked');
      //   console.log('Username:', this.username);
      //   console.log('Email:', this.email);
      //   console.log('Password:', this.password);
      //   console.log('Confirm Password:', this.confirmPassword);
      // }
    }
  }
  </script>
  