<template>
  <transition name="fade">
    <div class="movie-detail">
      <div class="movie-content">
        <div class="image-header">
          <div class="back" @click="goPrev">
            <span class="icon-arrow_lift"></span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {}
</script>

<style lang="stylus" scoped>
  @import 'moviedetail.styl'
</style>