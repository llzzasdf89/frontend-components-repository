<template>
  <div>
    首页:
    <ul>
      <li v-for="name in demoList">
        <router-link :to="{ name }">
          {{ name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      demoList: ['demo-form-table-dialog', 'demo-img-uploader'],
    }
  },
}
</script>

<style></style>
