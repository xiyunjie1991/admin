<template>
  <div class="app-container">
    <div>
      <span>
        <el-select
          v-model="selectedOrbId"
          :remote-method="remoteMethod"
          :loading="loading"
          size="small"
          no-match-text="没有当前结果"
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          @change="orbSelect">
          <el-option
            v-for="item in orb"
            :key="item.id"
            :label="item.name"
            :value="item.id"/>
        </el-select>

        <el-button style="margin: 10px;" size="small" type="primary" @click="addOrb">添加</el-button>
        <el-button size="small" type="primary" @click="update">更新</el-button>
        该列表可拖动  删除按钮 需要点击保存后方可实现
      </span>
    </div>
    <!-- Note that row-key is necessary to get a correct row order. -->
    <el-table v-loading="listLoading" :data="list" row-key="orb_id" border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" label="猩球名字">
        <template slot-scope="scope">
          <span>{{ scope.row.orb.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否为官方频道">
        <template slot-scope="scope">
          <span>{{ scope.row.orb.is_official | offic }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否默认选中">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.selected"
            style="display: block"
            active-color="#13ce66"
            inactive-text=""/>
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否强制加入">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mandatory"
            style="display: block"
            active-color="#13ce66"
          />
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="danger" @click="opendeleteOrb(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <!-- $t is vue-i18n global function to translate lang (lang in @/lang)  -->
    <!--<div class="show-d">{{ $t('table.dragTips1') }} : &nbsp; {{ oldList }}</div>-->
    <!--<div class="show-d">{{ $t('table.dragTips2') }} : {{ newList }}</div>-->
    <ensure-dialog ref="ensure" :title="'删除平台信息'" :tip-msg="'确定要删除平台信息吗'" @ensure="deleteOrb"/>
  </div>
</template>

<script>
import { FindFeaturedOrbs, UpdateFeaturedOrbs, FindOrbs, GetOrbInfo } from '@/api/orb'
import Sortable from 'sortablejs'
import msgUtil from '../../utils/msgUtil'
import ensureDialog from '@/components/ensureDialog'

export default {
  name: 'DragTable',
  components: { ensureDialog },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    offic: function(value) {
      if (value) {
        return '是'
      } else {
        return '否'
      }
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      sortable: null,
      oldList: [],
      newList: [],
      orb: [],
      selectedOrb: {},
      selectedOrbId: null
    }
  },
  created() {
    this.getList()
    this.remoteMethod('')
  },
  methods: {
    opendeleteOrb(orb_id) {
      this.$refs.ensure.show(orb_id)
    },
    deleteOrb(orb_id) {
      const newOrbs = []
      this.list.forEach(v => {
        if (v.id !== orb_id) {
          newOrbs.push(v)
        }
      })
      this.list = newOrbs
      this.update()
    },
    remoteMethod(query) {
      this.loading = true
      FindOrbs({ query: query }).then(v => {
        console.info('remoteMethod findOrbs', v.data.data.orbs)
        console.info('remoteMethod query', query)
        if (v.data.status === 0) {
          this.orb = v.data.data.orbs
        }
        this.loading = false
      }).catch(e => {
        msgUtil.warning('查询猩球列表失败' + e)
      })
    },
    orbSelect(value) {
      console.info('orbSelect value', value)
      console.info('orb ', this.orb)
      this.selectedOrbId = value
    },
    update() {
      UpdateFeaturedOrbs(this.list).then(v => {
        msgUtil.show('更新推荐猩球成功')
      }).catch(e => {
        msgUtil.warning('更新推荐猩球失败' + e)
      })
    },
    addOrb() {
      console.info('selectedOrbId', this.selectedOrbId)
      if (this.selectedOrbId === undefined) {
        return
      }
      // if (this.selectedOrb === {}) {
      //   msgUtil.warning('重复添加')
      //   return
      // }
      let flag = true
      this.list.forEach(v => {
        if (v.orb_id === this.selectedOrbId) {
          msgUtil.warning('重复添加')
          flag = false
        }
      })
      if (flag) {
        this.orb.forEach(v => {
          if (v.id === this.selectedOrbId) {
            const newOrb = {
              orb_id: this.selectedOrbId,
              mandatory: false,
              orb: v
            }
            this.list.push(newOrb)
          }
        })
      }
    },
    sortOrbs(value) {

    },
    getList() {
      this.listLoading = true
      FindFeaturedOrbs({}).then(v => {
        if (v.data.status === 0) {
          this.list = v.data.data || []
          this.oldList = this.list.map(v => v.id)
          this.newList = this.oldList.slice()
        }
        this.listLoading = false
        this.$nextTick(() => {
          this.setSort()
        })
      }).catch(e => {
        msgUtil.warning('获取推荐猩球失败' + e)
      })
    },
    setSort() {
      const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: evt => {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          this.list.splice(evt.newIndex, 0, targetRow)

          // for show the changes, you can delete in you code
          // const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          // this.newList.splice(evt.newIndex, 0, tempIndex)
        }
      })
    }
  }
}
</script>

<style>
  .sortable-ghost{
    opacity: .8;
    color: #fff!important;
    background: #42b983!important;
  }
</style>

<style scoped>
  .icon-star{
    margin-right:2px;
  }
  .drag-handler{
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .show-d{
    margin-top: 15px;
  }
</style>
