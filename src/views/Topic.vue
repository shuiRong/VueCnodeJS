<template>
  <div class="topic">
    <div class="left">
      <div class="title" v-html='topic.title' />
      <div class="info">
        <span>
          发布于&nbsp;
          {{$moment(topic.create_at, 'YYYY-MM-DD')
          .startOf('day')
          .fromNow()}}
          &nbsp;•&nbsp;
        </span>
        作者：
        <router-link :to="{path: '/user/' + topic.loginname}">
          {{topic.loginname}}
        </router-link>
        &nbsp;•&nbsp;
        <span>{{topic.visit_count}}次浏览&nbsp;•&nbsp;</span>
        <span>
          来自：
          {{$tab[topic.tab] && $tab[topic.tab].name}}
        </span>
      </div>
      <Divider />
      <div class="content" v-html='topic.content' />
      <Reply :data='topic.replies' />
    </div>
    <div class="right">
      <ProfilePanel :loginname='topic.loginname' />
      <OtherTopic />
      <RecentReply />
    </div>
  </div>
</template>

<script>
/**
 * 主题页
 */
import { getTopicById } from "@/utils/api";
import OtherTopic from "@/components/OtherTopic";
import ProfilePanel from "@/components/ProfilePanel";
import RecentReply from "@/components/RecentReply";
import Divider from "@/components/Divider";
import Reply from "@/components/Reply";

export default {
  /**
   * 给此组件起的名字，会显示在Vue的DevTool里面
   */
  name: "Toipc",
  /**
   * 当前组件的‘数据中心'
   */
  data() {
    return {
      topic: {}
    };
  },
  /**
   * 任何属于此组件的方法都定义在这里
   */
  methods: {
    /**
     * 封装好的获取数据的函数，这样就不需要每次使用都copy一遍代码了
     */
    fetchData(id) {
      getTopicById(id).then(res => {
        this.topic = {
          ...res.data,
          ...res.data.author
        };
      });
    }
  },
  /**
   * 一般此钩子下面调用接口获取数据
   */
  created() {
    this.fetchData(this.$route.params.id);
  },
  /**
   * 在当前路由改变，但是该组件被复用时调用
   * 举例来说，对于一个带有动态参数的路径 /topic/:id，在 /topic/asdsd 和 /topic/sdfsdfa 之间跳转的时候，
   * 由于会渲染同样的 Topic 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
   * 可以访问组件实例 `this`
   */
  beforeRouteUpdate(to, from, next) {
    this.fetchData(to.params.id);
    next();
  },
  /**
   * 注册引用进来的其他组件
   */
  components: {
    RecentReply,
    OtherTopic,
    ProfilePanel,
    Divider,
    Reply
  }
};
</script>

<style lang="scss" scoped>
$grey-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

.topic {
  display: flex;
  margin-bottom: 100px;
  .title {
    color: black;
    font-weight: bold;
    font-size: 25px;
    margin-bottom: 8px;
  }
  .content {
    color: #333;
    line-height: 1.6;
    margin-bottom: 50px;
    /deep/ img {
      width: 100%;
    }
  }
  .left {
    width: 72%;
    float: left;
    box-shadow: $grey-shadow;
    padding: 20px;
    .info {
      display: flex;
      align-items: center;
      color: #838383;
      font-size: 12px;
    }
  }
  .right {
    float: right;
    width: 25%;
    height: 100%;
    margin-left: 2%;
  }
}
</style>

