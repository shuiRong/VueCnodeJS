<template>
    <div class='secDiv'>
        <div>
            <router-link :to='"/user/" + userInfo.loginname'>
                <img :src='userInfo.avatar_url'>
                <span>{{userInfo.loginname}}</span>
            </router-link>
        </div>
        <p>
            <img src='~assets/money.png'>{{userInfo.score}}
        </p>
        <p>
            <img src='~assets/github.png'>
            <a :href='"https://github.com/"+userInfo.githubUsername' target='_blanket'>https://github.com/{{userInfo.githubUsername}}</a>
        </p>
    </div>
</template>

<script>
export default {
    name: 'SideSection',
    props: ['userInfo']
};
</script>

<style scoped>
.secDiv {
    width: 25%;
    height: 20rem;
    background: #E5E9F2;
    border: 1px solid #ddd;
    word-break: break-all;
    font-size: 21px;
    padding: 2rem;
    position: absolute;
    top: 7.142857142857143rem;
    right: 3.5714285714285716rem;
}

.secDiv div {
    display: flex;
    align-items: flex-end;
    margin-bottom: 2rem;
}

.secDiv div span {
    font-size: 30px;
    margin-left: 1rem;
    color: black;
}

.secDiv p {
    display: flex;
    align-items: center;
    color: #475669;
}

.secDiv p svg {
    margin-right: 1rem;
}

img {
    width: 6rem;
    height: 6rem;
}

p img {
    width: 2.6114285714285717rem;
    height: 2.6114285714285717rem;
    margin-right: 0.5rem;
}
</style>
