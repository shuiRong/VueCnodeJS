<template>
    <div class='secDiv'>
        <h3>{{article.title}}</h3>
        <span>发布于：{{createdTime}}</span>
        <span>作者：{{article.author.loginname}}</span>
        <span>浏览量：{{article.visit_count}}</span>
        <span>来自：{{article.tab}}</span>
        <div v-html='article.content'></div>
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
    .secDiv {
        width: 60%;
        background: #fff;
        border: 1px solid #ddd;
        font-size: 22px;
        overflow: hidden;
        padding: 2rem;
    }
    
    .markdown-text img {
        max-width: 100%;
        max-height: 100%;
    }
</style>
