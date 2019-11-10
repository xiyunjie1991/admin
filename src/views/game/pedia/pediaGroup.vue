<template>
  <div v-loading="loading" class="app-container">
    <div class="out"/>
    <el-row style="margin-bottom: 20px">
      <el-col :span="20" style="margin-left: 20px">
        <div>
          <span>
            <el-button size="mini" style="height: 30px;" type="primary" @click="openAddDialog">添加分类</el-button>
            <el-button size="mini" style="height: 30px;" type="success" @click="updateGroup" >保存百科词条</el-button>
          </span>
        </div>
      </el-col>
    </el-row>
    <div
      v-dragging="{ list: pediaGroups, item: group, group: 'groups' }"
      v-for="(group,index) in pediaGroups"
      :key="index"
    >
      <div class="group">
        <el-row type="flex" justify="space-between">
          <div style="display: inline-block"> 分类名称： <el-input v-model="group.name" size="small" style="width: 200px;margin-bottom: 10px;" label="分类名称"/></div>
          <el-button size="mini" style="height: 30px; margin-left: 5px;" type="primary" @click="ChooseSelectedItem(group)">添加百科词条</el-button>
          <!--<el-button size="mini" style="height: 30px;" type="primary" @click="saveItemSort(group)">保存排序</el-button>-->
          <el-button size="mini" style="height: 30px;" type="primary" @click="itemSortDialog(group)">编辑词条排序</el-button>
          <el-col :span="2" align="center"><i style="color: #F56C6C" class="el-icon-error " @click="deleteGroup(group)"/></el-col>
        </el-row>

        <div class="citiao">
          <!--<el-tag-->
          <!--v-dragging="{ list: group.item, item: item2, group: 'items' }"-->
          <!--v-for="(item2,index) in group.item"-->
          <!--:key="index"-->
          <!--style="margin: 5px;"-->
          <!--closable-->
          <!--@close="closeItem(group,item2)">-->
          <!--{{ item2.name }}-->
          <!--</el-tag>-->
          <!--<draggable-->
          <!--v-model="group.item"-->
          <!--&gt;-->
          <div v-for="item2 in group.item" :key="item2.id">
            <el-tag
              v-if="item2.name === name"
              style="margin: 5px"
              type="danger"
              closable
              @click.native="updateArticle(group,item2)"
              @close="closeItem(group,item2)">
              {{ item2.name }}
            </el-tag>
            <el-tag
              v-if="item2.name !== name"
              style="margin: 5px;"
              closable
              @click.native="updateArticle(group,item2)"
              @close="closeItem(group,item2)">
              {{ item2.name }}
            </el-tag>
          </div>

        </div>
      </div>

    </div>
    <add-dialog ref="addDialog" :game_id="id" @addSuccess="addSuccess"/>
    <sort-dialog ref="sortDialog" @saveSortSuccess="saveSortSuccess"/>
    <select-item-dialog ref="selectItemDialog" :game_id="id" :obj="selectedItem" @addSuccess="addSuccess"/>
    <update-item-dialog ref="updateItemDialog" :game_id="id" :obj="selectedItem" @addSuccess="addSuccess"/>
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :show-close ="false"
      center
      title="提示"
      width="30%"

    >
      <span style="margin-top: 20px;">删除该分类分类下的词条也会被删除</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ensureDeleteGroup">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import msgUtil from '@/utils/msgUtil'
import pediaGroupCom from '@/views/game/components/pediaGroupCom'
import addDialog from '@/views/game/pedia/addDialog'
import selectItemDialog from '@/views/game/pedia/selectItemDialog'
import updateItemDialog from '@/views/game/pedia/updateItemDialog'
import { FindGamePediaGroups, DeleteGamePediaGroup, FindGamePediaItems, DeleteGamePediaItem, UpdateGamePediaGroups } from '@/api/game'
import SortDialog from './sortDialog'
export default {
  components: { SortDialog, draggable, selectItemDialog, addDialog, pediaGroupCom, updateItemDialog },
  data() {
    return {
      options: {
        group: 'mission'
      },
      id: 0,
      pediaGroups: [

      ],
      loading: true,
      pg: [],
      dialogVisible: false,
      willDeleteGroup: {},
      selectedItem: {},
      keyId: 2,
      name: '阿萨大'
    }
  },
  mounted() {
    console.info('mounted')
  },

  created() {
    const id = this.$route.params.id
    const name = this.$route.query.name
    console.info('name', name)
    this.name = name
    console.info('id', id)
    this.id = Number(id)
    this.initData()
  },
  methods: {
    initData() {
      FindGamePediaGroups(this.id).then(v => {
        if (v.data.status === 0) {
          this.pg = v.data.data || []
          this.pg.forEach(async v2 => {
            const v3 = await FindGamePediaItems(v2.id)
            v2.item = v3.data.data
          })
          this.$forceUpdate()
          this.keyId++
        }
        const _this = this
        setTimeout(function() {
          _this.loading = false
          _this.pediaGroups = _this.pg
          console.info('this.pediaGroups', _this.pediaGroups)
        }, 500)
      }).catch(e => {
        msgUtil.warning('获取百科分组失败' + e)
      })
    },
    updateArticle(group, item) {
      this.$refs.updateItemDialog.show(group, item)
      console.info('updateArticle', item)
    },
    openAddDialog() {
      this.$refs.addDialog.show()
    },
    saveSortSuccess() { this.initData() },
    addSuccess() {
      this.initData()
    },
    ensureDeleteGroup() {
      DeleteGamePediaGroup(Number(this.willDeleteGroup.id), this.id).then(v => {
        console.info('DeleteGamePediaGroup ', this.willDeleteGroup)
        if (v.data.status === 0) {
          this.initData()
          this.dialogVisible = false
        }
      }).catch(e => {
        msgUtil.warning('删除游戏分组失败' + e)
      })
    },
    ChooseSelectedItem(item) {
      this.selectedItem = item
      this.$refs.selectItemDialog.show({})
    },
    itemSortDialog(group) {
      console.info('group', group)
      this.$refs.sortDialog.show(group)
    },
    // saveItemSort(group) {
    //   console.info('saveItemSort', group)
    // },
    deleteGroup(item) {
      console.info('deleteGroup', item)
      this.willDeleteGroup = item
      this.dialogVisible = true
    },
    closeItem(group, item) {
      DeleteGamePediaItem(item.id, group.id).then(v => {
        console.info('closeItem', v.data)
        this.initData()
      }).catch(e => {
        msgUtil.warning('删除游戏平台信息失败' + e)
      })
    },
    jumpToArticle(item) {
      this.$router.push('/article/articleEditor' + item.article_id)
    },
    updateGroup() {
      console.info('beforeUpdate', this.pediaGroups)
      UpdateGamePediaGroups(this.id, this.pediaGroups).then(v => {
        if (v.data.status === 0) {
          this.initData()
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .out{
    top: 20px;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .group{
     display: flex;
     width: 600px;
     padding: 20px;
     margin-top: 30px;
     flex-direction: column;
     border: blue 1px solid;
   }

.citiao{
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  margin: 20px;
}
.pediaItem{
  width: 100px;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #409EFF;
  }
  .pediaItem .left{
    flex: 9;
    height: 18px;
    line-height: 18px;

  }
  .pediaItem .right{
    width: 18px;
    height: 18px;
    line-height: 18px;
    font-size: 18px;
    margin-right: 10px;
  }
</style>
