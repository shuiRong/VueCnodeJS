<template>
    <div class='head'>
        <router-link to='/'><img src='../assets/cnodejs.svg' title='cnodejs.svg'>
        </router-link>
        <router-link to='/about'><span>关于</span></router-link>
    </div>
</template>

<script>
    export default {
    
    };
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
    
    .head img {
        width: 10rem;
        height: 3.5rem;
        margin-left: 10rem;
    }
    
    .head span {
        display: inline-block;
        float: right;
        line-height: 3.6rem;
        margin-right: 10rem;
        font-weight: bold;
        font-size: 20px;
        color: white;
        letter-spacing: 2px;
    }
</style>
