<template>
    <v-container>
      <v-form lazy-validation ref="form" v-model="valid">
      <v-row justify="center" >
       
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <!-- <genDialog
            v-model="dialog"
         :id="localeId"
         @openTag="openTag"
          />
          <tagDialog
            v-model="dialogTag"
         :id="localeId"
         @gotoMain="gotoMain"
          /> -->
            <v-card-title class="text-center">
              <h2>ປ່ຽນລະຫັດຜ່ານ</h2>
              <!-- <p>{{ localeId }}:{{ localeUsername }}:{{ localeEmail }}:{{ localeRole }}</p> -->
             
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
                  label="ຊື່ຜູ້ໃຊ້"
                  
                ></v-text-field>
                
                <v-text-field
                :rules="[rules.required]"
                  v-model="password"
                  label="ລະຫັດຜ່ານໃຫມ່"
                 
                  
                ></v-text-field>
                <v-text-field
                :rules="[rules.required]"
                  v-model="confirmPassword"
                  label="ໃສ່ລະຫັດຜ່ານອີກຄັ້ງ"
                 
                  
                ></v-text-field>
                <v-btn color="primary"  block @click="myMethod()">ດຳເນີນການຕໍ່</v-btn>
                <center >
                  <h4 v-if="valid==false" class="red--text mt-2">!! ກະລຸນາຕື່ມຂໍ້ມູນໃຫ້ຄົບຖ້ວນ !!</h4>
                </center>
                <!-- <v-btn @click="dialog=true">dialog</v-btn><v-btn @click="dialogTag=true">tag</v-btn> -->
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
  import Swal from "sweetalert2";
  import insert_new_user from "~/gql/mutations/insert/insert_new_user.gql";
  import reset_password from "~/gql/mutations/update/update_password.gql";
  import genDialog from "~/components/selectGender.vue"
  import tagDialog from "~/components/interestItem.vue"
  import gql from 'graphql-tag'
  export default {
    components:{genDialog,tagDialog},
    data() {
      return {
        valid: true,
        dialog:false,
        dialogTag:false,
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        userData:{},
        retrievedData:null,
        localeId:null,
        localeUsername:null,
        localeEmail:null,
        localeRole:null,
        rules: {
        requiredName: (value) =>
          !!value ||  'name_is_required',
        required: (value) =>
          !!value || 'ⓘ validate_fill_data .',
      
      },
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
      myMethod() {
      if (
        this.email === "" ||
        this.password=== "" ||
        this.username === ""
      ) {
        console.log("0111");
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '!! ກະລຸນາຕື່ມຂໍ້ມູນໃຫ້ຄົບຖ້ວນ !!',
        });
        return this.validate();
        
      } else {
        console.log("0222");
        return this.register();
      } 
    },
      validate() {
      console.log("validate");
      this.valid=false
      this.$refs.form.validate();
    },
      register() {
        this.valid=true
         // console.log("test obid",this.object.id)
      this.$apollo
        .mutate({
          mutation: gql`
            ${reset_password.MyMutation}
          `,
          variables: { 
            email: this.email,
            password: this.password,
            userName: this.username,
           // role:"user"
         
          },
          fetchPolicy: "no-cache",
          
        }).then((result) => {
         console.log("reset data",result.data.update_user.returning[0])
          this.userData = result.data.update_user.returning[0]
          this.localeId = result.data.update_user.returning[0].id,
          this.localeUsername = result.data.update_user.returning[0].username,
          this.localeEmail = result.data.update_user.returning[0].email,
          this.localeRole = result.data.update_user.returning[0].role
          // Swal.fire({
          //   position: "center",
          //   icon: "success",
          //   title: "ສ້າງຂໍ້ມູນຜູ້ໃຊ້ສຳເລັດ",
          //   showConfirmButton: false,
          //   timer: 1500,
          // });
          this.saveData()
        //  this.dialog=true
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
    openTag(dialogTag){
      this.dialogTag = dialogTag
    },
    gotoMain(){
     
      this.$router.push("/content");
    },
    gotoLogin(){
      this.$router.push("/auth/login");
    },
    saveData() {
      console.log("test use locale storage", this.userData)
      // Save the data to Local Storage
      localStorage.setItem("userData", this.userData);
      localStorage.setItem("userDatId", this.localeId);
      localStorage.setItem("userDataUserName", this.localeUsername);
      localStorage.setItem("userDataEmail", this.localeEmail);
      localStorage.setItem("userDataRole", this.localeRole);
      this.gotoLogin()
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
  