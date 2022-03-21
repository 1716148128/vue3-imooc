<template>
  <el-dropdown
    v-bind="$attrs"
    trigger="click"
    class="theme"
    @command="handleSetTheme"
  >
    <!-- 图标 -->
    <div>
      <el-tooltip :content="$t('msg.theme.themeChange')">
        <div>
          <svg-icon icon="change-theme"></svg-icon>
        </div>
      </el-tooltip>
    </div>
    <!-- menu -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">
          {{ $t('msg.theme.themeColorChange') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 弹出层 -->
  <div>
    <select-color v-model="selectColorVisible"></select-color>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SelectColor from './components/SelectColor.vue'

const handleSetTheme = () => {
  selectColorVisible.value = true
}

// dialog
const selectColorVisible = ref(false)
</script>

<style lang="scss" scoped></style>
