<template>
  <div class="app-container">
    <el-row style="margin-bottom: 20px">
      <el-col :span="3">
        <div>
          <el-input v-model="listQuery.query" size="small" placeholder="请出输入搜索的资讯" p/>

        </div>
      </el-col>
      <el-col :span="5" style="margin-left: 20px">
        <div>
          <span><el-button :disabled="(listQuery.query===search)" size="small" type="primary" @click="initData">搜索</el-button>
          </span>
        </div>
      </el-col>
    </el-row>
    <el-table v-loading="listLoading" :data="list" border highlight-current-row >
      <el-table-column align="center" label="文章标题">
        <template slot-scope="scope">
          <span v-html=" scope.row.article.title"/>
        </template>
      </el-table-column>
      <el-table-column align="center" label="文章作者">
        <template slot-scope="scope">
          <span>{{ scope.row.author.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属的猩球">
        <template slot-scope="scope">
          <span>{{ scope.row.orb.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" >
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
                <!--<router-link :to="'/feature/showArticle/'+scope.row.article.id">-->
                <!--<p type="primary" style="margin: 5px;" size="small" >文章预览</p>-->
                <!--</router-link>-->
                <a :href="scope.row.article.url" target="_blank">
                  <p type="primary" style="margin: 5px;" size="small" >文章预览</p>
                </a>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link :to="'/article/articleEditor/'+scope.row.article.id">
                  <p size="small" >文章编辑</p>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <p style="color:red" @click="openDeleteArticle(scope.row.article.id)">删除已推送的资讯</p>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </template>

      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :limit="listQuery.page_size" :page.sync="listQuery.page" :count.sync="listQuery.page_size" @pagination="initData" />
    <el-dialog
      :visible.sync="dialogVisible"
      title="删除提示"
      width="30%"
      center
    >
      <span>确定要做移除操作吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="ensureDialog">确 定</el-button>
      </span>

    </el-dialog>
    <ensure-dialog ref="ensure" :title="'删除文稿'" :tip-msg="'确定要删除这篇文稿吗'" @ensure="deleteArticle"/>
  </div>
</template>

<script>
import { FindFeaturedArticles, RemoveFeaturedArticle } from '@/api/articles'
import Pagination from '@/components/Pagination/index'
import ensureDialog from '@/components/ensureDialog'
import msgUtil from '@/utils/msgUtil'
export default {
  name: 'Tuozhuai',
  components: { Pagination, ensureDialog },
  data() {
    return {
      list: null,
      dialogVisible: false,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        page_size: 10,
        query: ''
      },
      search: '',
      deleteId: 0
    }
  },
  watch: {

  },
  created() {
    if (this.$route.query.id) {
      console.info('aaaa', this.$route.query)
      this.listQuery.query = this.$route.query.name
    }
    this.initData()
  },
  methods: {
    cancelDialog() {
      this.dialogVisible = false
    },
    ensureDialog() {
      this.delete()
      this.dialogVisible = false
    },

    openDeleteArticle(id) {
      this.$refs.ensure.show(id)
    },

    initData() {
      FindFeaturedArticles(this.listQuery.query, this.listQuery.page, this.listQuery.page_size).then(v => {
        console.info(v.data)
        if (v.data.status === 0) {
          this.list = v.data.data.articles || []
          this.total = v.data.data.total || 0
          this.search = this.listQuery.query || ''
        }
      }).catch(e => {
        msgUtil.warning('获取文章列表失败  ' + e)
      })
    },
    delete() {
      RemoveFeaturedArticle(this.deleteId).then(v => {
        console.info(v.data)
        if (v.data.status === 0) {
          msgUtil.show('删除成功')
          this.initData()
        }
      }).catch(e => {
        msgUtil.warning('删除推荐文章失败' + e)
      })
    },
    deleteFeaturedArticle(id) {
      this.dialogVisible = true
      this.deleteId = id
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
