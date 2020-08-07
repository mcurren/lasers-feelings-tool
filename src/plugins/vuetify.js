import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#5a1078',
        secondary: '#000825',
        accent: '#8BC4FE',
        error: '#d4396f',
        info: '#b13bbf',
        success: '#01a8a5',
        warning: '#fab864',
        failure: '#fab864',
      }
    }
  }
});
