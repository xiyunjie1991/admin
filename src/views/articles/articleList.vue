<template>
  <div class="app-container">
    <el-row style="margin-bottom: 20px">
      <el-col :span="3">
        <div>
          <el-input v-model="listQuery.query" size="small" placeholder="请输入要搜索的文章" p/>
        </div>
      </el-col>
      <el-col :span="5" style="margin-left: 20px">
        <div>
          <span><el-button :disabled="(listQuery.query===search)" size="small" type="primary" @click="initData">搜索</el-button>
            <router-link :to="'/article/articleEditor/0'">
              <el-button size="small" type="primary" >添加文章</el-button>
            </router-link>
          </span>
        </div>
      </el-col>
    </el-row>

    <el-table v-loading="listLoading" :data="list" border highlight-current-row >
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="文章名称">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="封面图">
        <template slot-scope="scope">
          <img v-if="scope.row.picture.length>0" :src="baseUrl + scope.row.picture+'?width=80'" style="max-width: 80px;">
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否有封面视频">
        <template slot-scope="scope">
          <span v-if="scope.row.video !== '' ">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="点赞数">
        <template slot-scope="scope">
          <span>{{ scope.row.like_count }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="评论数">
        <template slot-scope="scope">
          <span>{{ scope.row.comment_count }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="编辑" >
        <!--<template v-if="scope.row.type === 0" slot-scope="scope">-->
        <template slot-scope="scope">

          <el-dropdown>
            <span
              type="primary"
              style=" cursor: pointer;
              color: #409EFF;">
              更多操作<i class="el-icon-arrow-down el-icon--right"/>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link :to="'/article/articleEditor/'+scope.row.id">
                  <p >编辑文章</p>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <a :href="'https://t.pog.ltd/article/' + scope.row.id" target="_blank">
                  <p >文章预览</p>
                </a>
              </el-dropdown-item>
              <el-dropdown-item>
                <p style="color:red;" @click="openDeleteArticle(scope.row.id,scope.row.title)">删除文章</p>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :limit="listQuery.page_size" :page.sync="listQuery.page" :count.sync="listQuery.page_size" @pagination="initData" />
    <ensure-dialog ref="ensure" :title="'删除文稿'" :tip-msg="'确定要删除这篇文稿吗'" @ensure="deleteArticle"/>
    <deleteArticleDiaolg ref="deleteArticleDiaolg"/>
  </div>

</template>

<script>
import { FindArticles, DeleteArticle, FindArticleReferences } from '@/api/articles'
import Pagination from '@/components/Pagination/index'
import ensureDialog from '@/components/ensureDialog'
import deleteArticleDiaolg from './components/deleteArticleDiaolg'
import msgUtil from '@/utils/msgUtil'
export default {
  components: { Pagination, ensureDialog, deleteArticleDiaolg },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        page_size: 10,
        query: ''
      },
      search: '',
      baseUrl: '',
      deleteName: ''
    }
  },
  created() {
    this.baseUrl = process.env.FILE_ACTION
    this.initData()
  },
  methods: {
    initData() {
      FindArticles(JSON.stringify(this.listQuery)).then(v => {
        if (v.data.status === 0) {
          // v.data.data.articles
          const gList = v.data.data.articles || []
          this.list = gList
          this.total = v.data.data.total
          this.search = this.listQuery.query
        }
        this.listLoading = false
      }).catch(e => {
        msgUtil.warning('获取文章失败' + e)
      })
    },
    openDeleteArticle(id, deleteName) {
      this.deleteName = deleteName

      FindArticleReferences(id).then(v => {
        if (v.data.status === 0) {
          console.info('FindArticleReferences', v.data.data)
          if (v.data.data) {
            this.$refs.deleteArticleDiaolg.show(v.data.data, this.deleteName)
          } else {
            this.$refs.ensure.show(id)
          }
        }
      })
    },
    deleteArticle(id) {
      DeleteArticle(id).then(v => {
        if (v.data.status === 0) {
          this.initData()
        } else if (v.data.status === 13002) {
          this.$refs.deleteArticleDiaolg.show(v.data.data, this.deleteName)
        }
      }).catch(e => {
        msgUtil.warning('删除文章失败' + e)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
