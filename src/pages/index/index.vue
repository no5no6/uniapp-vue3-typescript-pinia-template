<template>
  <view class="content">
    <view>{{ user.token }}</view>
    <button type="primary" @tap="handleSetToken">存储 token</button>
    <button type="warn" @tap="handleClearToken">删除 token</button>
    <button @tap="handleRequest">获取请求</button>
    <q-input class="line" placeholder="请输入用户名"></q-input>
  </view>
</template>

<script setup lang="ts">
import userStore from '@/store'
import useRequest from '@/hook/request'
import type { User } from '@/types/user'

const { user } = userStore()
const { request } = useRequest()

const handleSetToken = () => {
  user.setToken(`${Math.random() * 10000}`)
}

const handleClearToken = () => {
  user.clearToken()
}

const handleRequest = async () => {
  const { data } = await request<User[]>({
    method: 'GET',
    url: '/test/users'
  })
  console.log(data)
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.line {
  margin-bottom: 20px;
  display: block;
}
</style>
