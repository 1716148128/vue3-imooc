<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">{{
        $t('msg.uploadExcel.upload')
      }}</el-button>
    </div>
    <input
      ref="excelUploadInput"
      type="file"
      class="excel-upload-input"
      accept=".xlsx,.xls"
      @change="handleChange"
    />
    <div
      class="drop"
      draggable="true"
      @drop.stop.prevent="handelDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragenter"
    >
      <i class="el-icon-upload"></i>
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup>
import XLSX from 'xlsx'
import { ref, defineProps } from 'vue'
import { getHeaderRow, isExcel } from './utils'
import { ElMessage } from 'element-plus'

const props = defineProps({
  // 上传 excel 之前的回调
  beforeUpload: Function,
  // 上传 excel 成功的回调
  onSuccess: Function
})

// 点击上传触发
const loading = ref(false)
const excelUploadInput = ref(null)

// 点击上传文件按钮触发
const handleUpload = () => {
  excelUploadInput.value.click()
}
// 选中文件后触发
const handleChange = e => {
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) return
  upload(rawFile)
}

// 触发上传
// 拖拽松手触发
const handelDrop = e => {
  // 如果当前文件上传中
  if (loading.value) return
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error('必须要有一个文件')
    return
  }
  const rawFile = files[0]
  if (!isExcel(rawFile)) {
    ElMessage.error('文件必须是 .xlsx, .xls, .csv 格式')
    return
  }
  upload(rawFile)
}
// 拖拽触发
const handleDragover = e => {
  // 用户拖拽后给用户的一个反馈
  e.dataTransfer.dropEffect = 'copy'
}

/**
 * 触发上传事件
 */
const upload = rawFile => {
  excelUploadInput.value.value = null
  // 如果没有指定上传前回调的话
  if (!props.beforeUpload) {
    readerData(rawFile)
    return
  }
  // 如果用户指定了上传前的回调，那么只有返回 true 的时候，才会执行对应的后续操作
  const before = props.beforeUpload(rawFile)
  if (before) {
  }
}

/**
 * 读取数据（异步）
 */
const readerData = rawFile => {
  loading.value = true
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    // 读取操作完成时触发
    reader.onload = e => {
      // 1. 获取到解析后的数据
      const data = e.target.result
      // 2. 利用 XLSX 对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 3. 获取第一张表格（工作铺）名称
      const firstSheetName = workbook.SheetNames[0]
      // 4. 读取 sheet1 （第一张表格）的数据
      const workSheet = workbook.Sheets[firstSheetName]
      // 5. 解析数据表头(就是第一行的数据)
      const header = getHeaderRow(workSheet)
      // 6. 解析数据体（全部数据）
      const results = XLSX.utils.sheet_to_json(workSheet)
      // 7. 传入解析之后的数据
      generateData({ header, results })
      // 8. 处理 loading
      loading.value = false
      // 9. 成功回调
      resolve()
    }

    reader.readAsArrayBuffer(rawFile)
  })
}

// 根据导入内容，生成数据
const generateData = excelData => {
  props.onSuccess && props.onSuccess(excelData)
}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
