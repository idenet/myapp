import axios from 'axios'
import {APP_KEY} from '@/config/key.js'
// import store from '@/store/store' 使用代理
const HOST = '/api/'

export const API_TYPE = {
  book: {
    catalog: 'catalog',
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
        resolve(response.data.result)
      })
  })
}
// 没有作用？
export function fetchItemByType(type) {
  return fetch(`${type}`)
}

export function fetchCatelogByType(type, dtype = 'json', key = APP_KEY) {
  return fetchItemByType(`goodbook/${type}?dtype=${dtype}&key=${key}`)
}

export function fetchBookList(type, id, pn = 0, rn = 30, dtype = 'json', key = APP_KEY) {
  return fetch(`goodbook/${type}?catalog_id=${id}&pn=${pn}&rn=${rn}&dtype=${dtype}&key=${key}`)
}