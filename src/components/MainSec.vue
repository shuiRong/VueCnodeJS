<template>
    <div class='secDiv' v-loading='loading'>
        <div v-for='item of content' :key='item.id'>
            <router-link :to='{name: "UserRoute",params:{name: item.author.loginname}}'>
                <img :src='item.author.avatar_url' :title='item.author.loginname'>
            </router-link>
            <div class='textDiv'>
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
console.log('Hello,Friend!');

export default {
    name: 'MainSection',
    data() {
        return {
            content: [],
            item: {
                create_at: '2017-02-22T11:32:43.547Z',
            },
            limit: 0,
            loading: true,
        };
    },
    methods: {
        scrollMethod() {
            const sumH = document.body.scrollHeight;
            const viewH = document.documentElement.clientHeight;
            const scrollH = document.body.scrollTop;
            if (viewH + scrollH === sumH) {
                this.getData();
            }
        },
        getData() {
            this.limit += 10;
            this.$http({
                url: 'https://cnodejs.org/api/v1/topics',
                method: 'get',
                params: {
                    page: 1,
                    limit: this.limit,
                    mdrender: 'false',
                },
            }).then((res) => {
                this.content = res.data.data;
            }).catch((res) => {
                console.log('MaiSec.vue: ', res);
            });
        },
    },
    mounted() {
        window.addEventListener('scroll', this.scrollMethod);
    },
    computed: {
        dealTime() {
            return String(this.item.create_at).match(/.{10}/)[0];
        },
    },
    created() {
        this.getData();
    },
    watch: {
        content(val) {
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
