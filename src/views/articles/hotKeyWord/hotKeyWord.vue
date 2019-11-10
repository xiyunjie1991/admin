<template>
  <div style="padding: 30px">
    <div>
      <h4>热门关键词热度排序</h4>
      <span>
        天数：
        <el-select v-model="selectedDay" size="small" style="width: 100px">

          <el-option v-for="(item,index) in days" :value="item" :label="item" :key="index"/>
        </el-select>

        显示限制：<el-select v-model="selectedLimit" size="small" style="width: 100px">
          <el-option v-for="(item,index) in limit" :value="item" :label="item" :key="index"/>
        </el-select>
        <el-button size="small" type="primary" @click="initData">搜索</el-button>
      </span>
      <div style="margin: 20px;">
        <span v-for="(item,index) in nowHotWord" :key="index" style="margin-top: 20px">
          <el-tag
            :color="colors[index]"
            style="color:#000;margin:  5px "
          >
            {{ item }}
          </el-tag>
        </span>
      </div>

      <h4>现有关键词列表</h4>
      <el-button size="small" type="primary" @click="upDateSort">更新排序</el-button>
      <div>
        <el-tag
          v-dragging="{list:hotList,item:item,group:'hotList'}"
          v-for="(item,index) in hotList"
          :key="index"
          style="margin: 5px"
          closable
          @click.native="openUpdateKey(item,index)"
          @close="openDelete(index)"
        >
          {{ item }}
        </el-tag>
        <el-button size="small" type="success" @click="addKey">添加</el-button>
      </div>

      <ensure-dialog ref="ensure" :title="'删除关键词'" :tip-msg="'确定要删除这个关键词吗'" @ensure="deleteHot"/>
      <update-key ref="updateKey" @success="updateKey"/>
    </div>

  </div>

</template>

<script>
import { FindArticleSearchHotKeywords, FindFeaturedArticleHotKeywords, UpdateFeaturedArticleHotKeywords } from '@/api/articles'
import ensureDialog from '@/components/ensureDialog'
import UpdateKey from './updateKey'
import msgUtil from '@/utils/msgUtil'
export default {
  name: 'HotKeyWord',
  components: { UpdateKey, ensureDialog },
  data() {
    return {
      nowHotWord: ['asd', 'zxc', 'asdasd'],
      hotList: ['asd', 'zxc'],
      days: [1, 5, 10, 15, 30],
      selectedDay: 1,
      limit: [10, 15, 20, 25],
      selectedLimit: 20,
      colors: []

    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      FindArticleSearchHotKeywords(this.selectedDay, this.selectedLimit).then(v => {
        if (v.data.status === 0) {
          this.nowHotWord = v.data.data
          this.colors = this.getItemColors(this.nowHotWord.length)
        }
      })
      FindFeaturedArticleHotKeywords().then(v => {
        this.hotList = v.data.data
      })
    },
    getItemColors(colorLevel) {
      const colors = []
      // 默认的最深颜色
      let red = 255
      let green = 69
      let blue = 0
      // 最浅颜色是239,239,239 比如：最浅颜色的red是 239 则差值为239-134=105
      const maxRed = 255
      const maxGreen = 255
      const maxBlue = 255
      let level = colorLevel
      while (level--) {
        colors.push('rgb(' + red + ',' + green + ',' + blue + ')')
        red += parseInt(maxRed / colorLevel)
        green += parseInt(maxGreen / colorLevel)
        blue += parseInt(maxBlue / colorLevel)
      }
      return colors
    },
    openDelete(index) {
      this.$refs.ensure.show(index)
    },
    upDateSort() {
      UpdateFeaturedArticleHotKeywords(this.hotList).then(v => {
        if (v.data.status === 0) {
          console.info('创建频道', v.data)
          this.$notify({
            title: '更新关键词成功',
            type: 'success'
          })
        }
      }).catch(e => {
        msgUtil.warning('更新关键词失败' + e)
      })
    },
    deleteHot(index) {
      this.hotList.splice(index, 1)
      UpdateFeaturedArticleHotKeywords(this.hotList).then(v => {
        if (v.data.status === 0) {
          console.info('创建频道', v.data)
          this.$notify({
            title: '更新关键词成功',
            type: 'success'
          })
        }
      }).catch(e => {
        msgUtil.warning('更新关键词失败' + e)
      })
    },
    openUpdateKey(item, index) {
      const msg = {}
      msg.names = this.hotList
      msg.name = item
      msg.index = index
      this.$refs.updateKey.show(msg)
    },
    addKey() {
      const msg = {}
      msg.names = this.hotList
      msg.name = ''
      msg.index = -1
      this.$refs.updateKey.show(msg)
    },
    updateKey(names) {
      this.hotList = names
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
