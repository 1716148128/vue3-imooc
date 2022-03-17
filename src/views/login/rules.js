// 注意： 组件的 i18n 和 单独 js 文件的 i18n 用法不一样
import il8n from '@/il8n'
export const validatePassword = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error(il8n.global.t('msg.login.passwordRule')))
    } else {
      callback()
    }
  }
}
