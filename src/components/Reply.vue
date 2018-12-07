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
export default {
  name: "Reply",
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

