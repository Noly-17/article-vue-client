import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    curUser: {
      id: '',
      email: '',
      first_name: '',
      last_name: '',
      username: '',
      type: '',
      status: '',
      accessToken: '',
    },
    isAuthenticated: false,
    isLoading: false,
    message: '',
  }),

  actions: {
    setUser(userData) {
      this.curUser.id = userData.id || '';
      this.curUser.email = userData.email || '';
      this.curUser.first_name = userData.first_name || '';
      this.curUser.last_name = userData.last_name || '';
      this.curUser.username = userData.username || '';
      this.curUser.type = userData.type || '';
      this.curUser.status = userData.status || '';
      this.curUser.accessToken = userData.accessToken || '';
    },
    setLoading(isLoading) {
      this.isLoading = isLoading;
    },
    setAuthenticated(isAuthenticated) {
      this.isAuthenticated = isAuthenticated;
    },
    setMessage(message) {
      this.message = message;
    },
    reset() {
      this.curUser = {
        id: '',
        email: '',
        first_name: '',
        last_name: '',
        username: '',
        type: '',
        status: '',
        accessToken: '',
      };
    },
  },

  getters: {
    getFullName: (state) =>
      `${state.curUser.first_name} ${state.curUser.last_name}`,
    getCurUser: (state) => state.curUser,
  },

  persist: true,
});
