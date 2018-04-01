<template>
  <div id="app">
    <v-app>
      <router-view></router-view>
      <info-snack-bar></info-snack-bar>
    </v-app>
  </div>
</template>

<script>
import InfoSnackBar from '@/components/shared/InfoSnackBar'

export default {
  name: 'App',
  components: { InfoSnackBar }
}
</script>

<style lang="scss">
  @import 'vuetify/dist/vuetify.min.css';
  @import './assets/scss/index.scss';
</style>
