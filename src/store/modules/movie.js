import * as types from '../types.js'
import {fetchMovieListByCity} from '../api'

const state = {
  movieList: {
    title: '',
    morelink: '',
    date: '',
    data: []
  }
  // movieDetail: {}
}

const actions = {
  async [types.FETCH_MOVIE_LIST](ctx, payload) {
    let data = await fetchMovieListByCity(payload.city)
    ctx.commit(types.FETCH_MOVIE_LIST, data)
  },
  // 因api查询不好用这个功能不做了
  // async [types.FETCH_MOVIE_DETAIL](ctx, payload) {
  //   let data = await fetchMovieDetailByName(payload.type, payload.queryName)
  //   console.log(data)
  //   ctx.commit(types.FETCH_MOVIE_DETAIL, data)
  // },
  [types.CLEAN_MOVIE_LIST](ctx) {
    ctx.commit(types.CLEAN_MOVIE_LIST)
  }
  // [types.CLEAN_MOVIE_DETAIL](ctx) {
  //   ctx.commit(types.CLEAN_MOVIE_DETAIL)
  // }
}

const mutations = {
  [types.FETCH_MOVIE_LIST](state, data) {
    let movies = data.result
    state.movieList.title = movies.title
    state.movieList.morelink = movies.morelink
    state.movieList.date = movies.date
    state.movieList.data = movies.data
  },

  [types.CLEAN_MOVIE_LIST](state) {
    state.movieList = {
      title: '',
      moreLink: '',
      date: '',
      data: []
    }
  }
}

const getters = {
  fetchMovieList: state => state.movieList
  // fetchMovieDetail: state => state.movieDetail
}

export default {
  state,
  mutations,
  actions,
  getters
}