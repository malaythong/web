<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-card-title class="text-center">
              <h2>Register</h2>
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
                <v-btn type="submit" color="primary" block>ດຳເນີນການຕໍ່</v-btn>
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
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    },
    methods: {
      register() {
        // Add your register logic here
        console.log('Register clicked');
        console.log('Username:', this.username);
        console.log('Email:', this.email);
        console.log('Password:', this.password);
        console.log('Confirm Password:', this.confirmPassword);
      }
    }
  }
  </script>
  