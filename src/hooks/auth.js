import { useUserStore } from '@/stores/user';
import { useArticleStore } from '@/stores/article';
import { POST } from '@/services/axios';

function useAuthHook() {
  const userStore = useUserStore();
  const articleStore = useArticleStore();

  const {
    setUser,
    setLoading,
    isLoading,
    setMessage,
    message,
    setAuthenticated,
  } = userStore;

  const register = async (data) => {
    setLoading(true);
    const response = await POST('/sign-up', data);
    setMessage(response.message);
    setLoading(false);
  };

  const login = async (email, password) => {
    setLoading(true);
    const response = await POST('/sign-in', { email, password });
    localStorage.setItem('accessToken', response.user.accessToken);
    setUser(response.user);
    setMessage(response.message);
    setAuthenticated(true);
    setLoading(false);
  };

  const logout = () => {
    setLoading(true);
    articleStore.reset();
    userStore.reset();
    localStorage.removeItem('accessToken');
    setAuthenticated(false);
    setLoading(false);
  };

  return { register, login, logout, message, isLoading };
}

export default useAuthHook;
