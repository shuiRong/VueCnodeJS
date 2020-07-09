<template>
  <div>
    <div class="topic" v-for="item in list" :key="item.id">
      <router-link :to="{ path: '/user/' + item.author.loginname }">
        <img
          :src="item.author.avatar_url | imgCheck"
          @error="imgErr(item.author.avatar_url)"
          alt="用户头像"
        />
      </router-link>
      <span class="count">
        <em>{{ item.reply_count }}</em>/<em>{{ item.visit_count }}</em>
      </span>
      <el-tag :type="$tab[item.tab] && $tab[item.tab].type">
        {{ item.tab ? $tab[item.tab] && $tab[item.tab].name : '无分类'}}
      </el-tag>
      <router-link class="title" :to="{ path: '/topic/' + item.id }">
        {{ item.title }}
      </router-link>
      <span class="time">
        {{
          $moment(item.last_reply_at, 'YYYY-MM-DD')
            .startOf('day')
            .fromNow()
        }}
      </span>
    </div>
  </div>
</template>

<script>
/**
 * 会在首页使用的组件 :p
 */
export default {
  /**
   * 给此组件起的名字，会显示在Vue的DevTool里面
   */
  name: 'Topics',
  /**
   * 通过在这里定义变量，可以让父组件通过这些变量向此组件传递数据
   * P.S. https://cn.vuejs.org/v2/guide/components.html#%E9%80%9A%E8%BF%87-Prop-%E5%90%91%E5%AD%90%E7%BB%84%E4%BB%B6%E4%BC%A0%E9%80%92%E6%95%B0%E6%8D%AE
   */
  props: ['list'],
  /**
   * 当前组件的‘数据中心'
   */
  data() {
    return {
      article: [],
    };
  },
  methods: {
    // 图片加载失败方法
    imgErr(url) {
      console.log(url);
    },
  },
  filters: {
    imgCheck(url) {
      /* 源地址： https://avatars[1|2].githubusercontent.com/u/1159760?v=4&s=120
       * 把avatars后面的数字去掉即可访问到图片
       */
      return url.replace(/avatars[0-9]/,'avatars');
    },
  },
};
</script>

<style lang="scss" scoped>
.topic {
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 50px;
    border-radius: 50%;
    height: 50px;
  }
  span.count {
    width: 50px;
    text-align: center;
    em:first-child {
      font-size: 1.2em;
      color: purple;
    }
    em:last-child {
      color: grey;
    }
  }
  .title {
    width: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
  }
  span.time {
    width: 70px;
    text-align: right;
  }
}
</style>
