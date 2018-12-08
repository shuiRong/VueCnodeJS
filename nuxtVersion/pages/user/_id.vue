<template>
    <div class='secDiv'>
        <div class='profile' v-loading.lock='loading'>
            <div>
                <img :src='userInfo.avatar_url' :title='userInfo.loginname'>
                <span>{{userInfo.loginname}}</span>
            </div>
            <p>
                <img class='score' src='~assets/money.png'>
                <span>积分：</span>{{userInfo.score}}
            </p>
            <p>
                <img class='github' src='~assets/github.png'>
                <span>Github：</span> https://github.com/{{userInfo.githubUsername}}
            </p>
            <p>
                <img class='time' src='~assets/time.png'>
                <span>注册时间：</span>{{dealCommentTime(userInfo.create_at)}}
            </p>
        </div>

        <div class='recentReplies' v-loading.lock='loading'>
            <p>最近参与的话题</p>
            <template v-for='(item,index) of userInfo.recent_replies'>
                <div v-if='index < 4' :key='index'>
                    <nuxt-link :to='"/user/"+item.author.loginname'>
                        <img :src='item.author.avatar_url' :title='item.author.loginname'>
                    </nuxt-link>
                    <nuxt-link :to='"/topic/"+item.id'>
                        <p class='userTitle'>{{item.title}}</p>
                    </nuxt-link>
                </div>
            </template>
        </div>

        <div class='recentTopics' v-loading.lock='loading'>
            <p>最近创建的话题</p>
            <template v-for='(item,index) of userInfo.recent_topics'>
                <div v-if='index < 5 && item' :key='index'>
                    <img :src='item.author.avatar_url' :title='item.author.loginname'>
                    <nuxt-link :to='"/topic/"+item.id'>
                        <p class='userTitle'>{{item.title}}</p>
                    </nuxt-link>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'UserRoute',
    data() {
        return {
            loading: true
        }
    },
    asyncData(context) {
        return axios.get(`https://cnodejs.org/api/v1${context.route.path}`)
            .then(res => ({
                userInfo: res.data.data,
                loading: false
            }))
            .catch(error => {
                console.log('UserCom.vue: ', error);
            });
    },
    computed: {
        createdTime() {
            return String(this.article.create_at).match(/.{10}/)[0];
        },
    },
    methods: {
        dealCommentTime(time) {
            return String(time).match(/.{10}/)[0].replace(/.{2}/, '').replace(/[T]/, ' ');
        }
    }
}
</script>

<style scoped>
.secDiv {
    padding: 0;
    box-sizing: border-box;
    border: none;
    width: 60%;
    margin: 127px auto;
}

.profile {
    padding: 1rem;
    background: #EFF2F7;
    border-radius: 0.3rem;
}

.profile div {
    margin-bottom: 1.5rem;
}

.profile div span {
    font-size: 25px;
    color: black;
    margin-left: 1rem;
}

.profile p {
    display: flex;
    align-items: center;
    color: grey;
    margin: 0.5rem 0;
    font-size: 20px;
}

.profile p span {
    margin: 0 0.5rem;
    color: black;
}

.profile svg {
    color: black;
    margin-left: 0.2rem;
}

.recentTopics img,
.recentReplies img {
    width: 5rem;
    height: 5rem;
}

.recentTopics>p,
.recentReplies>p {
    margin-bottom: 1rem;
    color: black;
    padding-bottom: 1.5rem;
}

.userTitle {
    font-size: 25px;
}

.recentTopics {
    padding: 1rem;
    background: #D3DCE6;
    border-radius: 0.3rem;
}

.recentReplies {
    background: #E5E9F2;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 0.3rem;
}

.recentReplies div,
.recentTopics div {
    display: flex;
    align-items: center;
    margin: 1rem 0;
    border-bottom: 2px solid #C0CCDA;
    padding-bottom: 1rem;
}

.recentTopics div {
    border-bottom: 2px solid #99A9BF;
}

.recentReplies div img,
.recentTopics div img {
    margin-right: 1rem;
}

.score,
.github,
.time {
    width: 2.642857142857143rem;
    height: 2.642857142857143rem;
}

a {
    text-decoration: none;
    color: #324057;
}

a:visited {
    color: #8492A6;
}
</style>