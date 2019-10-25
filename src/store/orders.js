import * as fb from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

class Order {
  constructor(name, phone, adId, done = false, id = null) {
    this.name = name;
    this.phone = phone;
    this.adId = adId;
    this.done = done;
    this.id = id;
  }
}

export default {
  state: {
    orders: []
  },
  mutations: {
    loadOrders(state, payload) {
      state.orders = payload;
    }
  },
  actions: {
    async createOrder({commit}, {name, phone, adId, ownerId}) {
      const order = new Order(name, phone, adId);
      commit('clearError');

      try {
        await fb.database().ref(`/users/${ownerId}/orders/`).push(order)
      } catch(error) {
        commit('setError', error.message);
        throw error;
      }
    },

    async fetchOrders({commit, getters}) {
      commit('setLoading', true);
      commit('clearError');

      try {
        const fbVal = await fb.database().ref(`/users/${getters.user.id}/orders`).once('value');
        const orders = fbVal.val();

        const result = Object.keys(orders).reduce((acc, key) => {
          const order = orders[key];
          acc.push(new Order(order.name, order.phone, order.adId, order.done, key));
          return acc;
        }, [])

        commit('loadOrders', result);

        commit('setLoading', false);
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error.message);
      }
    },

    async markOrderDone({commit, getters}, payload) {
      commit('clearError');
      try {
        await fb.database().ref(`/users/${getters.user.id}/orders`).child(payload).update({
          done: true
        })
      } catch(error) {
        commit('setError', error.message);
        throw error;
      }
    }
  },
  getters: {
    doneOrders(state) {
      return state.orders.filter(o => o.done);
    },
    undoneOrders(state) {
        return state.orders.filter(o => !o.done);
    },
    orders(state, getters) {
      return getters.undoneOrders.concat(getters.doneOrders);
    }
  }
}
