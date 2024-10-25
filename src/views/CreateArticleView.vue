<template>
  <div class="dashboard-container">
    <div v-if="isLoading" class="loading-indicator">Loading...</div>
    <div v-else class="dashboard-content">
      <div class="text-editor-wrapper"></div>
      <div class="article-list-wrapper">
        <ArticleForm
          formTitle="CREATE ARTICLE"
          btn="POST"
          :onSubmit="handlePostArticle"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ArticleForm from '@/components/ArticleForm.vue';
import useArticleHook from '@/hooks/articles';
import useUserHook from '@/hooks/user';

const { isLoading, postArticle } = useArticleHook();
const { getFullName, curUser } = useUserHook();

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
