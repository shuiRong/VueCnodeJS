// 注意： 在其他地方调用vuex的getters时不需要括号：
//       这样：
//       store.getters.getArticleLists 
//       而不是：
//       store.getters.getArticleLists() 


export default {
    getArticleLists: state => state.articleLists,
    getArticleNumber: state => state.articleNumber,
    getArticles: state => state.article,
    getArticleAuthor: state => state.articleAuthor,
    getUserInfo: state => state.userInfo,
}
