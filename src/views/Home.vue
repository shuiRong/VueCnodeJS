<template>
  <div class="home">
    <el-tabs v-model="tab" @tab-click="tabChanged">
      <el-tab-pane label="全部" name="all">
        <Content :list='list' />
      </el-tab-pane>
      <el-tab-pane label="精华" name="good">
        <Content :list='list' />
      </el-tab-pane>
      <el-tab-pane label="分享" name="share">
        <Content :list='list' />
      </el-tab-pane>
      <el-tab-pane label="问答" name="ask">
        <Content :list='list' />
      </el-tab-pane>
      <el-tab-pane label="招聘" name="job">
        <Content :list='list' />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Content from "@/components/Content.vue";
import { getTopics } from "@/utils/api";

export default {
  name: "home",
  data() {
    return {
      page: 1,
      limit: 20,
      tab: "all",
      list: []
    };
  },
  methods: {
    /**
     * 封装好的获取首页数据的函数，这样就不需要每次使用都copy一遍代码了
     */
    getTopics() {
      getTopics({
        page: this.page,
        limit: this.limit,
        tab: this.tab
      }).then(res => {
        this.list = res.data;
        this.limit = this.limit + 10;
      });
    },
    /**
     * 滚动函数，判断当前滚动条是否到了底部来决定是否重新拉取数据
     */
    scrollMethod() {
      const sumH =
        document.body.scrollHeight || document.documentElement.scrollHeight;
      const viewH = document.documentElement.clientHeight;
      const scrollH =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (viewH + scrollH >= sumH) {
        this.getTopics();
      }
    },
    /**
     * 当前Tab变化时的回调函数
     * 每次切换Tab时，重置limit参数
     * 这里使用箭头函数而不是上面的那种方式，是为了解决this问题
     * 详情看：https://react.docschina.org/docs/react-without-es6.html#%E8%87%AA%E5%8A%A8%E7%BB%91%E5%AE%9A
     * （或者自行Google）
     */
    tabChanged() {
      this.limit = 20;
      this.list = [];
      this.getTopics();
    }
  },
  created() {
    this.getTopics();
    window.addEventListener("scroll", this.scrollMethod);
  },
  /**
   * 组件被销毁时，记得移除绑定的滚动事件
   */
  destroyed() {
    window.removeEventListener("scroll", this.scrollMethod);
  },
  components: {
    Content
  }
};
</script>

<style lang="scss" scoped>
.home {
  margin: auto;
  width: 75%;
  padding: 20px 30px;
  box-sizing: border-box;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>

