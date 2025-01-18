import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
// 全部配置国际化 i18n，默认提示语言会变成中文
import zhCn from "element-plus/es/locale/lang/zh-cn";
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
// 引入pinia
import {createPinia} from 'pinia'
import {vueInstance} from './common/ajax.ts'
import {useStore} from "./store";

// 创建Vue应用
const app = createApp(App)
// 使用pinia
const pinia = createPinia()

// 使用插件
app.use(router)
app.use(ElementPlus, {locale: zhCn})
app.use(pinia)

// Element Plus图标注册
for (const [key, component] of Object.entries(Icons)) {
    app.component(key, component)
}

// 挂载pinia store
const store = useStore()

// 将实例和store绑定到VueInstance
vueInstance.instance = app
vueInstance.store = store

// 挂载实例
app.mount('#app')
