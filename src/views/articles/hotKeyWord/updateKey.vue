<template>
  <div class="dialog-container">
    <el-dialog
      :visible.sync="visible"
      :modal-append-to-body="false"
      :show-close="false"
      width="500px"
      center
    >
      <el-row type="flex" justify="space-between">
        <el-col align="left"><p class="title">创建/更新关键字</p></el-col>
        <el-col align="center"/>
        <el-col :span="2" align="center"><i style="color: #F56C6C;font-size: 20px;" class="el-icon-error " @click="cancel"/></el-col>
      </el-row>
      <el-row type="flex" justify="start">
        <el-col :span="12" ><p class="title2">关键词</p></el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-input v-model="name"/>
        </el-col>
      </el-row>
      <el-row :gutter="30" type="flex" align="middle" justify="center" >
        <el-col :span="8">
          <el-button type="primary" style=" margin-top: 30px ;font-weight: 700" @click="createKey">创建/更新关键词</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { UpdateFeaturedArticleHotKeywords } from '@/api/articles'
import msgUtil from '@/utils/msgUtil'

export default {
  components: {},
  data() {
    return {
      visible: false,
      name: '',
      names: [],
      index: 0
    }
  },
  created() {

  },
  methods: {
    show(msg) {
      this.visible = true
      this.name = msg.name
      this.index = msg.index
      this.names = msg.names
    },
    cancel() {
      this.visible = false
    },
    addSuccess() {
      this.visible = false
      console.info('addSuccess',this.names)
      this.$emit('success', this.names)
    },
    createKey() {
      if (this.name === '') {
        this.$notify({
          title: '警告',
          message: '请输入关键词',
          type: 'warning'
        })
        return
      }
      if (this.index === -1) {
        this.names.push(this.name)
      } else {
        this.names[this.index] = this.name
      }
      UpdateFeaturedArticleHotKeywords(this.names).then(v => {
        if (v.data.status === 0) {
          console.info('创建频道', v.data)
          this.$notify({
            title: '更新关键词成功',
            type: 'success'
          })
          this.addSuccess()
        }
      }).catch(e => {
        msgUtil.warning('更新关键词失败' + e)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
