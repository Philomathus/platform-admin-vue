<template>
  <div class="app-container">

    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入用户ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item prop="createTime">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['activity:userActivity:add']">新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['activity:userActivity:remove']">删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['activity:userActivity:export']">导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="userActivityList"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" min-width="60"/>
      <el-table-column label="用户id" align="center" prop="id" min-width="60"/>
      <el-table-column label="参加的活动" prop="msg" align="center" min-width="160"/>
      <el-table-column label="状态" prop="status" align="center" min-width="100">
        <template slot-scope="scope">
          <span :style="{color: (status = statusOptions[parseInt(scope.row.status)]).color}">
            {{status.dictLabel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" prop="createTime" align="center" min-width="160"/>
      <el-table-column label="修改时间" prop="updateTime" align="center" min-width="160"/>
      <el-table-column label="操作人员" prop="updateBy" align="center" min-width="100"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" min-width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['activity:userActivity:edit']"
            >修改
          </el-button>
          <el-button
            style="color: #FF5722"
            size="mini"
            type="text"
            icon="el-icon-delete"
            v-hasPermi="['activity:userActivity:remove']"
            @click="handleDelete(scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"/>

<!--    add or update form -->
    <el-dialog :title="title" :visible.sync="open" width="600" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="90px">
        <el-form-item label="标题" prop="msg">
          <el-input v-model="form.msg" placeholder="请输入留言"/>
        </el-form-item>
        <el-form-item label="活动类型" prop="status">
          <el-select
            filterable
            v-model="form.status"
            placeholder="请选择活动类型"
            clearable
            size="small"
            style="width: 240px">
            <el-option
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="open=false">取 消</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import {
  addUserActivity,
  delUserActivity,
  exportUserActivity,
  listActivityInfo,
  updateUserActivity, userActivityById
} from "@/api/activity/userActivity";
import {pickerDateShortcuts} from "@/utils/dateUtils";

export default {
  name: "index",

data(){
  return{
      /** 遮罩层  */
      loading: true,

      ids: [],               /** 选中数组 */
      single: true,          /** 非单个禁用 */
      multiple: true,        /** 非多个禁用 */
      showSearch: true,      /** 显示搜索条件 */
      total: 0,              /** 总条数 */
      activityInfoList: [],  /** 活动信息表格数据  */
      title: "",             /** 弹出层标题  */
      open: false,          /** 是否显示弹出层  */


     dateRange: [],          /** 日期范围 */
     pickerOptions: {shortcuts: pickerDateShortcuts},

     userActivityList : [],
     statusOptions: [],

     queryParams:{
      pageNum:1,
      pageSize:15,
      createTime: null,
     },

     form:{},
     rules:{
      msg: [
        {required: true, message: "参加的活动不能为空", trigger: "blur"}
      ],
    },

    }
  },

  created() {
    this.getList();
    this.getDicts('user_activity_status').then(response => {
      this.statusOptions = response.data
    })
  },

  methods:{

    /** 查询用户活动信息列表 */
    getList(){
      this.loading = true;
      listActivityInfo(this.addDateRange(this.queryParams, this.dateRange)).then(res=>{
        this.userActivityList = res.rows
        this.total = res.total
        this.loading = false
      })
    },

    /** 多选框选中数据 */
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },

    /** 搜索按钮操作 */
    handleQuery(){
      this.queryParams.pageNum =1,
      this.getList();
    },

    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm("queryForm");
      this.handleQuery();
    },

   /** 表单重置 */
    reset() {
      this.form = {
        id: null,
        msg: null,
        createTime: null,
        status: null,
        updateBy: null,
      };
      this.resetForm("form");
    },

    /** 新增按钮操作 */
    handleAdd(){
      this.open = true
      this.title = "add data"
    },

    /** 提交按钮 */
    submitForm(){
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateUserActivity(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addUserActivity(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },

    /** 修改按钮操作 */
    handleUpdate(row){
      console.log(row)
      userActivityById(row.id).then(res=>{
        this.form = res.data
        this.title = "updateForm";
        this.open = true
      })
    },

    /** 删除按钮操作 */
    handleDelete(row){
      const id = row.id || this.ids;
      this.$confirm('是否确认删除"?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delUserActivity(id);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      })
    },

    /** 导出按钮操作 */
    handleExport(){
      const queryParams = this.queryParams;
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return exportUserActivity(queryParams);
      }).then(response => {
        this.downloadExcel(response, '活动信息')
      }).catch(() => {
      })
    }

  }
}
</script>

<style scoped>

</style>
