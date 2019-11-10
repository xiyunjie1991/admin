<template>
  <froala :config="config" v-model="value"/>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
  },
  data() {
    return {

      myValue: this.value,
      editor: null,
      config: {
        zIndex: 2501,
        height: '600',
        toolbarSticky: false,
        autofocus: true,
        toolbarButtons: [
          'fullscreen',
          'bold',
          'italic',
          'underline',
          'strikeThrough',
          'subscript',
          'superscript',
          '|',
          // 'fontFamily',
          'fontSize',
          'color',
          'inlineClass',
          'inlineStyle',
          'paragraphStyle',
          'lineHeight',
          '|',
          'paragraphFormat',
          'align',
          'formatOL',
          'formatUL',
          'outdent',
          'indent',
          'quote',
          '-',
          'insertLink',
          'insertImage',
          'insertVideo',
          'embedly',
          'insertFile',
          'insertTable',
          '|',
          'emoticons',
          'fontAwesome',
          'specialCharacters',
          'insertHR',
          'selectAll',
          'clearFormatting',
          '|',
          'print',
          'getPDF',
          'spellChecker',
          'help',
          'html',
          '|',
          'undo',
          'redo'
        ],
        placeholder: '请填写内容',
        useClasses: false,
        imageInsertButtons: ['imageUpload'],
        imageUploadMethod: 'POST',
        videoUploadMethod: 'POST',
        imageUploadURL: process.env.FILE_API,
        videoUploadURL: process.env.FILE_API,
        language: 'zh_cn',
        // imageDefaultWidth: '100%',
        // imageUploadURL: "xxxxxxxx",
        // videoUploadURL: "xxxxxxx",
        // fileUploadURL: "xxxxxxx",
        // imageManagerLoadURL: "xxxxxx",
        events: {
          'froalaEditor.image.uploaded': (e, editor, response) => {
            const res = JSON.parse(response)
            console.info('res', res)
            if (res.status === 0) {
              const url = process.env.FILE_ACTION + res.data.fileid
              // console.info('uploaded url', url)
              editor.image.insert(url, true, null, editor.image.get(), null)
              return false
            } else {
              return false
            }
          },
          'froalaEditor.video.beforeUpload': (e, editor, videos) => {
            console.info('videos', videos)
          },
          'froalaEditor.video.inserted': (e, editor, $img, response) => {
            console.info('inserted  $img', $img)
          },
          'froalaEditor.video.uploaded': (e, editor, response) => {
            const res = JSON.parse(response)
            console.info('res', res)
            if (res.status === 0) {
              const url = process.env.FILE_ACTION + res.data.fileid
              console.info('uploaded url', url)
              const embedded = '<video  style="max-width: 100%;width: 100%;"   controls><source src=' + url + ' /></video>'
              // consoel.info()
              editor.video.insert(embedded)
              return false
            } else {
              return false
            }
          },
          'froalaEditor.image.inserted': (e, editor, $img, response) => {
            console.info('inserted $img', $img)
          },
          'froalaEditor.initialized': (e, editor) => {
            this.editor = editor
          },
          'froalaEditor.contentChanged': (e, editor) => {
            this.$emit('on-change', editor.html.get(true))
          }
        }
      }
    }
  },
  methods: {
    setHtml(html) {
      if (this.editor) {
        this.editor.html.set(html)
      }
    }
  }
}
</script>
<style></style>
