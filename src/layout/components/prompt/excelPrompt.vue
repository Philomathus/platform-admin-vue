<template>
  <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="350px"
             append-to-body
  >
    <el-form ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="选择日期" prop="selectDate">
        <el-date-picker type="daterange" v-model="selectDate" format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd" :style="{width: '240px'}" start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        range-separator="至" clearable
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定
      </el-button>
      <el-button @click="open=!open">取 消</el-button>
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
        title: '导出提示',
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
          if (this.selectDate[1].indexOf(" 23:59:59") < 0) {
            this.selectDate[1] = this.selectDate[1]+" 23:59:59";
          }
          var milliseconds = new Date(this.selectDate[1]).getTime();
          if (this.selectDate[0].indexOf(" 00:00:00") < 0){
            this.selectDate[0] = this.selectDate[0]+ " 00:00:00"
          }
          var milliseconds1 = new Date(this.selectDate[0]).getTime();
          if ((milliseconds - milliseconds1) < 604800000) {
            this.$emit("downLoadExcel", this.selectDate)
            this.open = false;
          } else {
            this.$notify.warning("所选时间不能大于七天")
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
