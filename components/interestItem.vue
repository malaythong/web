<template>
    <div>

        <v-dialog v-model="interestDialog" persistent max-width="500" >
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
                            <h3>ສິ່ງທີ່ສົນໃຈ</h3>
                        </v-col>
                    </v-row>
                </v-card-title>

                <v-card-text>
                    <v-col class=" d-flex justify-center" no-gutters>
                        <caption>ເລືອກສິ່ງທີ່ທ່ານສົນໃຈຢ່າງໜ້ອຍ 3 ຢ່າງຂຶ້ນໄປເພື່ອໃຫ້ສະແດງໃນໜ້າຫຼັກຂອງທ່ານ</caption>
                    </v-col>

                    <v-chip-group v-model="interest" column multiple>
                        <v-chip v-for="(interest, index) in getTag" :key="index" filter outlined @click="chipClicked(interest)">
                            {{ interest.name }}
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
import gql from 'graphql-tag'
import update_tag from "~/gql/mutations/update/update_tag.gql";
export default {
    props: {
      
      value: Boolean,
     id:null
    },
    data() {
        return {
            getTag:{},
           // interestDialog: true,
            interest: [],
            interest2: [],
            interestOptions: ["ສາຍການຮຽນ", "ອາຊີບ", "ຄອບຄົວ", "ຄວາມຮັກ", "ການສຶກສາ"],
        };
    },
    mounted(){
   this.getDataAll()
    //this.queryData()
  },
    methods: {
        updateTag() {
         // console.log("test obid",this.object.id)
      this.$apollo
        .mutate({
          mutation: gql`
            ${update_tag.MyMutation}
          `,
          variables: { 
            id: this.id,
            tag: this.interestOptions,
           
         
          },
          fetchPolicy: "no-cache",
          
        }).then((result) => {
          console.log(result.data)
          this.$emit("gotoMain");
        //  this.close()
         
        })
        .catch((error) => {
     console.log(error)
    
    });
    },
        async getDataAll() {
      console.log("run test")
           await this.$apollo.query({
                query: require('~/gql/queries/home/get_cate.gql')
                  .MyQuery,
                fetchPolicy: 'no-cache',
              })
              .then((result) => {
                console.log("run result",result.data.categories)
                this.getTag = result.data.categories
              //  console.log("run",getData)
             
               
              })
              .catch((error) => {
                console.log(error)
               
              })
          },
          chipClicked(interest) {
      // Check if the clicked interest ID is already in the selectedInterestIds array
      const isAlreadySelected = this.interestOptions.includes(interest.id);

      if (isAlreadySelected) {
        // If the interest ID is already selected, remove it from the array
        this.interestOptions = this.interestOptions.filter(
          (id) => id !== interest.id
        );
      } else {
        // If the interest ID is not already selected, push it to the selectedInterestIds array
        this.interestOptions.push(interest.id);
      }

      console.log("Selected interest IDs:", this.interestOptions);
    },
        submitInterest() {
            console.log('Interests submitted:', this.interest);
            this.updateTag()
            this.interestDialog = false;
            
        },
        close() {
            this.interestDialog = false
        },
    },
    computed:{
        interestDialog: {
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