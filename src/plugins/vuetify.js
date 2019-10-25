import Vue from 'vue'
import Vuetify from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'

import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify)


export default new Vuetify({
    icons: {
        iconfont: 'mdi', // default - only for display purposes
    },
    theme: {
          themes: {
                  light: {
                            primary: colors.purple.darken1, // #E53935
                            secondary: colors.pink.darken2, // #FFCDD2
                            accent: colors.teal.base, // #3F51B5
                          },
                },
        },
})
