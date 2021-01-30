<style scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: row;
}
</style>

<template>
  <div class="container">
    <h1>hahah</h1>
    <router-view></router-view>
  </div>
</template>

<script>
// import ThreeFrame from '@/components/Entry/ThreeFrame'

export default {
  name: 'page-container',
  data () {
    return {}
  },
  components: {
    // ThreeFrame
  }
}
</script>
