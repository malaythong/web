<template>
  <div>
    <v-dialog v-model="interestDialog" persistent max-width="500">
      <v-card id="card">
        <v-row>
          <v-col class="d-flex justify-end mr-3 pt-6"> </v-col>
        </v-row>
        <v-card-title>
          <v-row>
            <v-col class="d-flex justify-center" no-gutters>
              <h3>ສິ່ງທີ່ສົນໃຈ</h3>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-col class="d-flex justify-center" no-gutters>
            <caption>
              ເລືອກສິ່ງທີ່ທ່ານສົນໃຈຢ່າງໜ້ອຍ 3
              ຢ່າງຂຶ້ນໄປເພື່ອໃຫ້ສະແດງໃນໜ້າຫຼັກຂອງທ່ານ
            </caption>
          </v-col>
          <v-chip-group v-model="interest" column multiple>
            <v-chip
              v-for="(interest, index) in getTag"
              :key="index"
              filter
              outlined
              @click="chipClicked(interest)"
            >
              {{ interest.name }}
            </v-chip>
          </v-chip-group>
        </v-card-text>
        <v-row class="mb-4">
          <v-col class="d-flex justify-center">
            <v-btn depressed color="primary" class="mt-12" @click="run"
              >ຕົກລົງ
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import gql from 'graphql-tag'
import update_tag from '~/gql/mutations/update/update_tag.gql'
import insert_tag from '~/gql/mutations/insert/insert_tag_user_all_in_one_time.gql'
export default {
  props: {
    value: Boolean,
    id: null,
  },
  data() {
    return {
      getTag: {},
      interest: [],
      interest2: [],
      interestOptions: [],
    }
  },
  mounted() {
    this.getTagData()
  },
  methods: {
    run() {
      return [this.InsertTag(), this.submitInterest()]
    },
    InsertTag() {
      console.log('test array tag id', this.result)
      this.$apollo
        .mutate({
          mutation: gql`
            ${insert_tag.MyMutation}
          `,
          variables: {
            objects: this.result,
          },
          fetchPolicy: 'no-cache',
        })
        .then((result) => {
          console.log('seccess insert tag', result.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateTag() {
      this.$apollo
        .mutate({
          mutation: gql`
            ${update_tag.MyMutation}
          `,
          variables: {
            id: this.id,
            tag: this.interestOptions,
          },
          fetchPolicy: 'no-cache',
        })
        .then((result) => {
          console.log(result.data)
          this.$emit('gotoMain')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getTagData() {
      console.log('run test')
      await this.$apollo
        .query({
          query: require('~/gql/queries/register/get_tag.gql').MyQuery,
          fetchPolicy: 'no-cache',
          variables: {
            id: this.cateId,
          },
        })
        .then((result) => {
          console.log('run result', result.data.tag)
          this.getTag = result.data.tag
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getDataAll() {
      console.log('run test')
      await this.$apollo
        .query({
          query: require('~/gql/queries/home/get_cate.gql').MyQuery,
          fetchPolicy: 'no-cache',
        })
        .then((result) => {
          console.log('run result', result.data.categories)
          this.getTag = result.data.categories
        })
        .catch((error) => {
          console.log(error)
        })
    },
    chipClicked(interest) {
      const isAlreadySelected = this.interestOptions.includes(interest.id)
      if (isAlreadySelected) {
        this.interestOptions = this.interestOptions.filter(
          (id) => id !== interest.id
        )
      } else {
        this.interestOptions.push(interest.id)
      }
      console.log('Selected interest IDs:', this.interestOptions)
    },
    submitInterest() {
      console.log('Interests submitted:', this.interest)
      this.updateTag()
      this.interestDialog = false
    },
    close() {
      this.interestDialog = false
    },
  },
  computed: {
    result() {
      if (this.interestOptions === null) {
        return [] // Return an empty array if hat is null
      }
      return this.interestOptions.map((tag_id) => ({
        tag_id,
        user_id: this.id,
      }))
    },
    interestDialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
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