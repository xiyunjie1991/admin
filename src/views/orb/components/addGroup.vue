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
        <el-col align="left"><p class="title">创建/更新频道分组</p></el-col>
        <el-col align="center"/>
        <el-col :span="2" align="center"><i style="color: #F56C6C;font-size: 20px;" class="el-icon-error " @click="cancel"/></el-col>
      </el-row>
      <el-row type="flex" justify="start">
        <el-col :span="12" ><p class="title2">分组名称</p></el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-input v-model="name"/>
        </el-col>
      </el-row>
      <el-row :gutter="30" type="flex" align="middle" justify="center" >
        <el-col :span="8">
          <el-button type="primary" style=" margin-top: 30px ;width: 100%;font-weight: 700" @click="createGroup">创建/更新分组</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>

</template>

<script>
import { UpdateOrbRoomGroup } from '@/api/orb'
import msgUtil from '@/utils/msgUtil'
export default {
  name: 'Tuozhuai',
  components: {},
  data() {
    return {
      orb_id: 0,
      name: '',
      id: 0,
      visible: false
    }
  },
  created() {

  },
  methods: {
    show(msg) {
      this.visible = true
      this.orb_id = msg.orb_id
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
    createGroup() {
      UpdateOrbRoomGroup(this.id, this.orb_id, this.name).then(v => {
        console.info(v.data)
        if (v.data.status === 0) {
          console.info('创建分组', v.data)
          this.$notify({
            title: '创建分组成功',
            type: 'success'
          })
          this.addSuccess()
        }
      }).catch(e => {
        msgUtil.warning('创建分组失败' + e)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
