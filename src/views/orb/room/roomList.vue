<template>
  <div>
    <span><el-button style="margin: 10px;" size="mini" type="primary" @click="createGroupOpen">添加频道分组</el-button>
      <el-button size="mini" type="primary" @click="saveGroup">保存频道分组排序</el-button>
    </span>
    <group-item
      v-dragging="{ list: groupList, item: item, group: 'groupList' }"
      v-for="(item,index) in groupList"
      :key="item.id"
      :group_id="item.id"
      :name.sync="item.name"/>
    <add-group ref="addGroup" @success="success"/>
  </div>

</template>

<script>
import { FindOrbRoomGroups, UpdateOrbRoomGroups } from '@/api/orb'
import groupItem from '../components/groupItem'
import addGroup from '../components/addGroup'
import msgUtil from '@/utils/msgUtil'
export default {
  name: 'Tuozhuai',
  components: { groupItem, addGroup },
  data() {
    return {
      id: 0,
      groupList: []
    }
  },
  created() {
    const id = this.$route.params.id
    this.id = Number(id)
    this.initData()
  },
  methods: {
    initData() {
      FindOrbRoomGroups(this.id).then(v => {
        console.info('FindOrbRoomGroups v.data',v.data)
        if (v.data.status === 0) {
          this.groupList = v.data.data
        }
      }).catch(e => {
        msgUtil.warning('获取游戏分组失败' + e)
      })
    },
    createGroupOpen() {
      const msg = {}
      msg.orb_id = this.id
      msg.name = ''
      msg.id = 0
      this.$refs.addGroup.show(msg)
    },
    success() {
      this.initData()
    },
    saveGroup() {
      UpdateOrbRoomGroups(this.id, this.groupList).then(v => {
        console.info('UpdateOrbRoomGroups v.data',v.data)
      }).catch(e => {
        msgUtil.warning('更新游戏失败' + e)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
