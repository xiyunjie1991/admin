<template>
  <div class="dialog-container">
    <el-dialog
      :visible.sync="visible"
      :modal-append-to-body="false"
      :show-close="false"
      :width="widthpx"
      center
    >
      <el-row type="flex" justify="center">
        <el-col align="center"/>
        <el-col :span="2" align="center"><i style="color: #F56C6C;font-size: 20px;" class="el-icon-error " @click="cancel"/></el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col align="center">
          <cropper
            v-loading="loading"
            ref="cropper"
            v-model="myCroppa"
            :width="width"
            :height="height"
            :zoom-speed="9"
            :prevent-white-space="true"
            :file-size-limit="502400000"
            style="margin-top: 30px;"
            placeholder="点击上传"
            @file-size-exceed="onFileSizeExceed"
            @file-type-mismatch="onFileTypeMismatch"
        /></el-col>
      </el-row>

      <el-button style="margin-top: 10px;" size="small" @click="download">上传</el-button>
    </el-dialog>
  </div>

</template>

<script>
import Cropper from 'vue-croppa/src/cropper'
import msgUtil from '@/utils/msgUtil'
import { uploadImage } from '@/api/upload'
export default {
  name: 'Tuozhuai',
  components: { Cropper },
  data() {
    return {
      myCroppa: {},
      visible: false,
      loading: false,
      width: 0,
      height: 0,
      mode: '',
      baseAction: process.env.FILE_ACTION
    }
  },
  computed: {
    widthpx() {
      return (this.width + 200) + 'px'
    }
  },
  created() {

  },
  methods: {

    cancel() {
      this.visible = false
    },
    show(size) {
      console.info(' size.height', size.height)
      console.info(' size.width', size.width)
      this.visible = true
      this.height = size.height
      this.width = size.width
      this.mode = size.mode
    },
    download(type, compressionRate) {
      console.info('compressionRate', compressionRate)
      console.info('type', type)

      console.info('download')
      if (this.mode === 'onlyVideo') {
        msgUtil.nitifyWarning('只能上传视频')
        return
      }
      this.loading = true
      this.myCroppa.generateBlob((blob) => {
        const s = new FormData()
        s.append('file', blob)
        uploadImage(s).then(response => {
          const data = response.data
          console.info('uploadImage', data.data.imageUrl)
          this.loading = false
          this.$emit('uploadImg', data.data.imageUrl)
          this.$message({
            message: '上传成功',
            type: 'success'
          })
          this.$refs.cropper.remove()
          this.visible = false
        }).catch(function(error) {
          this.loading = false
          console.log(error)
        })
        // var a = document.createElement('a')
        // a.download = 'filename'
        // a.href = url
        // a.click()
        // URL.revokeObjectURL(url)
      }, type, compressionRate)
    },
    onFileTypeMismatch(file) {
      const acceptableMimeType = /^video/.test(file.type)
      console.info('onFileTypeMismatch')
      console.info('mode', this.mode)
      // console.log('onFileTypeMismatch')
      if ((this.mode === 'onlyVideo' || this.mode === 'both') && acceptableMimeType) {
        this.loading = true
        const s = new FormData()
        s.append('file', file)
        uploadImage(s).then(response => {
          this.loading = false
          const data = response.data
          console.info('data', data)
          if (data.status === 0) {
            const video = {}
            video.url = this.baseAction + data.data.fileid
            video.fileid = data.data.fileid
            video.type = 1
            this.$emit('uploadImg', video)
            this.$message({
              message: '上传成功',
              type: 'success'
            })
            this.visible = false
            this.$refs.cropper.remove()// 上传完成后 清除控件中的 图片
          } else {
            this.loading = false
          }
        }).catch(function(error) {
          this.loading = false
          console.log(error)
        })
      } else if (this.mode === 'onlyVideo') {
        msgUtil.nitifyWarning('只能上传视频')
      } else if (this.mode === 'onlyImg') {
        msgUtil.nitifyWarning('只能上传图片')
      }
    },
    onFileSizeExceed() {
      msgUtil.nitifyWarning('只能上传图片大小不得超过50mb')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
