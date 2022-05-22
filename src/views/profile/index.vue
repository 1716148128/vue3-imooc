<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <project-card
          class="project-card"
          :features="featureData"
        ></project-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <feature :features="featureData" />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
              <chapter />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author">
              <author />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import ProjectCard from './components/ProjectCard.vue'
// eslint-disable-next-line
import Feature from './components/Featrue.vue'
import Chapter from './components/Chapter.vue'
import Author from './components/Author.vue'
import { feature } from '@/api/user'
import { watchSwitchLang } from '@/utils/i18n'
import { ref } from 'vue'

const activeName = ref('feature')

const featureData = ref([])
const getFeatureData = async () => {
  featureData.value = await feature()
}
getFeatureData()

watchSwitchLang(getFeatureData)
</script>

<style lang="scss" scoped>
.project-card {
  margin-right: 20px;
}
</style>
