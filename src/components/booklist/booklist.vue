<template>
  <div>
    <div class="booklist-wrapper" ref="bookList" v-show="!loading" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
      infinite-scroll-distance="10">
      <ul>
        <li v-for="(item,index) in bookList.data" @click="selectBook(item,$event)" :key="index">
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
    <bookdetail :book="bookSelected" ref="bookDetail"></bookdetail>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as types from '@/store/types'
  import InfiniteScroll from 'vue-infinite-scroll'
  import BScroll from 'better-scroll'
  import spinner from '@/components/spinner/spinner'
  import bookdetail from '@/components/bookdetail/bookdetail'

  export default {
    data() {
      return {
        bookSelected: {}
      }
    },
    computed: {
      ...mapGetters({
        bookList: 'fetchBookList',
        id: 'cateId',
        busy: 'showLoading'
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
        this.loadMore()
      }
    },
    updated() {
      this._initBookScroll()
      /* 上拉刷新 下拉无限刷新算事完成了吗？完全没有延迟
      this.bookScroll.on('touchend', pos => {
        console.log(pos.y)
      }) */
      // console.log(this.bookScroll.scrollEnd())
    },
    methods: {
      ...mapActions([types.FETCH_BOOK_LIST, types.CLEAN_BOOK_LIST, types.TOOGLE_LOADING]),
      selectBook(item, event) {
        if (!event._constructed) {
          return
        }
        this.bookSelected = item
        this.$refs.bookDetail.show()
      },
      loadMore() {
        this[types.TOOGLE_LOADING](true)
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
            probeType: 3,
            click: true
          })
          // this.bookScroll.on('scrollEnd', () => {
          //   console.log(1)
          // })
        } else {
          this.bookScroll.refresh()
        }
      }
    },
    components: {
      spinner,
      bookdetail
    },
    directives: {
      InfiniteScroll
    }
  }

</script>

<style lang="stylus">
  @import 'booklist.styl'
</style>