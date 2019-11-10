<template>
  <div class="app-container">
    <span>
      <el-input v-model="listQuery.query" style="margin: 10px; width: 200px;" size="small" placeholder="请出输入搜索的猩球"/>
      <el-button :disabled="listQuery.query===search" size="small" type="primary" @click="searchOrb">搜索</el-button>
      <router-link :to="'/orb/orbUpdate/0'">
        <el-button size="small" type="primary" >创建猩球</el-button>
      </router-link>
    </span>

    <el-table v-loading="listLoading" :data="list" border highlight-current-row >
      <el-table-column align="center" label="猩球名字">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="猩球昵称">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="猩球图标">
        <template slot-scope="scope">
          <img :src="baseUrl+scope.row.avatar+'?width=100'" style="height: 60px;width: 60px;">
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属游戏">
        <template slot-scope="scope">
          <router-link v-if="scope.row.game" :to="'/game/gameUpdate/'+scope.row.game.id">
            <span style="color:#409EFF ">{{ scope.row.game.name }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否为官方猩球">
        <template slot-scope="scope">
          <span v-if="scope.row.is_official" style="color:#409EFF ">是</span>
          <span v-if="!scope.row.is_official" style="color:red ">否</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="编辑" >
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
                <router-link :to="'/orb/orbUpdate/'+scope.row.id">
                  <p >管理猩球</p>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link :to="'/orb/roomList/'+scope.row.id">
                  <p >管理频道</p>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <p style="color: red" @click="showDeleteOrb(scope.row.id)">删除猩球</p>
              </el-dropdown-item>
              <el-dropdown-item>
                <p @click="jumpToOrbUserList(scope.row)">猩球人员信息</p>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <ensure-dialog ref="ensure" :title="'解散猩球'" :tip-msg="'确定要解散这个猩球吗'" @ensure="deleteOrb"/>
    <pagination v-show="total>0" :total="total" :limit="listQuery.page_size" :page.sync="listQuery.page" :count.sync="listQuery.page_size" @pagination="initData" />
  </div>
</template>

<script>
import ensureDialog from '@/components/ensureDialog'
import msgUtil from '@/utils/msgUtil'
import { FindOrbs, RemoveOrb } from '@/api/orb'
import Pagination from '@/components/Pagination/index'
export default {
  name: 'Tuozhuai',
  components: { Pagination, ensureDialog },
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
      baseUrl: ''
    }
  },
  created() {
    this.baseUrl = process.env.FILE_ACTION
    this.initData()
  },

  methods: {
    jumpToOrbUserList(row) {
      console.info('row', row)
      this.$router.push({ path: 'orbUserList/' + row.id })
    },
    searchOrb() { this.initData() },
    deleteOrb(id) {
      RemoveOrb(id).then(v => {
        if (v.data.status === 0) {
          msgUtil.show('删除猩球成功  ')
          this.initData()
        }
      }).catch(e => {
        msgUtil.warning('删除猩球错误  ' + e)
      })
    },
    showDeleteOrb(id) {
      console.info('showDeleteOrb', id)
      this.$refs.ensure.show(id)
    },
    initData() {
      FindOrbs(JSON.stringify(this.listQuery)).then(v => {
        console.info('v.data', v.data)
        if (v.data.status === 0) {
          const gList = v.data.data.orbs || []
          gList.forEach(v => {
            console.info('v.game.name')
          })
          this.total = v.data.data.total
          this.search = this.listQuery.query
          this.list = gList
          console.info('this.list', this.list)
        }
        this.listLoading = false
      }).catch(e => {
        msgUtil.warning('查询猩球列表失败' + e)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
