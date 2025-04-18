<template>
  <div
    :class="['FCR-image-uploader', dragging ? 'dragging' : '']"
    @click="handleUploadClick"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @drop="handleDrop"
    @dragover.prevent
    :style="{
      width,
      height,
    }"
    id="image-uploader"
    v-loading="loading"
  >
    <div
      class="FCR-image-uploader__img"
      v-if="url"
    >
      <img
        :src="url"
        width="100%"
        @load="handleImgLoaded"
      />
      <i
        class="el-icon-close"
        id="image-uploader-delete"
        v-if="!imgLoading"
      >
      </i>
    </div>
    <div
      class="FCR-image-uploader__tip"
      v-else
    >
      Drag and drop your file here ，or
      <a> click space area to invoke uploader </a>
      <br />
      Note:
      <a> only .png, .jpg, .jpeg </a> formats are accepted
      <br />
      {{ tip }}
    </div>
    <input
      class="FCR-image-uploader__input"
      type="file"
      ref="inputRef"
      accept=".png, .jpg, .jpeg"
      @change="onFileInput"
    />
  </div>
</template>

<script>
import { Message, Loading } from 'element-ui'
export default {
  name: 'FCR-Image-Uploader',
  props: {
    width: {
      type: String,
      default: '480px',
    },
    height: {
      type: String,
      default: '270px',
    },
    tip: {
      type: String,
      default: 'suggested size：480*270',
    },
    fetchMethod: {
      type: Function,
      default: null,
      required: true,
    },
    uploadMethod: {
      type: Function,
      default: null,
      required: true,
    },
  },
  created() {
    this.handleFetchImage()
  },
  data() {
    return {
      url: '',
      dragging: false,
      loading: false,
      imgLoading: false,
    }
  },
  methods: {
    async handleFetchImage() {
      try {
        if (typeof this.fetchMethod !== 'function') {
          throw Error('fetch method is not a function')
        }
        this.loading = true
        const { result, succ = 'ok' } = await this.fetchMethod()
        if (succ !== 'ok') {
          throw Error('fetch method error')
        }
        this.url = result.value
        this.imgLoading = true
      } catch (err) {
        Message.error('fetch img url error')
        console.error('fetch img url error', err)
      } finally {
        this.loading = false
      }
    },
    onFileInput(e) {
      if (!this.validateFileFormat(e.target.files[0])) {
        Message.error('only accept .png, .jpg, .jpeg formats file')
        return
      }
      this.uploadFile(e.target.files[0])
    },
    handleImgLoaded() {
      this.imgLoading = false
    },
    async uploadFile(file) {
      try {
        if (typeof this.uploadMethod !== 'function') {
          throw Error('upload method is not a function')
        }
        this.loading = true
        const { succ = 'ok' } = await this.uploadMethod(file)
        if (succ !== 'ok') {
          throw Error('upload image error')
        }
        Message.success('upload image success ')
      } catch (err) {
        Message.error('upload image error')
        console.error('upload image error', err)
      } finally {
        this.loading = false
        this.handleFetchImage()
      }
    },
    validateFileFormat(file) {
      if (!file || !file.name) {
        throw Error('file object is not valid')
      }
      //validate file format through file name
      const fileNameSplitArr = file.name.split('.')
      return (
        fileNameSplitArr.length > 1 &&
        ['png', 'jpg', 'jpeg'].includes(
          fileNameSplitArr[fileNameSplitArr.length - 1]
        )
      )
    },
    handleDrop(e) {
      e.preventDefault() //prevent default behavior to preview the image
      this.dragging = false
      if (this.url) {
        //if image already exists, do nothing
        return
      }
      if (!this.validateFileFormat(e.dataTransfer.files[0])) {
        Message.error('Only Accept .png、jpg、jpeg formats image')
        return
      }
      this.uploadFile(e.dataTransfer.files[0])
    },
    onDragEnter(e) {
      //only handle drag event from image-uploader element
      if (e.target.id !== 'image-uploader') {
        return
      }
      this.dragging = true
    },
    onDragLeave(e) {
      //only handle drag event from image-uploader element
      if (e.target.id !== 'image-uploader') {
        return
      }
      this.dragging = false
    },
    handleDeleteImage() {
      this.url = ''
      Message.success(
        'Delete image success ( Note:the deleted image will be saved until you upload a new one )'
      )
    },
    handleUploadClick(e) {
      if (this.url && e.target.id === 'image-uploader-delete') {
        this.handleDeleteImage()
        return
      }
      if (!this.url && this.$refs && this.$refs.inputRef) {
        this.$refs.inputRef.click()
        return
      }
    },
  },
}
</script>

<style lang="scss">
.dragging {
  border: 4px dashed red !important;
}
.FCR-image-uploader {
  &:hover {
    cursor: pointer;
  }
  &__img {
    position: relative;
    .el-icon-close {
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 24px;
      &:hover {
        color: red;
        cursor: pointer;
        border: 1px solid red;
      }
    }
  }
  &__input {
    display: none;
  }
  &__tip {
    font-size: 13px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border: 4px dashed #eee;
  border-radius: 4px;
  width: 480px;
  height: 270px;
}
</style>
