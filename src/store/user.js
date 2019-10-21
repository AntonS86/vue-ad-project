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
        const userCredential = await fb.auth().createUserWithEmailAndPassword(email, password);
        commit('setUser', new User(userCredential.user.uid));
        commit('setLoading', false);
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
        throw error;
      }
    },

    async loginUser({ commit }, { email, password }) {
      commit('clearError');
      commit('setLoading', true);
      try {
        const userCredential = await fb.auth().signInWithEmailAndPassword(email, password);
        commit('setUser', new User(userCredential.user.uid));
        commit('setLoading', false);
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
        throw error;
      }
    },

    autoLoginUser({ commit }, payload) {
      commit('setUser', new User(payload.uid));
    },

    logoutUser({ commit }) {
      fb.auth().signOut();
      commit('setUser', null);
    }
  },

  getters: {
    user(state) {
      return state.user;
    },

    isUserLoggedIn(state) {
      return state.user !== null;
    }
  }
}
