import Sortable from 'sortablejs'
import { ref } from 'vue'
import { articleSort } from '@/api/article'
import { ElMessage } from 'element-plus'
import i18n from '@/il8n'

export const tableRef = ref(null)

export const initSortable = (tableData, cb) => {
  const el = tableRef.value.$el.querySelector(
    '.el-table__body-wrapper > table > tbody'
  )

  // 1. 要拖拽的元素
  // 2. 配置对象
  Sortable.create(el, {
    // 拖拽时的类名
    ghostClass: 'sortable-ghost',
    // 拖拽结束的回调方法
    async onEnd(event) {
      const { newIndex, oldIndex } = event
      await articleSort({
        initRanking: tableData.value[oldIndex].ranking,
        finalRanking: tableData.value[newIndex].ranking
      })
      ElMessage.success(i18n.global.t('msg.article.sortSuccess'))

      cb && cb()
    }
  })
}
