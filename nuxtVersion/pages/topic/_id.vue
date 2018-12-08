<template>
    <div class='topic' v-loading.lock='loading'>
        <span class='marginSpan'>发布于：{{createdTime}}</span>
        <nuxt-link :to='"/user/" +article.author.loginname'>作者：{{article.author.loginname}}</nuxt-link>
        <span class='marginSpan'>浏览量：{{article.visit_count}}</span>
        <span>来自：{{article.tab}}</span>
        <h3>{{article.title}}</h3>
        <div v-html='article.content' id='content'></div>
        <div id='reply'>
            <div v-for='reply in article.replies' class='replySec' :key='reply.length'>
                <nuxt-link :to='"/user/" +reply.author.loginname'>
                    <img class='avatar' :src='reply.author.avatar_url'>
                </nuxt-link>
                <div>
                    <div class='replyUp'>
                        <span class='replyName'>{{reply.author.loginname}}</span>
                        <span>{{dealCommentTime(reply.create_at)}}</span>
                        <span v-if='reply.ups.length > 0' class='thumbsClass'>
                            <img class='thumb-icon' src='~assets/thumb.png'>
                            <span>{{reply.ups.length}}</span>
                        </span>
                    </div>
                    <div v-html='reply.content'></div>
                </div>
            </div>
        </div>
        <side :userInfo='user'></side>
    </div>
</template>

<script>
import axios from 'axios'
import Side from '../../components/SideSec.vue'

export default {
    name: 'TopicRoute',
    data() {
        return {
            loading: true
        }
    },
    asyncData(context) {
        /*  注意 !!!
        *   有个很重要的点,你需要知道: 对于Nuxt.js来说,(任何一个组件的)子组件没有asyncData和fetch函数,即意味着不能在
        *   Nuxt.js初始化时获取到子组件的异步数据,然后对其进行服务端渲染.
        *   但官方提供了其他方法来实现子组件的服务端渲染: https://zh.nuxtjs.org/faq/async-data-components
        *   简而言之就是: 子组件需要的异步数据,全部由父组件来获取,然后通过props传递给子组件,这样子组件就能被服务端渲染了
        *   我这里就是使用了这个方法.
        */

        // 文章作者信息
        let article
        return axios.get(`https://cnodejs.org/api/v1${context.route.path}`)
            .then(res => {
                article = res
                return axios.get(`https://cnodejs.org/api/v1/user/${res.data.data.author.loginname}`)
            }).then(res => ({
                article: article.data.data,
                user: res.data.data,
                loading: false
            }))
            .catch(error => {
                throw new Error('Sorry, Something wrong happened when getting the remote data', error)
            })
    },
    computed: {
        createdTime() {
            return String(this.article.create_at).match(/.{10}/)[0];
        }
    },
    methods: {
        dealCommentTime(time) {
            return String(time).match(/.{16}/)[0].replace(/.{2}/, '').replace(/[T]/, ' ');
        },
    },
    components: {
        Side
    }
}
</script>

<style scoped>
.topic {
    color: red;
    margin-top: 57.59px;
}

#content img {
    max-width: 100%;
    max-height: 100%;
}

.replySec {
    box-sizing: border-box;
    display: flex;
    border-bottom: 2px solid #C0CCDA;
    width: 100%;
    margin: 0.5rem auto;
    padding: 1rem 0;
}
</style>

<style>
@import url('../../assets/markdown-github.css');
.marginSpan {
    margin: 0 0.5rem;
}

.topic span:first-child {
    margin-left: 0;
}

.topic {
    width: 60%;
    background: #fff;
    border: 1px solid #ddd;
    font-size: 20px;
    padding: 2rem;
    background: #F9FAFC;
}

.topic span,
.topic a {
    font-size: 17px;
    color: #8492A6;
}

.topic a {
    color: black;
    text-decoration: none;
}

#content {
    margin: 2rem auto 2rem auto;
    padding: 2rem 1rem 2rem 1rem;
    border: 1px solid #ddd;
    line-height: 1.6;
    padding-bottom: 1rem;
    background: #EFF2F7;
}

#reply {
    display: flex;
    flex-direction: column;
}

#reply .avatar {
    width: 5rem;
    height: 5rem;
    margin-right: 1rem;
}

.replySec>div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 1rem;
    justify-content: space-around;
}

.replySec p {
    color: black;
}

.replyUp {
    width: 100%;
}

.replySec .replyName {
    color: #475669;
    font-size: 20px;
}

.topic .thumbsClass {
    float: right;
    display: flex;
}

.topic .thumb-icon {
    width: 1.3035714285714286rem;
    height: 1.3035714285714286rem;
    margin-right: 5px;
}
</style>
