<template>
    <div>
        <v-dialog v-model="genderDialog" max-width="500" persistent>
            <v-card id="card">
                <v-row>
                    <v-col class=" d-flex justify-end mr-3 pt-6">
                        <!-- <v-icon color="primary" @click="close">
                            mdi-close
                        </v-icon> -->
                    </v-col>
                </v-row>
                <v-card-title>
                    <v-row>
                        <v-col class=" d-flex justify-center" no-gutters>
                            <h3>ກ່ຽວກັບທ່ານ</h3>
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-col class=" d-flex justify-center" no-gutters>
                    <caption>ໃຫ້ຂໍ້ມູນທ່ານຕໍ່ພວກເຮົາເພື່ອການແນະນຳເນື້ອຫາທີ່ເໝາະສົມສຳລັບທ່ານ</caption>
                </v-col>
                <v-col class=" d-flex justify-center" no-gutters>
                    <h4>ເພດ</h4>
                </v-col>
                
                <v-row align="center" class="mb-6">
                    <v-col>
                        <div v-for="(option, index) in genderOptions" :key="index" class="text-center">
                            <div class="my-4">
                                <v-btn rounded color="primary" :outlined="selectedGender !== option"
                                    @click="selectGender(option)">
                                    {{ option }}
                                </v-btn>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
    </div>
</template>
  
<script>
import Swal from "sweetalert2";
  import update_gender from "~/gql/mutations/update/update_gender.gql";
  import gql from 'graphql-tag'
export default {
    props: {
      
      value: Boolean,
     id:null
    },
    data() {
        return {
           // genderDialog: true,
            selectedGender: null,
            genderOptions: ["ຍິງ", "ຊາຍ", "LQBTQ+"],
           
        };
    },
//     created() {
//     // Get the data from Local Storage when the component is created
//     this.retrievedData = localStorage.getItem("userData");
//     this.localeId = localStorage.getItem("userDatId");
//         this.localeUsername = localStorage.getItem("userDataUserName");
//         this.localeEmail = localStorage.getItem("userDataEmail");
//         this.localeRole = localStorage.getItem("userDataRole");
//   },
    methods: {
        saveGender() {
         // console.log("test obid",this.object.id)
      this.$apollo
        .mutate({
          mutation: gql`
            ${update_gender.MyMutation}
          `,
          variables: { 
           
            gender: this.selectedGender,
            id:this.id
         
          },
          fetchPolicy: "no-cache",
          
        }).then((result) => {
          console.log(result.data)
          const dialogTag = true;
            this.$emit("openTag", dialogTag);
        //   this.userData = result.data.insert_user.returning[0]
        //   this.localeId = result.data.insert_user.returning[0].id,
        //   this.localeUsername = result.data.insert_user.returning[0].username,
        //   this.localeEmail = result.data.insert_user.returning[0].email,
        //   this.localeRole = result.data.insert_user.returning[0].role
        //   Swal.fire({
        //     position: "center",
        //     icon: "success",
        //     title: "ສ້າງຂໍ້ມູນຜູ້ໃຊ້ສຳເລັດ",
        //     showConfirmButton: false,
        //     timer: 1500,
        //   });
         // this.saveData()
           // this.$emit('updateData', result.data.forum)
        })
        .catch((error) => {
     console.log(error)
     Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'ບັນຊີ Email ນີ້ ເຄີຍຖືກສ້າງແລ້ວ',
        });
    });
    },
        selectGender(option) {
            this.selectedGender = option;
            console.log('Selected gender:', this.selectedGender);
            this.genderDialog = false
            this.saveGender()
        },
        close() {
            this.genderDialog = false
        },
    },
    computed:{
        genderDialog: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit("input", value);
        },
      },
    }
};
</script>
  
<style scoped>
#card {
    overflow-y: hidden;
    overflow-x: hidden;
}
</style>