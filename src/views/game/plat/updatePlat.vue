<template>
  <div class="dialog-container">
    <el-dialog
      :visible.sync="visible"
      :modal-append-to-body="false"
      :show-close="false"
      width="500px"
      center
    >
      <el-form :model="plat" size="small" class="platFormCard" auto-complete="on" label-position="left">
        <el-form-item label="平台名称" prop="platform_name">
          <el-input
            v-model="plat.platform_name"
            :disabled="true"
            style="width: 200px;"
            type="text"
            size="small"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item label="游戏售价" prop="price">
          <el-input
            v-model="plat.price"
            style="width: 200px;"
            placeholder="售价"
            type="number"
            size="small"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item label="发售时间" prop="release_time" >
          <el-date-picker
            v-model="plat.release_time"
            type="date"
            value-format="timestamp"
            placeholder="选择日期"/>
        </el-form-item>
        <el-form-item label="是否有中文" prop="official_chs">
          <el-switch v-model="plat.official_chs"/>
        </el-form-item>
        <span>
          <el-button type="primary" size="small" style="width:100px;margin-bottom:30px;" @click.native.prevent="platSubmit(item,index)">提交</el-button>
          <el-button type="danger" size="small" style="width:100px;margin-bottom:30px;" @click.native.prevent="cancel">取消</el-button>
        </span>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
import { UpdateGamePlatformInfo } from '@/api/game'
import msgUtil from '@/utils/msgUtil'
export default {
  name: 'Tuozhuai',
  components: {},
  data() {
    return {
      plat: {},
      visible: false
    }
  },
  created() {

  },
  methods: {
    show(item) {
      console.info(item)
      this.plat = item
      this.visible = true
    },
    cancel() {
      this.visible = false
    },
    platSubmit() {
      const a = Object.assign({}, this.plat)
      a.price = Number(a.price)
      a.release_time = a.release_time / 1000
      console.info('platSubmit', a)
      UpdateGamePlatformInfo(JSON.stringify(a)).then(v => {
        if (v.data.status === 0) {
          this.$emit('success')
          msgUtil.show('修改/添加平台信息成功')
          this.visible = false
        }
      })
    },
    platDelete() {

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
