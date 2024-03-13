# uniapp-vue3-typescript-pinia-template

## 项目说明

此模版针对用 uni-app 、 Vue3 、 Typescript 、 pinia 、 vite 开发小程序创建。

## 配置信息

- ### 使用 [Angular](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit?pli=1) 提交规范。

  - `build` ：对构建系统或者外部依赖项进行了修改。
  - `ci` ：对 `CI` 配置文件或脚本进行了修改。
  - `docs` ：对文档进行了修改。
  - `feat` ：增加新的特征。
  - `fix` ：修复 `bug` 。
  - `pref` ：提高性能的代码更改。
  - `refactor` ：既不是修复 `bug` 也不是添加特征的代码重构。
  - `style` ：不影响代码含义的修改，比如空格、格式化、缺失的分号等。
  - `test` ：增加确实的测试或者矫正已存在的测试。

  > 示例：git commit -m 'feat: 新增 xx 功能' 。

- ### 配置小程序 `appid`

  - 将微信平台上的 `appid` 添加到 `manifest.json` 文件中 `mp-weixin` 下的 `appid` 中。

- ### `vite.config.ts` 配置路径别名，使用时直接用 `@` 替换 `./src` 。

  ```typescript
  export default defineConfig({
    // 省略其他代码...
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, './src')
        }
      ]
    }
  })
  ```

- ### 使用 `pinia-plugin-persistedstate` 持久化

  - 需要持久化的 `store` 需添加 `persist` ， 参照 `@/store/user.ts` 文件。

    ```typescript

      // user.ts
      export default defineStore('user', () => {
        // 省略其他 ...
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
    ```

- ### 路由配置

  - 新增页面后需在 `@/pages.json` 中对页面的路由进行配置。

    ```json
    {
      "easycom": {
        "autoscan": true,
        "custom": {
          // uni-ui 规则如下配置
          "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue",
          // 项目中自定义组建的自动导入
          "^q-(.*)": "@/components/q-$1/index.vue"
        }
      },
      "pages": [
        //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
        {
          "path": "pages/index/index",
          "style": {
            "navigationBarTitleText": "首页"
          }
        },
        {
          "path": "pages/login/index",
          "style": {
            "navigationBarTitleText": "登陆"
          }
        }
      ]
    }
    ```

- ### 使用 `easycom` 引入 `uni-app` 扩展组件

  - `page.json`

    ```json
    {
      "easycom": {
        "custom": {
          // uni-ui 规则如下配置
          "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue"
        }
      }
    }
    ```

- ### 使用 `easycom` 引入全局自定义组件

  - `page.json`

    ```json
    {
      "easycom": {
        "autoscan": true,
        "custom": {
          // 项目中自定义组建的自动导入
          "^q-(.*)": "@/components/q-$1/index.vue"
        }
      }
    }
    ```

  - 创建全局自定义组件

    - 需要在 `src` 下的 `components` 下创建。
    - 创建以 `q-` 开头文件夹。
    - 入口文件必须是 `index.vue`

  - 为全局组件添加 `typescript` 类型支持，将创建的全局自定义组件，添加到 `@/components/components.d.ts` 中。

  > 参考 `@/src/components/q-input` 组件

- ### 请求处理 `@/hook/request.ts`

  - `uni.addInterceptor` 拦截器

    - 为 `options.url` 添加 请求域名 `baseUrl` 。
    - 往 `Header` 里添加 `Authorization` 键，添加 `token` 。
    - 往 `Header` 里添加 `sourceType` 键, 区别请求的平台。

  - 添加 `useRequest hook` 封装 `uni.request` ，处理 `typescript` 类型支持问题。

    - `hook` 处理

      ```typescript
      interface QResponse<T> {
        success: boolean
        message: string
        data: T
      }

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
      ```

    - 泛型 `T` 为返回数据的类型，需要调用 `request` 方法时传递。

      ```typescript
      import useRequest from '@/hook/request'
      const { request } = useRequest()

      export type User = {
        name: string
        password: string
      }

      const { data } = await request<User[]>({
        method: 'GET',
        url: '/test/users'
      })
      ```
