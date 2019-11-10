<template>
  <div class="dialog-container">
    <el-dialog
      :visible.sync="visible"
      :modal-append-to-body="false"
      :show-close="false"
      width="300px"
      center
    >
      <el-row type="flex" justify="space-between">
        <el-col align="left"><p class="title">{{ title }}</p></el-col>
        <el-col align="center"/>
        <el-col :span="2" align="center"><i style="color: #F56C6C;font-size: 20px;" class="el-icon-error " @click="cancel"/></el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12" ><p class="title2">{{ tipMsg }}</p></el-col>
      </el-row>
      <el-row :gutter="30" type="flex" align="middle" justify="center" >
        <el-col :span="8">
          <el-button size="small" type="primary" style="font-weight: 700" @click="ensure">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    },
    tipMsg: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      visible: false,
      obj: null
    }
  },
  created() {

  },
  methods: {
    show(obj) {
      this.obj = obj
      this.visible = true
    },
    cancel() {
      this.visible = false
    },
    ensure() {
      this.visible = false
      console.info('ensureDialog',this.obj)
      this.$emit('ensure', this.obj)
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.title{
  font-size: large;
}
</style>
