<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="创建时间" prop="selectDate">
        <el-date-picker
          v-model="queryParams.selectDate"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="anchor">
        <el-input
          v-model="queryParams.anchor"
          placeholder="请输入主播ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择处理状态" size="small">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          plain-->
<!--          icon="el-icon-plus"-->
<!--          size="mini"-->
<!--          @click="handleAdd"-->
<!--          v-hasPermi="['admin:liveComplaint:add']"-->
<!--        >新增</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="success"-->
<!--          plain-->
<!--          icon="el-icon-edit"-->
<!--          size="mini"-->
<!--          :disabled="single"-->
<!--          @click="handleUpdate"-->
<!--          v-hasPermi="['admin:liveComplaint:edit']"-->
<!--        >修改</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="danger"-->
<!--          plain-->
<!--          icon="el-icon-delete"-->
<!--          size="mini"-->
<!--          :disabled="multiple"-->
<!--          @click="handleDelete"-->
<!--          v-hasPermi="['admin:liveComplaint:remove']"-->
<!--        >删除</el-button>-->
<!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:liveComplaint:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="liveComplaintList">
      <el-table-column label="投诉内容" align="center" prop="content" />
      <el-table-column label="用户手机号" align="center" prop="mobile" />
      <el-table-column label="房间名称" align="center" prop="roomName" />
      <el-table-column label="用户ID" align="center" prop="userId" />
      <el-table-column label="主播" align="center" prop="anchor" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审批人" align="center" prop="approver" />
      <el-table-column label="审批时间" align="center" prop="processingTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.processingTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理状态" align="center" prop="status" :formatter="formatterStatus"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="success"
            plain
            v-show="scope.row.status == 0"
            @click="handleUpdate(scope.row,1)"
            v-hasPermi="['admin:liveComplaint:edit']"
          >处理
          </el-button>
          <el-button
            size="small"
            type="danger"
            plain
            v-show="scope.row.status == 0"
            @click="handleUpdate(scope.row,2)"
            v-hasPermi="['admin:liveComplaint:edit']"
          >驳回
          </el-button>
        </template>
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-edit"-->
<!--            @click="handleUpdate(scope.row)"-->
<!--            v-hasPermi="['admin:liveComplaint:edit']"-->
<!--          >修改</el-button>-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-delete"-->
<!--            @click="handleDelete(scope.row)"-->
<!--            v-hasPermi="['admin:liveComplaint:remove']"-->
<!--          >删除</el-button>-->
<!--        </template>-->
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改主播投诉记录对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="投诉内容" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="用户" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户" />
        </el-form-item>
        <el-form-item label="主播" prop="anchor">
          <el-input v-model="form.anchor" placeholder="请输入主播" />
        </el-form-item>
        <el-form-item label="审批人" prop="approver">
          <el-input v-model="form.approver" placeholder="请输入审批人" />
        </el-form-item>
        <el-form-item label="审批时间" prop="processingTime">
          <el-date-picker clearable size="small"
            v-model="form.processingTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择审批时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态(0待处理 1审核通过 2驳回)">
          <el-radio-group v-model="form.status">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listLiveComplaint, getLiveComplaint, delLiveComplaint, addLiveComplaint, updateLiveComplaint, exportLiveComplaint } from "@/api/live-web/liveComplaint";
import {pickerDateShortcuts} from "@/utils/dateUtils";

export default {
  name: "LiveComplaint",
  components: {
  },
  data() {
    return {
      statusOptions: [{
        value: '0',
        label: '未处理'
      }, {
        value: '1',
        label: '已处理'
      }, {
        value: '2',
        label: '驳回'
      }],
      // 日期范围
      selectDate: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],
      pickerOptions: {shortcuts: pickerDateShortcuts},
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 主播投诉记录表格数据
      liveComplaintList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        selectDate: [this.parseTime(new Date(), '{y}-{m}-{d}'), this.parseTime(new Date(), '{y}-{m}-{d}')],
        pageNum: 1,
        pageSize: 10,
        userId: null,
        anchor: null,
        approver: null,
        processingTime: null,
        status: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询主播投诉记录列表 */
    getList() {
      this.loading = true;
      listLiveComplaint(this.queryParams).then(response => {
        this.liveComplaintList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 处理状态
    formatterStatus(row) {
      if (row.status == 0) {
        return '未处理'
      } else if (row.status == 1) {
        return '已处理'
      } else if (row.status == 2){
        return '驳回'
      }
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        remark: null,
        userId: null,
        anchor: null,
        createTime: null,
        approver: null,
        processingTime: null,
        status: 0
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加主播投诉记录";
    },
    // /** 修改按钮操作 */
    // handleUpdate(row) {
    //   this.reset();
    //   const id = row.id || this.ids
    //   getLiveComplaint(id).then(response => {
    //     this.form = response.data;
    //     this.open = true;
    //     this.title = "修改主播投诉记录";
    //   });
    // },
    /** 处理驳回按钮操作 */
    handleUpdate(row,status) {
      this.$prompt('请输入审核备注', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        const id = row.id
        updateLiveComplaint(id,value,status).then(response => {
          this.msgSuccess("审核处理成功");
          this.getList();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });

    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLiveComplaint(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLiveComplaint(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除主播投诉记录编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delLiveComplaint(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(() => {
	  })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return exportLiveComplaint(queryParams);
      }).then(response => {
        this.downloadExcel(response, '主播投诉记录');
      }).catch(() => {
      })
    }
  }
};
</script>
