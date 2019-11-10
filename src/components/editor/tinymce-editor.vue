<template>
  <div v-loading="loading">
    <Editor id="tinymce" :v-loading="loading" v-model="value" :init="init"/>
  </div>

</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/plugins/image'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/code'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/imagetools'
// import 'tinymce/plugins/uploadvideo'
import 'tinymce/themes/silver/theme'
import { uploadImage } from '@/api/upload'
import mgsUtil from '@/utils/msgUtil'

export default {
  name: 'Tuozhuai',
  components: { Editor },
  props: {
    // 传入一个value，使组件支持v-model绑定
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: 'lists image media imagetools code table textcolor colorpicker  autolink paste '
    },
    toolbar: {
      type: [String, Array],
      default: 'undo redo | fontsizeselect | formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media  code table | removeformat'
    }
  },
  data() {
    return {
      // 初始化配置
      loading: false,
      init: {
        language_url: '/static/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/static/tinymce/skins/ui/oxide',
        height: 800,
        plugins: this.plugins,
        toolbar: this.toolbar,
        imagetools_cors_hosts: ['oos.pog'],
        branding: false,
        menubar: false,
        paste_auto_cleanup_on_paste: true,
        paste_remove_styles: true,
        paste_remove_styles_if_webkit: true,
        paste_strip_class_attributes: true,
        add_form_submit_trigger: false,
        add_unload_trigger: false,
        hidden_input: false,
        file_picker_types: 'media',
        style_formats: [
          { title: 'Image', selector: 'img', styles: {
            'margin': '0 10px 0 10px',
            'max-width': '100%'
          }}
        ],
        /* and here's our custom image picker*/
        video_template_callback: function(data) {
          if (data.width === 0) {
            this.$notify({
              title: '警告',
              message: '宽度设置错误',
              type: 'warning'
            })

            return ''
          } else {
            return '<video style="max-width: 100%;width：100%;height:100%;"  controls="controls">\n' + '<source src="' + data.source1 + '"' + (data.source1mime ? ' type="' + data.source1mime + '"' : '') + ' />\n' + (data.source2 ? '<source src="' + data.source2 + '"' + (data.source2mime ? ' type="' + data.source2mime + '"' : '') + ' />\n' : '') + '</video>'
          }
        },
        file_picker_callback: function(cb, value, meta) {
          var input = document.createElement('input')
          this.loading = true
          input.setAttribute('type', 'file')
          input.setAttribute('accept', 'video/*')
          input.onchange = function() {
            var file = this.files[0]
            if (file.size > 52428800) {
              mgsUtil.warning('上传的视频超过50m')
              return
            }
            console.info('file', file)
            var reader = new FileReader()
            reader.onload = function() {
              console.info('value', value)
              const s = new FormData()
              s.append('file', file)
              uploadImage(s).then(v => {
                console.info(v.data)
                if (v.data.status === 0) {
                  const url = process.env.FILE_ACTION + v.data.data.fileid
                  console.info('url', url)
                  cb(url, { title: file.name })
                } else {
                  this.$notify({
                    title: '警告',
                    message: '图片上传错误',
                    type: 'warning'
                  })
                }
                this.loading = false
              }).catch(e => {
                this.$notify({
                  title: '警告',
                  message: '图片上传错误',
                  type: 'warning'
                })
                this.loading = false
              })
            }
            reader.readAsDataURL(file)
          }

          input.click()
        },
        images_upload_handler: (blobInfo, success, failure) => {
          console.info('blobInfo.blob()', blobInfo.blob())
          const s = new FormData()
          s.append('file', blobInfo.blob())
          uploadImage(s).then(v => {
            console.info(v.data)
            if (v.data.status === 0) {
              const url = process.env.FILE_ACTION + v.data.data.fileid
              const url2 = url + '?x-oss-process=image/resize,w_700'
              success(url2)
            }
          })
          //
        }
      },
      myValue: this.value
    }
  },
  watch: {
    value(newValue) {
      this.myValue = newValue
    },
    myValue(newValue) {
      this.$emit('input', newValue)
    }
  },
  mounted() {
    tinymce.init({})
  },
  methods: {
    addVideo(url) {
      console.info('addVideo')
      this.value = this.value + ' <span class="mce-preview-object mce-object-video" contenteditable="false" data-mce-object="video" data-mce-p-allowfullscreen="allowfullscreen" data-mce-p-frameborder="no" data-mce-p-scrolling="no" data-mce-p-src=${src} data-mce-html="%20"> <video src=' + url + ' width="100%" controls="controls"></video></span>'
    },
    changeStyle() {
      console.info('changeStyle', this.value)
      this.value = '<article style="color:#3399ff;background: #00ff80;width: 100%;min-height:100%">' + this.value + ' </article>'
      console.info('value', this.value)
    },
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    // 需要什么事件可以自己增加
    onClick(e) {
      this.$emit('onClick', e, tinymce)
    },
    // 可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.myValue = ''
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.loadOut{
  position: absolute;
  width: 100%;
  height: 100%;
  border: red 1px solid;
  z-index: 10000;
}
</style>
