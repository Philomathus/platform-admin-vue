<template>
  <div class="app-container">
    <el-button type="primary" @click="copy1">总存入金额 {{ this.totalData.depositTotal || 0 }}</el-button>
    <el-button type="info" @click="copy2">总提出金额 {{ this.totalData.proposedTotal || 0 }}</el-button>
    <el-button type="success" @click="copy3">实际总存入金额 {{ this.totalData.realDepositTotal || 0 }}</el-button>
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="70px"
             style="margin-top:20px">
      <el-form-item label="代充账号" prop="rechargeAcount">
        <el-input
          v-model="queryParams.rechargeAcount"
          placeholder="请输入代充账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="代充昵称" prop="rechargeNickName">
        <el-input
          v-model="queryParams.rechargeNickName"
          placeholder="请输入代充昵称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="选择日期" prop="createTime">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期" :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="deposit" round>人工存入</el-button>
        <el-button type="primary" size="medium" @click="proposed" round>人工提出</el-button>
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
          v-hasPermi="['pay:payAgentRechargeRecord:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['pay:payAgentRechargeRecord:edit']"
        >修改
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
          v-hasPermi="['pay:payAgentRechargeRecord:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['pay:payAgentRechargeRecord:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :stripe="true" v-loading="loading" :data="payAgentRechargeRecordList"
              @selection-change="handleSelectionChange">
      <el-table-column label="复制" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary" size="mini"
            @click="handleCopy(scope.row)"
          >复制
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="订单号" align="center" prop="orderNo" :show-overflow-tooltip="true" min-width="200"/>
      <el-table-column label="代充账号" align="center" prop="rechargeAcount"/>
      <el-table-column label="代充昵称" align="center" prop="rechargeNickName"/>
      <el-table-column label="存入(提出)类型" align="center" prop="type"/>
      <el-table-column label="存入(提出)金额" align="center" prop="money"/>
      <el-table-column label="备注" align="center" prop="remark"/>
      <el-table-column label="操作时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作人" align="center" prop="opName"/>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 人工存入弹框 -->
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      title="人工存入"
      :visible.sync="peopledeposit"
      width="500px"
      append-to-body
    >
      <el-form ref="formdeposit" :model="formdeposit" :rules="rules" label-width="120px">
        <el-form-item label="代充账号" prop="rechargeAcount">
          <el-input placeholder="请输入代充账号" v-model="formdeposit.rechargeAcount"
          />
        </el-form-item>
        <el-form-item label="存入类型" prop="type">
          <el-select v-model="formdeposit.type" placeholder="请选择存入类型" clearable size="small">
            <el-option
              v-for="item in deposittype"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="存入金额" prop="money">
          <el-input type="number" placeholder="请输入存入金额" v-model="formdeposit.money" class="no-number"/>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input placeholder="请输入备注" v-model="formdeposit.remark"/>
        </el-form-item>
        <el-form-item label="谷歌验证码" prop="googleAuthCode">
          <el-input v-model="formdeposit.googleAuthCode" type="number" placeholder="请输入google验证码"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitDeposit">立即提交</el-button>
      </div>
    </el-dialog>

    <!-- 人工提出弹框 -->
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      title="人工提出"
      :visible.sync="peopleproposed"
      width="500px"
      append-to-body
    >
      <el-form ref="formproposed" :model="formproposed" :rules="rules" label-width="120px">
        <el-form-item label="代充账号" prop="rechargeAcount">
          <el-input placeholder="请输入代充账号" v-model="formproposed.rechargeAcount"
          />
        </el-form-item>
        <el-form-item label="提出类型" prop="type">
          <el-select v-model="formproposed.type" placeholder="请选择提出类型" clearable size="small">
            <el-option
              v-for="item in proposedtype"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提出金额" prop="money">
          <el-input placeholder="请输入提出金额" type="number" class="no-number" label="BigDecimal"
                    v-model="formproposed.money"/>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input placeholder="请输入备注" v-model="formproposed.remark"/>
        </el-form-item>
        <el-form-item label="谷歌验证码" prop="googleAuthCode">
          <el-input v-model="formproposed.googleAuthCode" type="number" placeholder="请输入google验证码"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitProposed">立即提交</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改代充存提对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listPayAgentRechargeRecord,
  getPayAgentRechargeRecord,
  delPayAgentRechargeRecord,
  addPayAgentRechargeRecord,
  updatePayAgentRechargeRecord,
  exportPayAgentRechargeRecord,
  deposit,
  proposed,
  getCount
} from "@/api/platform-web/pay/payAgentRechargeRecord";
import {pickerDateShortcuts} from '@/utils/dateUtils'

