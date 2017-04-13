import * as types from '../types.js'
import {fetchCatelogByType, fetchBookList} from '../api'

const state = {
  catelog: [],
  bookList: {
    data: [],
    totalNum: 0
  },
  book: {},
  cateId: 242 // 代表获取id为242的所有书籍
}

const actions = {
  async [types.FETCH_CATEGORY](context) {
    let data = await fetchCatelogByType()
    context.commit(types.FETCH_CATEGORY, data)
  },
  async [types.FETCH_BOOK_LIST](context) {
    let data = {}
    let Totaldata = await fetchBookList()
    for (let v of Totaldata) {
     if (v.id === state.cateId) {
        data = v.result
     }
    }
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
  }
}

const mutations = {
  [types.FETCH_CATEGORY](state, obj) {
    state.catelog = obj.result
  },
  [types.FETCH_BOOK_LIST](state, obj) {
    state.bookList.totalNum = obj.totalNum
    state.bookList.data = obj.data
  },
  [types.GET_CATEID](state, status) {
    state.cateId = parseInt(status)
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
  }
}

const getters = {
  fetchCategory: state => state.catelog,
  fetchBookList: state => state.bookList,
  cateId: state => state.cateId
}

export default {
  state,
  mutations,
  actions,
  getters
}