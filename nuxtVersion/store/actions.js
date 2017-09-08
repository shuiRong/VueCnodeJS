import axios from 'axios'

export default {
    getArticleLists(context) {
        context.commit('addArticleNumber')
        const number = context.getters.getArticleNumber
        console.log('-->', number, '<--')
        axios.get(`https://cnodejs.org/api/v1/topics?page=1&limit=${number}&mdrender=false`)
            .then(res => {
                console.log('--length-->', res.data.data.length)
                context.commit('addArticleLists', res.data.data)
            }).catch(res => {
                throw new Error('MaiSec.vue: ', res)
            })
    },
    getUserInfo(context, url) {
        axios.get(url).then(res => {
            context.commit('addUserInfo', res.data)
        }).catch(res => {
            throw new Error('SideSec.vue :', res)
        })
    }
}
