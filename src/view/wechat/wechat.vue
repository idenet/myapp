<template>
  <div class="wechat" ref="weixin">
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
  import BScroll from 'better-scroll'

  export default {
    computed: {
      ...mapGetters({
        weixinList: 'fetchWeixinList'
      })
    },
    created() {
      this.loadMore()
    },
    activated() {
      this._initListScroll()
    },
    updated() {
      this._initListScroll()
    },
    methods: {
      ...mapActions([types.FETCH_WEIXIN_LIST]),
      loadMore() {
        this[types.FETCH_WEIXIN_LIST]()
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
    }
  }

</script>

<style lang="stylus" scoped>
  @import 'wechat.styl'
</style>