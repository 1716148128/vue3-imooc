/**
 * 1. 动态的列数据
 * 2. 被勾选的动态列数据
 * 3. table 的列数据
 */

import DynamicData from './DynamicData'
import { ref, watch } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'

// 暴露出动态的列数据
export const dynamicData = ref(DynamicData())

watchSwitchLang(() => {
  dynamicData.value = DynamicData()
  initSelectDynamicLable()
})

// 创建 被勾选的动态列数据
export const selectDynamicLable = ref([])
// 默认全部勾选
const initSelectDynamicLable = () => {
  selectDynamicLable.value = dynamicData.value.map(item => item.label)
}
initSelectDynamicLable()

// 声明 table 的列数据
export const tableColumns = ref([])
watch(
  selectDynamicLable,
  val => {
    tableColumns.value = []
    // 遍历列数据，从中判断出当前列是否是被勾选的
    const selectData = dynamicData.value.filter(item => {
      return val.includes(item.label)
    })
    tableColumns.value.push(...selectData)
  },
  {
    immediate: true
  }
)
