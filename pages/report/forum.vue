<template>
  <div>
    <div class="my-4">
      <h1 class="primary--text">ລາຍງານຂໍ້ມູນກະທູ້</h1>
    </div>
    <v-card>
      <v-card-title>
        <v-row>
          <v-col cols="2">
            <!-- Start Date Picker -->
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
                <v-btn text color="primary" @click="$refs.menu.save(s_date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
            <!-- End Date Picker -->
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
                <v-btn text color="primary" @click="$refs.menu2.save(en_date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="5">
            <!-- Search bar -->
            <v-text-field
              v-model="search"
              label="Search"
              single-line
              outlined
              hide-details
            ></v-text-field>
          </v-col>

          <v-col>
            <!-- Search button -->
            <v-btn
              height="55"
              outlined
              color="primary mr-4"
              @click="searchDate"
            >
              <v-icon>mdi-magnify</v-icon> ຄົ້ນຫາ
            </v-btn>
          </v-col>
          <v-col align="end">
            <v-btn @click="downloadExcel" height="55" outlined color="primary">
              <v-icon> mdi-tray-arrow-down</v-icon> ດາວໂຫລດ</v-btn
            >
          </v-col>
        </v-row>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        sort-by="id"
      ></v-data-table>
    </v-card>
  </div>
</template>
    
  <script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      search: '',
      menu: false,
      menu2: false,
      s_date: '',
      en_date: '',

      items: [], // Initialize items as an empty array
      headers: [
        { text: 'ລະຫັດ', value: 'id' },
        { text: 'ຫົວຂໍ້', value: 'topic' },
        { text: 'ຜູ້ຂຽນ', value: 'user' },
        { text: 'ວັນທີສ້າງ', value: 'created_at' },
        { text: 'ການອ່ານ', value: 'historyCount' },
        { text: 'ຄະແນນ', value: 'ratingCount' },
      ],
    }
  },
  apollo: {
    items: {
      query: gql`
        query allForum {
          forum (where: { status: { _gte: 1, _lte: 2 } }){
            id
            topic
            created_at
            forum_histories_aggregate {
              aggregate {
                count
              }
            }
            ratings_aggregate {
              aggregate {
                count
              }
            }
            user {
              username
            }
          }
        }
      `,
      result({ data }) {
        // Process the GraphQL query result to create the items data
        this.items = data.forum.map((forum) => ({
          id: forum.id,
          topic: forum.topic,
          user: forum.user.username, // Access the username from 'user' object
          created_at: this.formatDateTime(forum.created_at),
          historyCount: forum.forum_histories_aggregate.aggregate.count,
          ratingCount: forum.ratings_aggregate.aggregate.count,
        }))
      },
    },
  },
  methods: {
    searchForum() {
      // Implement search functionality here if needed
      // For example, filter the 'items' array based on the 'search' term
    },
    searchDate() {
  console.log(this.s_date);
  console.log(this.en_date);
  try {
    this.$apollo
      .query({
        query: gql`
          query allForum($startDate: timestamptz!) {
            forum(where: { created_at: { _gte: $startDate } }) {
              id
              topic
              created_at
              forum_histories_aggregate {
                aggregate {
                  count
                }
              }
              ratings_aggregate {
                aggregate {
                  count
                }
              }
              user {
                username
              }
            }
          }
        `,
        variables: {
          startDate: this.s_date,
        },
      })
      .then((response) => {
        // Process the GraphQL query result to create the items data
        this.items = response.data.forum.map((forum) => ({
          id: forum.id,
          topic: forum.topic,
          user: forum.user.username,
          created_at: this.formatDateTime(forum.created_at),
          historyCount: forum.forum_histories_aggregate.aggregate.count,
          ratingCount: forum.ratings_aggregate.aggregate.count,
        }));
      })
      .catch((error) => {
        console.error('Error performing search:', error);
      });
  } catch (e) {
    console.error(e);
  }
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

      const headers = Object.keys(this.items[0])
      workbook.push('<Row>')
      headers.forEach((header) => {
        workbook.push(`<Cell><Data ss:Type="String">${header}</Data></Cell>`)
      })
      workbook.push('</Row>')

      this.items.forEach((data) => {
        workbook.push('<Row>')
        headers.forEach((header) => {
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

      workbook.push('</Table></Worksheet></Workbook>')

      const excelFile = workbook.join('')

      const buf = new ArrayBuffer(excelFile.length)
      const view = new Uint8Array(buf)
      for (let i = 0; i < excelFile.length; i++) {
        view[i] = excelFile.charCodeAt(i) & 0xff
      }

      const blob = new Blob([buf], { type: 'application/vnd.ms-excel' })
      const filename = `report-user ${new Date().toLocaleDateString()}.xls`
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename)
      } else {
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    },
    formatDateTime(dateTimeString) {
      const dateObj = new Date(dateTimeString)
      const day = String(dateObj.getDate()).padStart(2, '0')
      const month = String(dateObj.getMonth() + 1).padStart(2, '0')
      const year = String(dateObj.getFullYear())
      const hours = String(dateObj.getHours()).padStart(2, '0')
      const minutes = String(dateObj.getMinutes()).padStart(2, '0')
      // return `${day}-${month}-${year} ${hours}:${minutes}`
      return `${year}-${month}-${day} ${hours}:${minutes}`
    },
  },
}
</script>
  