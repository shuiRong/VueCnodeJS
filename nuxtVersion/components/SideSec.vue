<template>
    <div class='secDiv' v-loading.lock='loading'>
        <div>
            <router-link :to='{name: "UserRoute",params:{name: userInfo.loginname}}'>
                <img :src='userInfo.avatar_url'>
            </router-link>
            <span>{{userInfo.loginname}}</span>
        </div>
        <p>
            <icon name='score' scale='4'></icon>{{userInfo.score}}
        </p>
        <p>
            <icon name='github' scale='4'></icon>https://github.com/{{userInfo.githubUsername}}
        </p>
    </div>
</template>

<script>
export default {
    name: 'SideSection',
    asyncData(context) {
        // 遇到了问题,surmon提到过. 就是 page级别的Vue组件拥有asyncData方法,但是他们的子组件没有. surmon提到了解决方法
        // !!!!
        return axios.get(`https://cnodejs.org/api/v1${context.route.path}`)
            .then(res => {
                console.log('res--user>', res.data.data.author)
                axios.get(`https://cnodejs.org/api/v1/user/${res.data.data.author.loginname}`)
                    .then(res => {
                        return { userInfo: res.data.datad }
                    })
            }).catch(res => {
                throw new Error('Sorry, Something wrong happened when getting the remote data')
            })
    },
    data() {
        return {
            loading: true
        };
    },
    computed: {
        articleAuthor() {
            return this.$store.state.articleAuthor
        }
    }
};
</script>

<style scoped>
.secDiv {
    width: 20%;
    height: 20rem;
    background: #E5E9F2;
    border: 1px solid #ddd;
    word-break: break-all;
    font-size: 21px;
    padding: 2rem;
}

.secDiv div {
    display: flex;
    align-items: flex-end;
    margin-bottom: 2rem;
}

.secDiv div span {
    font-size: 30px;
    margin-left: 1rem;
    color: black;
}

.secDiv p {
    display: flex;
    align-items: center;
    color: #475669;
}

.secDiv p svg {
    margin-right: 1rem;
}

img {
    width: 6rem;
    height: 6rem;
}
</style>
