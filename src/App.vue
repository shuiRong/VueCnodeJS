<template>
    <div id="app">
        <router-view></router-view>
        <side-sec></side-sec>
    </div>
</template>

<script>
    import mainSec from './components/MainSec';
    import sideSec from './components/SideSec';

    export default {
        name: 'app',
        components: {
            mainSec,
            sideSec,
        },
    };
</script>

<style scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 20px;
        display: flex;
        justify-content: space-around;
    }

</style>
