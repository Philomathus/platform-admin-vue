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
      <el-form-item prop="memberId">
        <el-input
          v-model="queryParams.memberId"
          placeholder="请输入会员编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入会员账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="channelName">
        <el-input
          v-model="queryParams.channelName"
          placeholder="请输入渠道名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--      <el-form-item label="充值U数量" prop="rechargeNumber">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.rechargeNumber"-->
      <!--          placeholder="请输入充值U数量"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="充值金额" prop="rechargeMoney">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.rechargeMoney"-->
      <!--          placeholder="请输入充值金额"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择处理状态" size="small" clearable>
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!--      <el-form-item label="优惠比例" prop="discountBill">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.discountBill"-->
      <!--          placeholder="请输入优惠比例"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="链名称" prop="chainName">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.chainName"-->
      <!--          placeholder="请输入链名称"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="充值地址" prop="rechargeAddress">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.rechargeAddress"-->
      <!--          placeholder="请输入充值地址"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item prop="transactionId">
        <el-input
          v-model="queryParams.transactionId"
          placeholder="请输入交易id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--      <el-form-item label="操作人" prop="opName">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.opName"-->
      <!--          placeholder="请输入操作人"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
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
      <!--          v-hasPermi="['admin:payUsdtRecharge:add']"-->
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
      <!--          v-hasPermi="['admin:payUsdtRecharge:edit']"-->
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
      <!--          v-hasPermi="['admin:payUsdtRecharge:remove']"-->
      <!--        >删除</el-button>-->
      <!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:payUsdtRecharge:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="payUsdtRechargeList">
      <!--      <el-table-column label="系统编号" align="center" prop="id" />-->
      <el-table-column label="会员编号" align="center" prop="memberId"/>
      <el-table-column label="会员账号" align="center" prop="userName"/>
      <el-table-column label="渠道名称" align="center" prop="channelName"/>
      <el-table-column label="充值U数量" align="center" prop="rechargeNumber"/>
      <el-table-column label="充值金额" align="center" prop="rechargeMoney"/>
      <el-table-column label="优惠比例" align="center" prop="discountBill"/>
      <el-table-column label="链名称" align="center" prop="chainName"/>
      <el-table-column label="充值地址" align="center" min-width="200" prop="rechargeAddress"/>
      <el-table-column label="交易id" align="center" prop="transactionId"/>
      <el-table-column label="处理状态" align="center" prop="status" :formatter="formatterStatus"/>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark"/>
      <el-table-column label="操作人" align="center" prop="opName"/>
      <el-table-column label="审批时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="success"
            plain
            v-show="scope.row.status == 0"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:liveComplaint:edit']"
          >通过
          </el-button>
          <el-button
            size="small"
            type="danger"
            plain
            v-show="scope.row.status == 0"
            @click="handleUpdateRefuse(scope.row,2)"
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
        <!--            v-hasPermi="['admin:payUsdtRecharge:edit']"-->
        <!--          >修改</el-button>-->
        <!--          <el-button-->
        <!--            size="mini"-->
        <!--            type="text"-->
        <!--            icon="el-icon-delete"-->
        <!--            @click="handleDelete(scope.row)"-->
        <!--            v-hasPermi="['admin:payUsdtRecharge:remove']"-->
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

    <!-- 通过USDT充值记录对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="会员编号" prop="memberId">
          <el-input v-model="form.memberId" readonly placeholder="请输入会员编号"/>
        </el-form-item>
        <el-form-item label="会员账号" prop="userName">
          <el-input v-model="form.userName" readonly placeholder="请输入会员账号"/>
        </el-form-item>
        <el-form-item label="渠道名称" prop="channelName">
          <el-input v-model="form.channelName" readonly placeholder="请输入渠道名称"/>
        </el-form-item>
        <el-form-item label="充值U数量" prop="rechargeNumber">
          <el-input v-model="form.rechargeNumber" readonly placeholder="请输入充值U数量"/>
        </el-form-item>
        <el-form-item label="充值金额" prop="rechargeMoney">
          <el-input v-model="form.rechargeMoney" readonly placeholder="请输入充值金额"/>
        </el-form-item>
        <el-form-item label="优惠比例" prop="discountBill">
          <el-input v-model="form.discountBill" readonly placeholder="请输入优惠比例"/>
        </el-form-item>
        <el-form-item label="链名称" prop="chainName">
          <el-input v-model="form.chainName" readonly placeholder="请输入链名称"/>
        </el-form-item>
        <el-form-item label="充值地址" prop="rechargeAddress">
          <el-input v-model="form.rechargeAddress" readonly placeholder="请输入充值地址"/>
        </el-form-item>
        <el-form-item label="交易id" prop="transactionId">
          <el-input type="textarea" v-model="form.transactionId" readonly placeholder="请输入交易id"/>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">通 过</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listPayUsdtRecharge,
  getPayUsdtRecharge,
  delPayUsdtRecharge,
  addPayUsdtRecharge,
  updatePayUsdtRecharge,
  exportPayUsdtRecharge
} from "@/api/platform-web/pay/payUsdtRecharge";
import {pickerDateShortcuts} from "@/utils/dateUtils";

export default {
  name: "PayUsdtRecharge",
  components: {},
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
      // USDT充值记录表格数据
      payUsdtRechargeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        selectDate: [this.parseTime(new Date(), '{y}-{m}-{d}'), this.parseTime(new Date(), '{y}-{m}-{d}')],
        pageNum: 1,
        pageSize: 10,
        memberId: null,
        userName: null,
        channelName: null,
        rechargeNumber: null,
        rechargeMoney: null,
        status: null,
        discountBill: null,
        chainName: null,
        rechargeAddress: null,
        transactionId: null,
        opName: null,
        orderByColumn: 'createTime',
        isAsc: 'desc'
      },
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
    /** 查询USDT充值记录列表 */
    getList() {
      this.loading = true;
      listPayUsdtRecharge(this.queryParams).then(response => {
        this.payUsdtRechargeList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 处理状态
    formatterStatus(row) {
      if (row.status == 0) {
        return '未处理'
      } else if (row.status == 1) {
        return '已处理'
      } else if (row.status == 2) {
        return '驳回'
      }
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
        channelName: null,
        rechargeNumber: null,
        rechargeMoney: null,
        status: 0,
        remark: null,
        discountBill: null,
        chainName: null,
        rechargeAddress: null,
        transactionId: null,
        opName: null,
        createTime: null,
        updateTime: null
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
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加USDT充值记录";
    },
    /** 通过按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id
      getPayUsdtRecharge(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "审批USDT充值记录申请";
      });
    },
    /** 驳回按钮操作 */
    handleUpdateRefuse(row, status) {
      this.$prompt('请输入审核驳回备注', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        const id = row.id
        updatePayUsdtRecharge(id, value, status).then(response => {
          this.msgSuccess("审核驳回成功");
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
          const id = this.form.id
          const remark = this.form.remark
          const status = '1'
          updatePayUsdtRecharge(id,remark,status).then(response => {
            this.msgSuccess("审核通过成功");
            this.open = false;
            this.getList();
          });
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除USDT充值记录编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delPayUsdtRecharge(ids);
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
      }).then(function () {
        return exportPayUsdtRecharge(queryParams);
      }).then(response => {
        this.downloadExcel(response, 'USDT充值记录');
      }).catch(() => {
      })
    }
  }
};
</script>
