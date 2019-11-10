<template>
  <div class="coverPictures">
    <img v-if="type === 0" :src="pictureUrl" preview="1" style="width: 160px;height: 90px">
    <video
      v-if="type === 1"
      :src="videoUrl"
      :poster="pictureUrl"
      style="width: 160px;height: 90px"
      controls="controls"
    />
    <croppaImg ref="cUploadp" @uploadImg="uploadPicture" />
    <croppaImg ref="cUploadv" @uploadImg="uploadVideo" />
  </div>
</template>
<script>
import Cropper from 'vue-croppa/src/cropper'
import croppaImg from '@/components/upload/croppaImg'
export default {
  name: 'Tuozhuai',
  components: { croppaImg, Cropper },
  filters: {
    picFilter: function(value) {
      return process.dev.FILE_ACTION + value
    }
  },
  props: {
    video: {
      type: String,
      default: ''
    },
    picture: {
      type: String,
      default: ''
    },
    type: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      activeName: 'picture',
      videoEnable: true,
      pictureFiledId: '',
      videoFiledId: '',
      pictureUrl: '',
      videoUrl: ''
    }
  },
  created() {
    this.initData()
  },
  methods: {
    handleClick() {

    },
    uploadPicture(img) {
      this.pictureFiledId = img.fileid
      this.pictureUrl = img.url

      const obj = {
        picture: img.fileid,
        video: this.videoFiledId,
        index: this.index,
        type: this.type
      }
      console.info('uploadPicture obj', img)
      this.$emit('uploadPictureItem', obj)
    },
    uploadVideo(video) {
      this.videoFiledId = video.fileid
      this.videoUrl = video.url
      const vid = {
        picture: this.pictureFiledId,
        video: video.fileid,
        index: this.index,
        type: this.type
      }
      this.$emit('uploadPictureItem', vid)
    },

    cPic() {
      const size = {
        height: 360,
        width: 640,
        mode: 'onlyImg'
      }
      this.$refs.cUploadp.show(size)
    },
    cVideo() {
      const size = {
        height: 360,
        width: 640,
        mode: 'onlyVideo'
      }
      this.$refs.cUploadv.show(size)
    },
    initData() {
      console.info('this.type', this.type)
      this.pictureUrl = process.env.FILE_ACTION + this.picture
      this.pictureFiledId = this.picture

      if (this.type === 0) {
      } else if (this.type === 1) {
        this.videoUrl = process.env.FILE_ACTION + this.video
        this.videoFiledId = this.video
        this.videoEnable = false
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>


</style>
