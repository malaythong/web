<template>
    <div>
      <!-- Display the custom avatar with the username or initial -->
      <custom-avatar :username="username" :size="48" />
    </div>
  </template>
  
  <script>
  import CustomAvatar from '~/components/customAvatar.vue';
  
  export default {
    components: {
      CustomAvatar,
    },
    data() {
      return {
        username: 'JohnDoe', // Replace this with the actual username or leave it empty for the initial
      };
    },
  };
  </script>
  