<template>
    <div class="secDiv" v-loading="loading">
        <h3>{{article.title}}</h3>
        <span class="marginSpan">发布于：{{article.create_at | createTime}}</span>
        <router-link :to="{name:'UserRoute',params:{name: article.author.loginname}}">作者：{{article.author.loginname}}</router-link>
        <span class="marginSpan">浏览量：{{article.visit_count}}</span>
        <span>来自：{{article.tab}}</span>

        <div v-html="article.content" id="content"></div>
        <div id="reply">
            <div v-for="reply in article.replies" class="replySec">
                <router-link :to="{name: 'UserRoute', params : { name : reply.author.loginname }}">
                    <img :src="reply.author.avatar_url" alt="">
                </router-link>
                <div class="replyUp">
                    <span class="replyName">{{ reply.author.loginname}}</span>
                    <span>{{ reply.create_at | dealCommentTime }}</span>
                    <span v-if="reply.ups.length > 0" class="thumbsClass">
                        <icon name="thumbs-up" scale="2"></icon>
                        <span>{{ reply.ups.length }}</span>
                    </span>
                    <p v-html="reply.content"></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                article : {
                    title : '',
                    author : {
                        loginname:'temp'
                    },
                    visit_count:'',
                    tab:'',
                    content:'',
                    create_at:'2017-04-130000',
                    replies:[]
                },
                loading:false
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
                        this.article = res.data.data;
                        this.$parent.authorName = this.article.author.loginname;
//                        this.
                    }
                }).catch((res) => {
                    console.log(res);
                })
            }
        },
        filters:{
            createTime(r){
                return String(r).match(/.{10}/)[0];
            },
            dealCommentTime(r){
                return String(r).match(/.{16}/)[0].replace(/.{2}/, '').replace(/[T]/, ' ');
            }
        }
    }
</script>
<style scoped>
    @import '../assets/markdown-github.css';
    #content img {
        max-width: 100%;
        max-height: 100%;
    }

    .replySec {
        box-sizing: border-box;
        display: flex;
        border-bottom: 2px solid #C0CCDA;
        width: 100%;
        padding: 1rem 0;
    }

    .marginSpan {
        margin: 0 0.5rem;
    }

    .secDiv span:first-child {
        margin-left: 0;
    }

    .secDiv {
        width: 69%;
        background: #fff;
        border: 1px solid #ddd;
        font-size: 20px;
        padding: 2rem;
        background: #F9FAFC;
        margin: 0 auto;
        text-align: left;
        float: left;
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
        width: 3rem;
        height: 3rem;
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
      font-size: 1rem;
      margin: 0;
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
