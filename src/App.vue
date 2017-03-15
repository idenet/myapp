<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/book">书籍</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/movie">电影</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/wechat">微信</router-link>
      </div>
    </div>
    <!-- 保证tab切换后，组件生命周期不被重新加载 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
  import header from '@/view/header/header'

  export default {
    name: 'app',
    components: {
      'v-header': header
    }
  }

</script>

<style lang="stylus" scoped>
  @import 'app.styl'
</style>