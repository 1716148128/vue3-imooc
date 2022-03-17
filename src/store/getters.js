import variables from '@/styles/variables.scss'
// 快速访问
const getters = {
  token: state => state.user.token,
  /**
   *
   * @returns true 表示用户信息存在
   */
  hasUserInfo: state => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  userInfo: state => state.user.userInfo,
  cssVar: state => variables,
  sidebarOpened: state => state.app.sidebarOpened,
  language: state => state.app.language
}
export default getters
