import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import * as firebase from 'firebase';

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
      databaseURL: 'https:ad-product-92fe8.firebaseio.com',
      projectId: 'ad-product-92fe8',
      storageBucket: 'ad-product-92fe8.appspot.com',
      messagingSenderId: '382054686261',
      appId: '1:382054686261:web:606b426d7ae482d4f45b7c'
    };

    firebase.initializeApp(firebaseConfig);
  }
}).$mount('#app')
