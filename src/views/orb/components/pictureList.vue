<template>
  <div
    style="display: flex; flex-wrap: wrap
     ;">

    <div
      v-for="(item,index) in picList"
      :key="item"
      class="picItem">
      <cover-picture :picture="item.picture" :video="item.video" :type="item.type" :index="index" @uploadPictureItem="updatePictureItem"/>
      <div class="buttonGroup">
        <div class="button-group">
          <i v-if="(index !== 0)" class="leftButton iconfont  icon-navigate-left" @click="upIndex(index)"/>
          <i class="normalButton iconfont  icon-upload-folder" @click="upload(item,index)"/>
          <i class="normalButton iconfont  icon-delete" @click="deleteGameImg(item,index)"/>
          <i v-if="(index !== pictures.length-1)" class="rightButton iconfont  icon-navigate-right" @click="downIndex(index)"/>
        </div>

        <!--<el-button-group>-->
        <!--<el-button v-if="(index !== 0)" size="mini" icon="el-icon-caret-left" @click="upIndex(index)"/>-->
        <!--<el-button size="mini" icon="el-icon-delete" @click="deleteGameImg(item,index)"/>-->
        <!--&lt;!&ndash;<el-button size="mini" icon="el-icon-upload" @click="upIndex(index)"/>&ndash;&gt;-->
        <!--<el-button v-if="(index !== pictures.length-1)" size="mini" icon="el-icon-caret-right" @click="downIndex(index)"/>-->
        <!--</el-button-group>-->

        <!--<el-tooltip class="item" effect="dark" content="左移" placement="top">-->
        <!--<i v-if="(index !== 0)"class="el-icon-caret-left" style="font-size: 20px ;margin-left: 20px" @click="upIndex(index)"/>-->
        <!--</el-tooltip>-->
        <!--<el-tooltip class="item" effect="dark" content="右移" placement="top">-->
        <!--<i v-if="(index !== pictures.length-1)"class="el-icon-caret-right" style="font-size: 20px;margin-left: 20px" @click="downIndex(index)"/>-->
        <!--</el-tooltip>-->
        <!--<el-tooltip class="item" effect="dark" content="删除" placement="top">-->
        <!--<i class="el-icon-delete" style="font-size: 20px; margin-right: 20px;" @click="deleteGameImg(item,index)"/>-->
        <!--</el-tooltip>-->
      </div>
    </div>
    <div style="width:160px;height: 90px; display: inline-flex " @click="openUploadVideo()">
      <div
        style="display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 160px;
              margin-top: 20px;
            height: 90px; border: #707070 2px dashed">
        上传图片或视频
        <i class="el-icon-upload" style="font-size: 60px;color: #707070"/>
      </div>
    </div>
    <pictureAndVideoDialog ref="pictureAndVideoDialog" :type="type" @pictureAndVideoDialog="pictureAndVideoDialog"/>
    <pictureAndVideoDialog ref="pictureAndVideoDialogold" :type="type" @pictureAndVideoDialog="pictureAndVideoDialog"/>
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
      pictures: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    updatePictureItem(obj) {
      this.$emit('updatePictureItem', obj)
    },
    upload(item, index) {
      const obj = {
        item,
        index
      }
      this.$refs.pictureAndVideoDialogold.show(obj)
    },

    downIndex(index) {
      this.$emit('downIndex', index)
    },
    deleteGameImg(item, index) {
      this.$emit('deleteGameImg', { item, index })
    },
    upIndex(obj) {
      this.picList.find((v, index, array) => {
        if (v === this.picList[obj]) {
          this.$emit('upIndex', index)
        }
      })
    },
    openUploadVideo() {
      this.$refs.pictureAndVideoDialog.show()
    },
    pictureAndVideoDialog(msg) {
      this.$emit('pictureAndVideoDialog', msg)
    },
    initData() {
      console.info('ssssss')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .buttonGroup{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .picItem{
    margin: 10px;
    padding: 10px;
    border:1px solid #dcdfe6;
    box-shadow: 0 0 6px 0 rgba(0,0,0,.04);
  }
</style>
