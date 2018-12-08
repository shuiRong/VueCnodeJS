<template>
    <div class="container">
        <h1 v-if="error.statusCode === 404">页面不存在2{{error.message}}</h1>
        <h1 v-else>应用发生错误异常11</h1>
        <nuxt-link to="/">首 页3</nuxt-link>
    </div>
</template>

<script>
export default {
    name: 'ErrorRoute',
    props: ['error'],
    layout: 'blog' // 你可以为错误页面指定自定义的布局
}
</script>