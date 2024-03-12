import { createSSRApp } from 'vue'
import App from '@/App.vue'
import { piniaPlugin } from '@/store'
import '@/hook/request'

export function createApp() {
  const app = createSSRApp(App)

  app.use(piniaPlugin)

  return {
    app
  }
}
