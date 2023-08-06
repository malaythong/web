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
          >ຈັດການຂໍ້ມູນໝວດໝູ່</v-toolbar-title
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
                <v-col class="d-flex justify-center mb-3" no-gutters>
                  <h4>{{ formTitle }}</h4>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <!-- <v-row>
                    <v-col cols="4">
                      <v-subheader>ລະຫັດໝວດໝູ່:</v-subheader>
                    </v-col>
                    <v-col cols="8" sm="8" class="mx-auto">
                      <v-text-field
                        single-line
                        outlined
                        v-model="id"
                      ></v-text-field>
                    </v-col>
                  </v-row> -->
                  <v-row>
                    <v-col cols="4">
                      <v-subheader>ຊື່ໝວດໝູ່:</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="8">
                      <v-text-field
                        single-line
                        outlined
                        v-model="name"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-row>
                <v-row>
                  <v-col class="d-flex justify-center">
                    <v-btn
                      v-if="typeCheck == false"
                      depressed
                      color="primary"
                      class="mt-12"
                      @click="InsertCategory"
                      >ຕົກລົງ</v-btn
                    >
                    <v-btn
                      v-else
                      depressed
                      color="primary"
                      class="mt-12"
                      @click="UpdateCategory"
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
            <v-card-title>
              <v-row>
                <v-col class="d-flex justify-center" no-gutters>
                  <h3 class="text-primary">ຢືນຢັນການລຶບຂໍ້ມູນ</h3>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="closeDelete"
                >ຍົກເລີກ</v-btn
              >
              <v-btn color="blue darken-1" text @click="DeleteCategory"
                >ຕົກລົງ</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="UpdateDialogCate(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>
<script>
import gql from 'graphql-tag'
import insert_category from '~/gql/mutations/insert/admin/insert_category.gql'
import update_category from '~/gql/mutations/insert/admin/update_category.gql'
import delete_category from '~/gql/mutations/insert/admin/delete_category.gql'
export default {
  data: () => ({
    typeCheck: false,
    selectedFile: null,
    dialog: false,
    dialogDelete: false,
    getData: [],
    headers: [
      {
        text: 'ລະຫັດໝວດໝູ່',
        align: 'start',
        sortable: false,
        src: false,
        value: 'id',
      },
      { text: 'ໝວດໝູ່', value: 'name' },
      { text: 'ຈັດການ', value: 'actions', sortable: false },
    ],
    id: null,
    name: null,
    desserts: [],
    editedIndex: -1,
    editedItem: {
      categoryId: '',
      categoryName: '',
    },
    defaultItem: {
      // categoryId: '',
      // categoryName: '',
    },
  }),

  computed: {
    formTitle() {
      return this.typeCheck == false ? 'ເພີ່ມຂໍ້ມູນໝວດໝູ່' : 'ແກ້ໄຂຂໍ້ມູນໝວດໝູ່'
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
    this.initialize()
  },

  mounted() {
    this.getDataAll()
  },
  methods: {
    initialize() {
      this.desserts = [
        {
          categoryId: '1',
          categoryName: 'ການສຶກສາ',
        },
        {
          categoryId: '2',
          categoryName: 'ອາຊີບ',
        },
        {
          categoryId: '3',
          categoryName: 'ຄອບຄົວ',
        },
        {
          categoryId: '4',
          categoryName: 'ຄວາມຮັກ',
        },
        {
          categoryId: '5',
          categoryName: 'ສຸຂະພາບ',
        },
      ]
    },
    newCategory() {
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

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },

    async getDataAll() {
      console.log('run test')
      await this.$apollo
        .query({
          query: require('~/gql/queries/manage/category.graphql').MyQuery,
          fetchPolicy: 'no-cache',
        })
        .then((result) => {
          console.log('run result', result.data.categories)
          this.getData = result.data.categories
          //  console.log("run",getData)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    InsertCategory() {
      this.$apollo
        .mutate({
          mutation: gql`
            ${insert_category.MyMutation}
          `,
          variables: {
            id: this.id,
            name: this.name,
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
    UpdateDialogCate(item) {
      this.typeCheck = true
      this.name = item.name
      this.dialog = true
      this.id = item.id
    },
    UpdateCategory() {
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
          this.getDataAll()
          this.dialog = false
        })
        .catch((error) => {
          console.log(error)
        })
    },
    DeleteCategory(){
        this.$apollo
        .mutate({
          mutation: gql`
            ${delete_category.UpdateCate}
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

  },
}
</script>

<style scoped>
#card {
  overflow-y: hidden;
  overflow-x: hidden;
}
</style>