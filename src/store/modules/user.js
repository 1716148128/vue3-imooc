import { login } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem } from '@/utils/storeage'
import { TOKEN } from '@/constant'
import router from '@/router'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) | ''
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
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
            console.log(data)
            // 设置 token
            this.commit('user/setToken', data.token)
            // 跳转主页
            router.push('/')
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}
