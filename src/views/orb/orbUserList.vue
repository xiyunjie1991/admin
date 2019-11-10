<template>
  <div class="app-container">
    <div class="orbInfo">
      <p class="lTitle">猩球信息：</p>
      <orb-card v-if="orbInfo.id" :orb="orbInfo"/>
      <p class="lTitle">创建者信息：</p>
      <div>
        <div class="orb">
          <img :src="getImg(creater.avatar,60)" class="icon">
          <span style="margin-left: 5px;">
            <p class="lTitle">{{ creater.nickname }}</p>
          </span>
        </div>
      </div>
    </div>

    <span>
      <el-input
        v-model="query"
        style="margin: 10px; width: 200px;"
        size="small"
        placeholder="请出输入搜索的用户"
      />
      <el-button :disabled="query===search" size="small" type="primary" @click="searchUser">搜索</el-button>
    </span>

    <el-table v-loading="listLoading" :data="list" border highlight-current-row>
      <el-table-column align="center" label="用户头像">
        <template slot-scope="scope">
          <img
            :src="getImg(scope.row.avatar,60)"
            style="height: 60px;width: 60px; border-radius: 30px;"
          >
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
    <pagination
      v-show="total>0"
      :total="total"
      :limit="page_size"
      :page.sync="page"
      :count.sync="page_size"
      @pagination="initData"
    />
  </div>
</template>

<script>
import { FindOrbUsers, GetOrbInfo } from "@/api/orb";
import { GetUserInfo } from "@/api/user";
import Pagination from "@/components/Pagination/index";
import OrbCard from "@/components/OrbCard/index";
export default {
  name: "Tuozhuai",
  components: { Pagination, OrbCard },
  filters: {
    genderFilter: function(value) {
      if (value === 0) {
        return "未知";
      } else if (value === 1) {
        return "男";
      } else if (value === 2) {
        return "女";
      }
    },
    utypeFilter: function(value) {
      if (value === 0) {
        return "普通用户";
      } else if (value === 1) {
        return "管理员账号";
      }
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      page: 1,
      page_size: 10,
      query: "",
      search: "",
      id: 0,
      orbInfo: {},
      creater: {}
    };
  },
  created() {
    // this.orbInfo = this.$route.params.id
    // this.orbInfo = this.$route.query.orb
    console.info("$route", this.$route.params.id);
    this.id = Number(this.$route.params.id);
    this.initData();
  },

  methods: {
    searchUser() {
      this.initData();
    },
    initData() {
      GetOrbInfo(this.id).then(v => {
        if (v.data.status === 0) {
          this.orbInfo = v.data.data;
          GetUserInfo(this.orbInfo.creator_id).then(v => {
            if (v.data.status === 0) {
              this.creater = v.data.data;
              console.info(this.creater);
            }
          });
        }
      });
      FindOrbUsers(this.page, this.page_size, this.query, this.id).then(v => {
        if (v.data.status === 0) {
          const gList = v.data.data.users;
          this.total = v.data.data.total;
          this.search = this.query;
          this.list = gList;
        }
        this.listLoading = false;
      });
    }
  }
};
</script>
<style>
/*.el-card__body{*/
/*padding: 10px;*/

/*}*/
/*.is-always-shadow{*/
/*margin: 10px;*/
/*}*/
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.orbInfo {
  display: flex;
  flex-direction: row;
}
.orb {
  padding: 10px;
  margin: 0 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  flex-direction: row;
  display: flex;
}
.lTitle {
  color: grey;
  font-weight: 700;
  font-size: 12px;
}
.name {
  color: #00cc5e;
  font-weight: 700;
  font-size: 12px;
}
.iconUser {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}
.icon {
  width: 60px;
  height: 60px;
  border-radius: 30px;
}
</style>
