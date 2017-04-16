<template>
    <div class='secDiv'>
        <div v-for='item of content'>
            <img :src='item.author.avatar_url' :title='item.author.loginname'>
            <div>
                <router-link :to='{name:"ArticleRoute",params:{id:item.id}}'>{{item.title}}</router-link>
                <div class='stuff'>
                    <span>回复：{{item.reply_count}}</span>
                    <span>创建于：{{dealTime}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MainSection',
        data() {
            return {
                content: [],
                item: {
                    create_at: '2017-02-22T11:32:43.547Z',
                },
            };
        },
        methods: {},
        computed: {
            dealTime() {
                return String(this.item.create_at).match(/.{10}/)[0];
            },
        },
        created() {
            this.$http({
                url: 'https://cnodejs.org/api/v1/topics',
                method: 'get',
                params: {
                    page: 1,
                    limit: 10,
                    mdrender: 'false',
                },
            }).then((res) => {
                this.content = res.body.data;
                console.log(this.content);
            }).catch((res) => {
                console.log('MaiSec.vue: ', res);
            });
        },
    };
</script>

<style scoped>
    .secDiv {
        width: 60%;
        background: #fff;
        border: 1px solid #ddd;
        display: flex;
        flex-direction: column;
        font-size: 22px;
        padding: 2rem;
    }
    
    .secDiv>div img {
        width: 4rem;
        height: 4rem;
        margin-right: 2rem;
    }
    
    .secDiv>div {
        display: flex;
        justify-content: space-start;
        height: 100px;
    }
    
    .secDiv>div>div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }
    
    .stuff {
        margin-top: 1rem;
    }
    
    .stuff span:first-child {
        margin-right: 2rem;
    }
</style>
