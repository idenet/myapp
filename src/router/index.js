import Vue from 'vue'
import Router from 'vue-router'
import book from '@/view/book/book'
import movie from '@/view/movie/movie'
import wechat from '@/view/wechat/wechat'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/book'
    }, {
      path: '/book',
      component: book
    }, {
      path: '/movie',
      component: movie
    }, {
      path: '/wechat',
      component: wechat
    }
  ]
})
