<template>
    <div class='secDiv' v-loading.lock='loading'>
        <div>
            <router-link :to='{name: "UserRoute",params:{name: userInfo.loginname}}'><img :src='userInfo.avatar_url'></router-link>
            <span>{{userInfo.loginname}}</span>
        </div>
        <p>
            <icon name='score' scale='4'></icon>{{userInfo.score}}</p>
        <p>
            <icon name='github' scale='4'></icon>https://github.com/{{userInfo.githubUsername}}</p>
    </div>
</template>

<script>
    export default {
        name: 'SideSection',
        data() {
            return {
                userInfo: {
                    avatar_url: '',
                    loginname: 'temp',
                },
                loading: true,
                name: '',
            };
        },
        watch: {
            userInfo(val) {
                if (val) {
                    this.loading = false;
                }
            },
            name(val) {
                this.$http({
                    url: `https://cnodejs.org/api/v1/user/${val}`,
                    method: 'get',
                }).then((res) => {
                    this.userInfo = res.data.data;
                }).catch((res) => {
                    console.log('SideSec.vue :', res);
                });
            },
        },
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
