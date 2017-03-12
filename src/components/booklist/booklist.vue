<template>
  <div>
    <div class="booklist-wrapper" ref="bookList" v-show="!loading">
      <ul>
        <li v-for="(item,index) in bookList.data" :key="index">
          <h1 class="title">{{item.title}}</h1>
          <div class="book-item">
            <div class="item-left">
              <div class="icon">
                <img :src="item.img" :alt="item.title" width="170" height="170">
              </div>
            </div>
            <div class="item-right">
              <div class="sub1">
                <span>{{item.sub1}}</span>
              </div>
              <div class="tag">
                <span>{{item.tags}}</span>
              </div>
              <div class="other">
                <div class="catalog">
                  <span>{{item.catalog}}</span>
                </div>
                <div class="read">
                  <span>{{item.reading}}</span>
                  <span class="time">{{item.bytime}}</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <spinner v-show="loading" class="spinner"></spinner>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import { mapGetters, mapActions } from 'vuex'
  import * as types from '@/store/types'
  import spinner from '@/components/spinner/spinner'

  export default {
    data() {
      return {
        num: {
          type: Number,
          default: 0
        }
      }
    },
    computed: {
      ...mapGetters({
        bookList: 'fetchBookList',
        id: 'cateId'
      }),
      loading() {
        if (this.bookList.data.length === 0) {
          return true
        } else {
          return false
        }
      }
    },
    watch: {
      'id'() {
        this._getBookData()
      }
    },
    created() {
      this._getBookData()
    },
    updated() {
      this._initBookScroll()
    },
    destroyed() {
      if (this.bookList) {
        this[types.CLEAN_BOOK_LIST]()
      }
    },
    methods: {
      ...mapActions([types.FETCH_BOOK_LIST, types.CLEAN_BOOK_LIST, types.TOOGLE_LOADING]),
      _getBookData() {
        let start = this.bookList.data.length
        this[types.FETCH_BOOK_LIST]({
          type: 'query',
          id: this.id,
          pn: start
        })
      },
      _initBookScroll() {
        if (!this.bookScroll) {
          this.bookScroll = new BScroll(this.$refs.bookList, {
            click: true
          })
        } else {
          this.bookScroll.refresh()
          this.bookScroll.scrollTo(0, 0)
        }
      }
    },
    components: {
      spinner
    }
  }

</script>

<style lang="stylus">
  @import 'booklist.styl'
</style>