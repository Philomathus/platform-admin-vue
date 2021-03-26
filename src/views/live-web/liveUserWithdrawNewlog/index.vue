<template>
  <div class="app-container">

    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="日期范围" prop="selectDate">
        <el-date-picker type="datetimerange" v-model="queryParams.selectDate" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '90%'}" start-placeholder="开始时间"
                        end-placeholder="开始时间"
                        range-separator="至" clearable :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="主播ID" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入主播ID"
          clearable
          size="small"
          type="number"
          class="no-number"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="主播昵称" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入主播昵称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单号" prop="orderNo">
        <el-input
          v-model="queryParams.orderNo"
          placeholder="请输入订单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="订单表达式" prop="orderExpression">
        <el-input
          v-model="queryParams.orderExpression"
          placeholder="请输入订单表达式"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="提现金额" prop="withdrawMoney">
        <el-input
          v-model="queryParams.withdrawMoney"
          placeholder="请输入提现金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="提现收款人真实姓名" prop="bankUserName">
        <el-input
          v-model="queryParams.bankUserName"
          placeholder="请输入提现收款人真实姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="提现银行账号" prop="bankAccount" label-width="120px">
        <el-input
          v-model="queryParams.bankAccount"
          placeholder="请输入提现银行账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
 <!--     <el-form-item label="提现银行账号开户行" prop="bankAddress">
        <el-input
          v-model="queryParams.bankAddress"
          placeholder="请输入提现银行账号开户行"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="提现银行类型ID" prop="bankTypeId">
        <el-input
          v-model="queryParams.bankTypeId"
          placeholder="请输入提现银行类型ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="申请状态" prop="wstatus">
        <el-select v-model="queryParams.wstatus" placeholder="请选择状态" clearable size="small">
          <el-option :label="item.labelName" :value="item.labelValue" v-for="item in withdrawTypes" />
        </el-select>
      </el-form-item>
<!--      <el-form-item label="提现类型(1提现到银行卡,2提现到支付宝)" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择提现类型(1提现到银行卡,2提现到支付宝)" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>-->
<!--      <el-form-item label="审核员" prop="opName">
        <el-input
          v-model="queryParams.opName"
          placeholder="请输入审核员"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="主播时长" prop="livetime">
        <el-input
          v-model="queryParams.livetime"
          placeholder="请输入主播时长"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="主播礼物" prop="liveticket">
        <el-input
          v-model="queryParams.liveticket"
          placeholder="请输入主播礼物"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="主播派奖" prop="livepaijiang">
        <el-input
          v-model="queryParams.livepaijiang"
          placeholder="请输入主播派奖"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
