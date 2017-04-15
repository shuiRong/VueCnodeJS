<template>
    <div class='secDiv'>
        <div v-for='item of content'>
            <img :src='item.author.avatar_url' :title='item.loginname'>
            <span>{{item.reply_count}}</span>
            <span>{{item.create_at}}</span>
            <router-link :to='{name:"ArticleRoute",params:{id:item.id}}'>{{item.title}}</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MainSection',
        data() {
            return {
                content: [],
            };
        },
        methods: {
            // dealAvatar(item) {
            //     this.avatar_url = item.author.avatar_url;
            //     this.title = item.author.loginname;
            //     this.id = item.id;
            // },
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
    }
    
    p {
        color: red;
    }
</style>
