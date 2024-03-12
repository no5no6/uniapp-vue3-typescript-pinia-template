import { defineStore } from 'pinia'
import { ref } from 'vue'

export default defineStore(
  'user',
  () => {
    const token = ref<string | undefined>()

    const setToken = (value: string) => {
      token.value = value
    }

    const clearToken = () => {
      token.value = undefined
    }

    return {
      token,
      setToken,
      clearToken
    }
  },
  {
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key)
        },
        setItem(key, value) {
          uni.setStorageSync(key, value)
        }
      }
    }
  }
)
