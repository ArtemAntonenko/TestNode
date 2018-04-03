<template>
  <div>
    <h1>Homepage</h1>

    <div class="article__new-article-form">
      <span class="article__input-label">Title</span>
      <v-text-field
        solo
        v-model="newArticle.title"
        flat
      >
      </v-text-field>

      <span class="article__input-label">Body</span>
      <v-text-field
        solo
        v-model="newArticle.body"
        multi-line
        no-resize
        flat
      >
      </v-text-field>

      <span class="article__input-label">Author</span>
      <v-text-field
        solo
        v-model="newArticle.author"
        flat
      >
      </v-text-field>

      <v-btn
        @click="createArticle"
        class="article__add-btn"
      >
        Add article
      </v-btn>
    </div>

    <v-text-field
      solo
      v-model="searchForTitle"
      placeholder="Search for title..."
      class="article__search-input"
    >
    </v-text-field>

    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex
          xs6
          :key="article['_id']"
          v-for="article in articleList"
        >
          <v-card v-if="article.editMode"
            class="article__card article__card-edit"
            color="blue lighten-4"
          >
            <v-text-field
              solo
              v-model="article.title"
              flat
              class="article__edit-input"
            >
            </v-text-field>
            <v-text-field
              solo
              v-model="article.body"
              multi-line
              no-resize
              flat
              class="article__edit-input"
            >
            </v-text-field>

            <div>
              <v-btn
                @click="saveChanges(article)"
              >
                Save
              </v-btn>
            </div>
          </v-card>

          <v-card
            v-else
            class="article__card"
            color="blue lighten-4"
          >
            <v-card-title primary-title>
                <h3 class="headline mb-0 article__title">{{article.title}}</h3>
            </v-card-title>
            <v-card-text>
              {{article.body}}
            </v-card-text>
            <div class="article__additional-info">
              Author: <span class="article__text-bold">{{article.author}}</span>
            </div>
            <div class="article__additional-info">
              Published On: <span class="article__text-bold">{{generatePublishDate(article.publishDate)}}</span>
            </div>
            <v-btn
              fab
              small
              flat
              class="article__btn-delete"
              @click="deleteArticle(article['_id'])"
            >
              <v-icon>clear</v-icon>
            </v-btn>
            <v-btn
              fab
              small
              flat
              class="article__btn-edit"
              @click="article.editMode = true"
            >
              <v-icon>edit</v-icon>
            </v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Homepage',
  components: {},
  props: {},
  data () {
    return {
      articleList: [],
      newArticle: {
        title: '',
        body: '',
        author: '',
        publishDate: ''
      },
      searchForTitle: ''
    }
  },
  computed: {},
  watch: {
    searchForTitle () {
      this.requestArticles()
    }
  },
  methods: {
    ...mapActions({
      requestArticleList: 'articles/requestArticles',
      requestDeleteArticle: 'articles/requestDeleteArticle',
      requestCreateArticle: 'articles/requestCreateArticle',
      requestUpdateArticle: 'articles/requestUpdateArticle',
      showResultSuccessMessage: 'snackbar/showResultSuccessMessage',
      showResultErrorMessage: 'snackbar/showResultErrorMessage'
    }),
    async requestArticles () {
      try {
        const res = await this.requestArticleList({searchForTitle: this.searchForTitle})
        this.articleList = res
          .map(item => {
            item.editMode = false
            return item
          })
          .sort((a, b) => b.publishDate - a.publishDate)
      } catch (err) {
        console.log(err)
      }
    },
    async deleteArticle (id) {
      try {
        await this.requestDeleteArticle({articleId: id})
        await this.requestArticles()
        this.showResultSuccessMessage('Article successfully deleted')
      } catch (err) {
        this.showResultErrorMessage('Error')
        console.log(err)
      }
    },
    async createArticle () {
      try {
        this.newArticle.publishDate = new Date().getTime()
        await this.requestCreateArticle(this.newArticle)
        await this.requestArticles()
        this.clearNewArticleData()
        this.showResultSuccessMessage('Article successfully created')
      } catch (err) {
        this.showResultErrorMessage('Error')
        console.log(err)
      }
    },
    generatePublishDate (data) {
      const date = new Date(Number(data))
      return window.dateFormat(date, 'HH:MM dd-mm-yyyy')
    },
    clearNewArticleData () {
      this.newArticle = {
        title: '',
        body: '',
        author: '',
        publishDate: ''
      }
    },
    async saveChanges (article) {
      try {
        await this.requestUpdateArticle({
          id: article['_id'],
          payload: {
            title: article.title,
            body: article.body
          }
        })
        article.editMode = false
        this.showResultSuccessMessage('Article successfully updated')
      } catch (err) {
        this.showResultErrorMessage('Error')
        console.log('err')
      }
    }
  },
  mounted () {
    this.requestArticles()
  }
}
</script>

<style lang="scss" scoped>
  .article {
    &__card {
      position: relative;
      padding-bottom: 15px;
    }

    &__card-edit {
      padding: 26px 10px 15px 10px;
    }

    &__title {
      width: 100%;
      text-align: center;
    }

    &__btn-delete {
      position: absolute;
      z-index: 1;
      right: 0;
      top: 0;
    }

    &__btn-edit {
      position: absolute;
      z-index: 1;
      right: 0;
      bottom: 0;
    }

    &__add-btn-label {
      font-size: 17px;
    }

    &__add-btn {
      cursor: pointer;
      margin: 10px auto 5px;
      display: block;
    }

    &__new-article-form {
      background: #e0e0e0;
      max-width: 49%;
      margin-left: 9px;
      border-radius: 5px;
      padding: 7px 10px 5px 10px;
    }

    &__input-label {
      display: inline-block;
      font-size: 16px;
      margin-top: 7px;
      padding: 0 5px 4px 7px;
    }

    &__additional-info {
      padding-left: 20px;
    }

    &__text-bold {
      font-weight: 500;
    }

    &__edit-input {
      margin-bottom: 10px;
    }

    &__search-input {
      margin: 15px 0 0 8px;
      max-width: 49%;
    }
  }
</style>
