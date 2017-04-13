// import axios from 'axios'
// import store from '@/store/store' 使用代理 const HOST = '/api/' 开发用代理host
import { category } from '../tempData/category'
import { booklist } from '../tempData/booklist'
import { movie } from '../tempData/movie'
import { weixin } from '../tempData/weixin'
/**
 * 获取数据
 *
 * @export
 * @param {any} url
 * @returns
 */
export function fetch(data) {
  return new Promise((resolve, reject) => {
    resolve(data)
  })
}

export function fetchCatelogByType() {
  return fetch(category)
}

export function fetchBookList() {
  return fetch(booklist)
}

export function fetchMovieListByCity() {
  return fetch(movie)
}

export function fetchWeixinListByPage() {
  return fetch(weixin)
}

