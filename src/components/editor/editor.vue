<template>
  <textarea :id="id" :value="value"/>
</template>

<script>
// Import TinyMCE
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/link'
const INIT = 0
const CHANGED = 2
var EDITOR = null
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    setting: {}
  },
  data: function() {
    return {
      status: INIT,
      id: 'editor-' + new Date().getMilliseconds()
    }
  },
  watch: {
    value: function(val) {
      console.log('init ' + val)
      if (this.status === INIT || tinymce.activeEditor.getContent() !== val) {
        tinymce.activeEditor.setContent(val)
      }
      this.status = CHANGED
    }
  },
  mounted: function() {
    const _this = this
    const setting =
        {
          selector: '#' + _this.id,
          language: 'zh_CN',
          init_instance_callback: function(editor) {
            EDITOR = editor
            console.log('Editor: ' + editor.id + ' is now initialized.')
            editor.on('input change undo redo', () => {
              var content = editor.getContent()
              _this.$emit('input', content)
            })
          },
          plugins: []
        }
    Object.assign(setting, _this.setting)
    tinymce.init(setting)
  },
  beforeDestroy: function() {
    tinymce.get(this.id).destroy()
  },
  methods: {
  }
}

</script>


<style rel="stylesheet/scss" lang="scss" scoped>

</style>
