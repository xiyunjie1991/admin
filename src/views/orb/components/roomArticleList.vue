<template>
  <div >
    <div style="margin-top: 10px;">频道名称：{{ name }}</div>

    <span>
      <el-input v-model="listQuery.query" style="margin: 10px; width: 150px;" size="small" placeholder="请输入文章标题" />
      <el-button type="primary" size="small" @click="searchArticle" >搜索</el-button>
      <el-select
        v-model="article_id"
        :remote-method="remoteMethod"
        :loading="loading"
        size="small"
        no-match-text="没有当前结果"
        filterable
        remote
        style="margin: 10px;width: 150px;"
        reserve-keyword
        placeholder="请输入关键词"
      >
        <el-option
          v-for="item in articles"
          :key="item.id"
          :label="item.title"
          :value="item.id"/>
      </el-select>
    </span>

    <!--<el-button type="primary" size="small" @click="searchArticle" >搜索</el-button>-->
    <el-button size="small" type="primary" @click="addArticle">添加文章</el-button>
    <!--<el-col :span="5" >-->

    <!--</el-button>-->
    <!--</el-col>-->

    <el-table v-loading="listLoading" :data="list" border highlight-current-row >
      <el-table-column align="center" label="文章名称">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="推送与移除">
        <template slot-scope="scope">
          <el-button v-if="scope.row.featured === false" type="primary" size="small" @click="openPushToFeature(scope.row)">推送到资讯</el-button>
          <el-button v-if="scope.row.featured === true" type="danger" size="small" @click="openRemoveFeature(scope.row.id)">从推送中移除</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="danger" @click="openRemove(scope.row.id)">从内容频道中移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :limit="listQuery.page_size" :page.sync="listQuery.page" :count.sync="listQuery.page_size" @pagination="initData" />

    <ensure-dialog ref="yichu" :title="'从推送移除'" :tip-msg="'确认要从资讯列表移除这篇资讯吗'" @ensure="RemoveFeature"/>
    <ensure-dialog ref="tuisong" :title="'推送'" :tip-msg="'确认要将这篇文章推送到资讯吗'" @ensure="pushToFeature"/>
    <ensure-dialog ref="roomYiChu" :title="'频道中移除文章'" :tip-msg="'确认要将这篇文章从频道中移除码'" @ensure="remove"/>
  </div>
</template>

<script>
import { UpdateOrbRoom, CreateOrbRoom_Article, FindOrbRoom_Articles, RemoveOrbRoom_Article, GetOrbRoom } from '@/api/orb'
import { FindArticles, CreateFeaturedArticle, RemoveFeaturedArticle } from '@/api/articles'
import msgUtil from '@/utils/msgUtil'
import ensureDialog from '@/components/ensureDialog'
import Pagination from '@/components/Pagination/index'
export default {
  components: { Pagination, ensureDialog },
  data() {
    return {
      removeId: 0,
      group_id: 0,
      visible: false,
      name: '',
      type: 0,
      removeVis: false,
      id: 0,
      listLoading: true,
      article_id: null,
      articles: [],
      listQuery: {
        page: 1,
        page_size: 10,
        query: ''
      },
      list: null,
      total: 0
    }
  },
  created() {
    const id = this.$route.params.id
    this.id = Number(id)
    if (this.$route.query.name) {
      this.listQuery.query = this.$route.query.name
    }
    this.initData()
  },
  methods: {
    openRemove(id) {
      console.info('roomYiChu', id)
      this.$refs.roomYiChu.show(id)
    },
    openRemoveFeature(id) {
      console.info('openRemoveFeature', id)
      this.$refs.yichu.show(id)
    },
    RemoveFeature(id) {
      console.info('RemoveFeature', id)
      RemoveFeaturedArticle(id).then(v => {
        if (v.data.status === 0) {
          msgUtil.show('取消推送成功')
          this.initData()
        }
      })
      // this.removeId = id
      // this.removeVis = true
    },
    openPushToFeature(item) {
      this.$refs.tuisong.show(item)
    },
    pushToFeature(item) {
      console.info('pushToFeature', item)
      CreateFeaturedArticle(item.room_id, item.id).then(v => {
        if (v.data.status === 0) {
          msgUtil.show('推送成功')
          this.initData()
        }
      })
    },
    initData() {
      GetOrbRoom(this.id).then(v => {
        if (v.data.status === 0) {
          this.name = v.data.data.name || ''
        }
      })

      FindOrbRoom_Articles(this.listQuery.query, this.listQuery.page, this.listQuery.page_size, this.id).then(v => {
        if (v.data.status === 0) {
          console.info(v.data.data.articles)
          const gList = v.data.data.articles || []
          this.total = v.data.data.total || 0
          this.list = gList
        }
        this.remoteMethod('')
        this.listLoading = false
      })
    },

    remove(article_id) {
      RemoveOrbRoom_Article(this.id, article_id).then(v => {
        if (v.data.status === 0) {
          this.initData()
        }
      })
    },
    remoteMethod(query) {
      this.loading = true
      FindArticles({ query: query }).then(v => {
        this.loading = false
        this.articles = v.data.data.articles || []
      })
    },
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
    addArticle() {
      console.info('addArticle this.article_id', this.article_id)
      console.info('addArticle this.id', this.id)
      CreateOrbRoom_Article(this.id, this.article_id).then(v => {
        console.info('CreateOrbRoom_Articles', v.data)
        if (v.data.status === 0) {
          this.initData()
        } else if (v.data.status === 15001) {
          this.$notify({
            title: '警告',
            message: '添加的文章已经存在',
            type: 'warning'
          })
        }
      })
    },
    searchArticle() {
      this.initData()
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
