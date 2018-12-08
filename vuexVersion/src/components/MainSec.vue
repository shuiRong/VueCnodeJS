<template>
    <div class='secDiv' v-loading='loading'>
        <div v-for='item of articleLists' :key='item.length'>
            <router-link :to='{name: "UserRoute",params:{name: item.author.loginname}}'>
                <img :src='item.author.avatar_url' :title='item.author.loginname'>
            </router-link>
            <div class='textDiv'>
                <router-link :to='{name:"ArticleRoute",params:{id:item.id}}'>{{item.title}}</router-link>
                <div class='stuff'>
                    <span>回复：{{item.reply_count}}</span>
                    <span>创建于：{{dealTime(item.create_at)}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
console.log('当断不断，反受其乱');

export default {
    name: 'MainSection',
    data() {
        return {
            item: {
                author: {
                    loginname: 'test', //设置默认值，否则可能报错，原因是Vue一系列初试化过程中，调用到它，却没赋值。
                }
            },
            loading: true,
        };
    },
    computed: {
        articleLists() {
            return this.$store.state.articleLists
        },
    },
    methods: {
        scrollMethod() {
            const sumH = document.body.scrollHeight;
            const viewH = document.documentElement.clientHeight;
            const scrollH = document.body.scrollTop;
            if (viewH + scrollH === sumH) {
                this.getData()
            }
        },
        getData() {
            this.$store.dispatch('getArticleLists')
        },
        dealTime(time) {
            return String(time).match(/.{10}/)[0]
        },
    },
    mounted() {
        window.addEventListener('scroll', this.scrollMethod)
    },
    created() {
        this.getData()
    },
    watch: {
        articleLists(val) {
            if (val) {
                this.loading = false;
            }
        },
    },
};
</script>

<style scoped>
.secDiv {
    width: 60%;
    background: #F9FAFC;
    border: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    font-size: 22px;
    padding: 2rem;
    min-height: 40rem;
}

a {
    text-decoration: none;
}

.secDiv>div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0.5rem 0;
    border-bottom: 2px solid #C0CCDA;
    padding-bottom: 1rem;
}

.secDiv>div img {
    width: 4rem;
    height: 4rem;
    margin-right: 2rem;
}

.textDiv {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
}

.textDiv a {
    color: black;
    font-size: 25px;
}

.textDiv a:visited {
    color: grey;
}

.stuff {
    font-size: 17px;
    margin-top: 1rem;
    color: #8492A6;
}

.stuff span:first-child {
    margin-right: 2rem;
}
</style>
