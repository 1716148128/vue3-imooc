import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import il8n from './il8n'
import installElementPlus from './plugins/element'
// 初始化样式表
import '@/styles/index.scss'
// 导入 svgIcon
import installIcons from '@/icons'
// 导入路由鉴权
import './permission'
// 全局属性
import installFilter from '@/filters'
import installDirective from '@/directives'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
installFilter(app)
installDirective(app)
app.use(store).use(router).use(il8n).mount('#app')
