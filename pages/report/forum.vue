<template>
  <v-card>
    <v-card-title>
      ລາຍງານຂໍ້ມູນກະທູ້
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    ></v-data-table>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      search: '',
      headers: [
        { text: 'ຊື່ກະທູ້', align: 'start', sortable: false, value: 'id' },
        { text: 'ຜູ້ສ້າງ', value: 'createBy' },
        { text: 'ສ້າງວັນທີ', value: 'createAt' },
        { text: 'ການອ່ານ', value: 'readed' },
        { text: 'ຈຳນວນ Rating', value: 'rate' },
      ],
      desserts: [
        {
          id: 'Frozen Yogurt',
          createBy: 'admin',
          createAt: '01/07/2023',
          readed: 2,
          rate: 10,
        },
        {
          id: 'Frozen Yogurt',
          createBy: 'admin',
          createAt: '01/07/2023',
          readed: 2,
          rate: 10,
        },
        {
          id: 'Frozen Yogurt',
          createBy: 'admin',
          createAt: '01/07/2023',
          readed: 2,
          rate: 10,
        },
        {
          id: 'Frozen Yogurt',
          createBy: 'admin',
          createAt: '01/07/2023',
          readed: 2,
          rate: 10,
        },
        {
          id: 'Frozen Yogurt',
          createBy: 'admin',
          createAt: '01/07/2023',
          readed: 2,
          rate: 10,
        },
      ],
    }
  },
}
</script>