import { api } from '@/modules/api/index'

const state = {}

const getters = {}

const actions = {
  async requestArticles ({ commit }, {searchForTitle = ''}) {
    const { data } = await this.$axios.get(api.articles.getAllArticles(searchForTitle))
    console.log('data', data)
    return data
  },
  async requestDeleteArticle ({ commit }, { articleId }) {
    await this.$axios.delete(api.articles.deleteArticle(articleId))
  },
  async requestCreateArticle ({ commit }, payload) {
    await this.$axios.post(api.articles.createArticle(), payload)
  },
  async requestUpdateArticle ({ commit }, { id, payload }) {
    await this.$axios.put(api.articles.updateArticle(id), payload)
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
