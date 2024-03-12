import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'

import useUserStore from './user'

const pinia = createPinia()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const piniaPlugin = {
  install(app) {
    pinia.use(piniaPersist)

    app.use(pinia)

    // app.config.globalProperties.$store = {
    //   user: useUserStore()
    // }

    return app
  }
}

export default function () {
  return {
    user: useUserStore()
  }
}
