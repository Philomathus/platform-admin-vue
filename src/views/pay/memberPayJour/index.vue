<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="会员编号" prop="memberId">
        <el-input
          v-model="queryParams.memberId"
          placeholder="请输入会员编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="支付平台编号" prop="platformId">
        <el-input
          v-model="queryParams.platformId"
          placeholder="请输入支付平台编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="支付通道编码" prop="channelId">
        <el-input
          v-model="queryParams.channelId"
          placeholder="请输入支付通道编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="支付方式" prop="paymentMethod">
        <el-input
          v-model="queryParams.paymentMethod"
          placeholder="请输入支付方式"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="本系统订单号" prop="orderNo">
        <el-input
          v-model="queryParams.orderNo"
          placeholder="请输入本系统订单号"
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
      <el-form-item label="请求金额" prop="money">
        <el-input
          v-model="queryParams.money"
          placeholder="请输入请求金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="实际到账金额" prop="subMoney">
        <el-input
          v-model="queryParams.subMoney"
          placeholder="请输入实际到账金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="支付成功时间(上游回调时间)" prop="paymentTime">
        <el-input
          v-model="queryParams.paymentTime"
          placeholder="请输入支付成功时间(上游回调时间)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商户下单时间" prop="payTime">
        <el-input
          v-model="queryParams.payTime"
          placeholder="请输入商户下单时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态(1 成功0失败 -1待确认)" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态(1 成功0失败 -1待确认)" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否是人工补单" prop="isPatchOrder">
        <el-input
          v-model="queryParams.isPatchOrder"
          placeholder="请输入是否是人工补单"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="省" prop="province">
        <el-input
          v-model="queryParams.province"
          placeholder="请输入省"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="市" prop="city">
        <el-input
          v-model="queryParams.city"
          placeholder="请输入市"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="区" prop="area">
        <el-input
          v-model="queryParams.area"
          placeholder="请输入区"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="通道手续费" prop="platformRate">
        <el-input
          v-model="queryParams.platformRate"
          placeholder="请输入通道手续费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="近期通道成功率" prop="currentSuccessRate">
        <el-input
          v-model="queryParams.currentSuccessRate"
          placeholder="请输入近期通道成功率"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="补单操作员" prop="manWork">
        <el-input
          v-model="queryParams.manWork"
          placeholder="请输入补单操作员"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
      <el-form-item label="是否首次1是0否" prop="first">
        <el-input
          v-model="queryParams.first"
          placeholder="请输入是否首次1是0否"
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
      <el-col :span="1.5">
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
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['pay:memberPayJour:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="memberPayJourList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="系统编号" align="center" prop="id" />
      <el-table-column label="会员编号" align="center" prop="memberId" />
      <el-table-column label="支付平台编号" align="center" prop="platformId" />
      <el-table-column label="支付通道编码" align="center" prop="channelId" />
      <el-table-column label="支付方式" align="center" prop="paymentMethod" />
      <el-table-column label="本系统订单号" align="center" prop="orderNo" />
      <el-table-column label="上游订单号" align="center" prop="tradeSn" />
      <el-table-column label="请求金额" align="center" prop="money" />
      <el-table-column label="实际到账金额" align="center" prop="subMoney" />
      <el-table-column label="支付接口的支付地址" align="center" prop="paymentCode" />
      <el-table-column label="支付成功时间(上游回调时间)" align="center" prop="paymentTime" />
      <el-table-column label="商户下单时间" align="center" prop="payTime" />
      <el-table-column label="状态(1 成功0失败 -1待确认)" align="center" prop="status" />
      <el-table-column label="是否是人工补单" align="center" prop="isPatchOrder" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="省" align="center" prop="province" />
      <el-table-column label="市" align="center" prop="city" />
      <el-table-column label="区" align="center" prop="area" />
      <el-table-column label="通道手续费" align="center" prop="platformRate" />
      <el-table-column label="近期通道成功率" align="center" prop="currentSuccessRate" />
      <el-table-column label="补单操作员" align="center" prop="manWork" />
      <el-table-column label="账号" align="center" prop="userName" />
      <el-table-column label="是否首次1是0否" align="center" prop="first" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['pay:memberPayJour:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['pay:memberPayJour:remove']"
          >删除</el-button>
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

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="会员编号" prop="memberId">
          <el-input v-model="form.memberId" placeholder="请输入会员编号" />
        </el-form-item>
        <el-form-item label="支付平台编号" prop="platformId">
          <el-input v-model="form.platformId" placeholder="请输入支付平台编号" />
        </el-form-item>
        <el-form-item label="支付通道编码" prop="channelId">
          <el-input v-model="form.channelId" placeholder="请输入支付通道编码" />
        </el-form-item>
        <el-form-item label="支付方式" prop="paymentMethod">
          <el-input v-model="form.paymentMethod" placeholder="请输入支付方式" />
        </el-form-item>
        <el-form-item label="本系统订单号" prop="orderNo">
          <el-input v-model="form.orderNo" placeholder="请输入本系统订单号" />
        </el-form-item>
        <el-form-item label="上游订单号" prop="tradeSn">
          <el-input v-model="form.tradeSn" placeholder="请输入上游订单号" />
        </el-form-item>
        <el-form-item label="请求金额" prop="money">
          <el-input v-model="form.money" placeholder="请输入请求金额" />
        </el-form-item>
        <el-form-item label="实际到账金额" prop="subMoney">
          <el-input v-model="form.subMoney" placeholder="请输入实际到账金额" />
        </el-form-item>
        <el-form-item label="支付接口的支付地址" prop="paymentCode">
          <el-input v-model="form.paymentCode" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="支付成功时间(上游回调时间)" prop="paymentTime">
          <el-input v-model="form.paymentTime" placeholder="请输入支付成功时间(上游回调时间)" />
        </el-form-item>
        <el-form-item label="商户下单时间" prop="payTime">
          <el-input v-model="form.payTime" placeholder="请输入商户下单时间" />
        </el-form-item>
        <el-form-item label="状态(1 成功0失败 -1待确认)">
          <el-radio-group v-model="form.status">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
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
import { listMemberPayJour, getMemberPayJour, delMemberPayJour, addMemberPayJour, updateMemberPayJour, exportMemberPayJour } from "@/api/platform-web/pay/memberPayJour/memberPayJour";

export default {
  name: "MemberPayJour",
  components: {
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
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 【请填写功能名称】表格数据
      memberPayJourList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
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
        province: null,
        city: null,
        area: null,
        platformRate: null,
        currentSuccessRate: null,
        manWork: null,
        userName: null,
        first: null
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
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listMemberPayJour(this.queryParams).then(response => {
        this.memberPayJourList = response.rows;
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
        status: "0",
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
      this.title = "添加【请填写功能名称】";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMemberPayJour(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改【请填写功能名称】";
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
      this.$confirm('是否确认删除【请填写功能名称】编号为"' + ids + '"的数据项?', "警告", {
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
      this.$confirm('是否确认导出所有【请填写功能名称】数据项?', "警告", {
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
