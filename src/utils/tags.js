import { generateTitle } from '@/utils/i18n'

const whiteList = ['/login', '/404', '401']
export function isTags(path) {
  return whiteList.includes(path)
}

/**
 * 生成title
 */
export function getTitle(route) {
  let title = ''
  if (!route.meta) {
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = generateTitle(route.meta.title)
  }
  return title
}

export function tagslanguage(store) {
  return () => {
    store.getters.tagsViewList.forEach((route, index) => {
      store.commit('app/changeTagsView', {
        index,
        tag: {
          ...route,
          title: getTitle(route)
        }
      })
    })
  }
}
