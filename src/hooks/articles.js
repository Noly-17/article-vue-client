import { useArticleStore } from '@/stores/article';
import { GET, POST, PUT } from '@/services/axios';
import { computed } from 'vue';

function useArticleHook() {
  const store = useArticleStore();
  const { setArticles, setLoading, getArticleById, updateArticle, addArticle } =
    useArticleStore();

  const loadArticles = async (accessToken) => {
    setLoading(true);
    try {
      const response = await GET('/articles', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setArticles(response.articles);
    } catch (error) {
      console.error('Failed to load articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const getArticle = (id) => {
    const article = getArticleById(id);
    return article;
  };

  const postArticle = async (data, accessToken) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', data.image);
      formData.append('title', data.title);
      formData.append('link', data.link);
      formData.append('type', data.type);
      formData.append('status', data.status || 'For Edit');
      formData.append('writer', data.writer);
      formData.append('content', data.content);
      formData.append('company', data.company);
      formData.append('date', data.date);

      const publishArticle = await POST('/articles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      addArticle(publishArticle.article);
    } catch (error) {
      console.error('Failed to add articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const editArticle = async (data, accessToken) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', data.image);
      formData.append('title', data.title);
      formData.append('link', data.link);
      formData.append('type', data.type);
      formData.append('status', data.status || 'For Edit');
      formData.append('writer', data.writer);
      formData.append('editor', data.editor);
      formData.append('content', data.content);
      formData.append('company', data.company);
      formData.append('date', data.date);

      const article = await PUT(`/articles/${data.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      updateArticle(article.updatedArticle);
      return article.updatedArticle;
    } catch (error) {
      console.error('Failed to update article:', error);
    } finally {
      setLoading(false);
    }
  };

  const publishArticle = async (id, editor, accessToken) => {
    const article = await PUT(`/articles/publish/${id}`, editor, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    updateArticle(article.updatedArticle);
  };

  return {
    loadArticles,
    getArticle,
    postArticle,
    editArticle,
    publishArticle,
    all_articles: store.articles,
    edit_articles: computed(() =>
      store.articles.filter((article) => article.status === 'For Edit')
    ),
    published_articles: computed(() =>
      store.articles.filter((article) => article.status === 'Published')
    ),
    isLoading: computed(() => store.isLoading),
  };
}

export default useArticleHook;
