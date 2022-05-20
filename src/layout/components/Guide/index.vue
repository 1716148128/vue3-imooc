<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.guide')">
      <div @click="onClick" id="guide-start">
        <svg-icon icon="guide"></svg-icon>
      </div>
    </el-tooltip>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { useI18n } from 'vue-i18n'
import steps from './steps'

const i18n = useI18n()

let driver = null
onMounted(() => {
  driver = new Driver({
    // 禁止点击蒙版关闭
    allowClose: false,
    // 关闭
    closeBtnText: i18n.t('msg.guide.close'),
    // 下一个
    nextBtnText: i18n.t('msg.guide.next'),
    // 上一个
    prevBtnText: i18n.t('msg.guide.prev')
  })
})

const onClick = () => {
  driver.defineSteps(steps(i18n))
  driver.start()
}
</script>

<style lang="scss" scoped></style>
