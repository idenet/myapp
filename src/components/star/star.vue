<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" :key="index"></span>
  </div>
</template>

<script>
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'

  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: String
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size
      },
      itemClasses() {
        let result = []
        let score = Math.floor(parseInt(this.score) * 2) / 2
        let hasDemical = score % 1 !== 0 // 计算半星
        let integer = Math.floor(score / 2)
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON)
        }
        if (hasDemical) {
          result.push(CLS_HALF)
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF)
        }
        return result
      }
    }
  }

</script>

<style lang="stylus">
  @import 'star.styl'
</style>