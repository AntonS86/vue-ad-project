import * as fb from 'firebase/app';
import 'firebase/database';


class Ad {
  constructor(title, description, ownerId, imageSrc = '', promo = false, id = null) {
     this.title = title;
     this.description = description;
     this.ownerId = ownerId;
     this.imageSrc = imageSrc;
     this.promo = promo;
     this.id = id;
  }
}

export default {
  state: {
                ads: [
                    { title: 'First ad', description:
                    'lorem lorem lorem', promo: false, imageSrc:
                    'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
                    id: '1'}, { title: 'Second ad', description:
                    'lorem lorem lorem', promo: true, imageSrc:
                    'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
                    id: '2'}, { title: 'Third ad', description:
                    'lorem lorem lorem', promo: true, imageSrc:
                    'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
                    id: '3'},
                ]

  },
  mutations: {
    createAd(state, payload) {
      state.ads.push(payload);
    }
  },
  actions: {
    async createAd({commit, getters}, payload) {
      commit('clearError');
      commit('setLoading', true);

      try {
        const newAd = new Ad(payload.title, payload.description, getters.user.id, payload.imageSrc, payload.promo);
        const ad = await fb.database().ref('ads').push(newAd);
        commit('createAd', {
          ...newAd,
          id: ad.key
        });
        commit('setLoading', false);
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
        throw error;
      }
    }
  },
  getters: {
    ads(state) {
      return state.ads;
    },
    promoAds(state) {
      return state.ads.filter((ad) => {
        return ad.promo;
      })
    },
    myAds(state) {
      return state.ads;
    },
    adById(state) {
      return (adId) => {
        return state.ads.find((ad) => ad.id === adId);
      }
    }
  }
}
