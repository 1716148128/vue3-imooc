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

/**
 * 删除文章
 */
export const deleteArticle = acticleId => {
  return request({
    url: `/article/delete/${acticleId}`
  })
}

/**
 * 文章详情
 */
export const articleDetail = acticleId => {
  return request({
    url: `/article/${acticleId}`
  })
}
