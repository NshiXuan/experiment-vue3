import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import "normalize.css"
import "./assets/css/index.css"

import pinia from './stores'
import router from './router'

createApp(App).use(ElementPlus).use(router).use(pinia).mount('#app')
