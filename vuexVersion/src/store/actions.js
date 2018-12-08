import get from '@/assets/js/xhr.js'

export default {
    getArticleLists(context) {
        context.commit('addArticleNumber')
        let number = context.getters.getArticleNumber
        get('https://cnodejs.org/api/v1/topics', {
            page: 1,
            limit: number,
            mdrender: 'false',
        }).then((res) => {
            context.commit('addArticleLists', res.data)
        }).catch((res) => {
            console.log('MaiSec.vue: ', res);
        });
    },
    getArticle(context, url) {
        get(url).then((res) => {
            if(res.success === true) {
                context.commit('addArticle', res.data)
                context.commit('addArticleAuthor', res.data.author.loginname)
            } else {
                console.log('Sorry, Something wrong happened when getting the remote data')
            }
        }).catch((res) => {
            console.log('ArticleCom.vue: ', res);
        });
    },
    getUserInfo(context, url) {
        get(url).then((res) => {
            context.commit('addUserInfo', res.data)
        }).catch((res) => {
            console.log('SideSec.vue :', res);
        });
    }
}
