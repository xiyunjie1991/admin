<template>
  <div class="dialog-container">
    <el-dialog
      :visible.sync="visible"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :show-close="false"
      width="30%"
      center
    >

      <el-row type="flex" justify="space-between">
        <el-col align="left"><p class="title">上传视频</p></el-col>
        <el-col align="center"/>
        <el-col :span="2" align="center"><i style="color: #F56C6C;font-size: 20px;" class="el-icon-error " @click="cancel"/></el-col>
      </el-row>
      <el-row type="flex" justify="space-between">

        <el-select
          v-model="localType"
          @change="orbSelect"
        >
          <el-option
            v-for="item in typeOption"
            :value="item.value"
            :key="item.value"
            :label="item.label"
          />
        </el-select>

        <!--<el-col align="center">-->
        <!--<el-switch-->
        <!--v-model="picOrVideo"-->
        <!--active-text="上传图片"-->
        <!--inactive-text="上传视频"-->
        <!--active-color="#409EFF"-->
        <!--inactive-color="#67C23A"-->
        <!--@change="switchChange"-->
        <!--/>-->
        <!--</el-col>-->
      </el-row>

      <el-form class="articleForm">

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="封面图/图片">
              <div v-if="pictureUrl.length===0" style="width: 320px;height: 180px;position: relative" @click="openUpAva">
                <div
                  class="uploadOut"
                >
                  <i class="el-icon-upload" style="font-size: 60px;color: #707070"/>
                </div>
              </div>
              <div v-if="pictureUrl.length!==0" style="width: 320px;height: 180px; position: relative;margin-top: 40px;">
                <img
                  :src="pictureUrl"
                  style="z-index: 4;max-width: 320px;max-height: 180px;position: absolute;left: 50%;top:50%;transform: translateX(-50%) translateY(-50%)"
                  @click="openUpAva"
              ></div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="视频图片" >
              <div v-if="videoFiledId.length===0" class="" style="width: 320px;height: 180px;position: relative" >
                <div
                  class="uploadOut"
                >
                  <i
                    v-if="localType===1"
                    class="el-icon-upload"
                    style="font-size: 60px;color: #707070"
                    @click="openUlVideo"
                  />
                  <i
                    v-if="localType ===0"
                    class="el-icon-error"
                    style="font-size: 60px;color: #707070"
                  />
                </div>
              </div>
              <div v-if="videoFiledId.length !==0 " style="width: 320px;height: 180px; position: relative;margin-top: 40px;">
                <video
                  :src="videUrl"
                  style="z-index: 4;max-width: 320px;max-height: 180px;position: absolute;left: 50%;top:50%;transform: translateX(-50%) translateY(-50%)"
                  controls="controls"
                  @click="openUlVideo"
                />
              </div>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row type="flex" >
          <el-col align="center">
            <el-button @click="ensure">提交</el-button>
          </el-col>
        </el-row>

      </el-form>

    </el-dialog>
    <croppaImg ref="croppaAvatar" @uploadImg="upAvatar" />
    <croppaImg ref="croppaVideo" @uploadImg="upVideo"/>

  </div>
</template>

<script>
import uploadVideo from '@/components/upload/uploadVideo'
import croppaImg from '@/components/upload/croppaImg'
import Cropper from 'vue-croppa/src/cropper'
import msgUtil from '@/utils/msgUtil'
import { uploadImage } from '@/api/upload'
export default {
  components: { croppaImg, Cropper, uploadVideo },
  props: {

  },

  data() {
    return {
      visible: false,
      flag: 'add',
      loading: false,
      pictureUrl: '',
      videUrl: '',
      pictureFiledId: '',
      videoFiledId: '',
      localType: 0,
      typeOption: [
        {
          value: 0,
          label: '图片'
        },
        {
          value: 1,
          label: '视频'
        }
      ]
    }
  },
  created() {

  },
  methods: {
    openUlVideo() {
      if (this.localType === 1) {
        const size = {
          height: 300,
          width: 400,
          mode: 'onlyVideo'
        }
        this.$refs.croppaVideo.show(size)
      }
    },
    orbSelect() {
      console.info('switchChange', this.localType)
      if (this.localType === 0) {
        this.videoFiledId = ''
        this.videUrl = ''
      }
    },
    openUpAva() {
      const size = {
        height: 180,
        width: 320,
        mode: 'onlyImg'
      }
      this.$refs.croppaAvatar.show(size)
    },
    upAvatar(obj) {
      const video = {}
      video.url = process.env.FILE_ACTION + obj.fileid
      this.pictureUrl = video.url
      this.pictureFiledId = obj.fileid
    },
    upVideo(obj) {
      console.info('obj video', obj)
      this.videUrl = obj.url
      this.videoFiledId = obj.fileid
    },
    show(obj) {
      if (obj) {
        this.flag = 'update'
        this.item = obj.item
        this.index = obj.index
        this.localType = obj.item.type
        this.pictureUrl = process.env.FILE_ACTION + obj.item.picture,
        this.videUrl = process.env.FILE_ACTION + obj.item.video,
        this.pictureFiledId = obj.item.picture,
        this.videoFiledId = obj.item.video,
        this.visible = false
      } else {
        this.localType = 0
      }
      this.visible = true
      console.info('this.localType', this.localType)
    },
    cancel() {
      this.visible = false
    },
    ensure() {
      // this.visible = false

      // if()
      console.info('this.picOrVideo', this.picOrVideo)

      console.info('this.pictureFiledId', this.pictureFiledId)
      console.info('this.videoFiledId', this.videoFiledId)

      if (this.localType === 0) {
        if (this.pictureUrl === '') {
          msgUtil.warning('请上传图片')
          return
        }
        this.videUrl = ''
        this.videoFiledId = ''
      } else {
        if (this.pictureUrl === '' || this.videUrl === '') {
          msgUtil.warning('请上传封面图和封面视频')
          return
        }
      }
      const obj = {
        flag: this.flag,
        type: this.localType,
        picture: this.pictureFiledId,
        video: this.videoFiledId
      }
      if (this.flag === 'update') {
        obj.index = this.index
      }
      this.$emit('pictureAndVideoDialog', obj)

      this.pictureUrl = '',
      this.videUrl = '',
      this.pictureFiledId = '',
      this.videoFiledId = '',
      this.picOrVideo = true
      this.visible = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .title{
    font-size: large;
  }
  .articleForm{
    position: relative;
    top: 20px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto ;
  }
  .uploadOut{
    position: absolute;
    left: 50%;
    top:50%;
    transform: translateX(-50%) translateY(-40%);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    width: 80%;
    border: #707070 2px dashed;
  }
</style>
