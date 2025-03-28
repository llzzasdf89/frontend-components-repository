---
outline: deep
---

## installation

::: code-group

```sh [npm]
whole repository:
$ npm install frontend-components-repository

element-ui package:
$ npm install frontend-components-repository@fcr-element-ui

```

```sh [pnpm]
whole repository:
$ pnpm add frontend-components-repository

element-ui package:
$ pnpm add frontend-components-repository@fcr-element-ui
```

:::

## import

### global registration (for Vue 2.x )

```js [main.js]
import FCR from 'frontend-components-repository@fcr-element-ui'
Vue.use(FCR)
```

```vue [xxx.vue]
<template>
  <FCR.FormDialog />
</template>
```

### registration on demand (for Vue 2.x)

```vue [xxx.vue]
<template>
  <div>
    <FCRFormDialog />
  </div>
</template>

<script>
import { FCRFormDialog } from 'frontend-components-repository@fcr-element-ui'
export default {
  components: {
    FCRFormDialog,
  },
}
</script>
```

## component usage

- check the documentation corresponding to the component
