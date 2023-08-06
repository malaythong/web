<template>
  <div>
    <div class="my-4">
      <h1 class="primary--text">ລາຍງານຂໍ້ມູນຜູ້ໃຊ້</h1>
    </div>
    <v-card>
      <v-card-title>
        <v-row>
          <!-- <v-col cols="2">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="s_date"
                  label="ວັນທີເລີ່ມຕົ້ນ"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  outlined
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="s_date"
                @input="$refs.menu.save(s_date)"
                locale="la"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(s_date)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="2">
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="en_date"
                  label="ວັນທີ່ສິ້ນສຸດ"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  outlined
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="en_date"
                @input="$refs.menu2.save(en_date)"
                locale="la"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu2 = false"
                  >Cancel</v-btn
                >
                <v-btn
                  text
                  color="primary
                  "
                  @click="$refs.menu2.save(en_date)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-menu>
          </v-col> -->
          <v-col cols="8">
            <!-- search bar -->
            <v-text-field
              v-model="search"
              label="Search"
              single-line
              outlined
              hide-details
            ></v-text-field>
          </v-col>

          <v-col
            ><v-btn
              height="55"
              outlined
              color="primary mr-4"
              @click="searchDate"
            >
              <v-icon> mdi-magnify</v-icon> ຄົ້ນຫາ</v-btn
            ></v-col
          >
          <v-col align="end">
            <v-btn
              @click="downloadExcel"
              height="55"
              outlined
              color="primary"
            >
              <v-icon> mdi-tray-arrow-down</v-icon> ດາວໂຫລດ</v-btn
            >
          </v-col>
        </v-row>

      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="data"
        sort-by="id"
        :search="search"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
data() {
  return {
    search: '',
    s_date: '',
    en_date: '',
    data: [], // Initialize data as an empty array
    headers: [
      { text: 'ID', value: 'id' },
      { text: 'Username', value: 'username' },
      { text: 'Email', value: 'email' },
      { text: 'Gender', value: 'gender' },
      { text: 'Role', value: 'role' },
    ],
  };
},
apollo: {
  data: {
    query: gql`
      query allUser  {
        user (where: { status: { _gte: 1, _lte: 2 } }){
          id
          username
          email
          gender
          role
        }
      }
    `,
    result({ data }) {
      // Process the GraphQL query result to create the data array
      this.data = data.user.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        gender: user.gender,
        role: user.role,
      }));
    },
  },
},
methods: {
  searchDate() {
    console.log(this.s_date)
    console.log(this.en_date)
  },
  downloadExcel() {
    // Create a new workbook
    const workbook = [
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
      '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"',
      ' xmlns:o="urn:schemas-microsoft-com:office:office"',
      ' xmlns:x="urn:schemas-microsoft-com:office:excel"',
      ' xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"',
      ' xmlns:html="http://www.w3.org/TR/REC-html40">',
      '<Worksheet ss:Name="Sheet1">',
      '<Table>',
    ]

    // Add the table headers
    const headers = Object.keys(this.data[0])
    workbook.push('<Row>')
    headers.forEach((header) => {
      workbook.push(`<Cell><Data ss:Type="String">${header}</Data></Cell>`)
    })
    workbook.push('</Row>')

    // Add the table data
    this.data.forEach((data) => {
      workbook.push('<Row>')
      headers.forEach((header) => {
        // Encode the Lao text as UTF-8
        const encodedText = encodeURIComponent(data[header]).replace(
          /%([0-9A-F]{2})/g,
          (match, p1) => String.fromCharCode(`0x${p1}`)
        )
        workbook.push(
          `<Cell><Data ss:Type="String">${encodedText}</Data></Cell>`
        )
      })
      workbook.push('</Row>')
    })

    // Close the workbook
    workbook.push('</Table></Worksheet></Workbook>')

    // Convert the workbook to a binary Excel file
    const excelFile = workbook.join('')

    // Convert string to ArrayBuffer
    const buf = new ArrayBuffer(excelFile.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i < excelFile.length; i++) {
      view[i] = excelFile.charCodeAt(i) & 0xff
    }

    // Save the file
    const blob = new Blob([buf], { type: 'application/vnd.ms-excel' })
    const filename = `report-user ${new Date().toLocaleDateString()}.xls`
    if (window.navigator.msSaveOrOpenBlob) {
      // For IE
      window.navigator.msSaveOrOpenBlob(blob, filename)
    } else {
      // For other browsers
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  },
},
};
</script>