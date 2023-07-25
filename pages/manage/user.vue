<template>
    <v-data-table :headers="headers" :items="desserts" sort-by="topic" class="elevation-1">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title style="color: primary" class="font-weight-black ">ຈັດການຂໍ້ມູນຜູ້ໃຊ້</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>

                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary ml-6 font-weight-bold" dark class="mb-2" v-bind="attrs" v-on="on">
                            + ເພີ່ມໃໝ່
                        </v-btn>
                    </template>
                    <v-card id="card">
                        <v-row>
                            <v-col class=" d-flex justify-end mr-3 pt-6">
                                <v-icon color="primary" @click="close">
                                    mdi-close
                                </v-icon>
                            </v-col>

                        </v-row>
                        <v-card-title>
                            <v-row>
                                <v-col class=" d-flex justify-center" no-gutters>
                                    <h4>ແກ້ໄຂຂໍ້ມູນຜູ້ໃຊ້</h4>
                                </v-col>
                            </v-row>
                        </v-card-title>
                        <v-row>
                            <v-col class=" d-flex justify-center" no-gutters>
                                <div>
                                    <v-avatar size="70" @click="triggerFileInput">
                                        <img v-if="avatar" :src="avatar" alt="Avatar" />
                                        <v-icon v-else size="100">mdi-account-circle</v-icon>
                                    </v-avatar>
                                    <input type="file" ref="fileInput" style="display: none" accept="image/*"
                                        @change="onFileChange" />
                                </div>
                            </v-col>
                        </v-row>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="3" class=" d-flex align-center" no-gutters>
                                        <v-row>
                                            <v-subheader hide-details>ລະຫັດຜູ້ໃຊ້:</v-subheader>
                                        </v-row>

                                    </v-col>
                                    <v-col cols="9" sm="9">
                                        <v-text-field hide-details="auto" single-line outlined></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="3" class=" d-flex align-center" no-gutters>
                                        <v-row>
                                            <v-subheader hide-details>ຊື່ຜູ້ໃຊ້:</v-subheader>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="9" sm="9">
                                        <v-text-field hide-details="auto" single-line outlined></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="3" class=" d-flex align-center" no-gutters>
                                        <v-row>
                                            <v-subheader hide-details>ເພດ:</v-subheader>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="9" sm="9">
                                        <v-radio-group v-model="row" row>
                                            <v-radio label="ຍິງ" value="radio-1"></v-radio>
                                            <v-radio label="ຊາຍ" value="radio-2"></v-radio>
                                            <v-radio label="LGBTQ+" value="radio-2"></v-radio>
                                        </v-radio-group>

                                    </v-col>

                                </v-row>
                                <v-row>
                                    <v-col cols="3" class=" d-flex align-center" no-gutters>
                                        <v-row>
                                            <v-subheader hide-details>ອີເມວ:</v-subheader>
                                        </v-row>

                                    </v-col>
                                    <v-col cols="9" sm="9">
                                        <v-text-field hide-details="auto" single-line outlined></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="3" class=" d-flex align-center" no-gutters>
                                        <v-row>
                                            <v-subheader hide-details>ລະຫັດຜ່ານ:</v-subheader>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="9" sm="9">
                                        <v-text-field hide-details="auto" single-line outlined></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col class="d-flex justify-center ">
                                        <v-btn depressed color="primary" class="mt-12" @click="dialog = false">ຕົກລົງ
                                        </v-btn>
                                    </v-col>
                                </v-row>

                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-row>
                            <v-col class=" d-flex justify-center" no-gutters>
                                <h3 class="text-primary">ຢືນຢັນການລຶບຂໍ້ມູນ</h3>
                            </v-col>
                        </v-row>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.profile="{ item }">
            <v-avatar>
                <v-img :src="item.profile" :alt="item.text" max-width="45" max-height="45" />
            </v-avatar>

        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
                mdi-delete
            </v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">
                Reset
            </v-btn>
        </template>
    </v-data-table>
</template>
<script>
export default {
    data: () => ({
        selectedFile: null,
        dialog: false,
        dialogDelete: false,
        headers: [
            {
                text: 'ຮູບໂປຣໄຟຣ',
                //   align: 'start',
                //   sortable: false,
                //   src: false,
                value: 'profile',
            },
            { text: 'ລະຫັດສະມາຊຶກ', value: 'userId' },
            { text: 'ຊື່ຜູ້ໃຊ້', value: 'userName' },
            { text: 'ເພດ', value: 'gender' },
            { text: 'ອີເມວ', value: 'email' },
            { text: 'ລະຫັດຜ່ານ', value: 'password' },
            { text: 'ລະຫັດຜ່ານ', value: 'role' },
            { text: 'ຈັດການ', value: 'actions', sortable: false },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            profile: '',
            userId: '',
            userName: '',
            gender: '',
            email: '',
            password: '',
            role: '',
        },
        defaultItem: {
            profile: '',
            userId: '',
            userName: '',
            gender: '',
            email: '',
            password: '',
            role: '',
        },
    }),


    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'ເພີ່ມຂໍ້ມູນຜູ້ໃຊ້' : 'ແກ້ໄຂຂໍ້ມູນຜູ້ໃຊ້'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.initialize()
    },

    methods: {
        initialize() {
            this.desserts = [
                {
                    profile: 'data:image/jpeg;base64,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',
                    userId: '1',
                    userName: 'admin123',
                    gender: 'ຍິງ',
                    email: 'admin123@mail.com',
                    password: '******',
                    role: 'admin',
                },
                {
                    profile: 'https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fphotos%2Fimages%2Fnewsfeed%2F001%2F384%2F531%2F8ed.jpg',
                    userId: '2',
                    userName: 'admin',
                    gender: 'ຍິງ',
                    email: 'admin@mail.com',
                    password: '******',
                    role: 'admin',
                },
                {
                    profile: 'https://i.kym-cdn.com/entries/icons/mobile/000/011/365/GRUMPYCAT.jpg',
                    userId: '3',
                    userName: 'malala',
                    gender: 'ຍິງ',
                    email: 'malala@mail.com',
                    password: '******',
                    role: 'member',
                },
                {
                    profile: 'https://i.pinimg.com/474x/e4/c3/4c/e4c34ca6f787cb58676325e20c0189d4.jpg',
                    userId: '4',
                    userName: 'vivi',
                    gender: 'ຍິງ',
                    email: 'vivi@mail.com',
                    password: '******',
                    role: 'member',
                },
                {
                    profile: 'https://steamuserimages-a.akamaihd.net/ugc/2062128696797027728/47EEA2E6CFABBEE1035EBC2DEC315AB5DF1CB622/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
                    userId: '5',
                    userName: 'Toxin3344',
                    gender: 'ຊາຍ',
                    email: 'toxin@mail.com',
                    password: '******',
                    role: 'member',
                },
                {
                    profile: 'https://imgix.ranker.com/list_img_v2/9099/309099/original/the-absolute-best-of-the-business-cat-meme?fit=crop&fm=pjpg&q=60&dpr=2&w=1200&h=720',
                    userId: '6',
                    userName: 'Bill3344',
                    gender: 'ຊາຍ',
                    email: 'bill@mail.com',
                    password: '******',
                    role: 'member',
                },
            ]
        },

        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.desserts.push(this.editedItem)
            }
            this.close()
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        onFileChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                this.avatar = e.target.result;
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        },
        close() {
            this.dialog = false
            this.$emit('update:edit_profile', false)
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