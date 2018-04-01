<template>
  <v-snackbar
    :timeout="4000"
    :color="statusColor"
    v-model="snackbar">
    <p style="margin: 0 auto; font-size: 18px; color: #fff;">{{ message }}</p>
  </v-snackbar>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'InfoSnackBar',
  computed: {
    ...mapState({
      statusColor: state => state.snackbar.color,
      snackState: state => state.snackbar.snackbar,
      message: state => state.snackbar.message
    }),
    snackbar: {
      get () {
        return this.snackState
      },
      set () {
        this.hideResultMessage()
      }
    }
  },
  methods: {
    ...mapActions({
      hideResultMessage: 'snackbar/hideResultMessage'
    })
  }
}
</script>

<style scoped>

</style>
