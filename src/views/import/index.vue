<template>
  <upload-excel :onSuccess="onSuccess"></upload-excel>
</template>

<script setup>
import UploadExcel from '@/layout/components/UploadExcel'
import { USER_RELATIONS, formatDate } from './utils'
import { userBatchImport } from '@/api/user-manage'
import {} from 'vue'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const i18n = useI18n()
const router = useRouter()
const onSuccess = async ({ header, results }) => {
  const updaeData = generateData(results)
  await userBatchImport(updaeData)
  ElMessage.success({
    type: 'success',
    message: results.length + i18n.t('msg.excel.importSuccess')
  })
  router.push('/user/manage')
}

/**
 * 筛选数据
 */
const generateData = results => {
  const arr = []
  results.forEach(item => {
    const userInfo = {}
    Object.keys(item).forEach(key => {
      if (USER_RELATIONS[key] === 'openTime') {
        userInfo[USER_RELATIONS[key]] = formatDate(item[key])
      }
      userInfo[USER_RELATIONS[key]] = item[key]
    })
    arr.push(userInfo)
  })

  return arr
}
</script>

<style lang="scss" scoped></style>
