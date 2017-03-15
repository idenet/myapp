import axios from 'axios'
import {BOOK_KEY, MOVIE_KEY, WEIXIN_KEY} from '@/config/key.js'
// import store from '@/store/store' 使用代理
const HOST = '/api/'

export const API_TYPE = {
  book: {
    catalog: 'catalog',
    query: 'query'
  },
  movie: {
    pmovie: 'pmovie',
    video: 'video'
  },
  weixin: {
    query: 'query'
  }
}

/**
 * 获取数据
 *
 * @export
 * @param {any} url
 * @returns
 */
export function fetch(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(HOST + url)
      .then(response => {
        resolve(response.data)
      })
  })
}
// 没有作用？ export function fetchItemByType(type) {   return fetch(`${type}`) }
// book api
export function fetchCatelogByType(type, dtype = 'json', key = BOOK_KEY) {
  return fetch(`goodbook/${type}?dtype=${dtype}&key=${key}`)
}

export function fetchBookList(type, id, pn = 0, rn = 10, dtype = 'json', key = BOOK_KEY) {
  return fetch(`goodbook/${type}?catalog_id=${id}&pn=${pn}&rn=${rn}&dtype=${dtype}&key=${key}`)
}

// movie api
export function fetchMovieListByCity(type, dtype = 'json', city = '宁波', key = MOVIE_KEY) {
  let url = encodeURI(`onebox/movie/${type}?dtype=${dtype}&city=${city}&key=${key}`)
  return fetch(url)
}
// weixin api
export function fetchWeixinListByPage(type, pno = 1, ps = 10, dtype = 'json', key = WEIXIN_KEY) {
  return fetch(`weixin/${type}?pno=${pno}&ps=${ps}&dtype=${dtype}&key=${key}`)
}

// 聚合翔一样的api这个功能只能替换了
// export function fetchMovieDetailByName(type, dtype = 'json', queryName, key = MOVIE_KEY) {
//   let url = encodeURI(`onebox/movie/${type}?dtype=${dtype}&q=${queryName}&key=${key}`)
//   return fetch(url)
// }