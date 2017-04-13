import * as types from '../types.js'
import {fetchWeixinListByPage} from '../api'

const state = {
  weixinList: {
    list: [],
    totalPage: 0,
    ps: 0,
    pno: 0
  }
}

const actions = {
  async [types.FETCH_WEIXIN_LIST](ctx) {
    let data = await fetchWeixinListByPage()
    ctx.commit(types.FETCH_WEIXIN_LIST, data)
  },
  [types.CLEAN_MOVIE_LIST](ctx) {
    ctx.commit(types.CLEAN_MOVIE_LIST)
  },
  [types.TOOGLE_LOADING](context, status) {
    context.commit(types.TOOGLE_LOADING, status)
  },
  [types.NEXT_PAGE](ctx) {
    ctx.commit(types.NEXT_PAGE)
  }
}

const mutations = {
  [types.FETCH_WEIXIN_LIST](state, data) {
    let weixin = data.result
    state.weixinList.list = weixin.list
    state.weixinList.totalPage = weixin.totalPage
    state.weixinList.ps = weixin.ps
    state.weixinList.pno = weixin.pno
  },
  [types.CLEAN_MOVIE_LIST](state) {
    state.weixinList = {
      list: [],
      totalPage: 0,
      ps: 0,
      pno: 0
    }
  }
}

const getters = {
  fetchWeixinList: state => state.weixinList
}

export default {
  state,
  mutations,
  actions,
  getters
}