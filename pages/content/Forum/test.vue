<template>
  <div>
    <v-card
      class="my-1 mb-4"
      v-for="(header, index) in selectedHeaderIds"
      :key="index">
      <v-select
        class="mx-2"
        outlined
        :items="availableHeaderOptions(index)"
        label="Select Header"
        v-model="selectedHeaders[index]"
        @change="headerSelected(index)">
      </v-select>
      <ul v-if="selectedHeaders[index]">
        <v-card
          elevation="0"
          class="my-1 mr-4"
          v-for="(item, index2) in getSelectedHeaderItems(
            selectedHeaders[index]
          )"
          :key="index2">
          <v-select
            class="mx-2"
            outlined
            :items="availableItemOptions(selectedHeaders[index])"
            label="Select Item"
            v-model="selectedItems[index][index2]"
            item-text="name"
            item-value="id">
          </v-select>
        </v-card>
        <v-btn class="mb-4" @click="addItemSelect(index)">Add V-Select Item</v-btn>
      </ul>
    </v-card>
    <v-btn class="mt-4 blue" @click="addHeaderSelect">Add V-Select Header</v-btn>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      header: [
        {
          id: 'H001',
          name: 'use self money',
          type: 3,
          item: [
            { id: 'L001', name: 'item01', value: 1000 },
            { id: 'L002', name: 'item02', value: 2000 },
            { id: 'L003', name: 'item08', value: 7000 },
          ],
        },
        {
          id: 'H002',
          name: 'use house money',
          type: 2,
          item: [
            { id: 'L001', name: 'item08', value: 12000 },
            { id: 'L002', name: 'item09', value: 23000 },
          ],
        },
        {
          id: 'H003',
          name: 'use company money',
          type: 1,
          item: [
            { id: 'L001', name: 'item04', value: 1200 },
            { id: 'L002', name: 'item05', value: 2300 },
            { id: 'L003', name: 'item07', value: 2400 },
          ],
        },
      ],
      selectedHeaderIds: [],
      itemOptions: [], // Array to store unique header types as options for v-select
      selectedHeaders: [], // Array to store selected header v-select values
      selectedItems: [], // Array to store selected item v-select values
      initialType: [1], // Array of initial types to auto-add v-select
      testItem: null,
    }
  },
  created() {
    this.collectItemOptions()
    this.initialType.forEach((type) => {
      this.addSelectByType(type)
    })
  },
  methods: {
    addHeaderSelect() {
      const remainingHeaders = this.header.filter(
        (header) => !this.selectedHeaderIds.includes(header.id)
      )

      if (remainingHeaders.length > 0) {
        this.selectedHeaderIds.push(remainingHeaders[0].id)
        this.selectedHeaders.push('') // Push an empty string as a placeholder for the v-select value
        this.selectedItems.push('') // Push an empty string for the associated item v-select
      }
    },
    headerSelected(index) {
      const headerType = this.selectedHeaders[index]
      const selectedItem = this.selectedItems[index]

      if (headerType && selectedItem.length === 0) {
        const selectedHeader = this.header.find(
          (header) => header.type === headerType
        )
        if (selectedHeader) {
          const itemValues = selectedHeader.item.map((item) => item.id)
          this.selectedItems[index] = itemValues
        }
      }
    },
    addItemSelect(index) {
      const selectedHeaderType = this.selectedHeaders[index]
      const header = this.header.find(
        (header) => header.type === selectedHeaderType
      )
      if (header && header.item) {
        if (!this.selectedItems[index]) {
          this.selectedItems[index] = []
        }
        this.selectedItems[index].push('')
      }
    },
    addSelectByType(type) {
      const headersWithType = this.header.filter(
        (header) => header.type === type
      )
      headersWithType.forEach((header) => {
        if (!this.selectedHeaderIds.includes(header.id)) {
          this.selectedHeaderIds.push(header.id)
          this.selectedHeaders.push(type)
          this.selectedItems.push('') // Push an empty string for the associated item v-select
        }
      })
    },
    collectItemOptions() {
      this.itemOptions = [
        { text: 'ipd', value: 1 },
        { text: 'epd', value: 2 },
        { text: 'opd', value: 3 },
      ]
    },
    availableHeaderOptions(index) {
      const selectedTypes = this.selectedHeaders.map((item, i) => {
        return i !== index ? item : null
      })
      return this.itemOptions.filter(
        (option) =>
          !selectedTypes.includes(option.value) ||
          option.value === this.selectedHeaders[index]
      )
    },
    availableItemOptions(type) {
      const header = this.header.find((header) => header.type === type)
      return header ? header.item : []
    },
    getSelectedHeaderItems(type) {
      const header = this.header.find((header) => header.type === type)
      return header ? header.item : []
    },
  },
}
</script>
  