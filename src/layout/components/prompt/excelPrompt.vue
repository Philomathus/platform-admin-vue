<template>
  <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px"
             append-to-body
  >
    <el-form ref="queryForm" :inline="true" label-width="68px">
      <el-form-item :label="$t('excel.selectDate')" prop="selectDate">
        <el-date-picker type="datetimerange" v-model="selectDate" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '370px'}" :start-placeholder="$t('excel.startDatePlaceholder')"
                        :end-placeholder="$t('excel.endDatePlaceholder')"
                        :range-separator="$t('excel.rangeSeparator')" :default-time="['00:00:00', '23:59:59']"  clearable
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">{{ $t('excel.submitButton') }}
      </el-button>
      <el-button @click="open=!open">{{ $t('excel.cancelButton') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "ExcelPrompt",
    props: {
      propC: {
        type: String,
        required: false,
        default: '100',
      },
    },
    /*组件值*/
    data() {
      return {
        title:  this.$t('excel.cancelButton'),
        selectDate: [],
        open: false,
      }
    },
    /*监听器,监听单个变量,param就是data的变量*/
    watch: {
      param: function (newVal, oldVal) {

      },
    },
    /*监听器2号,监听多个变量*/
    computed: {
      getValue: function () {
        return ''
      }
    },
    /*组件方法*/
    methods: {
      submitForm() {
        if (this.selectDate) {
          var milliseconds = new Date(this.selectDate[1]).getTime();
          var milliseconds1 = new Date(this.selectDate[0]).getTime();
          if ((milliseconds - milliseconds1) < 604800000) {
            this.$emit("downLoadExcel", this.selectDate)
            this.open = false;
          } else {
            this.$notify.warning(this.$t('excel.noLongerThanSevenDaysWarning'))
          }
        }
      }
    },
    /*组件的初始化方法*/
    created() {

    },
    /*组件的销毁方法*/
    destroyed() {
    },
  }


</script>

<style scoped>

</style>
