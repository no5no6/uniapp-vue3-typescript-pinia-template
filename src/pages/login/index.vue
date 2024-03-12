<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view>
      <q-input class="line" placeholder="请输入用户名"></q-input>
      <q-input class="line" placeholder="请输入密码"></q-input>
      <button class="line" type="primary">登陆</button>
      <button type="default">注册</button>
    </view>
  </view>
</template>

<script setup lang="ts">
// import qInput from '../../components/input/index.vue'
// import { ref } from 'vue'

// const title = ref('Hello')
// const a = '123'
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.line {
  margin-bottom: 20px;
  display: block;
}
</style>
