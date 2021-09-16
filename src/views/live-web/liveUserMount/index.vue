<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="过期时间" prop="selectDate">
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
      <el-form-item label="用户id" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="mountId">
        <el-select
          filterable
          v-model="queryParams.mountId"
          placeholder="请选择坐骑名称"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="Platform in mountNameOptions"
            :key="Platform.id"
            :label="Platform.name"
            :value="Platform.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="isUse">
        <el-select v-model="queryParams.isUse" placeholder="请选择状态" size="small" clearable>
          <el-option
            v-for="item in isUseOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
<!--        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>-->
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
<!--          v-hasPermi="['admin:liveUserMount:add']"-->
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
<!--          v-hasPermi="['admin:liveUserMount:edit']"-->
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
<!--          v-hasPermi="['admin:liveUserMount:remove']"-->
<!--        >删除</el-button>-->
<!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:liveUserMount:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="liveUserMountList">
      <el-table-column label="用户id" align="center" prop="userId" />
      <el-table-column label="过期时间" align="center" prop="effectiveTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.effectiveTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="坐骑名称" align="center" prop="mountName" />
      <el-table-column label="状态" align="center" prop="isUse" :formatter="formatterIsUse"/>
<!--      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-edit"-->
<!--            @click="handleUpdate(scope.row)"-->
<!--            v-hasPermi="['admin:liveUserMount:edit']"-->
<!--          >修改</el-button>-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-delete"-->
<!--            @click="handleDelete(scope.row)"-->
<!--            v-hasPermi="['admin:liveUserMount:remove']"-->
<!--          >删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改坐骑领取记录对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户id" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户id" />
        </el-form-item>
        <el-form-item label="过期时间" prop="effectiveTime">
          <el-date-picker clearable size="small"
            v-model="form.effectiveTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择过期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="坐骑名称" prop="mountId">
          <el-input v-model="form.mountId" placeholder="请输入坐骑名称" />
        </el-form-item>
        <el-form-item label="0:禁用;1:启用;默认启用" prop="isUse">
          <el-input v-model="form.isUse" placeholder="请输入0:禁用;1:启用;默认启用" />
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
import { listLiveUserMount, getLiveUserMount, delLiveUserMount, addLiveUserMount, updateLiveUserMount, exportLiveUserMount, mountNames} from "@/api/live-web/liveUserMount";
import {pickerDateShortcuts} from "@/utils/dateUtils";

export default {
  name: "LiveUserMount",
  components: {
  },
  data() {
    return {
      isUseOptions: [{
        value: '0',
        label: '禁用'
      }, {
        value: '1',
        label: '启用'
      }],
      // 日期范围
      selectDate: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],
      pickerOptions: {shortcuts: pickerDateShortcuts},
      // 坐骑名称
      mountNameOptions: [],
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
      // 坐骑领取记录表格数据
      liveUserMountList: [],
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
        effectiveTime: null,
        mountId: null,
        isUse: null
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
    //支付平台
    mountNames().then(response => {
      this.mountNameOptions = response.data
    })
  },
  methods: {
    // 状态
    formatterIsUse(row) {
      if (row.isUse == 0) {
        return '禁用'
      } else if (row.isUse == 1) {
        return '启用'
      }
    },
    /** 查询坐骑领取记录列表 */
    getList() {
      this.loading = true;
      listLiveUserMount(this.queryParams).then(response => {
        this.liveUserMountList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        userId: null,
        effectiveTime: null,
        mountId: null,
        isUse: null
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
      this.title = "添加坐骑领取记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLiveUserMount(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改坐骑领取记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLiveUserMount(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLiveUserMount(this.form).then(response => {
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
      this.$confirm('是否确认删除坐骑领取记录编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delLiveUserMount(ids);
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
        return exportLiveUserMount(queryParams);
      }).then(response => {
        this.downloadExcel(response, '坐骑领取记录');
      }).catch(() => {
      })
    }
  }
};
</script>
