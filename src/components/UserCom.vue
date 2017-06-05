<template>
    <div class="secDiv">
        <div class="profile" v-loading.lock="loading">
            <div>
                <img :src="userInfo.avator_url" :title="userInfo.loginname" alt="">
                <span>{{ userInfo.loginname }}</span>
            </div>
            <p>
                <icon name="score" scale="4"></icon>
                <span>积分：</span>
                {{ userInfo.score }}
            </p>
            <p>
                <icon name="github" scale="4"></icon>
                <span>Github：</span>
                https://github.com/{{ userInfo.githubUsername }}
            </p>
            <p>
                <icon name="time" scale="4"></icon>
                <span>注册时间：</span>
                {{ userInfo.create_at | dealCommentTime }}
            </p>
        </div>

        <div class="recentReplies" v-loading.lock="loading">
            <p>最近参与话题</p>
            <template v-for="(item, index) of userInfo.recent_replies">
                <div v-if="index < 4">
                    <router-link :to="{name: 'UserRoute', params:{name : item.author.loginname}}">
                        <img :src="item.author.avatar_url" :title="item.author.loginname" alt="">
                    </router-link>
                    <router-link :to="{name: 'ArticleRoute', params:{topic: item.id}}">
                        <p class="userTitle">{{ item.title }}</p>
                    </router-link>
                </div>
            </template>
        </div>

        <div class="recentTopics" v-loading.lock="loading">
            <p>最近创建的话题</p>
            <template v-for="(item, index) of userInfo.recent_topics">
                <div v-if="index　< 5 && item">
                    <img :src="item.author.avatar_url" :title="item.author.loginname" alt="">
                    <router-link :to="{name:'ArticleRoute', params:{topic: item.id}}">
                        <p class="userTitle">{{ item.title }}</p>
                    </router-link>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                userInfo : {
                    create_at:'2017-04-130000',
                },
                loading : false
            }
        },
        created(){
            this.fetchData();
        },
        watch:{
            '$route':'fetchData'
        },
        methods: {
            fetchData(){
                this.loading = true;
                this.$ajax({
                    url:`https://cnodejs.org/api/v1${this.$route.path}`,
                    mathod : 'get'
                }).then((res) => {
                    this.loading = false;
//                    console.log(res);
                    if(res.data.success){
                        this.userInfo = res.data.data;
                    }
                }).catch((res) => {
                    console.log(res);
                })
            }
        },
        filters:{
            dealCommentTime(r){
                return String(r).match(/.{10}/)[0];
            }
        }
    }
</script>
<style scoped>
    .secDiv {
        width: 80%;
        margin: 0 auto;
        padding: 0;
        box-sizing: border-box;
        border: none;
        text-align: left;
    }

    .profile {
        padding: 1rem;
        background: #fff;
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
      width: 3rem;
      height: 3rem;
    }
    .recentTopics a, .recentReplies a{
      text-decoration: none;
    }
    .recentTopics>p,
    .recentReplies>p {
      background: #efefef;
      padding: 1rem;
        color: black;
      margin-bottom: 0;
    }

    .userTitle {
        font-size: 1rem;
      color: #415361;
      text-decoration: none;
    }

    .recentTopics {
      margin: 1rem 0;
        background: #ffffff;
        border-radius: 0.3rem;
    }

    .recentReplies {
        background: #fff;
        margin: 1rem 0;
        border-radius: 0.3rem;
    }

    .recentReplies div,
    .recentTopics div {
        display: flex;
        align-items: center;
        border-bottom: 2px solid #C0CCDA;
        padding: 7px;
      margin: 0;
    }
    .recentReplies>div:last-child,
    .recentTopics>div:last-child {
      border:none;
    }
    .recentTopics div {
        border-bottom: 2px solid #99A9BF;
    }

    .recentReplies div img,
    .recentTopics div img {
        margin-right: 1rem;
    }
</style>
