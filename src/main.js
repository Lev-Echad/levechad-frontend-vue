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

Vue.prototype.moment = moment
moment.locale(); 
Vue.config.productionTip = false
store.dispatch('checkToken')



store.dispatch('getGoogleAPIkey').then(res=>{
  Vue.use(VueGoogleMaps, {
    load: {
      key: res, // stav is genius 
      libraries: 'places', // This is required if you use the Autocomplete plugin
      // OR: libraries: 'places,drawing'
      // OR: libraries: 'places,drawing,visualization'
      // (as you require)
   
      //// If you want to set the version, you can do so:
      // v: '3.26',
      region: 'IL',
      language: 'he',
    },
  
    //// If you intend to programmatically custom event listener code
    //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
    //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
    //// you might need to turn this on.
    // autobindAllEvents: false,
   
    //// If you want to manually install components, e.g.
    //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
    //// Vue.component('GmapMarker', GmapMarker)
    //// then disable the following:
    // installComponents: true,
  })
})





new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
