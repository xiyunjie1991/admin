<template>
  <div class="app-container">
    <el-row style="margin-bottom: 20px">
      <el-col :span="3">
        <div>
          <el-input v-model="listQuery.query" size="small" placeholder="请出输入搜索的游戏" p/>
        </div>
      </el-col>
      <el-col :span="12" style="margin-left: 20px">
        <div>
          <span><el-button :disabled="listQuery.query===search" type="primary" size="small" @click="searchGame">搜索</el-button>
            <el-button type="primary" size="small" @click="cUpdateGoods(0)">添加商品</el-button>
            <el-button type="primary" size="small" @click="searchByQuery">待条件搜索1</el-button>
          </span>
        </div>
      </el-col>
    </el-row>

    <el-table v-loading="listLoading" :data="list" border highlight-current-row >
      <el-table-column align="center" label="商品名称" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="商品图标" width="220">
        <template slot-scope="scope">
          <img :src="baseFileUrl +scope.row.imgUrl" width="200px">
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品分类1" width="100">
        <template slot-scope="scope">
          <span v-text="bigFilter(scope.row.bigTypeId)"/>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品分类2" width="100">
        <template slot-scope="scope">
          <span v-text="tinyFilter(scope.row.tinyTypeId)"/>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品分类3" width="100">
        <template slot-scope="scope">
          <span v-text="miniFilter(scope.row.miniTypeId)"/>
        </template>
      </el-table-column>
      <el-table-column align="center" label="拿货价格(日元)" width="200">
        <template slot-scope="scope">
          <span>¥ {{ scope.row.costPrice }} （日元）</span> <br>
          <span>¥ {{ scope.row.costPrice * 0.0639 }} （人名币）</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品描述">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="编辑" width="100">
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
                <p @click="cUpdateGoods(scope.row.id)">管理商品</p>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <croppaImg ref="GoodsAvatar" @uploadImg="goodsImg"/>
    <update-goods-dialog ref="updateGoodsDialog" @success="updateSuccess"/>
    <pagination v-show="total>0" :total="total" :limit="listQuery.pageSize" :page.sync="listQuery.page" :count.sync="listQuery.pageSize" @pagination="initData" />
  </div>
</template>

<script>
import { FindGoods, getGoodByQuery, getBigType, getMiniType, getTinyType } from '@/api/goods'
import Pagination from '@/components/Pagination/index'
import croppaImg from '@/components/upload/croppaImg'
import msgUtil from '@/utils/msgUtil'
import updateGoodsDialog from '@/components/goods/updateGoods'
export default {
  name: 'Tuozhuai',
  components: { Pagination, croppaImg, updateGoodsDialog },

  data() {
    return {
      list: null,
      total: 0,
      listLoading: false,
      tinyTypeList: null,
      miniTypeList: null,
      bigTypeList: null,
      listQuery: {
        page: 1,
        pageSize: 10,
        query: '',
        tinyType: 1
      },
      baseFileUrl: process.env.FILE_ACTION,
      search: ''
    }
  },
  computed: {

  },
  created() {
    this.initFirst()
    this.initData()
  },
  methods: {
   async initFirst() {
     await getTinyType().then(v => {
        this.tinyTypeList = v.data.list
      })
     await getBigType().then(v => {
        this.bigTypeList = v.data.list
      })
     await getMiniType().then(v => {
        this.miniTypeList = v.data.list
      })
    },
    updateSuccess() {
      this.initData()
    },
    cUpdateGoods(goods) {
      this.$refs.updateGoodsDialog.show(goods)
    },
    tinyFilter: function(value) {
      return this.tinyTypeList.filter(v => {
         return v.id === value
      })[0].name
    },
    bigFilter: function(value) {
      return this.bigTypeList.filter(v => {
          return v.id === value
      })[0].name
    },
    miniFilter: function(value) {
     return this.miniTypeList.filter(v => {
          console.info("v.id",v.id)
          return v.id === value
      })[0].name
    

    },
    searchGame() {
      this.initData()
    },
    goodsImg(img) {
    },
    searchByQuery() {
      getGoodByQuery({
        query: this.listQuery.query,
        pageSize: this.listQuery.pageSize,
        page: this.listQuery.page,
        tinyType: this.listQuery.tinyType

      }).then(v => {
        console.info('searchByQuery', v.data)
      })
    },
    cGoodsAvatar() {
      const size = {
        height: 400,
        width: 600,
        mode: 'onlyImg'
      }
      this.$refs.GoodsAvatar.show(size)
    },
    initData() {
      FindGoods(this.listQuery.query, this.listQuery.page, this.listQuery.pageSize, this.listQuery.tinyType).then(v => {
        console.info('v', v.data.list)
        this.listLoading = false
        this.list = v.data.list
        this.total = v.data.total
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
