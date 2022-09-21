<template>
  <div class="app-container">
    <el-button type="success" @click="copy1">交易笔数 {{ this.totalData.countNumber || 0 }}</el-button>
    <el-button type="warning" @click="copy2">总金额 {{ this.totalData.countWithdrawMoney || 0 }}</el-button>
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px"  style="margin-top: 20px">
      <el-form-item prop="searchTime">
        <el-date-picker
          v-model="queryParams.searchTime"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期" :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item  prop="userId" style="width: 130px">
        <el-input
          v-model.trim="queryParams.userId"
          placeholder="主播ID"
          clearable
          size="small"
          type="number"
          class="no-number"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item  prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="主播昵称"
          clearable
          size="small"
          style="width:140px"
          @keyup.enter.native="handleQuery"
        />
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
      <el-form-item prop="bankAccount">
        <el-input
          v-model="queryParams.bankAccount"
          placeholder="提现银行账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item  prop="wstatus" style="width: 160px">
        <el-select v-model="queryParams.wstatus" placeholder="全部状态" clearable size="small">
          <el-option :label="item.labelName" :value="item.labelValue" v-for="item in withdrawTypes" />
        </el-select>
      </el-form-item>
     <el-form-item  prop="type">
       <el-select v-model="queryParams.type" placeholder="提现类型" clearable size="small" style="width: 130px">
         <el-option :label="item.labelName" :value="item.labelValue" v-for="item in liveWithdrawType" />
       </el-select>
      </el-form-item>
      <el-form-item prop="SearchCardBlack" style="width: 155px;">
        <template>
          <el-select v-model="queryParams.SearchCardBlack" placeholder="银行归属地黑名单" size="small" clearable>
            <el-option
              v-for="item in CardBlackOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
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
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="fixIds"
          v-hasPermi="['live-web:liveUserWithdrawNewlog:fixOrder']"
        >合并订单
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
<!--    <el-row :gutter="10" class="mb8">

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>-->

    <el-table stripe v-loading="loading" :data="liveUserWithdrawNewlogList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="复制" align="center" width="100px">
        <template slot-scope="scope">
          <el-button
            type="primary" size="mini"
            @click="handleCopy(scope.row)"
          >复制
          </el-button>
          <el-button
            type="text" size="mini"
            icon="el-icon-copy-document"
            @click="handleCopy2(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="主播ID" align="center" prop="userId" min-width="80px" />
      <el-table-column label="家族ID" align="center" prop="familyId">
        <template v-slot="{row}">
          <a style="color: #00afff" @click="familyShow(row.familyId,row.createTime,row.type,row.userId)">{{ row.familyId }}</a>
        </template>
      </el-table-column>
      <el-table-column label="主播昵称" align="center" prop="nickName" min-width="120px" />
      <el-table-column label="提现金额" align="center" prop="withdrawMoney" min-width="80px" >
        <template v-slot="{row}">
          <a style="color: #00afff" @click="copyColumn(row.withdrawMoney)">{{ row.withdrawMoney }}</a>
        </template>
      </el-table-column>
      <el-table-column label="提现真实姓名" align="center" prop="bankUserName" min-width="120px" >
        <template v-slot="{row}">
          <a style="color: #00afff" @click="copyColumn(row.bankUserName)">{{ row.bankUserName }}</a>
        </template>
      </el-table-column>
      <el-table-column label="提现银行账号" align="center" prop="bankAccount" min-width="180px" >
        <template v-slot="{row}">
          <a style="color: #00afff" @click="copyColumn(row.bankAccount)">{{ row.bankAccount }}</a>
        </template>
      </el-table-column>
      <el-table-column label="银行" min-width="120" align="center" prop="bankName">
        <template v-slot="{row}">
          <a style="color: #00afff" @click="copyColumn(row.bankAddress)">{{ row.bankAddress }}</a>
        </template>
      </el-table-column>
      <el-table-column label="银行归属地" align="center" min-width="110" prop="cardBlack" >
      <template v-slot="{row}">
        <span style="color: #ff0026" v-if="row.cardBlack == 1">{{ row.realBankAddress }}</span>
        <span v-if="row.cardBlack == 0">{{ row.realBankAddress }}</span>
      </template>
      </el-table-column>
      <el-table-column label="状态" min-width="120" align="center" prop="wstatus">
        <template slot-scope="scope">
          <span :style="{color: (wstatus = statusOptions[parseInt(scope.row.wstatus)]).color}">{{ wstatus.dictLabel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="125" align="center" prop="createTime"/>
      <el-table-column label="最后修改时间" width="125" align="center" prop="updateTime"/>
      <el-table-column label="审核员" align="center" prop="opName" min-width="100"/>
      <el-table-column label="审核备注" align="center" min-width="200px" prop="remark" />
      <el-table-column label="订单号" align="center" prop="orderNo"  min-width="180px"/>
      <el-table-column label="提现类型" align="center" prop="type" :formatter="formatterLiveType" min-width="80px" />
      <el-table-column label="操作" min-width="350" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="success"
            plain
            icon="el-icon-check"
            v-show="scope.row.wstatus == 1"
            @click="handleFinalAudit(scope.row)"
            v-hasPermi="['live-web:liveUserWithdrawNewlog:finalAudit']"
          >审核通过
          </el-button>
          <el-button
            size="small"
            type="info"
            plain
            icon="el-icon-refresh-right"
            v-show="scope.row.wstatus == 3 || scope.row.wstatus == 2"
            @click="handleRecoverAudit(scope.row)"
            v-hasPermi="['live-web:liveUserWithdrawNewlog:recoverAudit']"
          >恢复
          </el-button>
          <el-button
            size="small"
            type="primary"
            plain
            v-show="scope.row.wstatus == 4"
            icon="el-icon-unlock"
            @click="handleUnlock(scope.row)"
            v-has-permi="['live-web:liveUserWithdrawNewlog:unlock']"
          >解锁
          </el-button>
          <el-button
            size="small"
            type="success"
            plain
            v-show="scope.row.wstatus == 3 "
            icon="el-icon-circle-check"
            @click="handleArtificialWithdraw(scope.row)"
            v-has-permi="['live-web:liveUserWithdrawNewlog:artificial']"
          >出款
          </el-button>
          <el-button
            size="small"
            type="danger"
            plain
            v-show="scope.row.wstatus == 1 "
            icon="el-icon-circle-close"
            @click="handleRefused(scope.row)"
            v-has-permi="['live-web:liveUserWithdrawNewlog:refused']"
          >拒绝
          </el-button>
          <el-button
            size="small"
            type="success"
            plain
            v-show="scope.row.wstatus == 4 "
            icon="el-icon-check"
            @click="handleWithdrawSucc(scope.row)"
            v-has-permi="['live-web:liveUserWithdrawNewlog:withdrawSucc']"
          >出款成功
          </el-button>
          <el-button
            size="small"
            type="primary"
            plain
            v-show="scope.row.wstatus !=5  && scope.row.wstatus != 6"
            icon="el-icon-refresh-right"
            @click="handleUpdateOrder(scope.row)"
            v-has-permi="['live-web:liveUserWithdrawNewlog:updateOrder']"
          >重置订单
          </el-button>
          <el-button
            size="small"
            type="danger"
            plain
            v-show="scope.row.wstatus == 4 "
            icon="el-icon-refresh-right"
            @click="handleWithdrawRefused(scope.row)"
            v-has-permi="['live-web:liveUserWithdrawNewlog:withdrawRefused']"
          >出款拒绝
          </el-button>
          <el-button
            size="small"
            type="success"
            plain
            icon="el-icon-check"
            v-show="scope.row.wstatus == 1 "
            @click="updateWithdrawMoney(scope.row)"
            v-has-permi="['live-web:liveUserWithdrawNewlog:modifyMoney']"
          >修改提现金额
          </el-button>
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
    <!-- 修改提现金额 -->
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      title="修改提现金额"
      :visible.sync="peopledeposit"
      width="500px"
      append-to-body
    >
      <el-form ref="formdeposit" :model="formdeposit" :rules="formdepositRules" label-width="120px">

        <el-form-item label="提现金额" prop="withdrawMoney">
          <el-input type="number" placeholder="请输入提现金额" v-model="formdeposit.withdrawMoney" class="no-number"/>
        </el-form-item>
        <el-form-item label="谷歌验证码" prop="googleAuthCode">
          <el-input v-model="formdeposit.googleAuthCode" type="number" placeholder="请输入google验证码"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitDeposit">立即提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listLiveUserWithdrawNewlog,fixOrder,updateOrder,modifyMoney,withdrawSucc,withdrawRefused,getCountTotal,unlockMemberWithdrawLog,refusedMemberWithdrawLog,artificialMemberWithdrawLog,finalAuditMemberRechargeLog,recoverAuditMemberRechargeLog, getLiveUserWithdrawNewlog, delLiveUserWithdrawNewlog, addLiveUserWithdrawNewlog, updateLiveUserWithdrawNewlog, exportLiveUserWithdrawNewlog } from "@/api/platform-web/live-web/liveUserWithdrawNewlog";
import {getYesterDate, pickerDateTimeShortcuts} from "@/utils/dateUtils";




export default {
  name: "LiveUserWithdrawNewlog",
  components: {
  },
  data() {
    return {
      //银行卡黑名单下拉框
      CardBlackOptions: [{
        value: '1',
        label: '是'
      }, {
        value: '0',
        label: '否'
      }],
      pickerOptions: {shortcuts: pickerDateTimeShortcuts},
      // 遮罩层
      loading: true,
      //统计
      totalData: {},
      // 选中数组
      ids: [],
      statusOptions: [],
      withdrawTypes: [{labelName: '申请中',labelValue: 0},{labelName: '提交申请',labelValue: 1},{labelName: '审核不通过',labelValue: 2},{labelName: '终极审核通过',labelValue: 3},{labelName: '出款中',labelValue: 4},{labelName: '出款成功',labelValue: 5}],
      liveWithdrawType: [{labelName: '家族',labelValue: 1},{labelName: '个人',labelValue: 2}],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      //弹出层
      peopledeposit: false,
      // 主播提现管理表格数据
      liveUserWithdrawNewlogList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        searchTime: [this.parseTime(getYesterDate(), '{y}-{m}-{d}'), this.parseTime(getYesterDate(), '{y}-{m}-{d}')],
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
        //googleAuthCode: null,
        //银行卡黑名单
        SearchCardBlack: null,
        cardBlack: null,
        orderByColumn: 'update_time',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      //存入框参数
      formdeposit: {
        id: null,
        withdrawMoney: null,
        googleAuthCode: null
      },
      formdepositRules:{
        withdrawMoney: [
          { required: true, message: "提现金额不能为空", trigger: "blur" }
        ],
        googleAuthCode: [
          {required: true, message: 'google验证码不能为空', trigger: 'blur'}
        ]
      },
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
        googleAuthCode: [
          {required: true, message: 'google验证码不能为空', trigger: 'blur'}
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
          { required: true, message: "状态不能为空", trigger: "blur" }
        ],
        type: [
          { required: true, message: "提现类型(1提现到银行卡,2提现到支付宝)不能为空", trigger: "change" }
        ],
      }
    };
  },
  created() {
    this.getDicts('withdraw_status').then(response => {
      this.statusOptions = response.data
    })
    this.getList();
    this.getCountTotal()
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
    familyShow(familyId,createTime,type,userId) {
      this.$router.push({
        path: '/live/live/liveHostWageNoteJump',
        query: {
          familyId: familyId,
          createTime:createTime,
          hostId:userId,
          //type:type,
          // settlementRate: this.queryParams.settlementRate,
          //selectDate: this.queryParams.selectDate
        }
      })
    },
    formatterLiveType(row){
      var string = '';
      this.liveWithdrawType.forEach((value, index, array) => {
        if (value.labelValue === row.type) {
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
    //复制
    copy1() {
      this.copyCommand(this.totalData.countNumber)
    },
    copy2() {
      this.copyCommand(this.totalData.countWithdrawMoney)
    },
    copyColumn(value) {
      this.copyCommand(value)
    },
    /** 复制按钮 */
    handleCopy(row) {
      var status = this.statusOptions[parseInt(row.wstatus)]
      console.info(row.type)
      var typeind=row.type-1
      var wdtype=this.liveWithdrawType[parseInt(typeind)]
      console.info(wdtype)
      var textarea = document.createElement('textarea')
      let html = '<table><tr>'
      html += '<td>' + row.userId + '</td>'
      html += '<td>' + row.familyId + '</td>'
      //html += '<td>' + row.rechargeWithdrawRate + '</td>'
      html += '<td>' + row.nickName + '</td>'
      html += '<td>' + row.withdrawMoney + '</td>'
      html += '<td>' + row.bankUserName + '</td>'
      html += '<td>' + '\'' + row.bankAccount + '\'' + '</td>'
      html += '<td>' + status.dictLabel + '</td>'
      html += '<td>' + row.createTime + '</td>'
      html += '<td>' + row.updateTime + '</td>'
      html += '<td>' + row.opName + '</td>'
      html += '<td>' + row.remark + '</td>'
      html += '<td>' + row.orderNo + '</td>'
      html += '<td>' + wdtype.labelName + '</td>'
      html += '</tr></table>'
      textarea.value = html
      this.copyData = html
      this.copy(this.copyData)
    },
    /** 复制按钮 */
    handleCopy2(row) {
      var status = this.statusOptions[parseInt(row.wstatus)]
      console.info(row.type)
      var typeind=row.type-1
      var wdtype=this.liveWithdrawType[parseInt(typeind)]
      var textarea = document.createElement('textarea')
      let html = row.userId
        + '\r\n' + row.account
        + '\r\n' + row.familyId
        + '\r\n' + row.nickName
        + '\r\n' + row.withdrawMoney
        + '\r\n' + row.bankUserName
        + '\r\n' + row.bankAccount
        + '\r\n' + status.dictLabel
        + '\r\n' + row.createTime
        + '\r\n' + row.updateTime
        + '\r\n' + row.opName
        + '\r\n' + row.remark
        + '\r\n' + row.orderNo
        + '\r\n' + wdtype.labelName
      textarea.value = html
      this.copyData = html
      this.copy(this.copyData)
    },
    //合并订单
    fixIds() {
      const ids = this.ids
      if (ids == null || ids == '' || ids.length<2) {
        this.msgError('请选择要合并的订单')
        return
      }
      this.$confirm('是否确认合并的订单?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return fixOrder(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('合并订单成功')
      })
    },

    copy(data) {
      let url = data
      let oInput = document.createElement('textarea')
      oInput.value = url
      document.body.appendChild(oInput)
      oInput.select() // 选择对象;
      document.execCommand('Copy') // 执行浏览器复制命令
      this.$message({
        message: '复制成功',
        type: 'success'
      })
      oInput.remove()
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
      this.getCountTotal()
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
    getCountTotal() {
      getCountTotal(this.queryParams).then((res) => {
        this.totalData = res.data
      })
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
    submitDeposit() {
      this.$refs["formdeposit"].validate(valid => {
        if (valid) {
          modifyMoney(this.formdeposit).then(response => {
              this.msgSuccess("修改提现金额成功");
              this.peopledeposit = false;
              this.getList();
            });
        }
      });
    },


    handleArtificialWithdraw2(row) {

      artificialMemberWithdrawLog({
        id: row.id
      }).then(response => {
        this.msgSuccess(response.msg)
        if (response.code == 200) {
          this.open = false
          this.getList()
        }
      })
    },

    //审核
    handleFinalAudit(row) {
      finalAuditMemberRechargeLog({
        id: row.id
      }).then(response => {
        this.msgSuccess(response.msg)
        if (response.code == 200) {
          this.open = false
          this.getList()
        }
      })
    },

    //重新生成订单
    handleUpdateOrder(row) {
      updateOrder({
        id: row.id
      }).then(response => {
        this.msgSuccess(response.msg)
        if (response.code == 200) {
          this.open = false
          this.getList()
        }
      })
    },

    //拒绝
    handleRefused(row) {
      this.promptRefused(row.id)
    },
    promptRefused(id) {
      this.$prompt(null, '请输入拒绝出款原因', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        refusedMemberWithdrawLog({
          id: id,
          remark: value
        }).then(response => {
          this.msgSuccess(response.msg)
          this.open = false
          this.getList()
        })
      }).catch(() => {
      })
    },

    //拒绝出款
    handleWithdrawRefused(row) {
      this.promptWithdrawRefused(row.id)
    },
    promptWithdrawRefused(id) {
      this.$prompt(null, '请输入拒绝出款原因', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        withdrawRefused({
          id: id,
          remark: value
        }).then(response => {
          this.msgSuccess(response.msg)
          this.open = false
          this.getList()
        })
      }).catch(() => {
      })
    },

    //更新提现金额
    updateWithdrawMoney(row) {
      //重置
      const id = row.id
      getLiveUserWithdrawNewlog(id).then(response => {
        this.formdeposit = response.data;
        this.peopledeposit = true;
      });

    },

    //出款
    handleArtificialWithdraw(row) {

      artificialMemberWithdrawLog({
        id: row.id
      }).then(response => {
        this.msgSuccess(response.msg)
        if (response.code == 200) {
          this.open = false
          this.getList()
        }
      })
    },
    //出款成功
    handleWithdrawSucc(row) {

      withdrawSucc({
        id: row.id
      }).then(response => {
        this.msgSuccess(response.msg)
        if (response.code == 200) {
          this.open = false
          this.getList()
        }
      })
    },

    //解锁
    handleUnlock(row) {
      unlockMemberWithdrawLog({
        id: row.id
      }).then(response => {
        this.msgSuccess(response.msg)
        this.getList()
      })
    },

    //恢复提交审核状态
    handleRecoverAudit(row) {
      recoverAuditMemberRechargeLog({
        id: row.id
      }).then(response => {
        this.msgSuccess(response.msg)
        if (response.code == 200) {
          this.open = false
          this.getList()
        }
      })
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
