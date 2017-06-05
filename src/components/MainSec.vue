<template>
    <div class="secDiv" v-loading.fullscreen.lock="loading">
        <el-row v-for="item in content" type="flex"  justify="space-between" :key="item.id">
            <el-col :span="1">
                <router-link :to="{ name: 'UserRoute', params : { name : item.author.loginname } }">
                    <img :src="item.author.avatar_url" :title="item.author.loginname" alt="">
                </router-link>
            </el-col>

              <el-col class="stuff" :span="3">
                  <span>{{item.reply_count}}</span>
                  <span>/</span>
                  <span>{{item.visit_count}}</span>
                  <!--<span>创建于：{{item.create_at | dealTime}}</span>-->
              </el-col>

              <el-col v-if="item.top" class="tag put_good" :span="1">置顶</el-col>
              <el-col v-else class="tag topiclist-tab" :span="1">{{ item.tab | tabFilter }}</el-col>
              <el-col :span="16" class="textDiv">
                  <router-link :to="{name:'ArticleRoute',params:{topic:item.id}}">{{item.title}}</router-link>
              </el-col>

              <el-col :span="3" class="last-reply">{{ item.last_reply_at | lastReplyFilter }}</el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        name:'MainSection',
        data(){
            return{
                content:[],
                limit : 0,
                loading: false,
                loadNum : 20
            }
        },
        methods:{
            scrollMethod(){
                const sumH = document.body.scrollHeight;
                const viewH = document.documentElement.clientHeight;
                const scrollH = document.body.scrollTop;
                if(viewH + scrollH === sumH){
                    this.getData();
                }
            },
            getData(){
                this.limit += this.loadNum;
                this.loading = true;
                this.$ajax({
                    url:'https://cnodejs.org/api/v1/topics',
                    method:'get',
                    params:{
                        page:1,
                        limit:this.limit,
                        mdrender:'false'
                    }
                }).then((res) => {
                    this.loading = false;
                    console.log(res)
                    this.content = res.data.data;
                }).catch((res) => {
                    this.loading = false;
                    console.log(res);
                })
            }

        },
        mounted(){
            window.addEventListener('scroll', this.scrollMethod)
        },
        filters:{
            dealTime(t){
                return String(t).match(/.{10}/)[0];
            },
            tabFilter(v){
                switch (v){
                    case 'ask':
                        return '问答';
                        break;
                    case 'share':
                        return '分享';
                        break;
                    case 'job':
                        return '招聘';
                        break;
                    case 'good':
                        return '精华';
                        break;
                }
            },
            lastReplyFilter(t){
                var time = String(t).match(/.{16}/)[0].replace(/[T]/, ' ');
                return time;
            }

        },
        created(){
            this.getData()
        }

    }
</script>
<style scoped>
    .secDiv {
        width: 90%;
        background: #F9FAFC;
        border: 1px solid #ddd;
        /*display: flex;*/
        /*flex-direction: column;*/
        font-size: 22px;
        min-height: 40rem;
        margin: 5rem auto;
        border-radius: 3px;
    }

    a {
        text-decoration: none;
    }
    .topiclist-tab{
        background-color: #e5e5e5;
        color: #999;
    }
    .tag{

        font-size: 12px;
        padding: 2px 4px;
        border-radius: 3px;
        width: 35px;
        height: 20px;
        white-space: nowrap;
    }
    .put_good{
        background: #80bd01;
        color: #fff;
    }
    .secDiv>div {
        align-items: center;
        border-bottom: 2px solid #C0CCDA;
        padding: 7px;
    }
    .last-reply{
        font-size: 14px;
    }
    .secDiv>div img {
        width: 30px;
        height: 30px;
        border-radius: 3px;
        vertical-align: middle;
    }

    .textDiv {
        /*display: flex;*/
        /*flex-direction: row;*/
        /*align-items: center;*/
        /*justify-content: flex-start;*/
        /*width: 96%;*/
        text-align: left;
        overflow: hidden;
        display: flex;
    }

    .textDiv a {
        color: black;
        font-size: 0.7em;
        margin-left: 1em;
        display: inline-block;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
    }

    .textDiv a:visited {
        color: grey;
    }

    .stuff {
        width:100px;
        font-size: 14px;
        color: #8492A6;
    }

    .stuff span:first-child {
        color:#9e78c0;
    }
</style>
