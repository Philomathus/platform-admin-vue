<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.el-table .danger-row {
  background: #fef0f0;
}

.el-table__body tr.current-row>td {
  background: #cccc77 !important;
}
</style>
<script>
export default  {
  name:  'App'
}
</script>
