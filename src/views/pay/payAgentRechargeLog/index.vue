<template>
  <div class="app-container">
    <div v-loading="totalLoading">
    <el-button type="success" @click="copy1">交易笔数: {{this.data.countNumber || 0}}</el-button>
    <el-button type="warning" @click="copy2">总上分金额: {{this.data.countMoney || 0 }}</el-button>
      <el-button  type="primary" icon="el-icon-search" size="mini" @click="count()" style="margin-left: 20px">统计查询</el-button>
    </div>
    <el-form :model="queryParams" ref="queryForm" :inline="true" style="margin-top: 10px" v-show="showSearch" label-width="68px">
      <el-form-item label="创建时间" prop="selectDate" label-width="70px">
        <el-date-picker type="datetimerange" v-model="queryParams.selectDate" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '100%'}" start-placeholder="开始时间"
                        end-placeholder="结束时间" range-separator="至" :default-time="['00:00:00', '23:59:59']" clearable :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item  prop="orderNo">
        <el-input
          v-model="queryParams.orderNo"
          placeholder="订单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item  prop="rechargeAcount">
        <el-input
          v-model="queryParams.rechargeAcount"
          placeholder="代充账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item  prop="memberId">
        <el-input
          v-model.trim="queryParams.searchValue"
          placeholder="会员ID/会员账号"
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
          v-hasPermi="['pay:payAgentRechargeLog:add']"
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
          v-hasPermi="['pay:payAgentRechargeLog:edit']"
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
          v-hasPermi="['pay:payAgentRechargeLog:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="openExport"
          v-hasPermi="['pay:payAgentRechargeLog:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :stripe="true" v-loading="loading" :data="payAgentRechargeLogList" @selection-change="handleSelectionChange"  >
      <el-table-column label="复制" align="center" >
        <template slot-scope="scope">
          <el-button
            type="primary" size="mini"
            @click="handleCopy(scope.row)"
          >复制
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="订单号" align="center" prop="orderNo" min-width="170"/>
      <el-table-column label="代充账号" align="center" prop="rechargeAcount" min-width="160"/>
      <el-table-column label="代充昵称" align="center" prop="rechargeNickName" min-width="120" />
      <el-table-column label="会员ID" align="center" prop="memberId" min-width="120"/>
      <el-table-column label="会员账号" align="center" prop="userName" min-width="120" />
      <el-table-column label="上分金额" align="center" prop="money" min-width="100" />
      <el-table-column label="创建时间" align="center" fixed="right" prop="createTime" width="160"/>
      <el-table-column label="操作IP" align="center" fixed="right" prop="opIp" width="160"/>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改代充信息日志对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <ExcelPrompt ref="excelPrompt" @downLoadExcel="handleExport"></ExcelPrompt>
  </div>
</template>

<script>
import { listPayAgentRechargeLog, getPayAgentRechargeLog, delPayAgentRechargeLog, addPayAgentRechargeLog, updatePayAgentRechargeLog, exportPayAgentRechargeLog, countMoney } from "@/api/platform-web/pay/payAgentRechargeLog";
import {pickerDateTimeShortcuts} from "@/utils/dateUtils";
import ExcelPrompt from '@/layout/components/prompt/excelPrompt.vue';
export default {
  name: "PayAgentRechargeLog",
  components: {
    ExcelPrompt
  },
  data() {
    return {
      pickerOptions: { shortcuts: pickerDateTimeShortcuts },
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
      data: {},
      totalLoading: false,
      // 代充信息日志表格数据
      payAgentRechargeLogList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        selectDate: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],
        pageNum: 1,
        pageSize: 20,
        orderNo: null,
        rechargeAcount: null,
        rechargeNickName: null,
        searchValue: null,
        orderByColumn: 'create_time',
        isAsc: 'desc',
        downLoadDate: [],
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        rechargeAcount: [
          { required: true, message: "代充账号不能为空", trigger: "blur" }
        ],
        rechargeNickName: [
          { required: true, message: "代充昵称不能为空", trigger: "blur" }
        ],
        memberId: [
          { required: true, message: "会员ID不能为空", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "会员账号不能为空", trigger: "blur" }
        ],
        money: [
          { required: true, message: "上分金额不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询代充信息日志列表 */
    getList() {
      this.loading = true;
      listPayAgentRechargeLog(this.queryParams).then(response => {
        this.payAgentRechargeLogList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    count() {
      this.totalLoading = true;
      countMoney(this.queryParams).then(response => {
        this.data= response.data;
      }).finally(()=>{this.totalLoading = false;})
    },
    //复制
    copy1() {
      this.copyCommand(this.data.countNumber)
    },
    copy2() {
      this.copyCommand(this.data.countMoney)
    },
    // 表单重置
    reset() {
      this.form = {
        orderNo: null,
        rechargeAcount: null,
        rechargeNickName: null,
        memberId: null,
        userName: null,
        money: null,
        createTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
      // this.count();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.orderNo)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加代充信息日志";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const orderNo = row.orderNo || this.ids
      getPayAgentRechargeLog(orderNo).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改代充信息日志";
      });
    },
    /** 复制按钮 */
    handleCopy(row){
      var textarea = document.createElement("textarea");
      let html = '<table><tr>'
      html += '<td>' + row.orderNo + '</td>'
      html += '<td>' + row.rechargeAcount + '</td>'
      html += '<td>' + row.rechargeNickName + '</td>'
      html += '<td>' + row.memberId + '</td>'
      html += '<td>' + row.userName + '</td>'
      html += '<td>' + row.money + '</td>'
      html += '<td>' + row.createTime + '</td>'
      html += '</tr></table>'
      textarea.value = html;
      this.copyData = html
      this.copy(this.copyData)
    },
    copy(data){
      let url = data;
      let oInput = document.createElement('input');
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$message({
        message: '复制成功',
        type: 'success'
      });
      oInput.remove()
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.orderNo != null) {
            updatePayAgentRechargeLog(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPayAgentRechargeLog(this.form).then(response => {
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
      const orderNos = row.orderNo || this.ids;
      this.$confirm('是否确认删除代充信息日志编号为"' + orderNos + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delPayAgentRechargeLog(orderNos);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      })
    },
    openExport() {
      this.$refs.excelPrompt.open=true;
    },
    /** 导出按钮操作 */
    handleExport(date) {
      const queryParams = this.queryParams
      queryParams.downLoadDate = date
      queryParams.selectDate = []
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportPayAgentRechargeLog(queryParams)
      }).then(response => {
        this.downloadExcel(response, '代充日志')
      }).catch(() => {
      })
    }
  }
};
</script>
