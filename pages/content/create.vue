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
                    :items="items"
                    label="ຄົ້ນຫາໝວດໝູ່"
                    dense
                    solo
                  ></v-select>
                </v-col>
              </v-col>
            </v-row>

            <v-text-field solo dense></v-text-field>
          </v-col>

          <v-col>
            <h4>2.ເນື້ອຫາກະທູ້</h4>
            <v-textarea
              solo
              name="input-7-4"
              label="ເນື້ອຫາ..."
            ></v-textarea>
          </v-col>

          <v-col>
            <h4>3.ເລືອກແທັກທີ່ກ່ຽວຂ້ອງກັບກະທູ້</h4>
            <v-col class="d-flex" cols="12" sm="6">
              <v-select :items="items" label="ຄົ້ນຫາແທັກ" dense solo></v-select>
            </v-col>
            <v-textarea
              solo
              name="input-7-4"
            ></v-textarea>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-btn depressed color="primary" class="mr-4"> ຍົກເລີກ </v-btn>
            <v-btn depressed color="primary"> ຕົກລົງ </v-btn>
          </v-col>
          
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: ["Foo", "Bar", "Fizz", "Buzz"],
  }),
};
</script>
