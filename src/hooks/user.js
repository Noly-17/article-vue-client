import { useUserStore } from '@/stores/user';

function useUserHook() {
  const { curUser, getFullName, isAuthenticated } = useUserStore();

  return {
    curUser,
    getFullName,
    isAuthenticated,
    type: curUser.type,
    status: curUser.status,
  };
}

export default useUserHook;
