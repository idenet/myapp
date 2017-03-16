import axios from 'axios'
// import store from '@/store/store' 使用代理 const HOST = '/api/' 开发用代理host
const HOST = 'http://192.168.1.101:3000/api/'

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

export function fetchCatelogByType() {
  return fetch('bookCategory')
}

export function fetchBookList(id, pn = 0) {
  return fetch(`bookList/${id}/${pn}`)
}

export function fetchMovieListByCity(city = '宁波') {
  let url = encodeURI(`movieList/${city}`)
  return fetch(url)
}

export function fetchWeixinListByPage(pno = 1) {
  return fetch(`weixinList/${pno}`)
}

