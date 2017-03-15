<template>
  <div class="wechat" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" ref="weixin">
    <div class="wechat-wrapper">
      <div class="wechat-title">
        <h1>微信精选</h1>
      </div>
      <ul>
        <li v-for="(item,index) in weixinList.list" class="item">
          <h1 class="title">{{item.title}}</h1>
          <div class="icon">
            <img :src="item.firstImg" :alt="item.title" width="300" height="180">
          </div>
          <div class="mark">
            <a :href="item.url" class="name">{{item.source}}</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as types from '@/store/types'
  import { API_TYPE } from '@/store/api.js'
  import InfiniteScroll from 'vue-infinite-scroll'
  import BScroll from 'better-scroll'

  export default {
    computed: {
      ...mapGetters({
        weixinList: 'fetchWeixinList',
        busy: 'busy',
        page: 'nextPage'
      })
    },
    created() {
      console.log(this.page)
    },
    updated() {
      this._initListScroll()
    },
    methods: {
      ...mapActions([types.FETCH_WEIXIN_LIST, types.TOOGLE_LOADING, types.NEXT_PAGE]),
      loadMore() {
        this[types.NEXT_PAGE]()
        this[types.FETCH_WEIXIN_LIST]({
          type: API_TYPE.weixin.query,
          pno: this.page
        })
        this[types.TOOGLE_LOADING](true)
      },
      _initListScroll() {
        if (!this.listScroll) {
          this.listScroll = new BScroll(this.$refs.weixin, {
            click: true
          })
        } else {
          this.listScroll.refresh()
        }
      }
    },
    directives: {
      InfiniteScroll
    }
  }

</script>

<style lang="stylus" scoped>
  @import 'wechat.styl'
</style>