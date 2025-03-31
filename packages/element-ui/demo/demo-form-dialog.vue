<template>
  <div>
    <el-button
      type="primary"
      @click="handleOpen"
    >
      点击打开弹窗
    </el-button>
    <FCR-Form-Dialog
      :visible.sync="visible"
      :config="config"
    >
    </FCR-Form-Dialog>
  </div>
</template>

<script>
const config = {
  dialogConfig: {
    title: 'demo标题',
    width: '400px',
    appendToBody: true,
  },
  fetchApi: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: '提交成功',
        })
      }, 2000)
    })
  },
  formConfigArray: [
    {
      label: '姓名',
      prop: 'name',
      type: 'el-input',
      defaultValue: '',
      props: {
        clearable: true,
      },
    },
    {
      label: '电话',
      prop: 'tel',
      type: 'el-input',
      defaultValue: '',
      props: {
        clearable: true,
      },
    },
    {
      label: '城市',
      prop: 'city',
      type: 'el-select',
      defaultValue: '',
      props: {
        clearable: true,
        style: {
          width: '100%',
        },
      },
      options: [
        {
          label: '北京',
          value: 'beijing',
        },
        {
          label: '上海',
          value: 'shanghai',
        },
      ],
    },
  ],
}
export default {
  name: 'demo-form-table',
  data() {
    return {
      visible: false,
      config,
    }
  },
  methods: {
    handleOpen() {
      this.visible = true
    },
  },
}
</script>

<style></style>
