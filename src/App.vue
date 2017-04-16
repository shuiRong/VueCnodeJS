<template>
    <div id="app">
        <router-view name='main'></router-view>
        <router-view name='side'></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
    };
</script>

<style >
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 20px;
        display: flex;
        justify-content: space-around;
        font-size: 23px;
        word-break: break-all;
    }
    
    * {
        margin: 0;
        padding: 0;
    }
</style>
