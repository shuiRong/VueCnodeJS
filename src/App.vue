<template>
  <div id="app">
    <Header />
    <div class='main-section'>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
/**
 * 项目的入口Vue文件，
 * 在这里进行‘整体布局’，比如上面最简单的布局方式：
 * 上一块 - 下一块
 */
import Header from "@/components/Header.vue";

export default {
  /**
   * 给此组件起的名字，会显示在Vue的DevTool里面
   */
  name: "app",
  /**
   * 注册引用进来的其他组件
   */
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

