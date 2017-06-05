<template>
  <div id="app">
    <cnode-head></cnode-head>
    <!--<router-link to="/main">/main</router-link>-->
    <router-view name="main"></router-view>
    <router-view name="side" ref="child"></router-view>
    <!--<main-sec></main-sec>-->
  </div>
</template>

<script>
  import cnodeHead from './components/cnodeHead.vue';
  //  import mainSec from './components/MainSec.vue';
  console.log(cnodeHead);
  export default {
    name: 'app',
    data () {
      return {
        authorName: ''
      }
    },
    components:{
      cnodeHead
    },
    watch:{
      authorName(val){
        console.log(this.$refs)
        this.$refs.child.name = val;
      }
    }
  }
</script>

<style lang="scss">
  html{
    font-size: 14px;
  }
  body{
    background-color: #e1e1e1;
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
