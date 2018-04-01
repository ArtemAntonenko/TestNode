<template>
  <div>
    <h1>Homepage</h1>
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
      articleList: []
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
  }
</style>
