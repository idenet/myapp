// The Vue build version to load with the `import` command (runtime-only or
// standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { sync } from 'vuex-router-sync'
import axios from 'axios'
import store from '@/store/store'
import '@/common/stylus/index.styl'

sync(store, router) // 将state和route保持同步

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  template: '<App/>',
  components: {
    App
  }
})
