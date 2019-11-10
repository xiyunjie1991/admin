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
        <el-col align="left"><p class="title">创建百科分类</p></el-col>
        <el-col align="center"/>
        <el-col :span="2" align="center"><i style="color: #F56C6C;font-size: 20px;" class="el-icon-error " @click="cancel"/></el-col>
      </el-row>
      <el-row type="flex" justify="start">
        <el-col :span="12" ><p class="title2">分类名称</p></el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-input v-model="name"/>
        </el-col>
      </el-row>
      <el-row :gutter="30" type="flex" align="middle" justify="center" >
        <el-col :span="8">
          <el-button type="primary" style=" margin-top: 30px ;width: 100%;font-weight: 700" @click="createGroup">创建分类</el-button>
        </el-col>
      </el-row>

    </el-dialog>

  </div>
</template>

<script>
import { CreateGamePediaGroup } from '@/api/game'
import msgUtil from '@/utils/msgUtil'

export default {
  components: {},
  props: {
    game_id: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      name: '',
      visible: false
    }
  },
  created() {

  },
  methods: {
    show() {
      this.visible = true
    },
    cancel() {
      this.visible = false
    },
    addSuccess() {
      this.visible = false
      this.$emit('addSuccess')
    },
    createGroup() {
      if (this.name === '') {
        this.$notify({
          title: '警告',
          message: '请输入分类名称',
          type: 'warning'
        })
        return
      }
      CreateGamePediaGroup(this.game_id, this.name).then(v => {
        if (v.data.status === 0) {
          console.info('创建分类', v.data)
          if (v.data.status === 0) {
            this.addSuccess()
          }
        }
      }).catch(e => {
        msgUtil.warning('创建分类失败' + e)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
