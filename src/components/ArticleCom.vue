<template>
    <div class='secDiv' v-loading.lock='loading'>
        <span class='marginSpan'>发布于：{{createdTime}}</span>
        <router-link :to='{name:"UserRoute",params:{name: article.author.loginname}}'>作者：{{article.author.loginname}}</router-link>
        <span class='marginSpan'>浏览量：{{article.visit_count}}</span>
        <span>来自：{{article.tab}}</span>
        <h3>{{article.title}}</h3>
        <div v-html='article.content' id='content'></div>
        <div id='reply'>
            <div v-for='reply in article.replies' class='replySec'>
                <router-link :to='{name: "UserRoute",params:{name: reply.author.loginname}}'><img :src='reply.author.avatar_url'></router-link>
                <div>
                    <div class='replyUp'>
                        <span class='replyName'>{{reply.author.loginname}}</span>
                        <span>{{dealCommentTime(reply.create_at)}}</span>
                        <span v-if='reply.ups.length > 0' class='thumbsClass'>
                                                                    <icon name='thumbs-up' scale='2'></icon>
                                                                    <span>{{reply.ups.length}}</span>
                        </span>
                    </div>
                    <p v-html='reply.content'></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                article: {
                    title: '',
                    author: {
                        loginname: 'temp',
                    },
                    visit_count: '',
                    tab: '',
                    content: '',
                    create_at: '2017-04-130000',
                    replies: '',
                },
                loading: true,
            };
        },
        computed: {
            createdTime() {
                return String(this.article.create_at).match(/.{10}/)[0];
            },
        },
        methods: {
            dealCommentTime(time) {
                return String(time).match(/.{16}/)[0].replace(/.{2}/, '').replace(/[T]/, ' ');
            },
        },
        watch: {
            article(val) {
                if (val) {
                    this.loading = false;
                }
            },
        },
        beforeCreate() {
            this.$http({
                url: `https://cnodejs.org/api/v1${this.$route.path}`,
                method: 'get',
            }).then((res) => {
                if (res.data.success === true) {
                    this.article = res.data.data;
                    this.$parent.authorName = this.article.author.loginname;
                } else {
                    this.article = 'Sorry, Something wrong happened when getting the remote data';
                }
            }).catch((res) => {
                console.log('ArticleCom.vue: ', res);
            });
        },
    };
</script>

<style>
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
    @import url('../assets/markdown-github.css');
    .marginSpan {
        margin: 0 0.5rem;
    }
    
    .secDiv span:first-child {
        margin-left: 0;
    }
    
    .secDiv {
        width: 60%;
        background: #fff;
        border: 1px solid #ddd;
        font-size: 20px;
        padding: 2rem;
        background: #F9FAFC;
    }
    
    .secDiv span,
    .secDiv a {
        font-size: 17px;
        color: #8492A6;
    }
    
    .secDiv a {
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
    
    #reply img {
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
    
    .secDiv .thumbsClass {
        float: right;
    }
</style>
