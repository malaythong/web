
<template>
    <v-dialog v-model="ratingDialog" persistent max-width="500">
        <v-card>
                <v-card-title>Rate This Item</v-card-title>
                <v-card-text class="d-flex justify-center">
                    <v-rating v-model="rating" icon-label="custom icon label text {0} of {1}" size="64"></v-rating>
                </v-card-text>
                <v-card-actions>
                    <v-btn text @click="closeRatingDialog">Close</v-btn>
                    <v-btn text @click="submitRating">Submit</v-btn>
                </v-card-actions>
            </v-card>
    </v-dialog>
  </template>

  <script>
import insert_rating from "~/gql/mutations/insert/insert_rating.gql";
import gql from "graphql-tag";
  export default {
  
    components: {
 
  },
    props: {
        object:{},
      value: Boolean,
      forumId:Number,
      userId:Number
    },
    data() {
      return {
        //userTemp:Number,
        rating:1,
      };
    },
  
    mounted() {
 // this.getCreateEmployee()
    },
    methods: {
       
        InsertRate() {
          console.log("test obid",this.object.id)
      this.$apollo
        .mutate({
          mutation: gql`
            ${insert_rating.MyMutation}
          `,
          variables: { 
            // formId:this.forumId,
            // score:this.rating,
            // user_id:this.userId,
            formId:this.object.id,
            score:this.rating,
            userId:1,
         
          },
          fetchPolicy: "no-cache",
        }).then((result) => {
            console.log("seccess")
           
          
            this.$emit('updateData', result.data.forum)
        })
        .catch((error) => {
     console.log(error)
    });
    },
        openRatingDialog() {
            this.ratingDialog = true;
        },
        closeRatingDialog() {
            this.ratingDialog = false;
           // this.$emit('updateData2', 0)
            this.rating=null
        },
        submitRating() {
            const newStatus = 1;
            this.$emit("save-status", newStatus);
            console.log('Rating submitted:', this.ratingDialog);
            this.InsertRate()
            this.ratingDialog = false;
            this.rating=null
        },
    },
    computed: {
    
        ratingDialog: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit("input", value);
        },
      },
    },
  };
  </script>
  