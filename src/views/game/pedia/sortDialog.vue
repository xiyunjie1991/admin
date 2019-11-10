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
        <el-col align="left"><p class="title">词条排序</p></el-col>
        <el-col align="center"/>
        <el-col :span="2" align="center"><i style="color: #F56C6C;font-size: 20px;" class="el-icon-error " @click="cancel"/></el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-tag
            v-dragging="{ list: groups, item: item, group: 'items' }"
            v-for="item in groups"
            :key="item.id"
            style="margin: 5px;"
          >
            {{ item.name }}
          </el-tag>
        </el-col>
      </el-row>

      <el-row :gutter="30" type="flex" align="middle" justify="center" >
        <el-col :span="8">
          <!--<el-button type="primary" style=" margin-top: 30px ;width: 100%;font-weight: 700" @click="createItem">创建分类</el-button>-->
          <el-button type="primary" style=" margin-top: 30px ;width: 100%;font-weight: 700" @click="saveItem">保存排序</el-button>
        </el-col>
      </el-row>
    </el-dialog>

  </div>

</template>

<script>
import { UpdateGamePediaItems } from '@/api/game'
import msgUtil from '@/utils/msgUtil'
export default {
  components: {},
  data() {
    return {
      name: '',
      visible: false,
      groups: [],
      game_id: 0,
      group_id: 0
    }
  },
  created() {

  },
  mounted() {
    // 拖拽后 排序接口
    this.$dragging.$on('dragged', ({ value }) => {
    })
  },
  methods: {
    show(group) {
      this.visible = true
      this.groups = group.item
      this.name = group.name
      this.game_id = group.game_id
      this.group_id = group.id
    },
    cancel() {
      this.visible = false
    },
    addSuccess() {
      this.visible = false
      this.$emit('addSuccess')
    },
    saveItem() {
      UpdateGamePediaItems(this.group_id, this.groups).then(v => {
        console.info('UpdateGamePediaItems', v.data)
        this.$emit('saveSortSuccess')
        this.visible = false
      }).catch(e => {
        msgUtil.warning('更新游戏平台信息失败' + e)
      })
    }
    // createItem() {
    //   if (this.article_id === 0) {
    //     this.$notify({
    //       title: '警告',
    //       message: '请选择词条文章',
    //       type: 'warning'
    //     })
    //     return
    //   }
    //   if (this.name === '') {
    //     this.$notify({
    //       title: '警告',
    //       message: '请选择词条名称',
    //       type: 'warning'
    //     })
    //     return
    //   }
    //   CreateGamePediaItem(this.obj.id, this.name, this.article_id).then(v => {
    //     console.info('CreateGamePediaItem', v.data)
    //     if (v.data.status === 0) {
    //       console.info('创建词条成功', v.data)
    //       if (v.data.status === 0) {
    //         this.addSuccess()
    //       }
    //     }
    //   })
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
