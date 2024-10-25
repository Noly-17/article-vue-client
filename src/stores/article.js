import { defineStore } from 'pinia';

export const useArticleStore = defineStore('articles', {
  state: () => ({
    articles: [],
    isLoading: false,
  }),

  actions: {
    setArticles(articleData) {
      this.articles = articleData;
    },
    setLoading(isLoading) {
      this.isLoading = isLoading;
    },
    addArticle(article) {
      this.articles.push(article);
    },
    removeArticle(articleId) {
      this.articles = this.articles.filter(
        (article) => article.id !== articleId
      );
    },
    updateArticle(updatedArticle) {
      const index = this.articles.findIndex(
        (article) => article._id === updatedArticle._id
      );
      if (index !== -1) {
        this.articles[index] = { ...this.articles[index], ...updatedArticle };
      }
    },
    reset() {
      this.isLoading = true;
      this.$reset();

      if (this.$persist && this.$persist.clear) {
        this.$persist.clear();
        this.isLoading = false;
      }
    },
  },

  getters: {
    getArticleById: (state) => (id) =>
      state.articles.find((article) => article._id === id),
    articleCount: (state) => state.articles.length,
  },

  persist: true,
});
