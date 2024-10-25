<template>
  <div class="article-container" v-if="articles">
    <div class="article-header">
      <h1 class="article-title">{{ articles.title }}</h1>
      <p class="article-subtitle">{{ articles.subtitle }}</p>
    </div>
    <div class="article-image">
      <img
        :src="articles.imageUrl || 'https://via.placeholder.com/800x400'"
        alt="Article Image"
        class="article-img"
      />
    </div>
    <div class="article-content">
      <p v-html="articles.content"></p>
    </div>
  </div>
  <div v-else>
    <p>Loading article...</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({
  articles: {
    type: Object,
    default: null,
  },
});
</script>

<style scoped>
.article-container {
  width: auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease-in-out;
}

.article-container:hover {
  transform: scale(1.02);
}

.article-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.article-title {
  font-size: 2.8rem;
  color: #222;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.article-subtitle {
  font-size: 1.3rem;
  color: #555;
  font-style: italic;
}

.article-image {
  text-align: center;
  margin: 1.5rem 0;
}

.article-img {
  max-width: 100%;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s ease-in-out;
}

.article-img:hover {
  opacity: 0.9;
}

.article-content {
  line-height: 1.8;
  font-size: 1.1rem;
  color: #333;
}

.highlight {
  padding: 15px;
  margin: 2rem 0;
  background-color: #f0f4f8;
  border-left: 6px solid #007acc;
  font-style: italic;
  font-size: 1.2rem;
  color: #333;
}
</style>
