// 因为使用 easycom 自动引入项目中的自定义组建，相比直接 import 引入组建会丢失类型。以下为自定义组建的类型补充

import qInput from '@/components/q-input/index.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    qInput: typeof qInput
  }
}
