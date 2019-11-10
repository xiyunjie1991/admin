<template>
  <div id="app">
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" @ready="onReady"/>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-decoupled-document'

export default {
  name: 'App',
  data() {
    return {
      editor: ClassicEditor,
      editorData: '  <img src="https://oss.pog.ltd/file/5cac465800e589f10a568e53">',
      editorConfig: {
        // The configuration of the editor.
        'resize_resize_minHeight': 3000
      }
    }
  },
  methods: {
    onReady(editor) {
      editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      )
    }
  }
}
</script>
