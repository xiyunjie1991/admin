const notification = {
  state: {
    OrbNeedGame: null
  },

  mutations: {
    insert_orbNeedGame: (state, game) => {
      console.info('insert_orbNeedGame mutations', game)
      state.OrbNeedGame = game
    }
  },

  actions: {
    insert_orbNeedGame(context, game) {
      console.info('insert_orbNeedGame actions', game)
      context.commit('insert_orbNeedGame', game)
    }
  }
}

export default notification
