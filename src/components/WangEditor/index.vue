<template>
  <div class="editor">
    <div ref="toolbar" class="toolbar"/>
    <div ref="editor"
         v-loading="fullLoading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)" width="180px"
         class="text"
    />
  </div>
</template>

<script>
import E from 'wangeditor'
import { getToken } from '@/utils/auth'

export default {
  name: 'wangEditor',
  data() {
    return {
      editor: null,
      fullLoading: false
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    path: {
      type: String,
      default: 'default'
    }
  },
  watch: {
    value: function(value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value)
      }
    }
  },
  methods: {
    setEditor() {
      this.fullLoading = true
      this.editor = new E(this.$refs.toolbar, this.$refs.editor)
      this.editor.config.uploadImgServer = process.env.VUE_APP_BASE_API + '/upload/oss/' + this.path
      this.editor.config.uploadFileName = 'file'
      this.editor.config.uploadImgHeaders = {
        Authorization: 'Bearer ' + getToken()
      }
      this.editor.config.uploadImgMaxLength = 5
      this.editor.config.uploadImgMaxSize = 10 * 1024 * 1024 // 10M
      this.editor.config.pasteFilterStyle = false
      this.editor.config.uploadImgHooks = {
        timeout: function(xhr, editor) {
          this.$message.error('上传超时！')
        },
        customInsert: function(insertImg, result, editor) {
          insertImg(localStorage.getItem('vHostUrl') + result.data)
        }
      }
      this.editor.config.uploadImgTimeout = 3 * 60 * 1000
      this.editor.config.onchange = (html) => {
        this.$emit('change', html)
      }
      this.editor.create()
      this.fullLoading = false
    }
  },
  mounted() {
    this.setEditor()
    this.editor.txt.html(this.value)
  }
}
</script>
<style lang="css">
.editor {
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 0;
}

.toolbar {
  border: 1px solid #ccc;
}

.text {
  border: 1px solid #ccc;
  min-height: 500px;
}
</style>
