<template>
  <div class="dialog-container">
    <el-dialog
      :visible.sync="visible"
      :show-close="false"
      modal
      width="800"
      center
    >
      <el-row type="flex" justify="space-between">
        <el-col align="left"><Strong class="title" style="font-size: 30px;">图片详情展示</Strong></el-col>
        <el-col align="center"/>
        <el-col :span="2" align="center"><div class="iconDiv"><i class="el-icon-error" style="font-size: 30px;" @click="cancel"/></div></el-col>
      </el-row>
      <el-row type="flex" justify="space-between">
        <el-col align="center">
          <img :src="url" style="box-shadow:4px 4px 10px  #2b3b4e; max-width: 750px;position: absolute;left: 50%;top:50%;transform: translateX(-50%) translateY(-50%)">
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Tuozhuai',
  components: {},
  data() {
    return {
      url: '',
      visible: false
    }
  },
  created() {

  },
  methods: {
    show(url) {
      this.url = url
      this.visible = true
    },
    cancel() {
      this.visible = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
