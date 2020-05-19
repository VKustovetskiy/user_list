<template>
  <v-dialog
    v-model="isLoading"
    persistent
    width="300" >
    <v-card
      color="blue"
      dark
      class="pa-3"
    >
      <v-card-text class="subtitle-1">
        Loading...
        <v-progress-linear
          indeterminate
          color="white"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Loader',
  computed: {
    ...mapGetters({
      isLoading: 'app/isLoading'
    })
  }
}
</script>
