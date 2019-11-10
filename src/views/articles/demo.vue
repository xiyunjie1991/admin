<template>
  <div style="position: absolute">
    <upload-video :limit="1" :style="{'left':screenWidth+'px','top':top+'px'}" class="ys-float-btn" @uploadVideo="uploadVideo"/>
    <!--<tinymce-editor-->
      <!--ref="editor"-->
      <!--v-model="msg"-->
      <!--:disabled="disabled"-->
      <!--@onClick="onClick"/>-->
    <button @click="changeStyle" >jiayangshi1</button>
    <div>{{ msg }}</div>
    <froala-editor ref="froala" v-model="content" @on-change="changeContent"/>
  </div>
</template>

<script>
import TinymceEditor from '@/components/editor/tinymce-editor'
import FroalaEditor from '@/components/editor/froalaEditor'
import uploadVideo from '@/components/upload/uploadVideo'
import Cropper from 'vue-croppa/src/cropper'

export default {
  components: { Cropper, TinymceEditor, uploadVideo, FroalaEditor },
  data() {
    return {
      msg: 'Welcome to Use Tinymce Editor',
      disabled: false,
      myCroppa: {},
      screenWidth: document.body.clientWidth - 200,
      top: 45,
      timer: false,
      content: 'assaasdasdas'
    }
  },
  computed: {
  },
  watch: {
    screenWidth(val) {
      console.info(val)
      this.left = val - 200
    }
  },
  created() {
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
  },

  methods: {

    changeContent(content) {
      this.content = content
    },

    download(type, compressionRate) {
      this.myCroppa.generateBlob((blob) => {
        var url = URL.createObjectURL(blob)
        console.log(url)
        var a = document.createElement('a')
        a.download = 'filename'
        a.href = url
        a.click()
        URL.revokeObjectURL(url)
      }, type, compressionRate)
    },
    onFileTypeMismatch() {
      console.info('Invalid file type. Please choose a jpeg or png file.')
    },
    uploadVideo(video) {
      this.msg = 'asdasd'
      this.$refs.editor.addVideo(video.url)
    },
    changeStyle() {
      console.info('uploadVideo')
      this.$refs.editor.changeStyle()
    },
    // 鼠标单击的事件
    onClick(e, editor) {
      console.log('Element clicked')
      console.log(e)
      console.log(editor)
    },
    // 清空内容
    clear() {
      this.$refs.editor.clear()
    }
  }
}
</script>

<style scoped>
  .ys-float-btn{
    position: absolute;
    z-index:20;
  }
</style>
