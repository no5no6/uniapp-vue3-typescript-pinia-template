<template>
  <view>
    <input class="uni-input q-input" :placeholder="placeholder" />
  </view>
</template>

<script setup lang="ts">
defineProps(['placeholder'])
</script>

<style>
.q-input {
  border: 1px solid #6c757d;
  border-radius: 4px;
  padding: 8px 13px;
}
</style>
