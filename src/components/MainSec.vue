<template>
    <div class='secDiv'>
        <p> main sec </p>
    </div>
</template>

<script>
    export default {
        name: 'MainSection',
        data() {
            return {
                content: '',
            };
        },
    };
</script>

<style scoped>
    .secDiv{
        width: 60%;
        height: 40rem;
        background: #fff;
        border: 1px solid #ddd;
        
    }
    p {
        color: red;
    }
</style>
