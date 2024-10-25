<template>
  <div class="article-list-wrapper">
    <header>{{ section }}</header>
    <ul class="article-list">
      <li
        v-for="article in paginatedArticles"
        :key="article._id"
        class="article-item"
        @click="showArticle(article._id)"
      >
        <img
          class="article-image"
          :src="article.imageUrl ?? 'https://via.placeholder.com/150'"
          alt="Article Thumbnail"
        />
        <div class="article-details">
          <h2 class="article-title">{{ article.title }}</h2>
          <p
            class="article-description"
            v-html="formatContent(article.content)"
          ></p>
          <span class="article-date">Date: {{ article.createdAt }}</span>
          <br />
          <a href="#" class="article-link">Read More</a>
          <div class="article-meta">
            <span class="writer-name">Writer: {{ article.writer }}</span>
            <span class="editor-name">Editor: {{ article.editor }}</span>
          </div>
        </div>
      </li>
    </ul>

    <!-- Pagination Controls -->
    <div
      v-if="props.articles.length >= props.itemsPerPage"
      class="pagination-controls"
    >
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  btn: String,
  section: String,
  itemsPerPage: String,
  articles: {
    type: Array,
    required: true,
  },
});

const router = useRouter();

const currentPage = ref(1);

const itemsPerPage = computed(() => Number(props.itemsPerPage));
const totalPages = computed(() =>
  Math.ceil(props.articles.length / itemsPerPage.value)
);
const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return props.articles.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};

const showArticle = (id) => {
  router.push(`/article/${id}`);
};

const formatContent = (content) => {
  if (!content) return '';

  let formattedContent = content
    .replace(/<\/?(h[1-6]|u)[^>]*>/gi, '<p>')
    .replace(/<\/(h[1-6]|u)>/gi, '</p>')
    .replace(/\s+/g, ' ');

  formattedContent = formattedContent.replace(
    /<p>(\s|<br\s*\/?>|<[^>]+>\s*<\/[^>]+>)*<\/p>/gi,
    ''
  );

  const words = formattedContent.split(' ');
  if (words.length > 30) {
    formattedContent = words.slice(0, 30).join(' ') + '...';
  }

  return formattedContent;
};
</script>

<style scoped>
.article-list-wrapper {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

header {
  padding: 10px;
  font-size: 1.5em;
  font-weight: bold;
  margin: 0 0 10px 0;
  color: #333;
}

.article-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.article-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  border-radius: 20px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease-in-out;
}

.article-item:hover {
  transition: transform 0.2s ease-in-out;
}

.article-image {
  width: 100%;
  height: auto;
  max-width: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
}

.article-details {
  flex: 1;
  text-align: center;
}

.article-title {
  font-size: 1.5em;
  margin: 0 0 10px 0;
  color: #333;
}

.article-description {
  margin: 0 0 10px 0;
  color: #666;
}

.article-link {
  display: inline-block;
  margin-bottom: 8px;
  color: #1e90ff;
  text-decoration: none;
}

.article-link:hover {
  text-decoration: underline;
}

.article-date {
  font-size: 0.9em;
  color: #999;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.9em;
  color: #666;
}

.writer-name,
.editor-name {
  font-weight: 600;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination-controls button {
  padding: 8px 12px;
  margin: 0 5px;
  background-color: #1e90ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination-controls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination-controls span {
  margin: 0 10px;
}

@media (min-width: 768px) {
  .article-item {
    flex-direction: row;
    align-items: flex-start;
  }

  .article-image {
    width: 150px;
    height: 100px;
    margin-right: 20px;
    margin-bottom: 0;
  }

  .article-details {
    text-align: left;
  }
}
</style>
