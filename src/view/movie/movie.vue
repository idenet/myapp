<template>
  <div class="movie" ref="movie">
    <div class="movie-wapper">
      <div class="header">
        <h1 class="title">{{movieList.title}}</h1>
      </div>
      <div class="list" v-for="(items,index) in movieList.data">
        <div class="link">
          <a :href="items.link" class="list-name">{{items.name}}</a>
        </div>
        <ul class="movie-list">
          <li class="movie-item" v-for="(item,index) in items.data" :key="index">
            <div class="item-left">
              <div class="icon">
                <img :src="item.iconaddress" :alt="item.tvTitle" width="100">
              </div>
            </div>
            <div class="item-right">
              <h2 class="item-name">{{item.tvTitle}}</h2>
              <star :size="24" :score="item.grade | formatGrade" class="star"></star>
              <span class="score">{{item.grade | formatGrade }}分</span>
              <div class="director">
                <span class="director-show">{{item.director.showname}}:</span>
                <span class="director-name">{{item.director.data[1].name}}</span>
              </div>
              <div class="stars">
                <span class="star-show">{{item.star.showname}}:</span>
                <span class="star-name" v-for="(item,index) in item.star.data">
                  {{item.name}}
                </span>
              </div>
              <div class="type">
                <span>{{item.type.showname}}:</span>
                <span class="type-name" v-for="(item,index) in item.type.data">{{item.name}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as types from '@/store/types'
  import BScroll from 'better-scroll'
  import star from '@/components/star/star'

  export default {
    computed: {
      ...mapGetters({
        movieList: 'fetchMovieList'
      })
    },
    created() {
      this.getMovies()
    },
    activated() {
      this._initMovieScroll()
    },
    updated() {
      this._initMovieScroll()
    },
    filters: {
      formatGrade(score) {
        return score === undefined ? '0' : score
      }
    },
    methods: {
      ...mapActions([types.FETCH_MOVIE_LIST, types.CLEAN_MOVIE_LIST]),
      getMovies() {
        this[types.FETCH_MOVIE_LIST]({
          city: '宁波'
        })
      },
      _initMovieScroll() {
        if (!this.movieScroll) {
          this.movieScroll = new BScroll(this.$refs.movie, {
            click: true
          })
        } else {
          this.movieScroll.refresh()
        }
      }
    },
    components: {
      star
    }
  }

</script>

<style lang="stylus" scoped>
  @import 'movie.styl'
</style>