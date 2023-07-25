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
                <v-btn type="submit" color="primary" block>ເຂົ້າສູ່ລະບົບ</v-btn>
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
        username: '',
        password: ''
      }
    },
    methods: {
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
  