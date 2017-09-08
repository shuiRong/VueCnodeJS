import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import state from './state'
import getters from './getters'

const createStore = () => new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default createStore
