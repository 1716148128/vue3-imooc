import { generateColors } from '@/utils/theme'
import { getItem } from '@/utils/storeage'
import { MAIN_COLOR } from '@/constant'
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
  cssVar: state => ({
    ...state.theme.variables,
    ...generateColors(getItem(MAIN_COLOR))
  }),
  sidebarOpened: state => state.app.sidebarOpened,
  language: state => state.app.language,
  mainColor: state => state.theme.mainColor,
  tagsViewList: state => state.app.tagsViewList
}
export default getters