export default {
  name: "PayAgentRechargeRecord",
  components: {},
  data() {
    return {
      pickerOptions: {shortcuts: pickerDateShortcuts},
      //存入类型选择栏
      deposittype: [{
        value: '人工存入',
        label: '人工存入'
      }, {
        value: '重复充值',
        label: '重复充值'
      }, {
        value: '调单调整',
        label: '调单调整'
      }],
      //提出类型选择栏
      proposedtype: [{
        value: '未给会员充值',
        label: '未给会员充值'
      }, {
        value: '其他',
        label: '其他'
      }],
      //统计数据
      totalData: {
        depositTotal: 0,
        proposedTotal: 0,
        realDepositTotal: 0
      },
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 日期范围
      dateRange: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 代充存提表格数据
      payAgentRechargeRecordList: [],
      // 弹出层标题
      title: "",
      //人工存入弹出层
      peopledeposit: false,
      //人工提出弹出层
      peopleproposed: false,
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        orderNo: null,
        rechargeAcount: null,
        rechargeNickName: null,
        createTime: null,
        orderByColumn: 'createTime',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      //存入框参数
      formdeposit: {},
      //提出框参数
      formproposed: {},
      // 表单校验
      rules: {
        rechargeAcount: [
          {required: true, message: "代充账号不能为空", trigger: "blur"}
        ],
        type: [
          {required: true, message: "存入(提出)类型不能为空", trigger: "change"}
        ],
        money: [
          {required: true, message: "存入(提出)金额不能为空", trigger: "blur"}
        ],
        createTime: [
          {required: true, message: "操作时间不能为空", trigger: "blur"}
        ],
        opName: [
          {required: true, message: "操作人不能为空", trigger: "blur"}
        ],
        googleAuthCode: [
          {required: true, message: 'google验证码不能为空', trigger: 'blur'}
        ]
      }
    };
  },
  created() {
    this.getList();
    this.count()
  },
  methods: {
    /** 查询代充存提列表 */
    getList() {
      this.loading = true;
      listPayAgentRechargeRecord(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.payAgentRechargeRecordList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    onCopy: function (e) {
      alert('You just copied: ' + e.text)
    },
    onError: function (e) {
      console.log(e)
      alert('Failed to copy texts')
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    //人工存入
    deposit() {
      this.resetformdeposit()
      this.peopledeposit = true
    },
    //人工提出
    proposed() {
      this.resetformproposed()
      this.peopleproposed = true
    },
    // 人工提出表单重置
    resetformproposed() {
      this.formproposed = {
        rechargeAcount: null,
        type: null,
        money: null,
        remark: null,
        googleAuthCode: null
      };
      this.resetForm("formproposed");
    },
    // 人工存入重置
    resetformdeposit() {
      this.formdeposit = {
        rechargeAcount: null,
        type: null,
        money: null,
        remark: null,
        googleAuthCode: null
      };
      this.resetForm("formdeposit");
    },
    //复制
    copy1() {
      this.copyCommand(this.totalData.depositTotal)
    },
    copy2() {
      this.copyCommand(this.totalData.proposedTotal)
    },
    copy3() {
      this.copyCommand(this.totalData.realDepositTotal)
    },
    //统计
    count() {
      getCount(this.queryParams).then((res) => {
        console.info(res.data)
        if (res.data) {
          this.totalData = res.data
          this.totalData.realDepositTotal = (res.data.depositTotal * 0.97).toFixed(2)
        }
        this.loading = false
      })
    },
    // 表单重置
    reset() {
      this.form = {
        orderNo: null,
        rechargeAcount: null,
        rechargeNickName: null,
        type: null,
        remark: null,
        money: null,
        createTime: null,
        opName: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
      this.count()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.orderNo)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加代充存提";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const orderNo = row.orderNo || this.ids
      getPayAgentRechargeRecord(orderNo).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改代充存提";
      });
    },
    /** 复制按钮 */
    handleCopy(row) {
      var textarea = document.createElement("textarea");
      let html = '<table><tr>'
      html += '<td>' + row.orderNo + '</td>'
      html += '<td>' + row.rechargeAcount + '</td>'
      html += '<td>' + row.rechargeNickName + '</td>'
      html += '<td>' + row.type + '</td>'
      html += '<td>' + row.money + '</td>'
      html += '<td>' + row.createTime + '</td>'
      html += '<td>' + row.opName + '</td>'
      html += '<td>' + row.remark + '</td>'
      html += '</tr></table>'
      textarea.value = html;
      this.copyData = html
      this.copy(this.copyData)
    },
    copy(data) {
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

    /** 人工存入按钮 */
    submitDeposit() {
      const regex = /^[0-9]*[1-9][0-9]*$/;
      if (!regex.test(this.formdeposit.money)) {
        this.$message.error("存入金额必须为正整数")
      } else {
        this.$refs["formdeposit"].validate(valid => {
          if (this.formdeposit.rechargeAcount != null) {
            deposit(this.formdeposit).then(response => {
              this.msgSuccess("提交成功");
              this.open = false;
              this.getList();
            });
          }
        });
      }
    },
    /** 人工提出按钮 */
    submitProposed() {
      const regex = /^[0-9]*[1-9][0-9]*$/;
      if (!regex.test(this.formproposed.money)) {
        this.$message.error("提出金额必须为正整数")
      } else {
        this.$refs["formproposed"].validate(valid => {
          if (this.formproposed.rechargeAcount != null) {
            proposed(this.formproposed).then(response => {
              this.msgSuccess("提交成功");
              this.peopleproposed = false;
              console.info(this.peopleproposed)
              this.getList();
            });
          }
        });
      }
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.orderNo != null) {
            updatePayAgentRechargeRecord(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPayAgentRechargeRecord(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.peopledeposit = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const orderNos = row.orderNo || this.ids;
      this.$confirm('是否确认删除代充存提编号为"' + orderNos + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delPayAgentRechargeRecord(orderNos);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return exportPayAgentRechargeRecord(queryParams);
      }).then(response => {
        this.downloadExcel(response, '代充存提')
      }).catch(() => {
      })
    }
  }
};
</script>
