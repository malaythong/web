<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <!-- Activator Button -->
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary ml-6 font-weight-bold"
          dark
          class="mb-2"
          v-bind="attrs"
          v-on="on"
        >
          + ເພີ່ມໃໝ່
        </v-btn>
      </template>

      <!-- Dialog Content -->
      <v-card id="card">
        <v-row>
          <v-col class="d-flex justify-end mr-3 pt-6">
            <v-icon color="primary" @click="close">mdi-close</v-icon>
          </v-col>
        </v-row>
        <v-card-title>
          <v-row>
            <v-col class="d-flex justify-center" no-gutters>
              <h4>ເພິ່ມຂໍ້ມູນຜູ້ໃຊ້</h4>
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
                @change="onFileChange"
              />
            </div>
          </v-col>
        </v-row>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="3" class="d-flex align-center" no-gutters>
                <v-row>
                  <v-subheader hide-details>Username:</v-subheader>
                </v-row>
              </v-col>
              <v-col cols="9" sm="9">
                <v-text-field
                  hide-details="auto"
                  single-line
                  outlined
                  v-model="username"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3" class="d-flex align-center" no-gutters>
                <v-row>
                  <v-subheader hide-details>Gender:</v-subheader>
                </v-row>
              </v-col>
              <v-col cols="9" sm="9">
                <v-radio-group v-model="gender" row>
                  <v-radio label="Female" value="Female"></v-radio>
                  <v-radio label="Male" value="Male"></v-radio>
                  <v-radio label="LGBTQ+" value="LGBTQ+"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="d-flex align-center" no-gutters>
                <v-row>
                  <v-subheader hide-details>Email:</v-subheader>
                </v-row>
              </v-col>
              <v-col cols="9" sm="9">
                <v-text-field
                  hide-details="auto"
                  single-line
                  outlined
                  v-model="email"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3" class="d-flex align-center" no-gutters>
                <v-row>
                  <v-subheader hide-details>Password:</v-subheader>
                </v-row>
              </v-col>
              <v-col cols="9" sm="9">
                <v-text-field
                  hide-details="auto"
                  single-line
                  outlined
                  v-model="password"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="d-flex align-center" no-gutters>
                <v-row>
                  <v-subheader hide-details>Role:</v-subheader>
                </v-row>
              </v-col>
              <v-col cols="9" sm="9">
                <v-radio-group v-model="role" row>
                  <v-radio label="User" value="user"></v-radio>
                  <v-radio label="Admin" value="admin"></v-radio>
                </v-radio-group>
                
                <!-- <v-radio-group v-model="radioGroup">
      <v-radio
        v-for="n in 3"
        :key="n"
        :label="`Radio ${n}`"
        :value="n"
      ></v-radio>
    </v-radio-group> -->
              </v-col>
            </v-row>

            <v-row>
              <v-col class="d-flex justify-center">
                <v-btn
                  depressed
                  color="primary"
                  class="mt-12"
                  @click="InsertUser"
                  >ຕົກລົງ</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Your v-data-table code -->
    <!-- ... -->
  </div>
</template>
  
<script>
import gql from 'graphql-tag'
import insert_user from '~/gql/mutations/insert/admin/insert_user.gql'

export default {
  data() {
    return {
        avatar:null,
        radioGroup: 1,
      dialog: false,
      username: null,
      gender: null,
      email: null,
      password: null,
      role: null,
    }
  },
  methods: {
    onFileChange(){},
    triggerFileInput(){},
    close(){},
    InsertUser() {
      this.$apollo
        .mutate({
          mutation: gql`
            ${insert_user.addUser}
          `,
          variables: {
            username: this.username,
            gender: this.gender,
            email: this.email,
            password: this.password,
            role: this.role,
          },
          fetchPolicy: 'no-cache',
        })
        .then((result) => {
          console.log('seccess', result)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    UpdateUser() {
        
    }
  },
}
</script>
