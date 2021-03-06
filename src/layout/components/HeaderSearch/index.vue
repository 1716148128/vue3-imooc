<template>
  <div :class="{ show: isShow }" class="header-search">
    <div
      @click.stop="onShowClick"
      style="display: inline-block"
      id="guide-search"
    >
      <svg-icon class-name="search-icon" icon="search"></svg-icon>
    </div>
    <!-- filterable: 实现搜索词匹配
         default-first-option：回车选择第一个搜索词
         remote：是否远程搜索
         remote-method：远程搜索的方法
         placeholder：input 默认展示值
    -->
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      :remote-method="querySearch"
      placeholder="search"
      @change="onSelectChange"
    >
      <!-- value: 选项的值
           label：选项的标签
       -->
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { filterRoutes } from '@/utils/route'
import { useRouter } from 'vue-router'
import { generateRoutes } from './FuseData'
import Fuse from 'fuse.js'
import { watchSwitchLang } from '@/utils/i18n'

// 数据源
const router = useRouter()
const searchPool = () => {
  const routes = filterRoutes(router.getRoutes())
  return generateRoutes(routes)
}

// 搜索库相关
let fuse
const initFuse = searchPoll => {
  fuse = new Fuse(searchPoll, {
    // 是否按优先级进行排序
    shouldSort: true,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表，这支持嵌套路径、加权搜索、在字符串和数组中搜索。
    // name: 搜索的键
    // weight：对应的权重
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}
initFuse(searchPool())

// 控制 search 展示
const isShow = ref(false)
const onShowClick = () => {
  isShow.value = !isShow.value
}

// search 相关
const search = ref('')
// 搜索方法
const searchOptions = ref([])
const querySearch = query => {
  if (query !== '') {
    searchOptions.value = fuse.search(query)
  } else {
    searchOptions.value = []
  }
}
// 选中回调
const onSelectChange = val => {
  search.value = val.title.join(' > ')
  router.push(val.path)
}

watch(isShow, val => {
  if (val) {
    headerSearchSelectRef.value.focus()
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})
// 关闭事件
const headerSearchSelectRef = ref(null)
const onClose = () => {
  headerSearchSelectRef.value.blur()
  isShow.value = false
  searchOptions.value = []
}

watchSwitchLang(() => {
  initFuse(searchPool())
})
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  ::v-deep .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
