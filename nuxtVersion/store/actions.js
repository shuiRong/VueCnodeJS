import axios from 'axios'

export default {
    getArticleLists(context) {
        context.commit('addArticleNumber')
        const number = context.getters.getArticleNumber
        axios.get(`https://cnodejs.org/api/v1/topics?page=1&limit=${number}&mdrender=false`)
            .then(res => {
                context.commit('addArticleLists', res.data.data)
            }).catch(res => {
                throw new Error('MaiSec.vue: ', res)
            })
    }
}
