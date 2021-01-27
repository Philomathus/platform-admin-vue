<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-input
        type="textarea"
        :rows="20"
        placeholder="请输入内容"
        @input="change($event)"
        v-model="textarea">
      </el-input>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          @click="handleUpdate"
          v-hasPermi="['admin:liveLimitMsg:edit']"
        >修改</el-button>
      </el-col>
    </el-form>
  </div>
</template>

<script>

import {listReport,editWord} from "@/api/platform-web/system/liveLimitMsg";
import FileUpload from '@/components/FileUpload';
export default {
  name: "memberGame",
  components: {
    FileUpload,
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      textarea:null,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 平台资金报，记录平台每日收入及支出总额，预估当前会员的积分余额表格数据
      report: [],
      // 日期范围
      dateRange: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      listReport(this.queryParams).then(response => {
        this.textarea = response.msg;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    change(e) {
      this.$forceUpdate()
    },

    handleUpdate(row) {
      editWord(this.textarea).then(response => {
        this.msgSuccess('修改成功')
        this.open = true;
        this.getList();
      })


    },
  }
};


</script>
