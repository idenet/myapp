<template>
  <div>
    <div class="book">
      <div class="category-wrapper border-1px">
        <div class="content-wrapper" ref="category">
          <ul class="category-list" ref="categoryList" v-show="!listShow">
            <li class="item" v-for="(item,index) in category" ref="categoryItem" :class="{'current':currentIndex===index}" @click="categoryToList(index, item.id, $event, 0)">
              <span class="text">{{item.catalog}}</span>
            </li>
          </ul>
          <span class="text" v-show="listShow">选择分类</span>
        </div>
        <div class="category-button" @click="toggleList">
          <span :class="[listShow?'icon-circle-up':'icon-circle-down']"></span>
        </div>
      </div>
      <transition name="fold">
        <div class="detail-wrapper border-1px" v-show="listShow" ref="detail">
          <ul class="category-list">
            <li class="item" v-for="(item,index) in category" :class="{'current':currentIndex===index}" @click="categoryToList(index, item.id, $event, 1)">
              <span class="text">{{item.catalog}}</span>
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hide"></div>
    </transition>
    <booklist></booklist>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import { mapGetters, mapActions } from 'vuex'
  import * as types from '@/store/types'
  import booklist from '@/components/booklist/booklist'

  export default {
    data() {
      return {
        currentIndex: {
          type: Number
        },
        showCategory: false
      }
    },
    computed: {
      ...mapGetters({
        category: 'fetchCategory'
      }),
      currentIndex() {
        if (this.currentIndex === 0) {
          return 0
        }
        return this.currentIndex
      },
      listShow() {
        let show = this.showCategory
        return show
      }
    },
    created() {
      this.currentIndex = 0
      this[types.FETCH_CATEGORY]()
    },
    updated() {
      this._initScroll()
      this._initListScroll()
    },
    methods: {
      ...mapActions([types.FETCH_CATEGORY, types.CLEAN_CATEGORY, types.GET_CATEID, types.CLEAR_BOOK_LIST]),
      categoryToList(index, id, event, flag) {
        // 过滤非自定义事件
        if (!event._constructed) {
          return
        }
        if (flag) {
          this.showCategory = false
        }
        this.currentIndex = index
        this[types.CLEAR_BOOK_LIST]()
        this[types.GET_CATEID](id)
      },
      hide() {
        this.showCategory = false
      },
      toggleList() {
        this.showCategory = !this.showCategory
      },
      _initScroll() {
        if (this.category) {
          let arr = this.$refs.categoryItem
          let sumWidth = 0
          for (let i = 0; i < arr.length; i++) {
            sumWidth += arr[i].clientWidth
          }
          // console.log(sumWidth)
          this.$refs.categoryList.style.width = sumWidth + arr.length * (6 + 2) + 10 + 'px'
          if (!this.menuScroll) {
            this.menuScroll = new BScroll(this.$refs.category, {
              click: true,
              scrollX: true
            })
          } else {
            this.menuScroll.refresh()
          }
        }
      },
      _initListScroll() {
        if (!this.listScroll) {
          this.listScroll = new BScroll(this.$refs.detail, {
            click: true
          })
        } else {
          this.listScroll.refresh()
          this.listScroll.scrollTo(0, 0)
        }
      }
    },
    components: {
      booklist
    }
  }

</script>

<style lang="stylus" scoped>
  @import 'book.styl'
</style>