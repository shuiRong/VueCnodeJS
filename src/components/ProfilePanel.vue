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
import { getUserByName } from "@/utils/api";
import eventProxy from "@/utils/eventProxy";

export default {
  name: "ProfilePanel",
  props: ["loginname"],
  data() {
    return {
      user: {}
    };
  },
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
  created() {
    if (!this.loginname) {
      return;
    }
    this.fetchData(this.loginname);
  },
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

