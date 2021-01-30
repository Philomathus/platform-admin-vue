<template>
  <div class="app-container">
    <el-button type="primary">交易笔数 {{this.totalData.total}}</el-button>
    <el-button type="success">总成功金额 {{this.totalData.totalMoney}}</el-button>
    <el-button type="warning">补单金额 {{this.totalData.replenishmentTotalMoney || 0}}</el-button>
    <el-button type="info">成功率 {{numberUtil.toPercent(this.totalData.failRate) }}</el-button>
    <el-form :model="queryParams" ref="queryForm" :inline="true" style="margin-top: 10px" v-show="showSearch" label-width="82px">
      <el-form-item label="会员编号" prop="memberId">
        <el-input
          v-model="queryParams.memberId"
          placeholder="请输入会员编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="支付平台" prop="platformId">
        <el-select
          filterable
          v-model="queryParams.platformId"
          placeholder="支付平台"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in payPlatformOptions"
            :key="dict.id"
            :label="dict.name"
            :value="dict.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="订单号" prop="orderNo">
        <el-input
          v-model="queryParams.orderNo"
          placeholder="系统订单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="上游订单号" prop="tradeSn">
        <el-input
          v-model="queryParams.tradeSn"
          placeholder="请输入上游订单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="账号" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="回调时间" prop="updateTime">
        <el-date-picker clearable size="small"
                        v-model="queryParams.updateTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择回调时间">
        </el-date-picker>
      </el-form-item>-->
      <el-form-item label="回调日期范围" prop="selectDate" label-width="100px">
        <el-date-picker type="daterange" v-model="queryParams.selectDate" format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd" :style="{width: '60%'}" start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        range-separator="至" clearable></el-date-picker>
      </el-form-item>
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
          v-hasPermi="['pay:memberPayJour:add']"
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
          v-hasPermi="['pay:memberPayJour:edit']"
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
          v-hasPermi="['pay:memberPayJour:remove']"
        >删除</el-button>
      </el-col>-->
<!--      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['pay:memberPayJour:export']"
        >导出</el-button>
      </el-col>-->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="memberPayJourList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="会员ID" align="center" prop="member_id" />
      <el-table-column label="会员账号" align="center" prop="user_name" />
      <el-table-column label="订单号" align="center" prop="order_no" />
      <el-table-column label="支付平台" align="center" prop="platform_name" />
      <el-table-column label="支付通道" align="center" prop="channel_name" />
      <el-table-column label="费率" align="center" prop="pay_rate_str" />
      <el-table-column label="成功率" align="center" prop="current_success_rate_str" />
      <el-table-column label="上游订单号" align="center" prop="trade_sn" />
      <el-table-column label="请求金额" align="center" prop="money" />
      <el-table-column label="实际金额" align="center" prop="sub_money" />
<!--      <el-table-column label="支付接口的支付地址" show-overflow-tooltip align="center" prop="payment_code" />-->
<!--      <el-table-column label="支付成功时间" align="center" prop="payment_time" />-->
      <el-table-column label="订单时间" align="center" prop="pay_time" width="180" />
      <el-table-column label="更新时间" align="center" prop="update_time" width="180"/>
      <el-table-column label="订单状态" align="center" prop="status" :formatter="statusFormat" />
      <el-table-column label="备注" align="center" prop="remark" />
      <!--      <el-table-column label="补单操作员" align="center" prop="manWork" />-->
<!--      <el-table-column label="是否首次1是0否" align="center" prop="first" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['pay:memberPayJour:edit']"
          >人工补单</el-button>
<!--          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['pay:memberPayJour:remove']"
          >删除</el-button>-->
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

    <!-- 添加或修改线上充值信息对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" >
        <el-form-item label="会员编号" prop="memberId">
          <el-input v-model="form.memberId" placeholder="请输入会员编号"  readonly/>
        </el-form-item>
<!--        <el-form-item label="支付平台编号" prop="platformId">
          <el-select v-model="form.platformId" placeholder="请选择支付平台编号">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="支付通道编码" prop="channelId">
          <el-select v-model="form.channelId" placeholder="请选择支付通道编码">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="支付方式" prop="paymentMethod">
          <el-input v-model="form.paymentMethod" placeholder="请输入支付方式" />
        </el-form-item>
        <el-form-item label="本系统订单号" prop="orderNo">
          <el-input v-model="form.orderNo" placeholder="请输入本系统订单号" />
        </el-form-item>
        <el-form-item label="上游订单号" prop="tradeSn">
          <el-input v-model="form.tradeSn" placeholder="请输入上游订单号" />
        </el-form-item>-->
        <el-form-item label="请求金额" prop="money">
          <el-input v-model="form.money" placeholder="请输入请求金额" readonly/>
        </el-form-item>
        <el-form-item label="实际到账金额" prop="subMoney">
          <el-input v-model="form.subMoney" placeholder="请输入实际到账金额" />
        </el-form-item>
        <el-form-item label="谷歌验证码" prop="googleCode">
          <el-input v-model="form.googleCode" placeholder="请输入谷歌验证码" />
        </el-form-item>
