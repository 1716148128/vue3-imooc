// 1. 导入所有的 svg 图标
// 2. 完成 SvgIcon 的全局注册
import SvgIcon from '@/components/SvgIcon'

// 我们可以通过 webpack 的 require.context API 来实现导入所有的 svg 图标
// https://webpack.docschina.org/guides/dependency-management/#requirecontext
// 这个函数传入三个参数：一个要搜索的目录，一个标记表示是否还搜索其子目录， 以及一个匹配文件的正则表达式。
const svgRequire = require.context('./svg', false, /\.svg$/)
// 上面返回了一个 Require 函数，这个函数可以接收一个参数：request 的参数，用于 require 的导入
// 此导出函数有三个属性，可以通过 svgRequire.keys() 获得所有的 svg 图标
// 遍历图标，把图标作为 request 参数传入到 svgRequire 导入函数中，完成本地 svg 图标
svgRequire.keys().forEach(svgIcon => svgRequire(svgIcon))
export default app => {
  app.component('svg-icon', SvgIcon)
}
