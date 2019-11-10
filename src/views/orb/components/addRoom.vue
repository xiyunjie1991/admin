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
        <el-col align="left"><p class="title">创建/更新频道</p></el-col>
        <el-col align="center"/>
        <el-col :span="2" align="center"><i style="color: #F56C6C;font-size: 20px;" class="el-icon-error " @click="cancel"/></el-col>
      </el-row>
      <el-row type="flex" justify="start">
        <el-col :span="12" ><p class="title2">频道名称</p></el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-input v-model="name"/>
        </el-col>
      </el-row>
      <el-row v-if="id===0" type="flex" justify="start">
        <el-col :span="12" ><p class="title2">频道分类</p></el-col>
      </el-row>
      <el-row v-if="id===0">
        <el-col :span="24">
          <el-select v-model="type">
            <el-option v-for="(item,index) in typeOptions" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="30" type="flex" align="middle" justify="center" >
        <el-col :span="8">
          <el-button type="primary" style=" margin-top: 30px ;width: 100%;font-weight: 700" @click="createRoom">创建/更新频道</el-button>
        </el-col>
      </el-row>

    </el-dialog>

  </div>
</template>

<script>
import { UpdateOrbRoom } from '@/api/orb'
import msgUtil from '@/utils/msgUtil'

export default {
  components: {},
  data() {
    return {
      group_id: 0,
      visible: false,
      name: '',
      type: 0,
      id: 0,
      typeOptions: [
        {
          label: '聊天频道',
          value: 1
        },
        {
          label: '内容频道',
          value: 0
        }
      ]
    }
  },
  created() {

  },
  methods: {
    show(msg) {
      this.visible = true
      this.group_id = msg.group_id
      this.type = msg.type
      this.id = msg.id
      this.name = msg.name
    },
    cancel() {
      this.visible = false
    },
    addSuccess() {
      this.visible = false
      this.$emit('success')
    },
    createRoom() {
      if (this.name === '') {
        this.$notify({
          title: '警告',
          message: '请输入频道名称',
          type: 'warning'
        })
        return
      }
      UpdateOrbRoom(this.id, this.group_id, this.name, this.type).then(v => {
        if (v.data.status === 0) {
          console.info('创建频道', v.data)
          this.$notify({
            title: '创建频道成功',
            type: 'success'
          })
          this.addSuccess()
        }
      }).catch(e => {
        msgUtil.warning('创建频道失败' + e)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
