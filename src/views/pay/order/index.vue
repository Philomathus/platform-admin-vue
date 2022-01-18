<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="订单发起时间" prop="searchTime" label-width="100px">
        <el-date-picker type="datetimerange" v-model="queryParams.searchTime" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '100%'}" start-placeholder="开始时间"
                        end-placeholder="结束时间" range-separator="至" :default-time="['00:00:00', '23:59:59']" clearable :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="status" style="width: 130px">
        <el-select v-model="queryParams.status" placeholder="全部状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="seller">
        <el-input
          v-model.trim="queryParams.seller"
          placeholder="会员ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
<!--          v-hasPermi="['admin:order:add']"-->
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
<!--          v-hasPermi="['admin:order:edit']"-->
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
<!--          v-hasPermi="['admin:order:remove']"-->
<!--        >删除</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="warning"-->
<!--          plain-->
<!--          icon="el-icon-download"-->
<!--          size="mini"-->
<!--          @click="handleExport"-->
<!--          v-hasPermi="['admin:order:export']"-->
<!--        >导出</el-button>-->
<!--      </el-col>-->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="orderList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="订单ID，主键" align="center" prop="orderId" />
      <el-table-column label="订单状态" min-width="120" align="center" prop="status">
        <template slot-scope="scope">
          <span
            :style="{color: (status = statusOptions[parseInt(scope.row.status)]).color}"
          >{{ status.dictLabel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单金额" align="center" prop="money" />
      <el-table-column label="订单发起时间" align="center" prop="orderTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.orderTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="锁定订单时间" align="center" prop="lockTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.lockTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="确定支付时间" align="center" prop="payTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.payTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="交易成功时间" align="center" prop="successTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.successTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="卖方平台代理号" align="center" prop="sellAgent" />
      <el-table-column label="卖方会员ID" align="center" prop="seller" />
      <el-table-column label="卖方银行卡号" align="center" prop="sellBankAccount" />
      <el-table-column label="卖方银行名称" align="center" prop="sellBankName" />
      <el-table-column label="卖方银行开户姓名" align="center" prop="sellBankUsername" />
      <el-table-column label="买方平台代理号" align="center" prop="buyAgent" />
      <el-table-column label="买方会员ID" align="center" prop="buyer" />
      <el-table-column label="买方银行卡号" align="center" prop="buyBankAccount" />
      <el-table-column label="买方银行名称" align="center" prop="buyBankName" />
      <el-table-column label="买方银行开户姓名" align="center" prop="buyBankUsername" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-circle-check"
            plain
            @click="handleUpdate(scope.row)"
            v-show="scope.row.status == 0 || scope.row.status == 1"
            v-hasPermi="['admin:order:edit']"
          >确认成功</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改金币市场对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
<!--        <el-form-item label="订单状态">-->
<!--          <el-radio-group v-model="form.status">-->
<!--            <el-radio label="1">请选择字典生成</el-radio>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->
        <el-form-item label="订单金额" prop="money">
          <el-input v-model="form.money" placeholder="请输入订单金额" />
        </el-form-item>
<!--        <el-form-item label="订单发起时间" prop="orderTime">-->
<!--          <el-date-picker clearable size="small"-->
<!--            v-model="form.orderTime"-->
<!--            type="date"-->
<!--            value-format="yyyy-MM-dd"-->
<!--            placeholder="选择订单发起时间">-->
<!--          </el-date-picker>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="锁定订单时间" prop="lockTime">-->
<!--          <el-date-picker clearable size="small"-->
<!--            v-model="form.lockTime"-->
<!--            type="date"-->
<!--            value-format="yyyy-MM-dd"-->
<!--            placeholder="选择锁定订单时间">-->
<!--          </el-date-picker>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="确定支付时间" prop="payTime">-->
<!--          <el-date-picker clearable size="small"-->
<!--            v-model="form.payTime"-->
<!--            type="date"-->
<!--            value-format="yyyy-MM-dd"-->
<!--            placeholder="选择确定支付时间">-->
<!--          </el-date-picker>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="交易成功时间" prop="successTime">-->
<!--          <el-date-picker clearable size="small"-->
<!--            v-model="form.successTime"-->
<!--            type="date"-->
<!--            value-format="yyyy-MM-dd"-->
<!--            placeholder="选择交易成功时间">-->
<!--          </el-date-picker>-->
<!--        </el-form-item>-->
        <el-form-item label="卖方平台代理号" prop="sellAgent">
          <el-input v-model="form.sellAgent" placeholder="请输入卖方平台代理号" />
        </el-form-item>
        <el-form-item label="卖方会员ID" prop="seller">
          <el-input v-model="form.seller" placeholder="请输入卖方会员ID" />
        </el-form-item>
<!--        <el-form-item label="卖方银行卡号" prop="sellBankAccount">-->
<!--          <el-input v-model="form.sellBankAccount" placeholder="请输入卖方银行卡号" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="卖方银行名称" prop="sellBankName">-->
<!--          <el-input v-model="form.sellBankName" placeholder="请输入卖方银行名称" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="卖方银行开户姓名" prop="sellBankUsername">-->
<!--          <el-input v-model="form.sellBankUsername" placeholder="请输入卖方银行开户姓名" />-->
<!--        </el-form-item>-->
        <el-form-item label="买方平台代理号" prop="buyAgent">
          <el-input v-model="form.buyAgent" placeholder="请输入买方平台代理号" />
        </el-form-item>
        <el-form-item label="买方会员ID" prop="buyer">
          <el-input v-model="form.buyer" placeholder="请输入买方会员ID" />
        </el-form-item>
<!--        <el-form-item label="买方银行卡号" prop="buyBankAccount">-->
<!--          <el-input v-model="form.buyBankAccount" placeholder="请输入买方银行卡号" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="买方银行名称" prop="buyBankName">-->
<!--          <el-input v-model="form.buyBankName" placeholder="请输入买方银行名称" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="买方银行开户姓名" prop="buyBankUsername">-->
<!--          <el-input v-model="form.buyBankUsername" placeholder="请输入买方银行开户姓名" />-->
<!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确认成功</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listOrder, getOrder, delOrder, addOrder, updateOrder, exportOrder } from "@/api/platform-web/pay/order";
import {pickerDateTimeShortcuts} from '@/utils/dateUtils'

export default {
  name: "Order",
  components: {
  },
  data() {
    return {
      // 订单状态（0公开状态 1锁定状态 2确认收款 3交易成功）
      statusOptions: [],
      pickerOptions: {shortcuts: pickerDateTimeShortcuts},
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
      // 金币市场表格数据
      orderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        searchTime: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],
        pageNum: 1,
        pageSize: 10,
        status: null,
        money: null,
        orderTime: null,
        lockTime: null,
        payTime: null,
        successTime: null,
        sellAgent: null,
        seller: null,
        sellBankAccount: null,
        sellBankName: null,
        sellBankUsername: null,
        buyAgent: null,
        buyer: null,
        buyBankAccount: null,
        buyBankName: null,
        buyBankUsername: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        status: [
          { required: true, message: "订单状态不能为空", trigger: "blur" }
        ],
        money: [
          { required: true, message: "订单金额不能为空", trigger: "blur" }
        ],
        orderTime: [
          { required: true, message: "订单发起时间不能为空", trigger: "blur" }
        ],
        sellAgent: [
          { required: true, message: "卖方平台代理号不能为空", trigger: "blur" }
        ],
        seller: [
          { required: true, message: "卖方会员ID不能为空", trigger: "blur" }
        ],
        sellBankAccount: [
          { required: true, message: "卖方银行卡号不能为空", trigger: "blur" }
        ],
        sellBankName: [
          { required: true, message: "卖方银行名称不能为空", trigger: "blur" }
        ],
        sellBankUsername: [
          { required: true, message: "卖方银行开户姓名不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getDicts('order_status').then(response => {
      this.statusOptions = response.data
    })
    this.getList();
  },
  methods: {
    /** 查询金币市场列表 */
    getList() {
      this.loading = true;
      listOrder(this.queryParams).then(response => {
        this.orderList = response.rows;
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
        orderId: null,
        status: 0,
        money: null,
        orderTime: null,
        lockTime: null,
        payTime: null,
        successTime: null,
        sellAgent: null,
        seller: null,
        sellBankAccount: null,
        sellBankName: null,
        sellBankUsername: null,
        buyAgent: null,
        buyer: null,
        buyBankAccount: null,
        buyBankName: null,
        buyBankUsername: null
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
      this.ids = selection.map(item => item.orderId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加金币市场";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const orderId = row.orderId || this.ids
      getOrder(orderId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改金币市场";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.orderId != null) {
            updateOrder(this.form).then(response => {
              this.msgSuccess("确认成功");
              this.open = false;
              this.getList();
            });
          } else {
            addOrder(this.form).then(response => {
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
      const orderIds = row.orderId || this.ids;
      this.$confirm('是否确认删除金币市场编号为"' + orderIds + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delOrder(orderIds);
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
        return exportOrder(queryParams);
      }).then(response => {
        this.downloadExcel(response, '金币市场');
      }).catch(() => {
      })
    }
  }
};
</script>
