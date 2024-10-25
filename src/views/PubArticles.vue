<template>
  <div class="dashboard-container">
    <div v-if="isLoading" class="loading-indicator">Loading...</div>
    <div v-else class="dashboard-content">
      <ArticleList
        btn="POST"
        :itemsPerPage="5"
        section="PUBLISHED"
        :articles="published_articles"
      />
    </div>
  </div>
</template>

<script setup>
import ArticleList from '@/components/ArticleList.vue';
import useArticleHook from '@/hooks/articles';

const { published_articles, isLoading } = useArticleHook();
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

.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
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
</style>
