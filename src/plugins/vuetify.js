import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import he from 'vuetify/es5/locale/he';

Vue.use(Vuetify);

export default new Vuetify({
    rtl: true,
    lang: {
      locales: { he },
      current: 'he',
    },
    theme: {
      themes: {
        light: {
          primary: "#f44336",
          // secondary: #607d8b,
          // accent: #03a9f4,
          // error: #ffeb3b,
          // warning: #ffc107,
          // info: #2196f3,
          // success: #4caf50
          },
      },
    },
});
