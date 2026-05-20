import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import App from './App.vue'
import { router } from './router/index.js'
import './styles/main.scss'

createApp(App).use(createHead()).use(router).mount('#app')
