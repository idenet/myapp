import Vue from 'vue'
import Vuex from 'vuex'
import book from './modules/book.js'
import movie from './modules/movie.js'
import weixin from './modules/weixin.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    book,
    movie,
    weixin
  }
})