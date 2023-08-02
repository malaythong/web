<template>
    <div>
      <v-card class="my-1" v-for="(header, index) in selectedHeaderIds" :key="index">
        <v-select
          class="mx-2 "
          outlined
          :items="availableHeaderOptions(index)"
          label="Select Header"
          v-model="selectedHeaders[index]"
        >
        </v-select>
        <v-select
          v-if="selectedHeaders[index]"
          class="mx-2 "
          outlined
          :items="availableItemOptions(selectedHeaders[index])"
          label="Select Item"
          v-model="selectedItems[index]"
        >
        </v-select>
        <v-btn @click="addItemSelect(index)">Add V-Select Item</v-btn>
        <ul v-if="selectedItems[index]">
          <li v-for="item in getSelectedHeaderItems(selectedHeaders[index])" :key="item.id">
            {{ item.name }}: {{ item.value }}
          </li>
        </ul>
      </v-card>
      <v-btn @click="addHeaderSelect">Add V-Select Header</v-btn>
    </div>
  </template>
  
  
  <script>
  export default {
    data() {
      return {
        header: [
          {
            id: "H001",
            name: "use self money",
            type: 3,
            item: [
              { id: "L001", name: "item01", value: 1000 },
              { id: "L002", name: "item02", value: 2000 },
            ],
          },
          {
            id: "H002",
            name: "use house money",
            type: 2,
            item: [
              { id: "L001", name: "item08", value: 12000 },
              { id: "L002", name: "item09", value: 23000 },
            ],
          },
          {
            id: "H003",
            name: "use company money",
            type: 1,
            item: [
              { id: "L001", name: "item04", value: 1200 },
              { id: "L002", name: "item05", value: 2300 },
              { id: "L003", name: "item07", value: 2300 },
            ],
          },
        ],
        // selectedHeaderIds: [],
        // itemOptions: [], // Array to store unique header types as options for v-select
        // selectedItems: [], // Array to store selected v-select values for each header
        // initialType: [1], // Array of initial types to auto-add v-select
        selectedHeaderIds: [],
      itemOptions: [], // Array to store unique header types as options for v-select
      selectedHeaders: [], // Array to store selected header v-select values
      selectedItems: [], // Array to store selected item v-select values
      initialType: [1], // Array of initial types to auto-add v-select
      };
    },
    created() {
      this.collectItemOptions();
      // Auto-add v-select for each type in initialType
      this.initialType.forEach((type) => {
        this.addSelectByType(type);
      });
    },
    methods: {
    addHeaderSelect() {
      const remainingHeaders = this.header.filter(
        (header) => !this.selectedHeaderIds.includes(header.id)
      );

      if (remainingHeaders.length > 0) {
        this.selectedHeaderIds.push(remainingHeaders[0].id);
        this.selectedHeaders.push(''); // Push an empty string as a placeholder for the v-select value
        this.selectedItems.push(''); // Push an empty string for the associated item v-select
      }
    },
    addItemSelect(index) {
      this.selectedItems.splice(index + 1, 0, ''); // Add an empty string to create a new item v-select
    },
    addSelectByType(type) {
      const headersWithType = this.header.filter((header) => header.type === type);

      headersWithType.forEach((header) => {
        if (!this.selectedHeaderIds.includes(header.id)) {
          this.selectedHeaderIds.push(header.id);
          this.selectedHeaders.push(type);
          this.selectedItems.push(''); // Push an empty string for the associated item v-select
        }
      });
    },
    collectItemOptions() {
      this.itemOptions = [
        { text: "ipd", value: 1 },
        { text: "epd", value: 2 },
        { text: "opd", value: 3 },
      ];
    },
    availableHeaderOptions(index) {
      // Return a filtered itemOptions array excluding selected types
      const selectedTypes = this.selectedHeaders.map((item, i) => {
        return i !== index ? item : null;
      });
      return this.itemOptions.filter(
        (option) =>
          !selectedTypes.includes(option.value) ||
          option.value === this.selectedHeaders[index]
      );
    },
    availableItemOptions(type) {
      const header = this.header.find((header) => header.type === type);
      return header ? header.item : [];
    },
    getSelectedHeaderItems(type) {
      const header = this.header.find((header) => header.type === type);
      return header ? header.item : [];
    },
    },
  };
  </script>
  
  <style>
  /* Add your styles here */
  </style>
  