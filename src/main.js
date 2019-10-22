import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import * as fb from 'firebase/app';
import 'firebase/auth';

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
  created() {
    const firebaseConfig = {
      apiKey:'AIzaSyC63X37miRifnB91-dp7hBgYnlhf-hlN18',
      authDomain: 'ad-product-92fe8.firebaseapp.com',
      databaseURL: 'ad-product-92fe8.firebaseio.com',
      projectId: 'ad-product-92fe8',
      storageBucket: 'ad-product-92fe8.appspot.com',
      messagingSenderId: '382054686261',
      appId: '1:382054686261:web:606b426d7ae482d4f45b7c'
    };

    fb.initializeApp(firebaseConfig);

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user);
      }
    });
  }
}).$mount('#app')
