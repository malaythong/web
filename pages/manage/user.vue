<template>
  <v-data-table
    :headers="headers"
    :items="data"
    sort-by="topic"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title style="color: primary" class="font-weight-black"
          >ຈັດການຂໍ້ມູນຜູ້ໃຊ້</v-toolbar-title
        >
        <v-divider class="mx-4" inset vertical></v-divider>

        <v-dialog v-model="dialog" max-width="500px">
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
          <v-card id="card">
            <v-row>
              <v-col class="d-flex justify-end mr-3 pt-6">
                <v-icon color="primary" @click="close"> mdi-close </v-icon>
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
                      <v-subheader hide-details>username:</v-subheader>
                    </v-row>
                  </v-col>
                  <v-col cols="9" sm="9">
                    <v-text-field
                      hide-details="auto"
                      single-line
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="3" class="d-flex align-center" no-gutters>
                    <v-row>
                      <v-subheader hide-details>gender:</v-subheader>
                    </v-row>
                  </v-col>
                  <v-col cols="9" sm="9">
                    <v-radio-group v-model="row" row>
                      <v-radio label="female" value="radio-1"></v-radio>
                      <v-radio label="male" value="radio-2"></v-radio>
                      <v-radio label="LGBTQ+" value="radio-2"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3" class="d-flex align-center" no-gutters>
                    <v-row>
                      <v-subheader hide-details>email:</v-subheader>
                    </v-row>
                  </v-col>
                  <v-col cols="9" sm="9">
                    <v-text-field
                      hide-details="auto"
                      single-line
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="3" class="d-flex align-center" no-gutters>
                    <v-row>
                      <v-subheader hide-details>password:</v-subheader>
                    </v-row>
                  </v-col>
                  <v-col cols="9" sm="9">
                    <v-text-field
                      hide-details="auto"
                      single-line
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="d-flex justify-center">
                    <v-btn
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
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
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
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import gql from 'graphql-tag';

export default {
  data() {
    return {
      data: [], // Initialize data as an empty array
      selectedFile: null,
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {},
      avatar: null,
      defaultItem: {}, // Provide the default item object here
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
    };
  },

  apollo: {
    data: {
      query: gql`
        query allUsers {
          user {
            profile
            id
            username
            gender
            email
            password
            role
          }
        }
      `,
      result({ data }) {
        // Process the GraphQL query result to create the data array
        this.data = data.user.map((user) => ({
          profile: user.profile,
          id: user.id,
          username: user.username,
          gender: user.gender,
          email: user.email,
          password: user.password,
          role: user.role,
        }));
      },
    },
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.data.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.data[this.editedIndex], this.editedItem);
      } else {
        this.data.push(this.editedItem);
      }
      this.close();
    },

    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    onFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        this.avatar = e.target.result;
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

  
<style scoped>
#card {
  overflow-y: hidden;
  overflow-x: hidden;
}
</style>