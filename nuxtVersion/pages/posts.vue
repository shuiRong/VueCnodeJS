<template>
    <div class='post'>
        posts{{name}}
        <button @click="$store.commit('increment')">{{ $store.state.counter }}</button>
    </div>
</template>

<script>
export default {
    layout: 'blog',
    asyncData(context) {
        // called every time before loading the component
        return { name: 'World' }
    },
    fetch() {
        // The fetch method is used to fill the store before rendering the page
    },
    head() {
        // Set Meta Tags for this Page
        return { title: 'posttitle' }
    }
}
</script>