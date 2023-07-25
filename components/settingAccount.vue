<template>
    <v-row justify="center">

        <v-dialog v-model="dialog" persistent max-width="600px">
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
                            <span class="text-h5">ຕັ້ງຄ່າບັນຊີ</span>
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
                            <v-col cols="2" class=" d-flex align-center" no-gutters>
                                <v-row>
                                    <v-subheader hide-details>ຊື່ຜູ້ໃຊ້:</v-subheader>
                                </v-row>

                            </v-col>
                            <v-col cols="9" sm="9">
                                <v-text-field hide-details="auto" single-line outlined></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="2" class=" d-flex align-center" no-gutters>
                                <v-row>
                                    <v-subheader hide-details>ອີເມວ:</v-subheader>
                                </v-row>
                            </v-col>
                            <v-col cols="9" sm="9">
                                <v-text-field hide-details="auto" single-line outlined></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="2" class=" d-flex align-center" no-gutters>
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
    </v-row>
</template>
  
<script>
import gql from 'graphql-tag';
const MY_QUERY = gql`
  query {
    title
    description
  }
`;

export default {
    data: () => ({
        row: null,
        avatar: null,
    }),
    props: {
        // dialog: false,
        value: Boolean,
    },
    methods: {
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
            this.$emit('update:settingAccount', false)
        },
    },
    computed: {
        dialog: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit("input", value)
            }
        }
    },
}
</script>


<style scoped>
#card {
    overflow-y: hidden;
    overflow-x: hidden;

}
</style>