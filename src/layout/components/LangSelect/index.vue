<template>
  <el-dropdown
    class="international"
    trigger="click"
    @command="handleSetLanguage"
  >
    <div>
      <el-tooltip :content="$t('msg.guide.langTitle')" :effect="effect">
        <div id="guide-lang">
          <svg-icon icon="language"></svg-icon>
        </div>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh"
          >中文</el-dropdown-item
        >
        <el-dropdown-item :disabled="language === 'en'" command="en"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { watchSwitchLang } from '@/utils/i18n'
import { tagslanguage } from '@/utils/tags'

defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: function (value) {
      return ['drak', 'light'].indexOf(value) !== -1
        ? ['drak', 'light'].indexOf(value)
        : 'dark'
    }
  }
})

const store = useStore()
const language = computed(() => store.getters.language)

// 切换语言的方法
const i18n = useI18n()
const handleSetLanguage = lang => {
  // 切换 il8n 的 locale
  i18n.locale.value = lang
  // 修改 vuex 中保存的 language
  store.commit('app/setLanguage', lang)
  // 提示
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}

watchSwitchLang(tagslanguage(store))
</script>

<style lang="scss" scoped></style>
