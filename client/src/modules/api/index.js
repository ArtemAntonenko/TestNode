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
  getAllArticles () {
    return `${this.slug}/get-all-articles`
  },
  deleteArticle (id) {
    return `${this.slug}/delete-article/${id}`
  }
}

export const api = {
  baseUrl,
  articles
}
