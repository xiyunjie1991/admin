import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import notification from './modules/notification'
import tagViews from './modules/tagViews'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    notification,
    tagViews
  },
  getters
})

export default store
