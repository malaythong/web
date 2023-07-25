<template>
    <v-card>
        <v-card-title>
            ລາຍງານຂໍ້ມູນແທັກ
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="desserts" :search="search"></v-data-table>
    </v-card>
</template>
<script>
export default {
    data() {
        return {
            search: '',
            headers: [
                {
                    text: 'ລະຫັດແທັກ',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'ຊື່ແທັກ', value: 'calories' },
                { text: 'ໝວດໝູ່', value: 'fat' },
                { text: 'ການນຳໃຊ້', value: 'carbs' },
            ],
            desserts: [
                {
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    iron: 1,
                },
                {
                    name: 'Ice cream sandwich',
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                    iron: 1,
                },
                {
                    name: 'Eclair',
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                    iron: 7,
                },
                {
                    name: 'Cupcake',
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                    iron: 8,
                },
                {
                    name: 'Gingerbread',
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                    iron: 16,
                }
            ],
        }
    },
}
</script>