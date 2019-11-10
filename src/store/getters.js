const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  OrbNeedGame: state => state.notification.OrbNeedGame,
  tagViews: state => state.tagViews.tagViews,

}
export default getters
