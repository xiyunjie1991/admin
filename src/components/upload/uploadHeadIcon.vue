<template>
  <div class="upload-container">
    <el-upload
      ref="upload"
      :action = "baseAction"
      :http-request="submitUpload"
      :on-change="changeUpload"
      :auto-upload="true"
      :modal-append-to-body="false"
      :show-file-list="false"
      class="image-uploader"
    >
      <div class="image-preview">
        <div class="image-preview-wrapper">
          <img v-show="value.length > 1" :src="value">
          <div class="image-preview-action">
            <i class="el-icon-plus" />
          </div>
        </div>
      </div>
    </el-upload>

  </div>
</template>

<script>
import { uploadImage } from '@/api/upload'
export default {
  name: 'SingleImageUpload3',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tempUrl: '',
      dataObj: { token: '', key: '' },
      img: { url: '' },
      baseUrl: process.env.FILE_API,
      baseAction: process.env.FILE_ACTION
    }
  },
  created() {
  },
  methods: {
    changeUpload: function(content) { // 预览图片

    },
    submitUpload: function(content) { // 自定义的上传图片的方法
      // 1. 创建formData 利用AXIOS传递
      const s = new FormData()
      s.append('file', content.file)
      uploadImage(s).then(response => {
        const data = response.data
        console.info('data', data)
        if (data.status === 0) {
          const img = {}
          img.url = this.baseAction + data.data.fileid
          img.fileid = data.data.fileid
          this.$emit('titleImg', img)
          this.$message({
            message: '上传成功',
            type: 'success'
          })
        } else {

        }
      }).catch(function(error) {
        console.log(error)
      })
    },
    handleImageSuccess(file) {
      // this.emitInput(file.files.file)
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .upload-container {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    @include clearfix;
    .image-uploader {
      width: 0;
      float: left;
      justify-content: center;
      display: flex;
    }
    .image-preview {
      width: 200px;
      height: 200px;
      position: relative;
      border: red 1px solid;
      .image-preview-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }

      }
      .image-preview-action {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: default;
        text-align: center;
        color: #fff;
        opacity: 0;
        font-size: 20px;
        background-color: rgba(0, 0, 0, .5);
        transition: opacity .3s;
        cursor: pointer;
        text-align: center;
        line-height: 200px;
        .el-icon-plus {
          font-size: 36px;
        }
      }
      &:hover {
        .image-preview-action {
          opacity: 1;
        }
      }
    }
    .image-app-preview {
      width: 320px;
      height: 180px;
      position: relative;
      border: 1px dashed #d9d9d9;
      float: left;
      .app-fake-conver {
        height: 44px;
        position: absolute;
        width: 100%; // background: rgba(0, 0, 0, .1);
        text-align: center;
        line-height: 64px;
        color: #fff;
      }
    }
  }
</style>
