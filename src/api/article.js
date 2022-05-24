import request from '@/utils/request'

/**
 * 获取所有文章
 */
export const getArticleList = data => {
  return request({
    url: '/article/list',
    params: data
  })
}

/**
 * 修改排序
 */
export const articleSort = data => {
  return request({
    url: '/article/sort',
    method: 'POST',
    data
  })
}
