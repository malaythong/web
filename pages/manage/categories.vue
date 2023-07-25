<template>
  <v-data-table :headers="headers" :items="desserts" sort-by="topic" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title style="color: primary" class="font-weight-black ">ຈັດການຂໍ້ມູນໝວດໝູ່</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary ml-6 font-weight-bold" dark class="mb-2" v-bind="attrs" v-on="on">
              + ເພີ່ມໃໝ່
            </v-btn>
          </template>
          <v-card id="card">
            <v-row>
              <v-col class=" d-flex justify-end mr-3 pt-6">
                <v-icon color="primary" @click="close">
                  mdi-close
                </v-icon>
              </v-col>

            </v-row>
            <v-card-title>
              <v-row>
                <v-col class=" d-flex justify-center mb-3" no-gutters>
                  <h4>{{ formTitle }}</h4>
                </v-col>
              </v-row>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-row>
                    <v-col cols="4">
                      <v-subheader>ລະຫັດໝວດໝູ່:</v-subheader>
                    </v-col>
                    <v-col cols="8" sm="8" class="mx-auto">
                      <v-text-field single-line outlined v-model="editedItem.id"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="4">
                      <v-subheader>ຊື່ໝວດໝູ່:</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="8">
                      <v-text-field single-line outlined v-model="editedItem.topic"></v-text-field>
                    </v-col>
                  </v-row>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-col class="d-flex  justify-center">
                <v-btn color="primary" class="ml-6 font-weight-bold" dark @click="save">
                  + ເພີ່ມໃໝ່
                </v-btn>
              </v-col>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card id="card">
            <v-row>
              <v-col class=" d-flex justify-center" no-gutters>
                <h3 class="text-primary">ຢືນຢັນການລຶບຂໍ້ມູນ</h3>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="error" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data: () => ({
    selectedFile: null,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'ລະຫັດໝວດໝູ່',
        align: 'start',
        sortable: false,
        src: false,
        value: 'categoryId',
      },
      { text: 'ໝວດໝູ່', value: 'categoryName' },
      { text: 'ຈັດການ', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      categoryId: '',
      categoryName: '',
    },
    defaultItem: {
      categoryId: '',
      categoryName: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'ເພີ່ມຂໍ້ມູນໝວດໝູ່' : 'ແກ້ໄຂຂໍ້ມູນໝວດໝູ່'
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

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
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
  },
}
</script>

<style scoped>
#card {
  overflow-y: hidden;
  overflow-x: hidden;
}
</style>