<template>
    <v-card>
        <v-card-title>
            ລາຍງານຂໍ້ມູນຜູ້ໃຊ້
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
            desserts: [
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
}
</script>