<template>
  <div class="dashboard-container">
    <div class="dashboard-content">
      <div class="article-content-wrapper">
        <ArticleContent section="PUBLISHED" :articles="article" />
      </div>
      <div
        v-if="status === 'For Edit' || type === 'editor'"
        class="article-list-wrapper"
      >
        <ArticleForm
          :onSubmit="handleEditArticle"
          :onPublish="handlePublish"
          :type="type"
          formTitle="EDIT ARTICLE"
          btn="SAVE"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ArticleContent from '@/components/ArticleContent.vue';
import ArticleForm from '@/components/ArticleForm.vue';
import useArticleHook from '@/hooks/articles';
import useUserHook from '@/hooks/user';

const route = useRoute();
const router = useRouter();

const { getArticle, editArticle, publishArticle } = useArticleHook();
const { getFullName, type, curUser } = useUserHook();
const article = ref({});
const status = ref('');

onMounted(async () => {
  article.value = await getArticle(route.params.id);
  status.value = article.value.status;
});

const handleEditArticle = async ({ formData, file }) => {
  try {
    const newData = {
      id: route.params.id,
      editor: getFullName,
      image: file,
      ...formData,
    };
    const newArticle = await editArticle(newData, curUser.accessToken);
    article.value = newArticle;
  } catch (error) {
    console.error('Failed to submit form data or upload image', error);
  }
};

const handlePublish = async () => {
  await publishArticle(route.params.id, getFullName, curUser.accessToken);
  router.push('/dashboard');
};
</script>

<style>
.dashboard-container {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 10px;
}

.user-info p {
  margin-right: 15px;
  font-size: 16px;
  color: #333;
}

.logout-btn {
  padding: 8px 16px;
  background-color: #ff5a5f;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #e14b4f;
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

.article-content-wrapper {
  flex-grow: 1;
  width: 60%;
  flex-shrink: 0;
}

.article-list-wrapper {
  flex-grow: 1;
  overflow: auto;
}

@media (max-width: 768px) {
  .dashboard-content {
    flex-direction: column;
  }

  .article-content-wrapper {
    width: unset;
  }
}
</style>
