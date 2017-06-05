<template>
    <div class="head">
        <router-link to="/" class="header-logo">
            <img src='../assets/cnodejs.svg' title='cnodejs.svg'>
        </router-link>
        <el-button type="text" @click="dialogVisible=true">关于</el-button>
        <el-dialog title="Vue.js模仿cnodejs社区" v-model="dialogVisible" size="tiny" :visible.sync="dialogVisible">
            <div class="dialogDiv">
                <span>
                    <strong>
                        作者：
                    </strong>
                </span>
                <a href="https://www.baidu.com" target="_blank">三木</a>
                <br>
                <span><strong>技术:</strong></span>
                <ul>
                    <li>Vue.js</li>
                    <li>Vue-router</li>
                    <li>Vue-axios</li>
                    <li>Vue-element</li>
                    <li>cnode API</li>
                </ul>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialogVisible:false
            }
        }
    }
</script>
<style scoped>
    .head {
        background: #324057;
        height: 3.6rem;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .header-logo{
        float: left;
    }

    .head img {
        width: 10rem;
        height: 3.5rem;
        margin-left: 10rem;
    }

    .head>button {
        display: inline-block;
        float: right;
        line-height: 3.6rem;
        margin-right: 10rem;
        font-weight: bold;
        font-size: 20px;
        color: white;
        letter-spacing: 2px;
        padding-top: 0.2rem;
    }

    .head .dialogDiv {
        font-size: 17px;
    }

    .head ul {
        margin-left: 1rem;
    }

    .head a {
        text-decoration: none;
        color: #58B7FF;
    }

    .head .star {
        font-weight: bold;
        color: #1D8CE0;
        font-size: 20px;
    }
</style>
