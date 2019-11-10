<template>
  <div class="upload-container">
    <el-upload
      ref="imgUpload"
      :action = "baseAction"
      :on-remove="handleRemove"
      :http-request="submitUpload"
      :before-upload="beforeAvatarUpload"
      :limit="limit"
      :show-file-list="false"
      :file-list="fileList"
      :on-exceed="handleExceed"
      class="upload-demo"
      multiple>
      <el-button size="small" type="primary">上传图片</el-button>
    </el-upload>
  </div>
</template>
<script>
import { uploadImage } from '@/api/upload'
export default {
  name: 'Tuozhuai',
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
      allowToUpdate: true
    }
  },
  created() {

  },
  methods: {
    name() {

    },
    handleExceed(files, fileList) {
      this.$message.warning('当前限制选择 ' + this.limit + '个文件')
    },
    submitUpload: function(content) { // 自定义的上传图片的方法
      // 1. 创建formData 利用AXIOS传递
      if (this.allowToUpdate === true) {
        const s = new FormData()
        s.append('file', content.file)
        uploadImage(s).then(response => {
          const data = response.data
          console.info('data', data)
          if (data.status === 0) {
            const video = {}
            video.url = this.baseAction + data.data.fileid
            video.fileid = data.data.fileid
            this.$emit('uploadImg', video)
            this.$message({
              message: '上传成功',
              type: 'success'
            })
          } else {

          }
        }).catch(function(error) {
          console.log(error)
        })
      }
    },
    remove() {
      console.info('remove')
      this.$refs.imgUpload.clearFiles()
    },
    beforeAvatarUpload(file) {
      const testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'jpg'
      const extension2 = testmsg === 'png'
      // const extension2 = testmsg === 'xlsx'
      const isLt2M = file.size / 1024 / 1024 < 50
      console.info('isLt2M', isLt2M)
      if (!extension && !extension2) {
        this.$message({
          message: '上传文件只能是 jpg、png!',
          type: 'warning'
        })
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 50MB!',
          type: 'warning'
        })
      }
      console.info('extension || extension2 && isLt2M', (extension || extension2) && isLt2M)
      this.allowToUpdate = (extension || extension2) && isLt2M
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
