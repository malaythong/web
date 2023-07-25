<template>
    <div>

        <v-dialog v-model="interestDialog" max-width="500">
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
                            <h3>ສິ່ງທີ່ສົນໃຈ</h3>
                        </v-col>
                    </v-row>
                </v-card-title>

                <v-card-text>
                    <v-col class=" d-flex justify-center" no-gutters>
                        <caption>ເລືອກສິ່ງທີ່ທ່ານສົນໃຈຢ່າງໜ້ອຍ 3 ຢ່າງຂຶ້ນໄປເພື່ອໃຫ້ສະແດງໃນໜ້າຫຼັກຂອງທ່ານ</caption>
                    </v-col>

                    <v-chip-group v-model="interest" column multiple>
                        <v-chip v-for="(interest, index) in interestOptions" :key="index" filter outlined >
                            {{ interest }}
                        </v-chip>
                    </v-chip-group>
                </v-card-text>
                <v-row class="mb-4">
                    <v-col class="d-flex justify-center ">
                        <v-btn depressed color="primary" class="mt-12" @click="submitInterest">ຕົກລົງ
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            interestDialog: true,
            interest: [],
            interestOptions: ["ສາຍການຮຽນ", "ອາຊີບ", "ຄອບຄົວ", "ຄວາມຮັກ", "ການສຶກສາ"],
        };
    },
    methods: {
        submitInterest() {
            console.log('Interests submitted:', this.interest);
            this.interestDialog = false;
        },
        close() {
            this.interestDialog = false
        },
    },
};
</script>
  
<style scoped>
#card {
    overflow-y: hidden;
    overflow-x: hidden;
}
</style>