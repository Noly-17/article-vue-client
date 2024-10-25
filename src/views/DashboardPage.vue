<template>
  <div class="dashboard-container">
    <div v-if="isLoading" class="loading-indicator">Loading...</div>
    <div v-else class="dashboard-content">
      <div class="text-editor-wrapper">
        <ArticleList
          :itemsPerPage="5"
          section="PUBLISHED"
          :articles="published_articles"
        />
      </div>
      <div class="article-list-wrapper">
        <ArticleForm
          class="article-form"
          v-if="type === 'writer'"
          formTitle="CREATE ARTICLE"
          btn="POST"
          :onSubmit="handlePostArticle"
        />
        <ArticleList
          :itemsPerPage="2"
          :section="curUser.type === 'editor' ? 'FOR REVIEW' : 'PENDING'"
          :articles="edit_articles"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ArticleList from '@/components/ArticleList.vue';
import ArticleForm from '@/components/ArticleForm.vue';
import useArticleHook from '@/hooks/articles';
import useUserHook from '@/hooks/user';
import { onMounted } from 'vue';

const {
  published_articles,
  edit_articles,
  isLoading,
  loadArticles,
  postArticle,
} = useArticleHook();
const { curUser, getFullName, type } = useUserHook();

onMounted(() => {
  loadArticles(curUser.accessToken);
});

const handlePostArticle = async ({ formData, file }) => {
  try {
    const newData = { writer: getFullName, image: file, ...formData };
    postArticle(newData, curUser.accessToken);
  } catch (error) {
    console.error('Failed to submit form data or upload image', error);
  }
};
</script>

<style scoped>
.dashboard-container {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
}

.user-info p {
  margin-right: 15px;
  font-size: 16px;
  color: #333;
}

.dashboard-content {
  margin-top: 20px;
  display: flex;
  gap: 20px;
}

.text-editor-wrapper {
  width: 60%;
  flex-shrink: 0;
}

.article-list-wrapper {
  flex-grow: 1;
  gap: 10px;
  overflow: auto;
  background-color: unset;
}

@media (max-width: 895px) {
  .dashboard-content {
    flex-direction: column;
  }
  .text-editor-wrapper {
    width: 100%;
    flex-shrink: 0;
  }
  .article-form {
    display: none;
  }
}
</style>
