<template>
    <div class="secDiv" v-loading.lock="loading">
        <div>
            <router-link :to="{name: 'UserRoute', params:{name: userInfo.loginname}}">
                <img :src="userInfo.avatar_url" alt="">
            </router-link>
            <span>{{ userInfo.loginname }}</span>
        </div>
        <p>
            <icon name="score" scale="4"></icon>
            {{ userInfo.score }}
        </p>
        <p>
            <icon name="github" scale="4"></icon>
            https://github.com/{{ userInfo.githubUsername }}
        </p>
    </div>
</template>
<script>
    export default{
        name : 'SideSection',
        data(){
            return{
                userInfo : {
                    avatar_url : '',
                    loginname : 'temp'
                },
                loading: false,
                name:''
            }
        },
        watch:{
            name(v){
                this.fetchData(v);
            }
        },
        methods: {
            fetchData(v){
                this.loading = true;
                this.$ajax({
                    url:`https://cnodejs.org/api/v1/user/${v}`,
                    mathod : 'get'
                }).then((res) => {
                    this.loading = false;
                    console.log(res);
                    if(res.data.success){
                        this.userInfo = res.data.data;
                    }
                }).catch((res) => {
                    console.log(res);
                })
            }
        },
    }
</script>
<style scoped>
    .secDiv {
        width: 20%;
        height: 11rem;
        background: #E5E9F2;
        border: 1px solid #ddd;
        word-break: break-all;
        font-size: 21px;
        padding: 2rem;
        float: left;
    }

    .secDiv div {
        display: flex;
        align-items: center;
        margin-bottom: 2rem;
    }

    .secDiv div span {
        font-size: 1em;
        margin-left: 1rem;
        color: black;
    }

    .secDiv p {
        display: flex;
        align-items: center;
        color: #475669;
        font-size: 17px;
    }

    .secDiv p svg {
        margin-right: 1rem;
    }

    img {
      width: 3rem;
      height: 3rem;
    }
</style>
