import router from '@/router'
import store from '@/store'

// 用户没有权限也可以进入的目录
const whiteList = ['/login']

/**
 * 路由前置守卫
 */
router.beforeEach((to, from, next) => {
  // 1. 用户已登录，则不允许进入 login
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    // 2. 用户未登录，只允许进入 login
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
