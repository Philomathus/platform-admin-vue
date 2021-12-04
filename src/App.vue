<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style>
.el-table .warning-row {
  background: #ffb4b4;
}

.el-table .register-row {
  background: #619e5d;
}

.el-table .gopay-row {
  background: #5f72a7;
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

/*在Chrome下移除input[number]的上下箭头*/
.no-number::-webkit-outer-spin-button,
.no-number::-webkit-inner-spin-button {
  margin: 0;
  -webkit-appearance: none !important;
}

.no-number input[type="number"]::-webkit-outer-spin-button,
.no-number input[type="number"]::-webkit-inner-spin-button {
  margin: 0;
  -webkit-appearance: none !important;
}

/*在firefox下移除input[number]的上下箭头*/
.no-number {
  -moz-appearance: textfield;
}

.no-number input[type="number"] {
  -moz-appearance: textfield;
}
</style>
<script>
export default  {
  name:  'App'
}
</script>
