import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import es from 'vuetify/es5/locale/es';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#366786',
                secondary: '#85e44b',
                accent: '#c1f2a3',
                error: '#b71c1c',
            },
        },
      },    
    lang: {
        locales: { es },
        current: 'es',
    },
    locales: { es },
    current: 'es',
});
