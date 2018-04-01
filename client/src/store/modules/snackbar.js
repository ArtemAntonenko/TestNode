import * as types from '../mutation-types'

const state = {
  snackbar: false,
  message: '',
  color: 'error'
}

const actions = {
  hideResultMessage ({ commit }) {
    commit(types.HIDE_MESSAGE)
  },
  showResultSuccessMessage ({ commit }, message) {
    commit(types.CREATE_SUCCESS_MESSAGE, message)
  },
  showResultErrorMessage ({ commit }, message) {
    commit(types.CREATE_ERROR_MESSAGE, message)
  }
}

const mutations = {
  [types.CREATE_ERROR_MESSAGE] (state, message = 'Something went wrong') {
    state.message = message
    state.snackbar = true
    state.color = 'error'
  },
  [types.CREATE_SUCCESS_MESSAGE] (state, message = 'Updated!') {
    state.message = message
    state.snackbar = true
    state.color = 'success'
  },
  [types.HIDE_MESSAGE] (state) {
    state.snackbar = false
    state.color = 'info'
    state.message = ''
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
