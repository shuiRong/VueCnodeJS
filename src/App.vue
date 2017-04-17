<template>
    <div id="app">
        <cnode-head></cnode-head>
        <router-view name='main'></router-view>
        <router-view name='side'></router-view>
    </div>
</template>

<script>
    import cnodeHead from './components/cnodeHead';

    export default {
        name: 'app',
        components: {
            cnodeHead,
        },
    };
</script>

<style >
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 6rem;
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
