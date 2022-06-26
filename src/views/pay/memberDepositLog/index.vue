<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch">
      <el-form-item prop="opTime">
        <el-date-picker type="datetimerange" v-model="dateRange" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '90%'}" start-placeholder="开始时间"
                        end-placeholder="开始时间"
                        range-separator="至" clearable :default-time="['00:00:00', '23:59:59']" :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="searchValue">
        <el-input
          v-model.trim="queryParams.searchValue"
          placeholder="会员ID/账号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="moneydes">
        <el-select v-model="queryParams.moneydes" placeholder="请选择入款类型" clearable>
          <el-option
            v-for="item in moneydesOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="会员账号" prop="userName">-->
<!--        <el-input-->
<!--          v-model="queryParams.userName"-->
<!--          placeholder="请输入会员账号"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="加分金额" prop="money">-->
<!--        <el-input-->
<!--          v-model="queryParams.money"-->
<!--          placeholder="请输入加分金额"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item prop="remark">
        <el-input
          v-model="queryParams.remark"
          placeholder="请输入加分备注"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="remarkPay">
        <el-input
          v-model="queryParams.remarkPay"
          placeholder="请输入支付备注"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="orderRemark">
        <el-input
          v-model="queryParams.orderRemark"
          placeholder="请输入订单备注"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="打码倍数" prop="beatNum">-->
<!--        <el-input-->
<!--          v-model="queryParams.beatNum"-->
<!--          placeholder="请输入打码倍数"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item prop="opName">
        <el-input
          v-model="queryParams.opName"
          placeholder="请输入操作人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="提交IP" prop="ip">-->
<!--        <el-input-->
<!--          v-model="queryParams.ip"-->
<!--          placeholder="请输入提交IP"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
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
<!--          v-hasPermi="['pay:memberDepositLog:add']"-->
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
<!--          v-hasPermi="['pay:memberDepositLog:edit']"-->
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
<!--          v-hasPermi="['pay:memberDepositLog:remove']"-->
<!--        >删除</el-button>-->
<!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['pay:memberDepositLog:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="memberDepositLogList" @selection-change="handleSelectionChange">
<!--      <el-table-column type="selection" width="55" align="center" />-->
<!--      <el-table-column label="系统编号" align="center" prop="id" />-->
      <el-table-column label="会员编号" align="center" prop="memberId" />
      <el-table-column label="会员账号" align="center" prop="userName" />
      <el-table-column label="入款类型" align="center" prop="moneydes" :formatter="moneydesFormat"/>
      <el-table-column label="加分金额" align="center" prop="money" />
      <el-table-column label="加分备注" align="center" prop="remark" />
      <el-table-column label="支付备注" align="center" prop="remarkPay" />
      <el-table-column label="订单备注" align="center" prop="orderRemark" />
      <el-table-column label="打码倍数" align="center" prop="beatNum" />
      <el-table-column label="提交IP" align="center" prop="ip" />
      <el-table-column label="操作人" align="center" prop="opName" />
      <el-table-column label="创建时间" align="center" prop="opTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.opTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-edit"-->
<!--            @click="handleUpdate(scope.row)"-->
<!--            v-hasPermi="['pay:memberDepositLog:edit']"-->
<!--          >修改</el-button>-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-delete"-->
<!--            @click="handleDelete(scope.row)"-->
<!--            v-hasPermi="['pay:memberDepositLog:remove']"-->
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

    <!-- 添加或修改人工加分日志对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="会员编号" prop="memberId">
          <el-input v-model="form.memberId" placeholder="请输入会员编号" />
        </el-form-item>
        <el-form-item label="会员账号" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入会员账号" />
        </el-form-item>
        <el-form-item label="加分金额" prop="money">
          <el-input v-model="form.money" placeholder="请输入加分金额" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="支付备注" prop="remarkPay">
          <el-input v-model="form.remarkPay" placeholder="请输入支付备注" />
        </el-form-item>
        <el-form-item label="订单备注" prop="orderRemark">
          <el-input v-model="form.orderRemark" placeholder="请输入订单备注" />
        </el-form-item>
        <el-form-item label="打码倍数" prop="beatNum">
          <el-input v-model="form.beatNum" placeholder="请输入打码倍数" />
        </el-form-item>
        <el-form-item label="创建时间" prop="opTime">
          <el-date-picker clearable size="small"
            v-model="form.opTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="操作人" prop="opName">
          <el-input v-model="form.opName" placeholder="请输入操作人" />
        </el-form-item>
        <el-form-item label="提交IP" prop="ip">
          <el-input v-model="form.ip" placeholder="请输入提交IP" />
        </el-form-item>
        <el-form-item label="备注字典(1 人工入款 2线上入款 3线下入款)" prop="moneydes">
          <el-input v-model="form.moneydes" placeholder="请输入备注字典(1 人工入款 2线上入款 3线下入款)" />
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
import { listMemberDepositLog, getMemberDepositLog, delMemberDepositLog, addMemberDepositLog, updateMemberDepositLog, exportMemberDepositLog } from "@/api/platform-web/pay/memberDepositLog";
import {pickerDateTimeShortcuts} from '@/utils/dateUtils'

export default {
  name: "MemberDepositLog",
  components: {
  },
  data() {
    return {
      pickerOptions: {shortcuts: pickerDateTimeShortcuts},
      //入款类型
      moneydesOptions: [{
        value: '1',
        label: '人工入款'
      }, {
        value: '2',
        label: '线上入款'
      }, {
        value: '3',
        label: '线下入款'
      }],
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
      // 日期范围
      dateRange: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],
      // 人工加分日志表格数据
      memberDepositLogList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        memberId: null,
        userName: null,
        money: null,
        remarkPay: null,
        orderRemark: null,
        beatNum: null,
        opTime: null,
        opName: null,
        ip: null,
        moneydes: null
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
    /** 查询人工加分日志列表 */
    getList() {
      this.loading = true;
      listMemberDepositLog(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.memberDepositLogList = response.rows;
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
        memberId: null,
        userName: null,
        money: null,
        remark: null,
        remarkPay: null,
        orderRemark: null,
        beatNum: null,
        opTime: null,
        opName: null,
        ip: null,
        moneydes: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if(this.queryParams.searchValue){
        const reg = '^[0-9a-zA-Z_]{1,}$'
        let flag = this.queryParams.searchValue.match(reg)
        if(!flag){
          this.msgError("会员ID/账号只能输入数字及下划线")
          return
        }
      }
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
      this.title = "添加人工加分日志";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMemberDepositLog(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改人工加分日志";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateMemberDepositLog(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMemberDepositLog(this.form).then(response => {
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
      this.$confirm('是否确认删除人工加分日志编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delMemberDepositLog(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(() => {
	  })
    },
    moneydesFormat(row, column) {
      if (row.moneydes === "1") {
        return '人工入款'
      } else if (row.moneydes === "2") {
        return '线上入款'
      } else if (row.moneydes === "3") {
        return '线下入款'
      }
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return exportMemberDepositLog(queryParams);
      }).then(response => {
        this.downloadExcel(response, '人工加分日志');
      }).catch(() => {
      })
    }
  }
};
</script>
