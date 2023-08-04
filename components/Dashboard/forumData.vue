<template>
  <v-row>
    <v-col>
      <div>
        <h3 class="d-flex justify-center ">ກະທູ້ທີ່ມີຄົນເຂົ້າອ່ານຫຼາຍທີ່ສຸດ</h3>
        <v-simple-table fixed-header height="300px">
          <template v-slot:default>    
            <thead>
              <tr>
                <th class="text-left primary" style="color: #ffffff;">ລຳດັບ</th>
                <th class="text-left primary" style="color: #ffffff;">ຫົວຂໍ້</th>
                <th class="text-left primary" style="color: #ffffff;">ຈຳນວນການເຂົ້າອ່ານ</th>
              </tr>
            </thead>
            <tbody>             
              <tr v-for="(item, index) in getData" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.topic }}</td>
                <td>{{ item.forum_histories_aggregate.aggregate.count }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-col>

    <v-col>
      <div>
        <h3 class="d-flex justify-center ">ກະທູ້ທີ່ຄະແນນຫຼາຍທີ່ສຸດ</h3>
        <v-simple-table fixed-header height="300px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left primary" style="color: #ffffff;">ລຳດັບ</th>
                <th class="text-left primary" style="color: #ffffff;">ຫົວຂໍ້</th>
                <th class="text-left primary" style="color: #ffffff;">ຈຳນວນຄະແນນ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in getData" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.topic }}</td>
                <td>{{ item.ratings_aggregate.aggregate.count }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-col>

    <v-col>
      <div>
        <h3 class="d-flex justify-center ">ກະທູ້ທີ່ມີຄົນສະແດງຄວາມຄິດເຫັນຫຼາຍທີ່ສຸດ</h3>
        <v-simple-table fixed-header height="300px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left primary" style="color: #ffffff;">ລຳດັບ</th>
                <th class="text-left primary" style="color: #ffffff;">ຫົວຂໍ້</th>
                <th class="text-left primary" style="color: #ffffff;">ຈຳນວນຄວາມຄິດເຫັນ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in getData" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.topic }}</td>
                <td>{{ item.comments_aggregate.aggregate.count }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      getData: []
    }
  },
  mounted() {
    this.getDataAll()
  },
  methods: {
    async getDataAll() {
      console.log('run test')
      await this.$apollo
        .query({
          query: require('~/gql/queries/dashboard/get_data_table.gql').getforum,
          fetchPolicy: 'no-cache',
        })
        .then((result) => {
          console.log('run result', result.data.forum)
          this.getData = result.data.forum
        })
        .catch((error) => {
          console.log(error)
        })
    },
  }
}
</script>

<style>

</style>