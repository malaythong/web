<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card-title class="text-center">
          <h2>ສ້າງກະທູ້ໃໝ່</h2>
        </v-card-title>
        <v-card>
          <v-col>
            <v-row clasee="text-center">
              <v-col>
                <h4>1.ຊື່ຫົວຂໍ້ກະທູ້</h4>
                <v-spacer />
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                  v-model="cateId"
                  item-text="name"
                item-value="id"
                    :items="getCate"
                    label="ຄົ້ນຫາໝວດໝູ່"
                    dense
                    solo
                    @change="getTagAll()"
                  ></v-select>
                </v-col>
              </v-col>
            </v-row>

            <v-text-field solo dense v-model="topic"></v-text-field>
          </v-col>

          <v-col>
            <h4>2.ເນື້ອຫາກະທູ້</h4>
            <v-textarea
              solo
              name="input-7-4"
              label="ເນື້ອຫາ..."
              v-model="detail"
            ></v-textarea>
          </v-col>

          <v-col>
            <h4>3.ເລືອກແທັກທີ່ກ່ຽວຂ້ອງກັບກະທູ້</h4>
            <v-col class="d-flex" cols="12" sm="12">
              <!-- <v-select :items="getTag" label="ຄົ້ນຫາແທັກ" dense solo 
              item-text="name"
                item-value="id"></v-select> -->
                <v-select
                solo
                item-text="name"
                item-value="id"
         v-model="tagSelected"
          :items="getTag"
          label="ຄົ້ນຫາແທັກ"
          multiple
          chips
         
          persistent-hint
        ></v-select>
            </v-col>
            <!-- <v-textarea
              solo
              name="input-7-4"
            ></v-textarea> -->
          </v-col>
          <v-col class="d-flex justify-end">
            <!-- <v-btn depressed color="primary" class="mr-4"> ຍົກເລີກ </v-btn> -->
            <v-btn depressed color="primary" @click="InsertComment"> ສ້າງກະທູ້ໃໝ່ </v-btn>
          </v-col>
          
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import insert_forum from "~/gql/mutations/insert/insert_forum.gql";
  import gql from 'graphql-tag'
export default {
  // data: () => ({
  //   items: ["Foo", "Bar", "Fizz", "Buzz"],
  // }),
  data() {
      return {
        topic:null,
        detail:null,
        tagSelected:null,
        items: ["Foo", "Bar", "Fizz", "Buzz"],
        getTag:null,
        getCate:null,
        localeId:null,
        cateId:null
        
      }
    },
    mounted(){
   //this.getDataAll()
   //this.getTagAll()
    this.getCateAll()
  },
  created() {
    // Get the data from Local Storage when the component is created
   // this.retrievedData = localStorage.getItem("userData");
    this.localeId = localStorage.getItem("userDatId");
        // this.localeUsername = localStorage.getItem("userDataUserName");
        // this.localeEmail = localStorage.getItem("userDataEmail");
        // this.localeRole = localStorage.getItem("userDataRole");
        
  },
  methods:{
    InsertComment() {
         // console.log("test obid",this.object.id)
      this.$apollo
        .mutate({
          mutation: gql`
            ${insert_forum.MyMutation}
          `,
          variables: { 
          
            createBy: this.localeId,
  detail: this.detail,
  tagId: this.tagSelected,
  topic: this.topic,
         
          },
          fetchPolicy: "no-cache",
          
        }).then((result) => {
            console.log("seccess",result.data.insert_forum.returning[0].id)
            this.goToForum(result.data.insert_forum.returning[0].id)
            //this.$router.push('/content/Forum?id=' + id)
          
         
           // this.$emit('updateData', result.data.forum)
        })
        .catch((error) => {
     console.log(error)
    });
    },
    goToForum(id) {
      this.$router.push('/content/Forum?id=' + id)
    },
    async getCateAll() {
      console.log("run test")
           await this.$apollo.query({
                query: require('~/gql/queries/home/get_cate.gql')
                  .MyQuery,
                fetchPolicy: 'no-cache',
              })
              .then((result) => {
                console.log("run categories",result.data.categories)
                this.getCate = result.data.categories
              //  console.log("run",getData)
             
               
              })
              .catch((error) => {
                console.log(error)
               
              })
          },
    async getTagAll() {
      console.log("run test")
           await this.$apollo.query({
                query: require('~/gql/queries/register/get_tag_by_id.gql')
                  .MyQuery,
                fetchPolicy: 'no-cache',
                variables: { 
         id:this.cateId
       
        },
              })
              .then((result) => {
                console.log("run result",result.data.tag)
                this.getTag = result.data.tag
              //  console.log("run",getData)
             
               
              })
              .catch((error) => {
                console.log(error)
               
              })
          },
  },
};
</script>
