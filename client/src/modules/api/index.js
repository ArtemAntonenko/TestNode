let baseUrl
if (process.env.NODE_ENV === 'production') {
  // TODO: Uncomment the line below before making a pull request
  baseUrl = process.env.API_URL + '/api'
  console.log(baseUrl)
} else {
  // baseUrl = 'http://api.fmpedia.lc/api/'
  baseUrl = 'http://localhost:3000/api/'
}

const articles = {
  slug: 'articles',
  getAllArticles (searchForTitle) {
    return `${this.slug}/get-all-articles` + (searchForTitle ? `?search=${searchForTitle}` : '')
  },
  deleteArticle (id) {
    return `${this.slug}/delete-article/${id}`
  },
  createArticle () {
    return `${this.slug}/create-article`
  },
  updateArticle (id) {
    return `${this.slug}/update-article/${id}`
  }
}

export const api = {
  baseUrl,
  articles
}
