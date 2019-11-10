<template>
  <div>
    <el-button size="mini" @click="openUploadVideo()">上传视频</el-button>

    <el-table :data="picList" border highlight-current-row >
      <el-table-column align="center" label="图片/视频封面图">
        <template slot-scope="scope">
          <span>
            <img :src="base + scope.row.picture" preview="1" style="width: 160px;height: 90px;">
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="视频">
        <template slot-scope="scope">
          <span>
          <video v-if="scope.row.video.length>0" :src="base + scope.row.video"/></span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <span v-if="scope.row.type === 1" style="display: block; color: grey">上传视频</span>
          <span v-if="scope.row.type === 0" style="display: block;color:#ff8c1b" @click="upIndex(scope.row)">上传视频</span>
          <span style="display: block ;color:#ff8c1b">上传图片</span>
        </template>
      </el-table-column>
    </el-table>
    <pictureAndVideoDialog ref="pictureAndVideoDialog" @pictureAndVideoDialog="pictureAndVideoDialog"/>
  </div>
</template>

<script>
import coverPicture from '@/views/orb/components/coverPicture'
import Cropper from 'vue-croppa/src/cropper'
import croppaImg from '@/components/upload/croppaImg'
import pictureAndVideoDialog from '@/components/upload/pictureAndVideoDialog'
export default {
  components: { croppaImg, Cropper, coverPicture, pictureAndVideoDialog },
  filters: {
    picFilter: function(value) {
      return process.dev.FILE_ACTION + value
    }
  },
  props: {
    picList: []
  },
  data() {
    return {
      pictures: [],
      base: process.env.FILE_ACTION
    }
  },
  created() {
    this.initData()
  },
  methods: {
    updatePictureItem(obj) {
      this.$emit('updatePictureItem', obj)
    },

    downIndex(index) {
      this.$emit('downIndex', index)
    },
    deleteGameImg(item, index) {
      this.$emit('deleteGameImg', { item, index })
    },
    upIndex(index) {
      this.$emit('upIndex', index)
    },
    openUploadVideo() {
      this.$refs.pictureAndVideoDialog.show()
    },
    pictureAndVideoDialog(msg) {
      this.$emit('pictureAndVideoDialog', msg)
    },
    initData() {
      console.info('picList', this.picList)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .coverPictures{
    margin: 10px;

  }
</style>
