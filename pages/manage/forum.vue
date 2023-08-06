<template>
  <v-data-table
    :headers="headers"
    :items="data"
    sort-by="id"
    class="elevation-1"
  >
    <template v-slot:[`item.comment`]="{ item }">
      <p class="mt-4">
        {{ item.comments_aggregate.aggregate.count }}
      </p>
    </template>
    <template v-slot:[`item.read`]="{ item }">
      <p class="mt-4">
        {{ item.forum_histories_aggregate.aggregate.count }}
      </p>
    </template>
    <!-- <template v-slot:[`item.tag`]="{ item }">
      <p class="mt-4">
        {{ item.forum_details.tag.name }}
      </p>
    </template> -->
    <template v-slot:[`item.creater`]="{ item }">
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
                  <v-row clasee="text-center">
                    <v-col>
                      <h4>ຊື່ຫົວຂໍ້ກະທູ້</h4>
                      <v-spacer />
                      <v-col class="d-flex" cols="12" sm="6">
                        <v-select
                          v-model="cateId"
                          item-text="name"
                          item-value="id"
                          :items="getCate"
                          label="ຄົ້ນຫາໝວດໝູ່"
                          dense
                          solo
                          @change="getTagAll()"
                        ></v-select>
                      </v-col>
                    </v-col>
                  </v-row>
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
                    <v-col>
                      <h4>ເລືອກແທັກທີ່ກ່ຽວຂ້ອງກັບກະທູ້</h4>
                      <v-col class="d-flex" cols="12" sm="12">
                        <v-select
                          solo
                          item-text="name"
                          item-value="id"
                          v-model="tagSelected"
                          :items="getTag"
                          label="ຄົ້ນຫາແທັກ"
                          multiple
                          chips
                          persistent-hint
                        ></v-select>
                      </v-col>
                      <!-- <v-textarea
              solo
              name="input-7-4"
            ></v-textarea> -->
                    </v-col>
                    <!-- <v-col cols="3">
                      <v-subheader>ຮູບພາບ:</v-subheader>
                    </v-col>
                    <v-col cols="6" md="9" class="d-flex align-center">
                      <input
                        type="file"
                        ref="fileInput"
                        accept="image/*"
                        @change="image"
                      />
                    </v-col> -->
                  </v-row>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-col class="d-flex justify-center">
                <v-btn v-if="typeCheck==false"
                      depressed
                      color="primary"
                      class="mt-12"
                      @click="InsertForum"
                      >ຕົກລົງ</v-btn
                    >
                    <v-btn v-else
                      depressed
                      color="primary"
                      class="mt-12"
                      @click="UpdateForum"
                      >ບັນທຶກ</v-btn
                    >
              </v-col>
            </v-card-actions>
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
              <v-btn color="red darken-1" text @click="closeDelete"
                >ຍົກເລີກ</v-btn
              >
              <v-btn color="blue darken-1" text @click="DeleteForum"
                >ຕົກລົງ</v-btn
              >
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
      <v-icon small class="mr-2" @click="UpdateDialogForum(item)">
        mdi-pencil
      </v-icon>
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
// import insert_forum from '~/gql/mutations/insert/admin/insert_forum.gql'
import insert_forum from '~/gql/mutations/insert/insert_forum.gql'
import insert_forum_detail from '~/gql/mutations/insert/admin/insert_forum_detail.gql'
import delete_forum from '~/gql/mutations/insert/admin/delete_forum.gql'
import update_forum from '~/gql/mutations/insert/admin/update_forum.gql'
export default {
  data: () => ({
    typeCheck: false,
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
      // { text: 'ຮູບພາບ', value: 'image' },
      { text: 'ຄຳຄິດເຫັນ', value: 'comment' },
      { text: 'ການອ່ານ', value: 'read' },
      // { text: 'ແທັກ', value: 'tag' },
      // { text: 'ໝວດໝູ່', value: 'cate' },
      { text: 'ຜູ້ສ້າງ', value: 'creater' },
      { text: 'ສ້າງວັນທີ', value: 'created_at' },
      { text: 'ເຄື່ອນໄຫວລ້າສຸດ', value: 'updated_at' },
      { text: 'ຈັດການ', value: 'actions', sortable: false },
    ],
    id: null,
    tag: null,
    topic: null,
    detail: null,
    image: null,
    getTag: null,
    getCate: null,
    cateId: null,
    forum_id: 1,
    tagSelected: null,
    localeId: null,
    

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
  created() {
    this.localeId = localStorage.getItem('userDatId')
  },

  computed: {
    forum_id1() {
      return this.forum_id
    },
    formTitle() {
      return this.typeCheck == false ? 'ເພີ່ມຂໍ້ມູນກະທູ້' : 'ແກ້ໄຂຂໍ້ມູນກະທູ້'
    },
    result() {
      if (this.tagSelected === null) {
        return [] // Return an empty array if hat is null
      }
      return this.tagSelected.map((tag_id) => ({
        tag_id,
        forum_id: this.forum_id1,
      }))
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
    this.localeId = localStorage.getItem('userDatId')
  },
  mounted() {
    this.getCateAll()
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
    async getCateAll() {
      console.log('run test')
      await this.$apollo
        .query({
          query: require('~/gql/queries/home/get_cate.gql').MyQuery,
          fetchPolicy: 'no-cache',
        })
        .then((result) => {
          console.log('run categories', result.data.categories)
          this.getCate = result.data.categories
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getTagAll() {
      console.log('run test')
      await this.$apollo
        .query({
          query: require('~/gql/queries/register/get_tag_by_id.gql').MyQuery,
          fetchPolicy: 'no-cache',
          variables: {
            id: this.cateId,
          },
        })
        .then((result) => {
          console.log('run result', result.data.tag)
          this.getTag = result.data.tag
          //  console.log("run",getData)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    limit(string = '', limit = 50) {
      return string.substring(0, limit) + '...'
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
    newForum() {
      this.typeCheck = false
      this.id = null
      this.topic = null
      this.detail = null
    },
    InsertForum() {
      this.$apollo
        .mutate({
          mutation: gql`
            ${insert_forum.MyMutation}
          `,
          variables: {
            createBy: this.localeId,
            detail: this.detail,
            tagId: this.tagSelected,
            topic: this.topic,
          },
          fetchPolicy: 'no-cache',
        })
        .then((result) => {
          console.log('seccess', result.data.insert_forum.returning[0].id)
          this.forum_id = result.data.insert_forum.returning[0].id
          this.InsertForumDetail()
          this.getData()
          this.dialog = false
        })
        .catch((error) => {
          console.log(error)
        })
    },
    InsertForumDetail() {
      this.$apollo
        .mutate({
          mutation: gql`
            ${insert_forum_detail.MyMutation2}
          `,
          variables: {
            objects: this.result,
          },
          fetchPolicy: 'no-cache',
        })
        .then((result) => {
          console.log('seccess')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    UpdateDialogForum(item) {
      this.typeCheck = true
      this.cateId= item.cateId
      this.topic = item.topic
      this.tagSelected = item.tagSelected
      this.detail = item.detail
      this.dialog = true
      this.id = item.id
    },
    UpdateForum() {
      this.$apollo
        .mutate({
          mutation: gql`
            ${update_forum.updateForum}
          `,
          variables: {
            id: this.id,
            topic: this.topic,
            detail: this.detail,
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
    DeleteForum() {
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