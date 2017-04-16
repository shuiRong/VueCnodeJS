<template>
    <div class='secDiv'>
        <div>
            <router-link :to='{name: "UserRoute",params:{name: userInfo.loginname}}'><img :src='userInfo.avatar_url'></router-link>
            <span>{{userInfo.loginname}}</span>
        </div>
        <p>分数：{{userInfo.score}}</p>
        <p>Github: https://github.com/{{userInfo.githubUsername}}</p>
    </div>
</template>

<script>
    export default {
        name: 'SideSection',
        data() {
            return {
                userInfo: {
                    avatar_url: '',
    
                },
            };
        },
        created() {
            this.$http({
                url: `https://cnodejs.org/api/v1${this.$route.path}`,
                method: 'get',
            }).then((res) => {
                const user = res.body.data.author.loginname;
                return this.$http({
                    url: `https://cnodejs.org/api/v1/user/${user}`,
                    method: 'get',
                });
            }).then((res) => {
                this.userInfo = res.body.data;
            }).catch((res) => {
                console.log('SideSec.vue :', res);
            });
        },
    };
</script>

<style scoped>
    .secDiv {
        width: 20%;
        height: 30rem;
        background: #fff;
        border: 1px solid #ddd;
        word-break: break-all;
        font-size: 21px;
        padding: 2rem;
    }
    
    img {
        width: 6rem;
        height: 6rem;
    }
</style>
