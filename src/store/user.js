import * as fb from 'firebase/app';
import 'firebase/auth';

class User {
  constructor(id) {
    this.id = id;
  }
}

export default {
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    async registerUser({ commit }, { email, password }) {
      commit('clearError');
      commit('setLoading', true);
      try {
        const user = await fb.auth().createUserWithEmailAndPassword(email, password);
        commit('setUser', new User(user.id));
        commit('setLoading', false);
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
        throw error;
      }
    }
  },
  getters: {
    user(state) {
      return state.user;
    }
  }
}
