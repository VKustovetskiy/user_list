<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    </v-app-bar>

    <v-content>
      <core-loader />
      <Users />
    </v-content>
  </v-app>
</template>

<script>
import Users from '@/views/Users'

export default {
  name: 'App',

  components: {
    Users
  },

  data: () => ({
    //
  }),
};
</script>
