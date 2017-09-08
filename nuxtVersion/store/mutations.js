export default {
    addArticleLists(state, articleLists) {
        state.articleLists = articleLists
    },
    addArticleNumber(state) {
        state.articleNumber += 10
    },
    addArticle(state, article) {
        state.article = article
    },
    addArticleAuthor(state, loginName) {
        state.articleAuthor = loginName
    },
    addUserInfo(state, userInfo) {
        state.userInfo = userInfo
    }
}
