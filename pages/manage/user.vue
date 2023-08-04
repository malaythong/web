<template>
  <v-data-table
    :headers="headers"
    :items="getData"
    sort-by="id"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title style="color: primary" class="font-weight-black"
          >ຈັດການຂໍ້ມູນຜູ້ໃຊ້</v-toolbar-title
        >
        <v-divider class="mx-4" inset vertical></v-divider>

        <v-dialog v-model="dialog" max-width="500px">
          <!-- Activator Button -->
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary ml-6 font-weight-bold"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              @click="newUser"
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
                  <h4>{{ formTitle }}</h4>
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
                      <v-radio label="ຍິງ" value="ຍິງ"></v-radio>
                      <v-radio label="ຊາຍ" value="ຊາຍ"></v-radio>
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
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="d-flex justify-center">
                    <v-btn v-if="typeCheck==false"
                      depressed
                      color="primary"
                      class="mt-12"
                      @click="InsertUser"
                      >ຕົກລົງ</v-btn
                    >
                    <v-btn v-else
                      depressed
                      color="primary"
                      class="mt-12"
                      @click="UpdateUSer"
                      >ບັນທຶກ</v-btn
                    >
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-row>
              <v-col class="d-flex justify-center" no-gutters>
                <h3 class="text-primary">ຢືນຢັນການລຶບຂໍ້ມູນ</h3>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteUser"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.profile`]="{ item }">
      <v-avatar>
        <v-img
          :src="item.profile"
          :alt="item.text"
          max-width="45"
          max-height="45"
        />
      </v-avatar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="UpdateDialogUSer(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>
<script>
import gql from 'graphql-tag'
import insert_user from '~/gql/mutations/insert/admin/insert_user.gql'
import update_user from '~/gql/mutations/insert/admin/update_user.gql'
import delete_user from '~/gql/mutations/insert/admin/delete_user.gql'

export default {
  data() {
    return {
        typeCheck:false,
      getData: [],
      selectedFile: null,
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {},
      avatar: null,
      defaultItem: {},
      headers: [
        { text: 'Profile', value: 'profile', sortable: false },
        { text: 'ID', value: 'id' },
        { text: 'Username', value: 'username' },
        { text: 'Gender', value: 'gender' },
        { text: 'Email', value: 'email' },
        { text: 'Password', value: 'password' },
        { text: 'Role', value: 'role' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      username: null,
      gender: null,
      email: null,
      password: null,
      role: null,
    }
  },
  computed: {
    formTitle() {
      return this.typeCheck == false ? 'ເພີ່ມຂໍ້ມູນຜູ້ໃຊ້' : 'ແກ້ໄຂຂໍ້ມູນຜູ້ໃຊ້'
    },
  },
mounted(){
    this.getDataAll()
},
  methods: {
    async getDataAll() {
      console.log("run test")
           await this.$apollo.query({
                query: require('~/gql/queries/register/get_all_user.gql')
                  .MyQuery,
                fetchPolicy: 'no-cache',
              })
              .then((result) => {
                console.log("run result",result.data.user)
                this.getData = result.data.user
              //  console.log("run",getData)
             
               
              })
              .catch((error) => {
                console.log(error)
               
              })
          },

    newUser(){
        this.typeCheck = false
        this.username = null
        this.gender = null
        this.email = null
        this.password = null
        this.role = null
        this.id = null
    },
    editItem(item) {
      this.editedIndex = this.data.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
    //   this.editedIndex = this.data.indexOf(item)
    //   this.editedItem = Object.assign({}, item)
    
      this.dialogDelete = true
        this.id = item.id
    },
    deleteUser(){
        this.$apollo
        .mutate({
          mutation: gql`
            ${delete_user.MyMutation}
          `,
          variables: {
            id: this.id,
          },
          fetchPolicy: 'no-cache',
        })
        .then((result) => {
          console.log('seccess', result)
          this.getDataAll()
          this.dialogDelete = false
        })
        .catch((error) => {
          console.log(error)
        })
    },

    deleteItemConfirm() {
      this.data.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.data[this.editedIndex], this.editedItem)
      } else {
        this.data.push(this.editedItem)
      }
      this.close()
    },

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
          this.getDataAll()
          this.dialog = false
        })
        .catch((error) => {
          console.log(error)
        })
    },
    UpdateDialogUSer(item) {
        this.typeCheck = true
        this.username = item.username
        this.gender = item.gender
        this.email = item.email
        this.password = item.password
        this.role = item.role
        this.dialog = true
        this.id = item.id
    },
    UpdateUSer() {
      this.$apollo
        .mutate({
          mutation: gql`
            ${update_user.updateUser}
          `,
          variables: {
            id: this.id,
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
          this.getDataAll()
          this.dialog = false
        })
        .catch((error) => {
          console.log(error)
        })
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