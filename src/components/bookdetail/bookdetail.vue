<template>
  <transition name="fade">
    <div class="book-detail" v-show="showFlag" ref="book">
      <div class="book-content">
        <div class="image-header">
          <img :src="book.img" alt="book.title">
          <div class="back" @click="goPrev">
            <span class="icon-arrow_lift"></span>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{book.sub1}}</h1>
          <div class="detail">
            <span class="desc">{{book.tags}}</span>
          </div>
          <div class="time">
            <span class="bytime">{{book.bytime}}</span>
          </div>
          <div class="buy-wrapper">
            <a v-for="(value,key) in seller" class="buy" :href="value">
              {{key}}
            </a>
          </div>
        </div>
        <split></split>
        <div class="info">
          <h1 class="title">书籍介绍</h1>
          <p class="text">{{book.sub2}}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import split from '@/components/split/split'
  import { getBuyUrl } from '@/common/js/util'
  import BScroll from 'better-scroll'

  export default {
    props: {
      book: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false
      }
    },
    computed: {
      seller() {
        return getBuyUrl(this.book.online + '')
      }
    },
    updated() {
      // console.log(this.food)
      this._initBookScroll()
    },
    methods: {
      show() {
        this.showFlag = true
      },
      goPrev() {
        this.showFlag = false
      },
      _initBookScroll() {
        if (!this.bookScroll) {
          this.bookScroll = new BScroll(this.$refs.book, {
            click: true
          })
        } else {
          this.bookScroll.refresh()
        }
      }
    },
    components: {
      split
    }
  }

</script>

<style lang="stylus" scoped>
  @import 'bookdetail.styl'
</style>