<!--      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['live-web:liveUserWithdrawNewlog:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['live-web:liveUserWithdrawNewlog:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['live-web:liveUserWithdrawNewlog:remove']"
        >删除</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['live-web:liveUserWithdrawNewlog:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="liveUserWithdrawNewlogList" @selection-change="handleSelectionChange">
<!--      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />-->
      <el-table-column label="主播ID" align="center" prop="userId" width="80px" />
      <el-table-column label="主播昵称" align="center" prop="nickName" width="160px" />
      <el-table-column label="订单号" align="center" prop="orderNo" />
      <el-table-column label="订单表达式" align="center" prop="orderExpression" />
      <el-table-column label="提现金额" align="center" prop="withdrawMoney" width="80px" />
      <el-table-column label="提现真实姓名" align="center" prop="bankUserName" width="120px" />
      <el-table-column label="提现银行账号" align="center" prop="bankAccount" />
      <el-table-column label="状态" align="center" prop="wstatus" :formatter="formatterType" />

<!--      <el-table-column label="提现银行账号开户行" align="center" prop="bankAddress" />
      <el-table-column label="提现银行类型ID" align="center" prop="bankTypeId" />
      <el-table-column label="提现类型(1提现到银行卡,2提现到支付宝)" align="center" prop="type" />
      <el-table-column label="审核员" align="center" prop="opName" />
      <el-table-column label="审核备注" align="center" prop="remark" />
      <el-table-column label="主播时长" align="center" prop="livetime" />
      <el-table-column label="主播礼物" align="center" prop="liveticket" />
      <el-table-column label="主播派奖" align="center" prop="livepaijiang" />-->
<!--      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['live-web:liveUserWithdrawNewlog:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['live-web:liveUserWithdrawNewlog:remove']"
          >删除</el-button>
        </template>
      </el-table-column>-->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改主播提现管理对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="主播ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入主播ID" />
        </el-form-item>
        <el-form-item label="主播昵称" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入主播昵称" />
        </el-form-item>
        <el-form-item label="订单号" prop="orderNo">
          <el-input v-model="form.orderNo" placeholder="请输入订单号" />
        </el-form-item>
        <el-form-item label="订单表达式" prop="orderExpression">
          <el-input v-model="form.orderExpression" placeholder="请输入订单表达式" />
        </el-form-item>
        <el-form-item label="提现金额" prop="withdrawMoney">
          <el-input v-model="form.withdrawMoney" placeholder="请输入提现金额" />
        </el-form-item>
        <el-form-item label="提现收款人真实姓名" prop="bankUserName">
          <el-input v-model="form.bankUserName" placeholder="请输入提现收款人真实姓名" />
        </el-form-item>
        <el-form-item label="提现银行账号" prop="bankAccount">
          <el-input v-model="form.bankAccount" placeholder="请输入提现银行账号" />
        </el-form-item>
        <el-form-item label="提现银行账号开户行" prop="bankAddress">
          <el-input v-model="form.bankAddress" placeholder="请输入提现银行账号开户行" />
        </el-form-item>
        <el-form-item label="提现银行类型ID" prop="bankTypeId">
          <el-input v-model="form.bankTypeId" placeholder="请输入提现银行类型ID" />
        </el-form-item>
        <el-form-item label="状态(0申请中1初级审核通过2审核不通过3终极审核通过)">
          <el-radio-group v-model="form.wstatus">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="提现类型(1提现到银行卡,2提现到支付宝)" prop="type">
          <el-select v-model="form.type" placeholder="请选择提现类型(1提现到银行卡,2提现到支付宝)">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="审核员" prop="opName">
          <el-input v-model="form.opName" placeholder="请输入审核员" />
        </el-form-item>
        <el-form-item label="审核备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入审核备注" />
        </el-form-item>
        <el-form-item label="主播时长" prop="livetime">
          <el-input v-model="form.livetime" placeholder="请输入主播时长" />
        </el-form-item>
        <el-form-item label="主播礼物" prop="liveticket">
          <el-input v-model="form.liveticket" placeholder="请输入主播礼物" />
        </el-form-item>
        <el-form-item label="主播派奖" prop="livepaijiang">
          <el-input v-model="form.livepaijiang" placeholder="请输入主播派奖" />
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
import { listLiveUserWithdrawNewlog, getLiveUserWithdrawNewlog, delLiveUserWithdrawNewlog, addLiveUserWithdrawNewlog, updateLiveUserWithdrawNewlog, exportLiveUserWithdrawNewlog } from "@/api/platform-web/live-web/liveUserWithdrawNewlog";
import {getYesterDateEnd, getYesterDateStart, pickerDateTimeShortcuts} from "@/utils/dateUtils";

export default {
  name: "LiveUserWithdrawNewlog",
  components: {
  },
  data() {
    return {
      pickerOptions: {shortcuts: pickerDateTimeShortcuts},
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      withdrawTypes: [{labelName: '申请中',labelValue: 0},{labelName: '初级审核通过',labelValue: 1},{labelName: '审核不通过',labelValue: 2},{labelName: '终极审核通过',labelValue: 3}],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 主播提现管理表格数据
      liveUserWithdrawNewlogList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        selectDate: [getYesterDateStart(), getYesterDateEnd()],
        pageNum: 1,
        pageSize: 10,
        userId: null,
        nickName: null,
        orderNo: null,
        orderExpression: null,
        withdrawMoney: null,
        bankUserName: null,
        bankAccount: null,
        bankAddress: null,
        bankTypeId: null,
        wstatus: null,
        type: null,
        opName: null,
        livetime: null,
        liveticket: null,
        livepaijiang: null,
        orderByColumn: 'wstatus',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        userId: [
          { required: true, message: "主播ID不能为空", trigger: "blur" }
        ],
        orderNo: [
          { required: true, message: "订单号不能为空", trigger: "blur" }
        ],
        orderExpression: [
          { required: true, message: "订单表达式不能为空", trigger: "blur" }
        ],
        withdrawMoney: [
          { required: true, message: "提现金额不能为空", trigger: "blur" }
        ],
        bankUserName: [
          { required: true, message: "提现收款人真实姓名不能为空", trigger: "blur" }
        ],
        bankAccount: [
          { required: true, message: "提现银行账号不能为空", trigger: "blur" }
        ],
        bankTypeId: [
          { required: true, message: "提现银行类型ID不能为空", trigger: "blur" }
        ],
        wstatus: [
          { required: true, message: "状态(0申请中1初级审核通过2审核不通过3终极审核通过)不能为空", trigger: "blur" }
        ],
        type: [
          { required: true, message: "提现类型(1提现到银行卡,2提现到支付宝)不能为空", trigger: "change" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    formatterType(row){
      var string = '';
      this.withdrawTypes.forEach((value, index, array) => {
        if (value.labelValue === row.wstatus) {
          string = value.labelName
        }
      });
      return string;
    },
    /** 查询主播提现管理列表 */
    getList() {
      this.loading = true;
      listLiveUserWithdrawNewlog(this.queryParams).then(response => {
        this.liveUserWithdrawNewlogList = response.rows;
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
        nickName: null,
        orderNo: null,
        orderExpression: null,
        withdrawMoney: null,
        bankUserName: null,
        bankAccount: null,
        bankAddress: null,
        bankTypeId: null,
        wstatus: 0,
        type: null,
        opName: null,
        remark: null,
        createTime: null,
        updateTime: null,
        livetime: null,
        liveticket: null,
        livepaijiang: null
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
      this.title = "添加主播提现管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLiveUserWithdrawNewlog(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改主播提现管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLiveUserWithdrawNewlog(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLiveUserWithdrawNewlog(this.form).then(response => {
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
      this.$confirm('是否确认删除主播提现管理编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delLiveUserWithdrawNewlog(ids);
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
        return exportLiveUserWithdrawNewlog(queryParams);
      }).then(response => {
        this.downloadExcel(response, '主播提现管理');
      }).catch(() => {
      })
    }
  }
};
</script>
