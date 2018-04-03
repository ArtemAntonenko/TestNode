import { api } from '@/modules/api/index'

const state = {}

const getters = {}

const actions = {
  async requestArticles ({ commit }) {
    const { data } = await this.$axios.get(api.articles.getAllArticles())
    console.log('data', data)
    return data
  },
  async requestDeleteArticle ({ commit }, { articleId }) {
    await this.$axios.delete(api.articles.deleteArticle(articleId))
  },
  async requestCreateArticle ({ commit }, payload) {
    await this.$axios.post(api.articles.createArticle(), payload)
  }
}

const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
