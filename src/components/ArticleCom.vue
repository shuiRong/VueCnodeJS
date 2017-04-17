<template>
    <div class='secDiv' v-on:scroll='scrollMethod'>
        <span>发布于：{{createdTime}}</span>
        <router-link :to='{name:"UserRoute",params:{name: article.author.loginname}}'>作者：{{article.author.loginname}}</router-link>
        <span>浏览量：{{article.visit_count}}</span>
        <span>来自：{{article.tab}}</span>
        <h3>{{article.title}}</h3>
        <div v-html='article.content' id='content'></div>
        <div id='reply'>
            <div v-for='reply in article.replies' class='replySec'>
                <router-link :to='{name: "UserRoute",params:{name: reply.author.loginname}}'><img :src='reply.author.avatar_url'></router-link>
                <div>
                    <div>
                        <span>{{reply.author.loginname}}</span>
                        <span>{{reply.create_at}}</span>
                        <span v-if='reply.ups.length > 0'>点赞{{reply.ups.length}}</span>
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
                        loginname: '',
                    },
                    visit_count: '',
                    tab: '',
                    content: '',
                    create_at: '2017-04-130000',
                    replies: '',
                },
            };
        },
        computed: {
            createdTime() {
                return String(this.article.create_at).match(/.{10}/)[0];
            },
        },
        beforeCreate() {
            this.$http({
                url: `https://cnodejs.org/api/v1${this.$route.path}`,
                method: 'get',
            }).then((res) => {
                if (res.body.success === true) {
                    this.article = res.body.data;
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
</style>

<style scoped>
    .secDiv {
        width: 60%;
        background: #fff;
        border: 1px solid #ddd;
        font-size: 20px;
        padding: 2rem;
    }
    
    #content {
        margin: 1rem auto 2rem auto;
        padding: 2rem 0 2rem 1rem;
        border-top: 1px solid green;
        border-bottom: 1px solid green;
    }
    
    #reply {
        display: flex;
        flex-direction: column;
        background: blue;
    }
    
    #reply img {
        width: 5rem;
        height: 5rem;
    }
    
    .replySec {
        box-sizing: border-box;
        display: flex;
        background: grey;
        width: 100%;
        margin: 0.5rem auto;
        padding: 1rem;
    }
    
    .replySec>div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 1rem;
        justify-content: space-around;
    }
    
    .replySec div {}
</style>
