<template>
  <v-data-table
    :headers="headers"
    :items="data"
    sort-by="id"
    class="elevation-1"
  >
  <template v-slot:[`item.comment`]="{item}">
    <p class="mt-4">
      {{ item.comments_aggregate.aggregate.count }}
    </p>
  </template>
  <template v-slot:[`item.read`]="{item}">
    <p class="mt-4">
      {{ item.forum_histories_aggregate.aggregate.count }}
    </p>
  </template>
  <template v-slot:[`item.creater`]="{item}">
    <p class="mt-4">
      {{ item.user.username }}
    </p>
  </template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title style="color: primary" class="font-weight-black"
          >ຈັດການຂໍ້ມູນກະທູ້</v-toolbar-title
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
              @click="newForum"
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
                <v-col class="d-flex justify-center mb-3" no-gutters>
                  <h4>{{ formTitle }}</h4>
                </v-col>
              </v-row>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <!-- <v-row>
                    <v-col cols="3">
                      <v-subheader>ລະຫັດກະທູ້:</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="8">
                      <v-text-field
                        single-line
                        outlined
                        v-model="editedItem.id"
                        label="0001"
                      ></v-text-field>
                    </v-col>
                  </v-row> -->
                  <v-row>
                    <v-col cols="3">
                      <v-subheader>ຫົວຂໍ້ກະທູ້:</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="8">
                      <v-text-field
                        single-line
                        outlined
                        v-model="topic"
                        label="Text"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="3">
                      <v-subheader>ເນື້ອໃນກະທູ້:</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="8">
                      <v-textarea
                        single-line
                        outlined
                        v-model="detail"
                        label="Text"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="3">
                      <v-subheader>ຮູບພາບ:</v-subheader>
                    </v-col>
                    <v-col cols="6" md="9" class="d-flex align-center">
                      <input
                        type="file"
                        ref="fileInput"
                        accept="image/*"
                        @change="image"
                      />
                    </v-col>
                  </v-row>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-col class="d-flex justify-center">
                <v-btn
                  color="primary"
                  class="ml-6 font-weight-bold"
                  dark
                  @click="save"
                >
                  + ເພີ່ມໃໝ່
                </v-btn>
              </v-col>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="error" text @click="DeleteTag">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.detail`]="{ item }">
      {{ limit(item.detail) }}
    </template>
    <template v-slot:[`item.image`]="{ item }">
      <v-img
        :src="item.image"
        :alt="item.text"
        max-width="50"
        max-height="50"
      />
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="UpdateDialogTag(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:[`item.created_at`]="{ item }">
      {{ formatDateTime(item.created_at) }}
    </template>
    <template v-slot:[`item.updated_at`]="{ item }">
      {{ formatDateTime(item.updated_at) }}
    </template>
  </v-data-table>
</template>
<script>
import gql from 'graphql-tag'
import insert_forum from '~/gql/mutations/insert/admin/insert_forum.gql'
import delete_forum from '~/gql/mutations/insert/admin/delete_forum.gql'
export default {
  data: () => ({
    typeCheck:false,
    selectedFile: null,
    dialog: false,
    dialogDelete: false,
    data: [],
    headers: [
      {
        text: 'ລະຫັດກະທູ້',
        align: 'start',
        src: false,
        value: 'id',
      },
      { text: 'ຫົວຂໍ້ກະທູ້', value: 'topic' },
      { text: 'ລາຍລະອຽດ', value: 'detail' },
      { text: 'ຮູບພາບ', value: 'image' },
      { text: 'ຕອບກັບ', value: 'comment' },
      { text: 'ການອ່ານ', value: 'read' },
      { text: 'ຜູ້ສ້າງ', value: 'creater' },
      { text: 'ສ້າງວັນທີ', value: 'created_at' },
      { text: 'ເຄື່ອນໄຫວລ້າສຸດ', value: 'updated_at' },
      { text: 'ຈັດການ', value: 'actions', sortable: false },
    ],
    id: null,
    topic: null,
    detail: null,
    image: null,

    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      topic: '',
      detail: '',
      image: '',
      comment: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      id: '',
      topic: '',
      detail: '',
      image: '',
      comment: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.typeCheck == false ? 'ເພີ່ມຂໍ້ມູນກະທູ້' : 'ແກ້ໄຂຂໍ້ມູນກະທູ້'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    // this.initialize()
    this.getData()
  },

  methods: {
    getData() {
      this.$apollo
        .query({
          query: require('~/gql/queries/manage/forum.graphql'),
          fetchPolicy: 'no-cache',
        })
        .then((res) => {
          this.data = res?.data?.forum
          console.log(
            '🚀 ~ file: forum.vue:182 ~ getData ~  this.data:',
            this.data
          )
        })
        .catch((err) => {
          console.log(err)
        })
    },
    limit(string = '', limit = 50) {
      return string.substring(0, limit) + '...'
    },
    newForum(){
      this.typeCheck = true
      this.id = item.id
      this.name = item.id
      this.dialog = true
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.dialogDelete = true
      this.id = item.id
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
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

    formatDateTime(dateTimeString) {
        const dateObj = new Date(dateTimeString)
        const day = String(dateObj.getDate()).padStart(2, '0')
        const month = String(dateObj.getMonth() + 1).padStart(2, '0')
        const year = String(dateObj.getFullYear())
        const hours = String(dateObj.getHours()).padStart(2, '0')
        const minutes = String(dateObj.getMinutes()).padStart(2, '0')
        return `${day}-${month}-${year} ${hours}:${minutes}`
      },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
    onFileChange(event) {
      this.selectedFile = event.target.files[0]
    },
    newForum(){
      this.typeCheck = false
      this.id = null
      this.topic = null
      this.detail = null
    },
    InsertForum() { 
      this.$apollo
        .mutate({
          mutation: gql`
            ${insert_forum.insertForum}
          `,
          variables: {
            name: this.name,
          },
          fetchPolicy: 'no-cache',
        })
        .then((result) => {
          console.log('seccess', result)
          this.getData()
          this.dialog = false
        })
        .catch((error) => {
          console.log(error)
        })
    },
    UpdateDialogTag(item) {
      this.typeCheck = true
      this.name = item.name
      this.dialog = true
      this.id = item.id
    },
    UpdateTag() {
      this.$apollo
        .mutate({
          mutation: gql`
            ${update_category.updateCate}
          `,
          variables: {
            id: this.id,
            name: this.name,
          },
          fetchPolicy: 'no-cache',
        })
        .then((result) => {
          console.log('seccess', result)
          this.getData()
          this.dialog = false
        })
        .catch((error) => {
          console.log(error)
        })
    },
    DeleteTag(){
        this.$apollo
        .mutate({
          mutation: gql`
            ${delete_forum.deleteForum}
          `,
          variables: {
            id: this.id,
          },
          fetchPolicy: 'no-cache',
        })
        .then((result) => {
          console.log('seccess', result)
          this.getData()
          this.dialogDelete = false
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