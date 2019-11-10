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
        <el-col align="left"><p class="title">创建百科词条</p></el-col>
        <el-col align="center"/>
        <el-col :span="2" align="center"><i style="color: #F56C6C;font-size: 20px;" class="el-icon-error " @click="cancel"/></el-col>
      </el-row>
      <el-row type="flex" justify="start">
        <el-col :span="12" ><p class="title2">词条名称</p></el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-input v-model="name"/>
        </el-col>
      </el-row>
      <el-row type="flex" justify="start">
        <el-col :span="12" ><p class="title2">选择词条文章</p></el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-select
            v-model="article_id"
            :remote-method="remoteMethod"
            :loading="loading"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词">
            <el-option
              v-for="item in articles"
              :key="item.id"
              :label="item.title"
              :value="item.id"/>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="30" type="flex" align="middle" justify="center" >
        <el-col :span="8">
          <el-button type="primary" style=" margin-top: 30px ;width: 100%;font-weight: 700" @click="createItem">创建百科</el-button>
        </el-col>
      </el-row>
    </el-dialog>

  </div>
</template>

<script>
import { FindArticles } from '@/api/articles'
import { CreateGamePediaItem } from '@/api/game'
import msgUtil from '@/utils/msgUtil'
// import { FindArticles } from '@/api/game'
export default {
  components: {},
  props: {
    game_id: {
      type: Number,
      default: 0
    },
    obj: {
      type: Object,
      default: function() {
        return { id: 0, name: '', item: [] }
      }
    }
  },

  data() {
    return {
      name: '',
      visible: false,
      article_id: null,
      articles: []
    }
  },
  created() {
    this.remoteMethod('')

  },
  methods: {
    remoteMethod(query) {
      this.loading = true
      FindArticles({ query: query }).then(v => {
        this.loading = false
        this.articles = v.data.data.articles || []
      }).catch(e => {
        msgUtil.warning('查找文章失败' + e)
      })
    },
    show(item) {
      console.info('show item', item)
      this.name = item.name
      this.article_id = item.article_id
      this.visible = true
      this.remoteMethod(item.article_id)
    },
    cancel() {
      this.visible = false
    },
    addSuccess() {
      this.visible = false
      this.$emit('addSuccess')
    },
    createItem() {
      if (this.article_id === 0) {
        this.$notify({
          title: '警告',
          message: '请选择词条文章',
          type: 'warning'
        })
        return
      }
      if (this.name === '') {
        this.$notify({
          title: '警告',
          message: '请选择词条名称',
          type: 'warning'
        })
        return
      }
      CreateGamePediaItem(this.obj.id, this.name, this.article_id).then(v => {
        console.info('CreateGamePediaItem', v.data)
        if (v.data.status === 0) {
          console.info('创建词条成功', v.data)
          if (v.data.status === 0) {
            this.addSuccess()
          }
        }
      }).catch(e => {
        msgUtil.warning('创建游戏平台信息失败' + e)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
