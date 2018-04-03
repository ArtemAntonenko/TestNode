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
        @click="addArticle"
        class="article__add-btn"
      >
        Add article
      </v-btn>
    </div>

    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex
          xs6
          :key="article['_id']"
          v-for="article in articleList"
        >
          <v-card
            class="article__card"
            color="blue lighten-4"
          >
            <v-card-title primary-title>
                <h3 class="headline mb-0 article__title">{{article.title}}</h3>
            </v-card-title>
            <v-card-text>
              {{article.body}}
            </v-card-text>
            <v-btn
              fab
              small
              flat
              class="article__btn-delete"
              @click="deleteArticle(article['_id'])"
            >
              <v-icon>clear</v-icon>
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
        author: ''
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    ...mapActions({
      requestArticleList: 'articles/requestArticles',
      requestDeleteArticle: 'articles/requestDeleteArticle',
      showResultSuccessMessage: 'snackbar/showResultSuccessMessage',
      showResultErrorMessage: 'snackbar/showResultErrorMessage'
    }),
    async requestArticles () {
      try {
        this.articleList = await this.requestArticleList()
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
    addArticle () {
      console.log('addArticle')
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
  }
</style>
