<template>
  <div class="app-container">
    <span>
      <el-input v-model="listQuery.query" style="margin: 10px; width: 200px;" size="small" placeholder="请出输入搜索的用户"/>
      <el-button :disabled="listQuery.query===search" size="small" type="primary" @click="searchUser">搜索</el-button>

    </span>

    <el-table v-loading="listLoading" :data="list" border highlight-current-row >
      <el-table-column align="center" label="用户头像">
        <template slot-scope="scope">
          <img :src="scope.row.img" style="height: 60px;width: 60px;">
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户昵称">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="账号类型">
        <template slot-scope="scope">
          <span>{{ scope.row.utype | utypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.gender | genderFilter }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :limit="listQuery.page_size" :page.sync="listQuery.page" :count.sync="listQuery.page_size" @pagination="initData" />
  </div>
</template>

<script>
import { FindUsers } from '@/api/user'
import Pagination from '@/components/Pagination/index'
export default {
  name: 'Tuozhuai',
  components: { Pagination },
  filters: {
    genderFilter: function(value) {
      if (value === 0) {
        return '未知'
      } else if (value === 1) {
        return '男'
      } else if (value === 2) {
        return '女'
      }
    },
    utypeFilter: function(value) {
      if (value === 0) {
        return '普通用户'
      } else if (value === 1) {
        return '管理员账号'
      }
    }
  },
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
    searchUser() { this.initData() },
    initData() {
      FindUsers(JSON.stringify(this.listQuery)).then(v => {
        if (v.data.status === 0) {
          const gList = v.data.data.users
          gList.forEach(v => {
            v.img = process.env.FILE_ACTION + v.avatar
          })
          this.total = v.data.data.total
          this.search = this.listQuery.query
          this.list = gList
        }
        this.listLoading = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
