<template>
  <div class="panel">
    <header>最近参与的话题</header>
    <Divider class="divider" />
    <template v-for='item in user.recent_replies'>
      <div :key='item.id'>
        <router-link v-if='simple' :to="{path: '/topic/' + item.id}">{{item.title}}</router-link>
        <div v-else>
          <div class='main'>
            <div>
              <router-link class="avatar" :to="{path: '/user/' + item.author.loginname}">
                <img :src='item.author && item.author.avatar_url' alt="头像" />
              </router-link>
              <router-link key={item.id} :to="{path: '/topic/' + item.id}">
                {{item.title}}
              </router-link>
            </div>
            <span class="time">
              {{$moment(item.last_reply_at, 'YYYY-MM-DD')
              .startOf('day')
              .fromNow()}}
            </span>
          </div>
          <Divider class="inside-divider" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
/**
 * 用户最新回复的话题 组件
 */
import eventProxy from "@/utils/eventProxy";
import Divider from "@/components/Divider";

export default {
  /**
   * 给此组件起的名字，会显示在Vue的DevTool里面
   */
  name: "RecentReply",
  /**
   * 通过在这里定义变量，可以让父组件通过这些变量向此组件传递数据
   * P.S. https://cn.vuejs.org/v2/guide/components.html#%E9%80%9A%E8%BF%87-Prop-%E5%90%91%E5%AD%90%E7%BB%84%E4%BB%B6%E4%BC%A0%E9%80%92%E6%95%B0%E6%8D%AE
   */
  props: {
    simple: {
      default: true,
      type: Boolean
    }
  },
  /**
   * 当前组件的‘数据中心'
   */
  data() {
    return {
      user: {}
    };
  },
  /**
   * 监听'user'，将被传入的数据设置到当前组件state中
   * P.S. 一般在此钩子下面调用接口或者类似操作
   */
  created() {
    // 增加属性，表示当前实例未被卸载
    this.isUnmounted = false;
    eventProxy.on("user", data => {
      // 如果当前实例被卸载了，就没有必要更新其state了（会引起内存泄漏）
      if (!this.isUnmounted) {
        this.user = data;
      }
    });
  },
  /**
   * 组件被销毁的钩子
   * 给this增加属性，表示当前实例已被卸载
   */
  destroyed() {
    this.isUnmounted = true;
  },
  /**
   * 注册引用进来的其他组件
   */
  components: {
    Divider
  }
};
</script>

<style lang="scss" scoped>
.panel {
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  header {
    color: black;
    font-weight: bold;
  }
  > div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .main {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > div {
        display: flex;
        align-items: center;
      }
    }
    .time {
      float: right;
      color: #777;
      font-size: 11px;
    }
    .inside-divider {
      margin: 10px 0;
    }
    .avatar {
      margin-left: 10px;
    }
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 3px;
    margin-right: 5px;
  }
}
.divider {
  margin: 12px 0;
}
</style>

