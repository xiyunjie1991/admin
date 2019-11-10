import { getToken, removeToken, setToken } from '@/utils/auth'
import { loginAccount } from '@/api/login'

const user = {
  state: {
    isLogin: !!localStorage.getItem('token'),
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    setLoginState(state, val) {
      state.isLogin = val;
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录

    // 登出
    logIn({ commit }, userForm) {
      console.info('logIn userForm', userForm)
      return loginAccount(JSON.stringify(userForm)).then(v => {

        if (v.data.status === 0) {
          const user = v.data.data
          commit('setLoginState', true)
          localStorage.setItem('token', user.token)
          console.info('action login user', user)
          commit('SET_TOKEN', user.token)
          commit('SET_NAME', user.phone)
          commit('SET_ROLES', ['admin'])
          commit('SET_AVATAR', user.icon)
          setToken(user.token)
          return true
        } else {
          return false
        }
      })
    },
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
