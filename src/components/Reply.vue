<template>
  <div class="reply">
    <div>
      <span>{{data.length}}</span>&nbsp;回复
    </div>
    <div v-for='(reply,index) in data' :key='reply.id'>
      <router-link :to="{path: '/user/' + reply.author.loginname}">
        <img :src='reply.author && reply.author.avatar_url' alt="头像" />
      </router-link>
      <div>
        <div class="info">
          <p>
            <span>{{index + 1}}楼&nbsp;</span>
            <router-link :to="{path: '/user/' + reply.author.loginname}">
              {{reply.author.loginname}}
            </router-link>
            <span>
              &nbsp;
              {{$moment(reply.create_at, 'YYYY-MM-DD')
              .startOf('day')
              .fromNow()}}
            </span>
          </p>
          <span class="thumbs">
            <img v-if='reply.ups.length' :src="require('@/assets/image/thumbs-up.svg')" alt="点赞" />
            {{reply.ups.length !== 0 ? reply.ups.length : ''}}
          </span>
        </div>
        <p v-html='reply.content' />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 评论组件
 */
export default {
  /**
   * 给此组件起的名字，会显示在Vue的DevTool里面
   */
  name: "Reply",
  /**
   * 通过在这里定义变量，可以让父组件通过这些变量向此组件传递数据
   * props有两种定义方式：
   * 1. 简单的数组
   * 2. 带有类型生命和默认值的 相对复杂的对象
   * P.S. https://cn.vuejs.org/v2/guide/components.html#%E9%80%9A%E8%BF%87-Prop-%E5%90%91%E5%AD%90%E7%BB%84%E4%BB%B6%E4%BC%A0%E9%80%92%E6%95%B0%E6%8D%AE
   */
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.reply {
  width: 100%;
  img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    margin-right: 15px;
  }
  > div {
    display: flex;
    border: 1px solid #ebedf0;
    border-bottom-width: 0;
    color: rgba(0, 0, 0, 0.65);
    padding: 10px 20px;
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      p {
        margin: 0;
        width: 100%;
        /deep/ img {
          width: 100%;
        }
      }
      .info {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .thumbs {
          font-size: 15px;
          display: flex;
          align-items: center;
          img {
            width: 12px;
            height: 15px;
            margin-right: 5px;
            transform: rotate(-15deg);
          }
        }
      }
    }
  }
  > div:first-child {
    color: rgba(0, 0, 0, 0.85);
    font-weight: bold;
  }
  > div:last-child {
    border-bottom: 1px solid #ebedf0;
  }
}
</style>

