<template>
  <div >
    <el-upload
      :action = "baseAction"
      :on-remove="handleRemove"
      :http-request="submitUpload"
      :before-upload="beforeAvatarUpload"
      :show-file-list="false"
      :on-exceed="handleExceed"
      multiple>
      <el-button size="small" type="primary">上传视频</el-button>
    </el-upload>
  </div>
</template>
<script>
import { uploadImage } from '@/api/upload'
import msgUtil from '@/utils/msgUtil'
export default {
  name: 'UploadVideo',
  props: {
    limit: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      tempUrl: '',
      dataObj: { token: '', key: '' },
      img: { url: '' },
      baseUrl: process.env.FILE_API,
      baseAction: process.env.FILE_ACTION,
      fileList: [],
      loading: true
    }
  },
  created() {

  },
  methods: {
    name() {

    },
    handleExceed(files, fileList) {
      this.$message.warning('当前限制选择 ' + this.limit + ' 个文件')
    },
    submitUpload: function(content) { // 自定义的上传图片的方法
      this.loading = true
      // if (acceptableMimeType) {
      const s = new FormData()
      s.append('file', content.file)
      uploadImage(s).then(response => {
        const data = response.data
        console.info('data', data)
        if (data.status === 0) {
          const video = {}
          video.url = this.baseAction + data.data.fileid
          video.fileid = data.data.fileid
          this.$emit('uploadVideo', video)
          this.$message({
            message: '上传成功',
            type: 'success'
          })
        } else {

        }
      }).catch(function(error) {
        console.log(error)
      })
      this.loading = false
      // } else {
      //   msgUtil.warning('上传的不是视频')
      // }
      // 1. 创建formData 利用AXIOS传递
    },

    beforeAvatarUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const acceptableMimeType = /^video/.test(file.type)
      // const extension2 = testmsg === 'xlsx'
      const isLt2M = file.size / 1024 / 1024 < 50

      if (!acceptableMimeType) {
        this.$message({
          message: '上传的不是视频格式',
          type: 'warning'
        })
      }

      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 50MB!',
          type: 'warning'
        })
      }
      return acceptableMimeType && isLt2M
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
