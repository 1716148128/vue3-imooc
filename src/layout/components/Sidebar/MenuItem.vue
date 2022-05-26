<template>
  <!-- element icon -->

  <!-- 非 element icon -->
  <svg-icon :icon="icon"></svg-icon>
  <!-- 文本 -->
  <span>{{ generateTitle(title) }}</span>
</template>

<script setup>
import { generateTitle } from '@/utils/i18n'
import { defineProps } from 'vue'
defineProps({
  title: {
    type: String,
    require: true
  },
  icon: {
    type: String,
    require: true
  }
})
</script>

<style lang="scss" scoped></style>
