<template>
  <v-data-table
    :headers="headers"
    :items="getData"
    sort-by="id"
    class="elevation-1">
    <template v-slot:[`item.used`]="{ item }">
      <p class="mt-4">
        {{ item.forum_details_aggregate.aggregate.count }}
      </p>
    </template>
    <template v-slot:[`item.category`]="{ item }">
      <p class="mt-4">
        {{ item.category.name }}
      </p>
    </template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title style="color: primary" class="font-weight-black"
          >ຈັດການຂໍ້ມູນແທັກ</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary ml-6 font-weight-bold"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              @click="newTag"
              @focus="GetCategory">
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
                  <v-row>
                    <v-col cols="3">
                      <v-subheader>ຊື່ແທັກ:</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="8">
                      <v-text-field
                        single-line
                        outlined
                        dense
                        v-model="name"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="3">
                      <v-subheader>ໝວດໝູ່:</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="8">
                      <v-select
                        v-model="select"
                        :items="getCate"
                        item-text="name"
                        item-value="id"
                        outlined
                        dense
                      ></v-select>
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
                      @click="InsertTag"
                      >ຕົກລົງ</v-btn>
                    <v-btn
                      v-else
                      depressed
                      color="primary"
                      class="mt-12"
                      @click="UpdateTag"
                      >ບັນທຶກ</v-btn>
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
              <v-btn color="red darken-1" text @click="closeDelete">ຍົກເລີກ</v-btn>
              <v-btn color="blue darken-1" text @click="deleteTag">ຕົກລົງ</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="UpdateDialogTag(item)" @focus="GetCategory"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>
<script>
import gql from 'graphql-tag'
import insert_tag from '~/gql/mutations/insert/admin/insert_tag.gql'
import update_tag from '~/gql/mutations/insert/admin/update_tag.gql'
import delete_tag from '~/gql/mutations/insert/admin/delete_tag.gql'
export default {
  data: () => ({
    typeCheck: false,
    selectedFile: null,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'ລະຫັດແທັກ',
        align: 'start',
        src: false,
        value: 'id',
      },
      { text: 'ຊື່ແທັກ', value: 'name' },
      { text: 'ໝວດໝູ່', value: 'category' },
      { text: 'ການນຳໃຊ້', value: 'used' },
      { text: 'ຈັດການ', value: 'actions', sortable: false },
    ],
    select: null,
    // items: ['Programming', 'Design', 'Vue', 'Vuetify'],
    name: null,
    namecate: null,
    category: null,
    taguse: null,
    getData: [],
    getCate: [],
    editedIndex: -1,
    editedItem: {
      tagId: '',
      tagName: '',
      tagCategory: '',
      tagUsed: 0,
    },
    defaultItem: {
      tagId: '',
      tagName: '',
      tagCategory: '',
      tagUsed: 0,
    },
  }),
  computed: {
    formTitle() {
      return this.typeCheck == false ? 'ເພີ່ມຂໍ້ມູນແທັກ' : 'ແກ້ໄຂຂໍ້ມູນແທັກ'
    },
  },
  mounted() {
    this.getDataAll()
  },
  methods: {
    async getDataAll() {
      console.log('run test')
      this.$apollo
        .query({
          query: require('~/gql/queries/manage/tag.gql').getTag,
          fetchPolicy: 'no-cache',
        })
        .then((result) => {
          console.log('run result', result.data.tag)
          this.getData = result.data.tag
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async GetCategory() {
      console.log('run test')
      await this.$apollo
        .query({
          query: require('~/gql/queries/manage/category.graphql').MyQuery,
          fetchPolicy: 'no-cache',
        })
        .then((result) => {
          console.log('run resultc', result.data.categories)
          this.getCate = result.data.categories
          console.log(
            '🚀 ~ file: tag.vue:264 ~ .then ~ this.getCate:',
            this.getCate
          )
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteItem(item) {
        this.dialogDelete = true
        this.id = item.id
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
    newTag() {
      this.typeCheck = false
      this.id = null
      this.name = null
      this.category = null
    },
    InsertTag() {
      this.$apollo
        .mutate({
          mutation: gql`
            ${insert_tag.insertTag}
          `,
          variables: {
            name: this.name,
            category: this.select,
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
    UpdateDialogTag(item) {
      this.typeCheck = true
      this.name = item.name
      this.category = item.select
      this.id = item.id
      this.dialog = true
    },
    UpdateTag() {
      this.$apollo
        .mutate({
          mutation: gql`
            ${update_tag.updateTag}
          `,
          variables: {
            id: this.id,
            name: this.name,
            category: this.select,
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
    deleteTag(){
        this.$apollo
        .mutate({
          mutation: gql`
            ${delete_tag.deleteTag}
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