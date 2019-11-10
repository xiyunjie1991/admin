<template>
  <div class="group">
    <el-row type="flex" justify="space-between">
      <div style="display: inline-block"> 分类名称： <el-input v-model="childName" style="width: 200px;margin-bottom: 10px;" label="分类名称" @keyup.native="uploadName"/></div>
      <el-button size="mini" style="height: 30px;" type="primary">添加百科词条</el-button>
      <el-col :span="2" align="center"><i style="color: #F56C6C" class="el-icon-error " @click="deleteGroup()"/></el-col>
    </el-row>
  </div>

</template>

<script>
import { } from '@/api/game'
export default {
  components: {},
  props: {
    game_id: {
      type: Number,
      default: 0
    },
    group_id: {
      type: Number,
      default: 0
    },
    partenName: {
      type: String,
      default: ''
    }

  },
  data() {
    return {
      childName: this.partenName
    }
  },
  // watch: {
  //   partenName: function() { // 监听父组件的变化
  //     this.childName = this.partenName
  //   }
  // },
  created() {
    this.initData()
  },
  methods: {
    initData() {

    },
    uploadName() {
      console.info('uploadName')
      this.$emit('uploadName', {
        game_id: this.game_id,
        id: this.group_id,
        name: this.childName
      })
    },
    deleteGroup() {
      this.$emit('deleteGroup',
        {
          game_id: this.game_id,
          id: this.group_id
        }
      )
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
