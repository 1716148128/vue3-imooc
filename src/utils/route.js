import path from 'path'
/**
 * 所有的子集路由
 */
const getChildrenRoutes = routes => {
  const result = []
  routes.forEach(route => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

/**
 * 得到的子集路由
 * 0: {path: '/profile', name: 'profile', meta: {…}, component: ƒ}
 * 1: {path: '/404', name: '404', component: ƒ}
 * 2: {path: '/401', name: '401', component: ƒ}
 * 3: {path: '/user/manage', name: 'userManage', meta: {…}, component: ƒ}
 * 4: {path: '/user/role', name: 'userRole', meta: {…}, component: ƒ}
 * 5: {path: '/user/permission', name: 'userPermission', meta: {…}, component: ƒ}
 * 6: {path: '/user/info/:id', name: 'userInfo', meta: {…}, component: ƒ}
 * 7: {path: '/user/import', name: 'import', meta: {…}, component: ƒ}
 * 8: {path: '/article/ranking', name: 'articleRanking', meta: {…}, component: ƒ}
 * 9: {path: '/article/:id', name: 'articleDetail', meta: {…}, component: ƒ}
 * 10: {path: '/article/create', name: 'articleCreate', meta: {…}, component: ƒ}
 * 11: {path: '/article/editor/:id', name: 'articleEditor', meta: {…}, component: ƒ}
 * length: 12
 */

/**
 * 找到顶级路由
 */
export const filterRoutes = routes => {
  // 获取所有子集路由
  const childrenRoutes = getChildrenRoutes(routes)
  // 根据子集路由进行查重操作

  return routes.filter(route => {
    return !childrenRoutes.find(childrenRoutes => {
      return childrenRoutes.path === route.path
    })
  })
}

/**
 * 得到的顶级路由
 * 0: {path: '/login', redirect: undefined, name: undefined, meta: {…}, aliasOf: undefined, …}
 * 1: {path: '/', redirect: '/profile', name: undefined, meta: {…}, aliasOf: undefined, …}
 * 2: {path: '/user', redirect: '/user/manage', name: undefined, meta: {…}, aliasOf: undefined, …}
 * 3: {path: '/article', redirect: '/article/ranking', name: undefined, meta: {…}, aliasOf: undefined, …}
 * length: 4
 */

function isNull(data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
}

/**
 * 根据 routes 数据，返回对应的 menu 规则数据
 */
export function generateMenus(routes, basePath = '') {
  const result = []
  // 遍历路由表
  routes.forEach(item => {
    // 不存在 children && 不存在 meta 直接 return
    if (isNull(item.meta) && isNull(item.children)) return
    // 存在 children 不存在 meta，进入迭代
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }

    // 合并 path 作为跳转路径 (path.resolve 合并除第一个参数外的参数)
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = result.find(item => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      // icon 与 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route)
      }
    }

    // 存在 children 进入迭代到children
    if (item.children) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}

/**
 *  0: {path: '/login',  meta: {}, children: []}
 *  第一次循环 result = []
 *  1: {path: '/',  meta: {}, children: [0: {path: '/profile', name: 'profile', meta: {…}, component: ƒ},1: {path: '/404', name: '404', component: ƒ},2: {path: '/401', name: '401', component: ƒ},length: 3]}
 *  第二次循环 result = [0: {path: '/profile'}]
 *  3: {}
 */
