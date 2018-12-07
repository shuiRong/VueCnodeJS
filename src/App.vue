<template>
  <div id="app">
    <Header />
    <div class='main-section'>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "app",
  components: {
    Header
  }
};
</script>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
}

* {
  margin: 0;
  padding: 0;
}
</style>

<style lang="scss" scoped>
.main-section {
  margin: auto;
  margin-top: 40px;
  width: 1200px;
}
</style>

