import { login, getUserInfo } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem, removeAllItem } from '@/utils/storeage'
import { TOKEN } from '@/constant'
import router, { resetRouter } from '@/router'
import { setTimeStamp } from '@/utils/auth'
export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userinfo) {
      state.userInfo = userinfo
    }
  },
  actions: {
    /**
     * 登录请求动作
     */
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then(data => {
            // 设置 token
            this.commit('user/setToken', data.token)
            // 跳转主页
            router.push('/')
            // 保存登录时间
            setTimeStamp()
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    /**
     * 获取用户信息动作
     */
    async getUserInfo(context) {
      const res = await getUserInfo()
      this.commit('user/setUserInfo', res)
      return res
    },
    /**
     * 退出登录
     */
    logout() {
      resetRouter()
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAllItem()
      // 清理掉权限相关配置
      router.push('/login')
    }
  }
}
