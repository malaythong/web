<template>
    <v-avatar :size="size" :color="getColor(username)">
      {{ getAvatarText(username) }}
    </v-avatar>
  </template>
  
  <script>
  export default {
    props: {
      username: String,
      size: {
        type: Number,
        default: 32,
      },
    },
    methods: {
      getColor(str) {
        if (!str) return 'primary'; // Default color when no username is provided
        // Get the first character of the username and convert it to a number
        const charCode = str.charCodeAt(0);
        // Use modulo to get a number between 0 and 13 (number of Material colors)
        const colorIndex = charCode % 14;
        // Map the color index to a Material color
        const colors = [
          'primary',
          'secondary',
          'accent',
          'error',
          'warning',
          'info',
          'success',
          'red',
          'blue',
          'green',
          'orange',
          'yellow',
          'purple',
          'pink',
        ];
        return colors[colorIndex];
      },
      getAvatarText(str) {
        return str ? str.charAt(0).toUpperCase() : '';
      },
    },
  };
  </script>
  