import useStore from '@/store/index'

const baseUrl = 'https://q-api-xi.vercel.app'

interface QResponse<T> {
  success: boolean
  message: string
  data: T
}

uni.addInterceptor('request', {
  invoke(options: UniApp.RequestOptions) {
    const { user } = useStore()
    const token = user?.token
    console.log('token: ', token)

    if (!options.url.startsWith('https') || !options.url.startsWith('http')) options.url = baseUrl + options.url

    options.timeout = 10000

    options.header = {
      ...options.header,
      sourceType: 'wx'
    }

    if (token) Object.assign(options.header, { Authorization: token })
  },
  fail(err) {
    console.log('interceptor-fail', err)
  }
})

// 因为 uni 对 typescript 支持不好，所以封装了请求对象，让其对 typescript 友好。
export default function useRequest() {
  const request = <T>(options: UniApp.RequestOptions) => {
    return new Promise<QResponse<T>>((resolve, reject) => {
      uni.request({
        ...options,
        success(res) {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(res.data as QResponse<T>)
          } else if (res.statusCode === 401) {
            const { user } = useStore()
            user.clearToken()
            uni.navigateTo({ url: '/pages/login/index' })
          } else {
            uni.showToast({
              icon: 'none',
              title: (res.data as QResponse<T>).message || '请求错误'
            })
          }
        },
        fail(err) {
          uni.showToast({
            icon: 'none',
            title: '网络问题，请稍后重试'
          })

          reject(err)
        }
      })
    })
  }

  return { request }
}
