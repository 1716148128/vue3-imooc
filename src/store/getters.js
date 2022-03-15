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
  userInfo: state => state.user.userInfo
}
export default getters
