<template>
    <div class='secDiv' v-loading.lock='loading'>
        <div v-for='item of articleListsData' :key='item.length'>
            <nuxt-link :to='"/user/" + item.author.loginname'>
                <img :src='item.author.avatar_url' :title='item.author.loginname'>
            </nuxt-link>
            <div class='textDiv'>
                <nuxt-link :to='"/topic/" + item.id'>{{item.title}}</nuxt-link>
                <div class='stuff'>
                    <span>回复：{{item.reply_count}}</span>
                    <span>创建于：{{dealTime(item.create_at)}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
    name: 'MainSection',
    data() {
        return {
            loading: true
        }
    },
    computed: mapState([
        'articleLists'
    ]),
    asyncData(context) {
        return axios.get('https://cnodejs.org/api/v1/topics?page=1&limit=10&mdrender=false')
            .then(res => ({
                articleListsData: res.data.data,
                loading: false
            })).catch(res => {
                throw new Error('MaiSec.vue: ', res)
            })
    },
    methods: {
        scrollMethod() {
            const sumH = document.body.scrollHeight
            const viewH = document.documentElement.clientHeight
            const scrollH = document.body.scrollTop
            if (viewH + scrollH === sumH) {
                // 如果滑动条到了底部,再请求数据
                this.getData()
            }
        },
        getData() {
            this.$store.dispatch('getArticleLists')
        },
        dealTime(time) {
            return String(time).match(/.{10}/)[0]
        }
    },
    mounted() {
        window.addEventListener('scroll', this.scrollMethod)
    },
    watch: {
        articleLists(val) {
            this.articleListsData = this.articleLists
        }
    }
}
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
    margin: 80px auto 0 auto;
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
