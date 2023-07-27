<template>
  <div>
    <div class="my-4">
      <h1 class="primary--text">ລາຍງານຂໍ້ມູນຜູ້ໃຊ້</h1>
    </div>
    <v-card>
      <v-card-title>
        <v-row>
          <v-col cols="2">
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
          </v-col>
          <v-col cols="5">
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

        <!-- <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          outlined
          hide-details
        ></v-text-field> -->
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="data"
        :search="search"
      ></v-data-table>
    </v-card>
  </div>
</template>
<script>
import XLSX from 'xlsx'
export default {
  data() {
    return {
      search: '',
      menu: false,
      menu2: false,
      s_date: '',
      en_date: '',

      headers: [
        {
          text: 'ລະຫັດຜູ້ໃຊ້',
          align: 'start',
          sortable: false,
          value: 'userId',
        },
        { text: 'ຊື່ຜູ້ໃຊ້', value: 'userName' },
        { text: 'ເພດ', value: 'gender' },
        { text: 'ອີເມວ', value: 'email' },
        { text: 'Role', value: 'role' },
      ],
      data: [
        {
          userId: '1',
          userName: 'admin123',
          gender: 'ຍິງ',
          email: 'admin123@mail.com',
          role: 'admin',
        },
        {
          userId: '2',
          userName: 'admin',
          gender: 'ຍິງ',
          email: 'admin@mail.com',
          password: '******',
          role: 'admin',
        },
        {
          userId: '3',
          userName: 'malala',
          gender: 'ຍິງ',
          email: 'malala@mail.com',
          password: '******',
          role: 'member',
        },
        {
          userId: '4',
          userName: 'vivi',
          gender: 'ຍິງ',
          email: 'vivi@mail.com',
          password: '******',
          role: 'member',
        },
        {
          userId: '5',
          userName: 'Toxin3344',
          gender: 'ຊາຍ',
          email: 'toxin@mail.com',
          password: '******',
          role: 'member',
        },
        {
          userId: '6',
          userName: 'Bill3344',
          gender: 'ຊາຍ',
          email: 'bill@mail.com',
          password: '******',
          role: 'member',
        },
      ],
    }
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
}
</script>