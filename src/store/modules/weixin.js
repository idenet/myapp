import * as types from '../types.js'
import {fetchWeixinListByPage} from '../api'

const state = {
  weixinList: {
    list: [],
    totalPage: 0,
    ps: 0,
    pno: 0
  },
  busy: false,
  page: 0
}

const actions = {
  async [types.FETCH_WEIXIN_LIST](ctx, payload) {
    let data = await fetchWeixinListByPage(payload.pno)
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
    state.weixinList.list = state
      .weixinList
      .list
      .concat(weixin.list)
    state.weixinList.totalPage = weixin.totalPage
    state.weixinList.ps = weixin.ps
    state.weixinList.pno = weixin.pno
    // 因为数量过于巨大
    if (state.weixinList.list.length < 200) {
      state.busy = false
    }
  },
  [types.CLEAN_MOVIE_LIST](state) {
    state.weixinList = {
      list: [],
      totalPage: 0,
      ps: 0,
      pno: 0
    }
  },
  [types.TOOGLE_LOADING](state, status) {
    state.busy = status
  },
  [types.NEXT_PAGE](state) {
    state.page = state.page + 1
  }
}

const getters = {
  fetchWeixinList: state => state.weixinList,
  busy: state => state.busy,
  nextPage: state => state.page
}

export default {
  state,
  mutations,
  actions,
  getters
}