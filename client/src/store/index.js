import Vue from 'vue'
import Vuex from 'vuex'
import articles from './modules/articles'
import snackbar from './modules/snackbar'

Vue.use(Vuex)

export const state = {}

export const getters = {}

export const actions = {}

export const mutations = {}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    articles,
    snackbar
  }
})
