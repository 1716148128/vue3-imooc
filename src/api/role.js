import request from '@/utils/request'

/**
 * 获取所有角色
 */
export const roleList = () => {
  return request({
    url: '/role/list'
  })
}

/**
 * 获取当前角色对应权限
 */
export const rolePermission = roleId => {
  return request({
    url: `/role/permission/${roleId}`
  })
}

/**
 * 为角色修改权限
 */
export const distributePermission = data => {
  return request({
    url: '/role/distribute-permission',
    method: 'POST',
    data
  })
}
