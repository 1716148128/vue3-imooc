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

/**
 * 创建详情
 */
export const createArticle = data => {
  return request({
    url: '/article/create',
    method: 'POST',
    data
  })
}

/**
 * 编辑文章
 */
export const editorArticle = data => {
  return request({
    url: '/article/edit',
    method: 'POST',
    data
  })
}
