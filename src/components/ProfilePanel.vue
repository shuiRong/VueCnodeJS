<template>
  <div class="panel">
    <router-link class="user" :to="{path: '/user/' + user.loginname}">
      <img :src='user.avatar_url' alt="用户头像" />
      <span>{{user.loginname}}</span>
    </router-link>
    <div>积分：{{user.score}}</div>
    <div>
      Github：
      <a :href='"https://github.com/" + user.githubUsername' target="_blank" rel="nofollow noopener noreferrer">
        {{user.githubUsername}}
      </a>
    </div>
    <div>
      注册时间：
      {{$moment(user.create_at, 'YYYY-MM-DD')
      .startOf('day')
      .fromNow()}}
    </div>
  </div>
</template>

<script>
/**
 * 话题页面右侧上面的个人信息展示页面
 */
import { getUserByName } from "@/utils/api";
import eventProxy from "@/utils/eventProxy";

export default {
  /**
   * 给此组件起的名字，会显示在Vue的DevTool里面
   */
  name: "ProfilePanel",
  /**
   * 通过在这里定义变量，可以让父组件通过这些变量向此组件传递数据
   * P.S. https://cn.vuejs.org/v2/guide/components.html#%E9%80%9A%E8%BF%87-Prop-%E5%90%91%E5%AD%90%E7%BB%84%E4%BB%B6%E4%BC%A0%E9%80%92%E6%95%B0%E6%8D%AE
   */
  props: ["loginname"],
  /**
   * 当前组件的‘数据中心'
   */
  data() {
    return {
      user: {}
    };
  },
  /**
   * 任何属于此组件的方法都定义在这里
   */
  methods: {
    /**
     * 封装好的获取数据的函数，这样就不需要每次使用都copy一遍代码了
     */
    fetchData(loginname) {
      getUserByName(loginname).then(res => {
        this.user = res.data;
        eventProxy.trigger("user", res.data);
      });
    }
  },
  /**
   * 一般此钩子下面调用接口获取数据
   */
  created() {
    if (!this.loginname) {
      return;
    }
    this.fetchData(this.loginname);
  },
  /**
   * 监听props和data中的值是否有变化的钩子
   */
  watch: {
    loginname(loginname) {
      if (!loginname) {
        return;
      }
      this.fetchData(loginname);
    }
  }
};
</script>

<style lang="scss" scoped>
.panel {
  display: flex;
  flex-direction: column;
  color: black;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  > a {
    display: flex;
    align-items: center;
    img {
      width: 48px;
      height: 48px;
      border-radius: 5px;
      margin-right: 20px;
    }
  }
  .user {
    margin-bottom: 10px;
  }
}
</style>

