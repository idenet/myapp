import * as types from '../types.js'
import {fetchCatelogByType, fetchBookList} from '../api'

const state = {
  catelog: [],
  bookList: {
    data: [],
    totalNum: 0
  },
  book: {},
  cateId: 242, // 代表获取id为242的所有书籍
  showLoading: false
}

const actions = {
  async [types.FETCH_CATEGORY](context, payload) {
    // fetchCatelogByType(payload.type).then(data => {   return
    // context.commit(types.FETCH_CATEGORY, data) }) 因为
    // 本身返回的就是一个promise，那么就可以使用await
    let data = await fetchCatelogByType(payload.type)
    context.commit(types.FETCH_CATEGORY, data)
  },
  async [types.FETCH_BOOK_LIST](context, payload) {
    let data = await fetchBookList(payload.type, payload.id, payload.pn)
    context.commit(types.FETCH_BOOK_LIST, data)
  },
  [types.GET_CATEID](context, status) {
    context.commit(types.GET_CATEID, status)
  },
  [types.CLEAN_CATEGORY](context) {
    context.commit(types.CLEAN_CATEGORY)
  },
  [types.CLEAN_BOOK_LIST](context) {
    context.commit(types.CLEAN_BOOK_LIST)
  },
  [types.CLEAR_BOOK_LIST](context) {
    context.commit(types.CLEAR_BOOK_LIST)
  },
  [types.TOOGLE_LOADING](context, status) {
    context.commit(types.TOOGLE_LOADING, status)
  }
}

const mutations = {
  [types.FETCH_CATEGORY](state, obj) {
    state.catelog = obj
  },
  [types.FETCH_BOOK_LIST](state, obj) {
    state.bookList.totalNum = obj.totalNum
    state.bookList.data = state
      .bookList
      .data
      .concat(obj.data)
    if (state.bookList.data.length < state.bookList.totalNum) {
      state.showLoading = false
    }
  },
  [types.GET_CATEID](state, status) {
    state.cateId = status
  },
  [types.CLEAN_CATEGORY](state) {
    state.catelog = []
  },
  [types.CLEAN_BOOK_LIST](state) {
    state.bookList = {}
    state.cateId = undefined
  },
  [types.CLEAR_BOOK_LIST](state) {
    state.bookList = {
      data: [],
      totalNum: 0
    }
    state.cateId = 242
  },
  // loding
  [types.TOOGLE_LOADING](state, status) {
    state.showLoading = status
  }
}

const getters = {
  fetchCategory: state => state.catelog,
  fetchBookList: state => state.bookList,
  showLoading: state => state.showLoading,
  cateId: state => state.cateId
}

export default {
  state,
  mutations,
  actions,
  getters
}