<template>
    <div id="app">
        <cnode-head></cnode-head>
        <router-view name='main'></router-view>
        <router-view name='side' ref='child'></router-view>
    </div>
</template>

<script>
import cnodeHead from './components/cnodeHead';

export default {
    name: 'app',
    data() {
        return {
            authorName: '',
        };
    },
    components: {
        cnodeHead,
    },
    watch: {
        authorName(val) {
            this.$refs.child.name = val;
        },
    },
};
</script>

<style>
#app {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 6rem;
    display: flex;
    justify-content: space-around;
    font-size: 22px;
    word-break: break-all;
}

body,
div,
span,
a,
p,
ul,
li {
    margin: 0;
    padding: 0;
}
</style>
