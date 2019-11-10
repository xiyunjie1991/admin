import Cookies from 'js-cookie'

const tagViews = {
  state: {
    tagViews: []
  },
  mutations: {
    insertTagsView: (state, view) => {

      if (state.tagViews.some(v => v.path === view.path)) return
      state.tagViews.push(
        Object.assign({}, view, {
          title: view.meta.title || 'no-name'
        })
      )
    },
    deleteTagsView: (state, view) => {
      for (const [i, v] of state.tagViews.entries()) {
        if (v.path === view.path) {
          state.tagViews.splice(i, 1)
          break
        }
      }
    }
  },
  actions: {
    insertTagsView: ({ commit }, view) => {
      commit('insertTagsView', view)
    },
    deleteTagsView({ commit, state }, view) {
      return new Promise(resolve => {
        commit('deleteTagsView', view)
        resolve([...state.tagViews])
      })
    },
  }
}

export default tagViews