<!--        <el-form-item label="支付接口的支付地址" prop="paymentCode">
          <el-input v-model="form.paymentCode" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="支付成功时间(上游回调时间)" prop="paymentTime">
          <el-input v-model="form.paymentTime" placeholder="请输入支付成功时间(上游回调时间)" />
        </el-form-item>
        <el-form-item label="商户下单时间" prop="payTime">
          <el-input v-model="form.payTime" placeholder="请输入商户下单时间" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否是人工补单" prop="isPatchOrder">
          <el-input v-model="form.isPatchOrder" placeholder="请输入是否是人工补单" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="省" prop="province">
          <el-input v-model="form.province" placeholder="请输入省" />
        </el-form-item>
        <el-form-item label="市" prop="city">
          <el-input v-model="form.city" placeholder="请输入市" />
        </el-form-item>
        <el-form-item label="区" prop="area">
          <el-input v-model="form.area" placeholder="请输入区" />
        </el-form-item>
        <el-form-item label="通道手续费" prop="platformRate">
          <el-input v-model="form.platformRate" placeholder="请输入通道手续费" />
        </el-form-item>
        <el-form-item label="近期通道成功率" prop="currentSuccessRate">
          <el-input v-model="form.currentSuccessRate" placeholder="请输入近期通道成功率" />
        </el-form-item>
        <el-form-item label="补单操作员" prop="manWork">
          <el-input v-model="form.manWork" placeholder="请输入补单操作员" />
        </el-form-item>
        <el-form-item label="账号" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="是否首次1是0否" prop="first">
          <el-input v-model="form.first" placeholder="请输入是否首次1是0否" />
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listMemberPayJour, getMemberPayJour, delMemberPayJour, addMemberPayJour, updateMemberPayJour, exportMemberPayJour, listCount } from "@/api/platform-web/pay/memberPayJour/memberPayJour";
import {platforms} from "@/api/platform-web/pay/payChannelNew/payChannelNew";

export default {
  name: "MemberPayJour",
  components: {
  },
  data() {
    return {
      //统计总的数据
      totalData: {},
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
      // 线上充值信息表格数据
      memberPayJourList: [],
      //支付平台
      payPlatformOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 状态
      statusOptions: [],
      // 查询参数
      queryParams: {
        selectDate: null,//回调日期
        pageNum: 1,
        pageSize: 10,
        memberId: null,
        platformId: null,
        orderNo: null,
        tradeSn: null,
        status: null,
        isPatchOrder: null,
        userName: null,
        updateTime: null,
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
    this.listCount();
    //支付平台
    platforms().then(response => {
      this.payPlatformOptions = response.data
    })
    this.getDicts("pay_jour_status").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    //
    listCount(){
      listCount(this.queryParams).then((res) => {
        this.totalData=res
      })
    },
    /** 查询线上充值信息列表 */
    getList() {
      this.loading = true;
      listMemberPayJour(this.queryParams).then(response => {
        this.memberPayJourList = response.rows;
        this.total = response.total;
        this.loading = false;
      });

    },
    // 状态(1 成功0失败 -1待确认)字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
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
        platformId: null,
        channelId: null,
        paymentMethod: null,
        orderNo: null,
        tradeSn: null,
        money: null,
        subMoney: null,
        paymentCode: null,
        paymentTime: null,
        payTime: null,
        status: null,
        isPatchOrder: null,
        remark: null,
        province: null,
        city: null,
        area: null,
        platformRate: null,
        currentSuccessRate: null,
        manWork: null,
        userName: null,
        createTime: null,
        updateTime: null,
        first: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
      this.listCount();
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
      this.title = "添加线上充值信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMemberPayJour(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "人工补单";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateMemberPayJour(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMemberPayJour(this.form).then(response => {
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
      this.$confirm('是否确认删除线上充值信息编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delMemberPayJour(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有线上充值信息数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return exportMemberPayJour(queryParams);
      }).then(response => {
        this.download(response.msg);
      })
    }
  }
};
</script>
