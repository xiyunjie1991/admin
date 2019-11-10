<template>
  <div class="app-container">
    <el-row style="margin-bottom: 20px">
      <el-col :span="3">
        <div>
          <el-input v-model="listQuery.query" size="small" placeholder="请出输入搜索的游戏" p/>
        </div>
      </el-col>
      <el-col :span="5" style="margin-left: 20px">
        <div>
          <span><el-button :disabled="listQuery.query===search" type="primary" size="small" @click="searchGame">搜索</el-button>
            <router-link :to="{path:'/game/gameUpdate/0',query: {orbNeed:0}}" >
              <el-button type="primary" size="small">添加游戏</el-button>
            </router-link>
          </span>
        </div>
      </el-col>
    </el-row>

    <el-table v-loading="listLoading" :data="list" border highlight-current-row >
      <el-table-column align="center" label="游戏名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="游戏英文名称">
        <template slot-scope="scope">
          <span>{{ scope.row.ename }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="游戏制作商">
        <template slot-scope="scope">
          <span>{{ scope.row.developer }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="游戏发行商">
        <template slot-scope="scope">
          <span>{{ scope.row.publisher }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="评分">
        <template slot-scope="scope">
          <span>{{ scope.row.score }}</span>
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
                <router-link :to="{path:'/game/gameUpdate/'+scope.row.id,query: {orbNeed:0}}" >
                  <p >管理游戏</p>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link :to="'/game/pedia/'+scope.row.id">
                  <p >管理百科</p>
                </router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :limit="listQuery.page_size" :page.sync="listQuery.page" :count.sync="listQuery.page_size" @pagination="initData" />
  </div>
</template>

<script>
import { FindGames } from '@/api/game'
import Pagination from '@/components/Pagination/index'
import msgUtil from '@/utils/msgUtil'
export default {
  name: 'Tuozhuai',
  components: { Pagination },
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
      search: ''
    }
  },
  created() {
    this.initData()
  },
  methods: {
    searchGame() {
      this.initData()
    },
    initData() {
      FindGames(JSON.stringify(this.listQuery)).then(v => {
        if (v.data.status === 0) {
          const gList = v.data.data.games || []
          this.total = v.data.data.total || 0
          this.list = gList
          this.search = this.listQuery.query || ''
        }
        this.listLoading = false
      }).catch(e => {
        msgUtil.warning('查找游戏失败' + e)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .gameForm{
    position: absolute;
    width: 600px;
    top: 20px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto ;
  }
</style>
