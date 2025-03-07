<template>
  <el-dialog
    v-bind="config.dialogConfig"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-form
      :model="form"
      ref="formRef"
      v-loading="loading"
    >
      <el-form-item
        v-for="item in config.formConfigArray"
        :key="item.prop"
        v-bind="item"
      >
        <component
          :is="item.type"
          v-bind="item.props || {}"
          v-on="item.listeners || {}"
          v-model="form[item.prop]"
        >
          <template
            v-if="item.type === 'el-select' && Array.isArray(item.options)"
          >
            <el-option
              v-for="option in item.options"
              :key="option.value"
              v-bind="option"
            >
            </el-option>
          </template>
        </component>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel"> 取消 </el-button>
      <el-button @click="handleConfirm"> 确认 </el-button>
    </template>
  </el-dialog>
</template>

<script>
import { Dialog, Form, Option, Button, Message } from 'element-ui'
export default {
  name: 'FCR-Form-Dialog',
  components: {
    [Dialog.name]: Dialog,
    [Form.name]: Form,
    [Option.name]: Option,
    [Button.name]: Button,
    [Message.name]: Message,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    config: {
      type: Object,
      default: () => ({
        dialogConfig: {
          title: '这是一个对话框',
          width: '1000px',
          appendToBody: true,
        },
        fetchApi: null,
        formConfigArray: [
          {
            label: '姓名',
            prop: 'name',
            type: 'el-input',
            defaultValue: '',
            props: {
              clearable: true,
            },
            listeners: {
              change: (newValue) => {
                console.log('change', newValue)
              },
            },
          },
        ],
      }),
    },
    formParams: {
      type: Object,
      default: () => ({
        name: 'Richard',
      }),
    },
  },
  model: {
    prop: 'visible',
    event: 'update:visible',
  },
  data() {
    return {
      form: {},
      loading: false,
    }
  },
  methods: {
    handleResetFields() {
      if (this.$refs?.formRef?.resetFields) {
        this.$refs.formRef.resetFields()
        return
      }
      for (let { prop, defaultValue } of this.config.formConfigArray) {
        this.$set(this.form, prop, defaultValue)
      }
    },
    handleOpen() {
      if (Object.toString.call(this.formParams) !== '[object Object]') {
        return
      }
      for (let { prop, defaultValue } of this.config.formConfigArray) {
        if (this.formParams[prop]) {
          this.form[prop] = this.formParams[prop]
          continue
        }
        this.form[prop] = defaultValue
      }
    },
    handleClose(event) {
      if (event === 'success') this.$emit('success')
      else this.$emit('close')
      this.handleResetFields()
      this.$emit('update:visible', false)
    },
    async handleConfirm() {
      if (typeof this.config.fetchApi) {
        return
      }
      try {
        this.loading = true
        const { success = false, message = '' } = await this.config.fetchApi(
          this.form
        )
        if (!success) throw Error(message ?? '提交失败')
        Message.success('提交成功')
        this.handleClose('success')
      } catch (err) {
        Message.error(err.message ?? '提交失败')
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    handleCancel() {
      this.$emit('update:visible')
    },
  },
}
</script>
