<template>
  <div>
    <h5>hiii</h5>
    <v-btn @click="test">test</v-btn>
  </div>
</template>

<script>
export default {
  name: "InspirePage",
  data() {
    return {
      name: "",
    };
  },
  methods: {
    test() {
      console.log("test");
    },
  },
};
</script>
