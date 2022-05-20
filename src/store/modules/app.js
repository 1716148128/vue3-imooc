import { getItem, setItem } from '@/utils/storeage'
import { LANG, TAGS_VIEW } from '@/constant'
export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'zh',
    tagsViewList: getItem(TAGS_VIEW) || []
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLanguage(state, lang) {
      setItem(LANG, lang)
      state.language = lang
    },
    /**
     * 添加 tags
     */
    addTagsViewList(state, tag) {
      // 处理重复的tag
      const isFind = state.tagsViewList.find(item => {
        return item.path === tag.path
      })
      if (!isFind) {
        state.tagsViewList.push(tag)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    },
    /**
     * 为指定的 tag 修改 title
     */
    changeTagsView(state, { index, tag }) {
      state.tagsViewList[index] = tag
      setItem(TAGS_VIEW, state.tagsViewList)
    },
    /**
     * tag 右键功能
     * @param { type: 'other' || 'right' || 'index' } payload
     */
    removeTagsView(state, payload) {
      if (payload.type === 'index') {
        state.tagsViewList.splice(payload.index, 1)
      } else if (payload.type === 'other') {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - 1
        )
        state.tagsViewList.splice(0, payload.index)
      } else if (payload.type === 'right') {
        state.tagsViewList.splice(payload.index, state.tagsViewList.length - 1)
      }
      setItem(TAGS_VIEW, state.tagsViewList)
    }
  }
}
