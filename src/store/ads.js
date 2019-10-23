import * as fb from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';


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
                ads: []

  },
  mutations: {
    createAd(state, payload) {
      state.ads.push(payload);
    },
    loadAds(state, payload) {
      state.ads = payload;
    }
  },
  actions: {
    async createAd({commit, getters}, payload) {
      commit('clearError');
      commit('setLoading', true);

      const image = payload.image;

      try {
        const newAd = new Ad(payload.title, payload.description, getters.user.id, '', payload.promo);

        const ad = await fb.database().ref('ads').push(newAd);
        const imageExt = image.name.slice(image.name.lastIndexOf('.') + 1);
        const fileData = await fb.storage().ref(`ads/${ad.key}.${imageExt}`).put(image);
        const imageSrc = await fileData.ref.getDownloadURL();
        await fb.database().ref('ads').child(ad.key).update({
          imageSrc 
        })

        commit('createAd', {
          ...newAd,
          id: ad.key,
          imageSrc,
        });
        commit('setLoading', false);
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
        throw error;
      }
    },

    async fetchAds({ commit }) {
      commit('clearError');
      commit('setLoading', true);

      try {
        const fbValue = await fb.database().ref('ads').once('value');
        const ads = fbValue.val();
        const resultAds = Object.keys(ads).reduce((acc, key) => {
          const ad = ads[key];
          acc.push(new Ad(ad.title, ad.description, ad.ownerId, ad.imageSrc, ad.promo, key));
          return acc;
        }, []);
        commit('loadAds', resultAds);
        commit('setLoading', false);
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
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
