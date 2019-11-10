<template>
  <div class="groupItem" >
    <div class="groupTitle">

      <el-input v-model="name" size="small" style="margin:  5px;"/>
      <el-tooltip class="item" effect="dark" content="添加频道" placement="top">
        <i style="margin-right: 20px;" class="el-icon-circle-plus-outline" @click="openAddRoom"/>
      </el-tooltip>
      <i v-if="showVis" style="margin-right: 20px;" class="el-icon-arrow-up" @click="showVis=!showVis"/>
      <i v-if="!showVis" style="margin-right: 20px;" class="el-icon-arrow-down" @click="showVis=!showVis"/>
      <el-button size="small" type="primary" @click="saveSort">保存频道排序</el-button>
    </div>
    <div
      v-dragging="{ list: roomList, item: item, group: 'roomList' }"
      v-for="(item,index) in roomList"
      v-show="showVis"
      :key="item.id"
      class="roomItem"
    >
      <div style="flex: 4">{{ item.name }}</div>
      <div style="flex: 4"><p style="font-size: 12px ;color: blue">{{ item.type|typeFilter }}</p></div>
      <div class="iOut">
        <el-tooltip class="item" effect="dark" content="下移" placement="top">
          <i v-if="(index !== roomList.length-1)"class="el-icon-arrow-down" @click="downIndex(index)"/>
        </el-tooltip>
      </div>
      <div class="iOut">
        <el-tooltip class="item" effect="dark" content="上移" placement="top">
          <i v-if="(index !== 0)" class="el-icon-arrow-up" @click="upIndex(index)"/>
        </el-tooltip>
      </div>
      <div class="iOut">
        <el-tooltip class="item" effect="dark" content="修改频道名称" placement="top">
          <i class="el-icon-edit" @click="openUpdateRoom(item)"/>
        </el-tooltip>
      </div>

      <div class="iOut">
        <router-link :to="{path:'/orb/roomArticleList/'+item.id}">
          <el-tooltip class="item" effect="dark" content="编辑频道内文章" placement="top">
            <i v-if="item.type === 0" class="el-icon-edit-outline" />
          </el-tooltip>
        </router-link>
      </div>
    </div>
    <add-room ref="addRoom" @success="success"/>
  </div>
</template>

<script>
import addRoom from './addRoom'
import { FindOrbRoomGroupRooms, UpdateOrbRooms } from '@/api/orb'
import msgUtil from '@/utils/msgUtil'
export default {
  name: 'Tuozhuai',
  components: { addRoom },
  filters: {
    typeFilter: function(type) {
      if (type === 0) {
        return '内容频道'
      } else {
        return '聊天频道'
      }
    }
  },
  props: {
    group_id: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      roomList: [],
      showVis: true,
      curName: this.name
    }
  },
  watch: {
    'name': function(newVal, oldVal) {
      this.curName = newVal
    },
    curName: function(newVal, oldVal) {
      this.$emit('update:name', newVal)
    }
  },
  created() {
    this.initData()
  },
  methods: {
    downIndex(index) {
      console.info('downIndex ', index)
      const oldItem = this.roomList[index]
      const newItem = this.roomList[index + 1]
      this.$set(this.roomList, index, newItem)
      this.$set(this.roomList, index + 1, oldItem)
      console.info('this.roomList ', this.roomList)
    },
    upIndex(index) {
      console.info('downIndex ', index)
      const oldItem = this.roomList[index]
      const newItem = this.roomList[index - 1]
      this.$set(this.roomList, index, newItem)
      this.$set(this.roomList, index - 1, oldItem)
      console.info('this.roomList ', this.roomList)
    },
    initData() {
      FindOrbRoomGroupRooms(this.group_id).then(v => {
        console.info(v.data)
        this.roomList = v.data.data
      }).catch(e => {
        msgUtil.warning('获取猩球频道房间失败' + e)
      })
    },
    success() {
      this.initData()
    },
    openAddRoom() {
      const msg = {}
      msg.group_id = this.group_id
      msg.id = 0
      msg.type = 0
      msg.name = ''
      this.$refs.addRoom.show(msg)
    },
    openUpdateRoom(item) {
      const msg = {}
      console.info('item', item)
      msg.group_id = this.group_id
      msg.id = item.id
      msg.type = item.type
      msg.name = item.name
      this.$refs.addRoom.show(msg)
    },
    saveSort() {
      UpdateOrbRooms(this.group_id, this.roomList).then(v => {
        console.info(v.data)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.groupItem{
  width: 300px;
  box-shadow:4px 4px 10px  #2b3b4e;
  margin: 10px;
  padding: 10px;
}
  .groupTitle{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .roomItem{
    margin: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .iOut{
    height: 16px;
    width: 16px;
    margin: 0 5px;
  }
</style>
