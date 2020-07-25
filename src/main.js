import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/base'
import './plugins/chartist'
import vPlayBack from 'v-playback';
Vue.use(vPlayBack);
import vuetify from './plugins/vuetify';
import * as VueGoogleMaps from 'vue2-google-maps'
import moment from 'moment'
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)

Vue.prototype.moment = moment
moment.locale(); 
Vue.config.productionTip = false

store.dispatch('checkToken2').then((isLogged)=>{
  let mapLoad = store.dispatch('getGoogleAPIkey').then(res=>{
    Vue.use(VueGoogleMaps, {
      load: {
        key: res, // stav is genius
        libraries: 'places', // This is required if you use the Autocomplete plugin
        region: 'IL',
        language: 'he',
      },
    })
  })
}).catch((isLogged)=>{

}).finally(()=>{
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')

})







