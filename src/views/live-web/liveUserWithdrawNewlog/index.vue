<template>
  <div class="app-container">
    <el-button type="success" @click="copy1">{{$t('liveWeb.liveUserWithdrawNewlog.statistics.countNumberButton')}} {{ this.totalData.countNumber || 0 }}</el-button>
    <el-button type="warning" @click="copy2">{{$t('liveWeb.liveUserWithdrawNewlog.statistics.countWithdrawMoneyButton')}} {{ this.totalData.countWithdrawMoney || 0 }}</el-button>
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px"  style="margin-top: 20px">
      <el-form-item prop="searchTime">
        <el-date-picker
          v-model="queryParams.searchTime"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          :start-placeholder="$t('liveWeb.liveUserWithdrawNewlog.queryForm.searchTimeStartPlaceholder')"
          :end-placeholder="$t('liveWeb.liveUserWithdrawNewlog.queryForm.searchTimeEndPlaceholder')" :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item  prop="userId" style="width: 130px">
        <el-input
          v-model.trim="queryParams.userId"
          :placeholder="$t('liveWeb.liveUserWithdrawNewlog.queryForm.userIdPlaceholder')"
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
          :placeholder="$t('liveWeb.liveUserWithdrawNewlog.queryForm.nickNamePlaceholder')"
          clearable
          size="small"
          style="width:140px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item  prop="orderNo">
        <el-input
          v-model="queryParams.orderNo"
          :placeholder="$t('liveWeb.liveUserWithdrawNewlog.queryForm.orderNo')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="bankAccount">
        <el-input
          v-model="queryParams.bankAccount"
          :placeholder="$t('liveWeb.liveUserWithdrawNewlog.queryForm.bankAccount')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item  prop="wstatus" style="width: 160px">
        <el-select v-model="queryParams.wstatus" :placeholder="$t('liveWeb.liveUserWithdrawNewlog.queryForm.wstatusPlaceholder')" clearable size="small">
          <el-option :label="item.labelName" :value="item.labelValue" v-for="item in withdrawTypes" />
        </el-select>
      </el-form-item>
     <el-form-item  prop="type">
       <el-select v-model="queryParams.type" :placeholder="$t('liveWeb.liveUserWithdrawNewlog.queryForm.typePlaceholder')" clearable size="small" style="width: 130px">
         <el-option :label="item.labelName" :value="item.labelValue" v-for="item in liveWithdrawType" />
       </el-select>
      </el-form-item>
      <el-form-item prop="SearchCardBlack" style="width: 155px;">
        <template>
          <el-select v-model="queryParams.SearchCardBlack" :placeholder="$t('liveWeb.liveUserWithdrawNewlog.queryForm.SearchCardBlackPlaceholder')" size="small" clearable>
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
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('liveWeb.liveUserWithdrawNewlog.queryForm.searchButton')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('liveWeb.liveUserWithdrawNewlog.queryForm.resetButton')}}</el-button>
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
        >{{$t('liveWeb.liveUserWithdrawNewlog.actions.export')}}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="fixIds"
          v-hasPermi="['live-web:liveUserWithdrawNewlog:fixOrder']"
        >{{$t('liveWeb.liveUserWithdrawNewlog.actions.fixIds')}}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
<!--    <el-row :gutter="10" class="mb8">

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>-->

    <el-table stripe v-loading="loading" :data="liveUserWithdrawNewlogList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column :label="$t('liveWeb.liveUserWithdrawNewlog.table.clone')" align="center" width="100px">
        <template slot-scope="scope">
          <el-button
            type="primary" size="mini"
            @click="handleCopy(scope.row)"
          >{{$t('liveWeb.liveUserWithdrawNewlog.table.cloneButton')}}
          </el-button>
          <el-button
            type="text" size="mini"
            icon="el-icon-copy-document"
            @click="handleCopy2(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveUserWithdrawNewlog.table.userId')" align="center" prop="userId" min-width="80px" />
      <el-table-column :label="$t('liveWeb.liveUserWithdrawNewlog.table.familyId')" align="center" prop="familyId">
        <template v-slot="{row}">
          <a style="color: #00afff" @click="familyShow(row.familyId,row.createTime,row.type,row.userId)">{{ row.familyId }}</a>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveUserWithdrawNewlog.table.nickName')" align="center" prop="nickName" min-width="120px" />
      <el-table-column :label="$t('liveWeb.liveUserWithdrawNewlog.table.withdrawMoney')" align="center" prop="withdrawMoney" min-width="80px" >
        <template v-slot="{row}">
          <a style="color: #00afff" @click="copyColumn(row.withdrawMoney)">{{ row.withdrawMoney }}</a>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveUserWithdrawNewlog.table.bankUserName')" align="center" prop="bankUserName" min-width="120px" >
        <template v-slot="{row}">
          <a style="color: #00afff" @click="copyColumn(row.bankUserName)">{{ row.bankUserName }}</a>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveUserWithdrawNewlog.table.bankAccount')" align="center" prop="bankAccount" min-width="180px" >
        <template v-slot="{row}">
          <a style="color: #00afff" @click="copyColumn(row.bankAccount)">{{ row.bankAccount }}</a>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveUserWithdrawNewlog.table.bankName')" min-width="120" align="center" prop="bankName">
        <template v-slot="{row}">
          <a style="color: #00afff" @click="copyColumn(row.bankAddress)">{{ row.bankAddress }}</a>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveUserWithdrawNewlog.table.cardBlack')" align="center" min-width="110" prop="cardBlack" >
      <template v-slot="{row}">
        <span style="color: #ff0026" v-if="row.cardBlack == 1">{{ row.realBankAddress }}</span>
        <span v-if="row.cardBlack == 0">{{ row.realBankAddress }}</span>
      </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveUserWithdrawNewlog.table.wstatus')" min-width="120" align="center" prop="wstatus">
        <template slot-scope="scope">
          <span :style="{color: (wstatus = statusOptions[parseInt(scope.row.wstatus)]).color}">{{ wstatus.dictLabel }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveUserWithdrawNewlog.table.createTime')" width="120" align="center" prop="createTime"/>
      <el-table-column :label="$t('liveWeb.liveUserWithdrawNewlog.table.updateTime')" width="160" align="center" prop="updateTime"/>
      <el-table-column :label="$t('liveWeb.liveUserWithdrawNewlog.table.opName')" align="center" prop="opName" min-width="100"/>
      <el-table-column :label="$t('liveWeb.liveUserWithdrawNewlog.table.remark')" align="center" min-width="200px" prop="remark" />
      <el-table-column :label="$t('liveWeb.liveUserWithdrawNewlog.table.orderNo')" align="center" prop="orderNo"  min-width="180px"/>
      <el-table-column :label="$t('liveWeb.liveUserWithdrawNewlog.table.type')" align="center" prop="type" :formatter="formatterLiveType" min-width="80px" />
      <el-table-column :label="$t('liveWeb.liveUserWithdrawNewlog.table.operation')" min-width="350" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="success"
            plain
            icon="el-icon-check"
            v-show="scope.row.wstatus == 1"
            @click="handleFinalAudit(scope.row)"
            v-hasPermi="['live-web:liveUserWithdrawNewlog:finalAudit']"
          >{{$t('liveWeb.liveUserWithdrawNewlog.table.finalAuditButton')}}
          </el-button>
          <el-button
            size="small"
            type="info"
            plain
            icon="el-icon-refresh-right"
            v-show="scope.row.wstatus == 3 || scope.row.wstatus == 2"
            @click="handleRecoverAudit(scope.row)"
            v-hasPermi="['live-web:liveUserWithdrawNewlog:recoverAudit']"
          >{{$t('liveWeb.liveUserWithdrawNewlog.table.recoverAuditButton')}}
          </el-button>
          <el-button
            size="small"
            type="primary"
            plain
            v-show="scope.row.wstatus == 4"
            icon="el-icon-unlock"
            @click="handleUnlock(scope.row)"
            v-has-permi="['live-web:liveUserWithdrawNewlog:unlock']"
          >{{$t('liveWeb.liveUserWithdrawNewlog.table.unlockButton')}}
          </el-button>
          <el-button
            size="small"
            type="success"
            plain
            v-show="scope.row.wstatus == 3 "
            icon="el-icon-circle-check"
            @click="handleArtificialWithdraw(scope.row)"
            v-has-permi="['live-web:liveUserWithdrawNewlog:artificial']"
          >{{$t('liveWeb.liveUserWithdrawNewlog.table.artificialWithdrawButton')}}
          </el-button>
          <el-button
            size="small"
            type="danger"
            plain
            v-show="scope.row.wstatus == 1 "
            icon="el-icon-circle-close"
            @click="handleRefused(scope.row)"
            v-has-permi="['live-web:liveUserWithdrawNewlog:refused']"
          >{{$t('liveWeb.liveUserWithdrawNewlog.table.refusedButton')}}
          </el-button>
          <el-button
            size="small"
            type="success"
            plain
            v-show="scope.row.wstatus == 4 "
            icon="el-icon-check"
            @click="handleWithdrawSucc(scope.row)"
            v-has-permi="['live-web:liveUserWithdrawNewlog:withdrawSucc']"
          >{{$t('liveWeb.liveUserWithdrawNewlog.table.withdrawSuccButton')}}
          </el-button>
          <el-button
            size="small"
            type="primary"
            plain
            v-show="scope.row.wstatus !=5  && scope.row.wstatus != 6"
            icon="el-icon-refresh-right"
            @click="handleUpdateOrder(scope.row)"
            v-has-permi="['live-web:liveUserWithdrawNewlog:updateOrder']"
          >{{$t('liveWeb.liveUserWithdrawNewlog.table.updateOrderButton')}}
          </el-button>
          <el-button
            size="small"
            type="danger"
            plain
            v-show="scope.row.wstatus == 4 "
            icon="el-icon-refresh-right"
            @click="handleWithdrawRefused(scope.row)"
            v-has-permi="['live-web:liveUserWithdrawNewlog:withdrawRefused']"
          >{{$t('liveWeb.liveUserWithdrawNewlog.table.withdrawRefusedButton')}}
          </el-button>
          <el-button
            size="small"
            type="success"
            plain
            icon="el-icon-check"
            v-show="scope.row.wstatus == 1 "
            @click="updateWithdrawMoney(scope.row)"
            v-has-permi="['live-web:liveUserWithdrawNewlog:modifyMoney']"
          >{{$t('liveWeb.liveUserWithdrawNewlog.table.withdrawMoneyButton')}}
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
        <el-form-item :label="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.userIdLabel')" prop="userId">
          <el-input v-model="form.userId" :placeholder="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.userIdPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.nickNameLabel')" prop="nickName">
          <el-input v-model="form.nickName" :placeholder="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.nickNamePlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.orderNoLabel')" prop="orderNo">
          <el-input v-model="form.orderNo" :placeholder="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.orderNoPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.orderExpressionLabel')" prop="orderExpression">
          <el-input v-model="form.orderExpression" :placeholder="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.orderExpressionPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.withdrawMoneyLabel')" prop="withdrawMoney">
          <el-input v-model="form.withdrawMoney" :placeholder="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.withdrawMoneyPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.bankUserNameLabel')" prop="bankUserName">
          <el-input v-model="form.bankUserName" :placeholder="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.bankUserNamePlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.bankAccountLabel')" prop="bankAccount">
          <el-input v-model="form.bankAccount" :placeholder="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.bankAccountPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.bankAddressLabel')" prop="bankAddress">
          <el-input v-model="form.bankAddress" :placeholder="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.bankAddressPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.bankTypeIdLabel')" prop="bankTypeId">
          <el-input v-model="form.bankTypeId" :placeholder="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.bankTypeIdPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.wstatusLabel')">
          <el-radio-group v-model="form.wstatus">
            <el-radio label="1">{{$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.wstatusValuePlaceholder')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.typeLabel')" prop="type">
          <el-select v-model="form.type" :placeholder="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.typePlaceholder')">
            <el-option :label="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.typeValuePlaceholder')" value="" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.opNameLabel')" prop="opName">
          <el-input v-model="form.opName" :placeholder="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.opNamePlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.remarkLabel')" prop="remark">
          <el-input v-model="form.remark" :placeholder="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.remarkPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.livetimeLabel')" prop="livetime">
          <el-input v-model="form.livetime" :placeholder="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.livetimePlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.liveticketLabel')" prop="liveticket">
          <el-input v-model="form.liveticket" :placeholder="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.liveticketPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.livepaijiangLabel')" prop="livepaijiang">
          <el-input v-model="form.livepaijiang" :placeholder="$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.livepaijiangPlaceholder')" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.confirmButton')}}</el-button>
        <el-button @click="cancel">{{$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.cancelButton')}}</el-button>
      </div>
    </el-dialog>
    <!-- 修改提现金额 -->
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :title="$t('liveWeb.liveUserWithdrawNewlog.editCashWithdrawalAmountDialog.title')"
      :visible.sync="peopledeposit"
      width="500px"
      append-to-body
    >
      <el-form ref="formdeposit" :model="formdeposit" :rules="formdepositRules" label-width="120px">

        <el-form-item :label="$t('liveWeb.liveUserWithdrawNewlog.editCashWithdrawalAmountDialog.withdrawMoneyLabel')" prop="withdrawMoney">
          <el-input type="number" :placeholder="$t('liveWeb.liveUserWithdrawNewlog.editCashWithdrawalAmountDialog.withdrawMoneyPlaceholder')" v-model="formdeposit.withdrawMoney" class="no-number"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUserWithdrawNewlog.editCashWithdrawalAmountDialog.googleAuthCodeLabel')" prop="googleAuthCode">
          <el-input v-model="formdeposit.googleAuthCode" type="number" :placeholder="$t('liveWeb.liveUserWithdrawNewlog.editCashWithdrawalAmountDialog.googleAuthCodePlaceholder')"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitDeposit">{{$t('liveWeb.liveUserWithdrawNewlog.editCashWithdrawalAmountDialog.submitButton')}}</el-button>
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
      withdrawTypes: [
        {labelName: this.$t('liveWeb.liveUserWithdrawNewlog.queryForm.wstatus0'),labelValue: 0},
        {labelName: this.$t('liveWeb.liveUserWithdrawNewlog.queryForm.wstatus1'),labelValue: 1},
        {labelName: this.$t('liveWeb.liveUserWithdrawNewlog.queryForm.wstatus2'),labelValue: 2},
        {labelName: this.$t('liveWeb.liveUserWithdrawNewlog.queryForm.wstatus3'),labelValue: 3},
        {labelName: this.$t('liveWeb.liveUserWithdrawNewlog.queryForm.wstatus4'),labelValue: 4},
        {labelName: this.$t('liveWeb.liveUserWithdrawNewlog.queryForm.wstatus5'),labelValue: 5}],
      liveWithdrawType: [
        {labelName: this.$t('liveWeb.liveUserWithdrawNewlog.queryForm.type1'),labelValue: 1},
        {labelName: this.$t('liveWeb.liveUserWithdrawNewlog.queryForm.type2'),labelValue: 2}],
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
          { required: true, message: this.$t('liveWeb.liveUserWithdrawNewlog.editCashWithdrawalAmountDialog.validations.withdrawMoney'), trigger: "blur" }
        ],
        googleAuthCode: [
          {required: true, message: this.$t('liveWeb.liveUserWithdrawNewlog.editCashWithdrawalAmountDialog.validations.googleAuthCode'), trigger: 'blur'}
        ]
      },
      // 表单校验
      rules: {
        userId: [
          { required: true, message: this.$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.validations.userId'), trigger: "blur" }
        ],
        orderNo: [
          { required: true, message: this.$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.validations.userId'), trigger: "blur" }
        ],
        orderExpression: [
          { required: true, message: this.$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.validations.orderExpression'), trigger: "blur" }
        ],
        withdrawMoney: [
          { required: true, message: this.$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.validations.withdrawMoney'), trigger: "blur" }
        ],
        googleAuthCode: [
          {required: true, message: this.$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.validations.googleAuthCode'), trigger: 'blur'}
        ],
        bankUserName: [
          { required: true, message: this.$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.validations.bankUserName'), trigger: "blur" }
        ],
        bankAccount: [
          { required: true, message: this.$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.validations.bankAccount'), trigger: "blur" }
        ],
        bankTypeId: [
          { required: true, message: this.$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.validations.bankTypeId'), trigger: "blur" }
        ],
        wstatus: [
          { required: true, message: this.$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.validations.wstatus'), trigger: "blur" }
        ],
        type: [
          { required: true, message: this.$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.validations.type'), trigger: "change" }
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
        this.msgError(this.$t('liveWeb.liveUserWithdrawNewlog.messageBox.fixIdsError'))
        return
      }
      this.$confirm(this.$t('liveWeb.liveUserWithdrawNewlog.confirmFixIdsDialog.message'), this.$t('liveWeb.liveUserWithdrawNewlog.confirmFixIdsDialog.title'), {
        confirmButtonText: this.$t('liveWeb.liveUserWithdrawNewlog.confirmFixIdsDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveUserWithdrawNewlog.confirmFixIdsDialog.cancelButton'),
        type: 'warning'
      }).then(function() {
        return fixOrder(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess(this.$t('liveWeb.liveUserWithdrawNewlog.messageBox.fixIdsSuccess'))
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
        message: this.$t('liveWeb.liveUserWithdrawNewlog.messageBox.copySuccess'),
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
      this.title = this.$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.addTitle');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLiveUserWithdrawNewlog(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = this.$t('liveWeb.liveUserWithdrawNewlog.addEditHostsWithdrawalManagementDialog.editTitle');
      });
    },

    /** 提交按钮 */
    submitDeposit() {
      this.$refs["formdeposit"].validate(valid => {
        if (valid) {
          modifyMoney(this.formdeposit).then(response => {
              this.msgSuccess(this.$t('liveWeb.liveUserWithdrawNewlog.messageBox.submitDepositSuccess'));
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
      this.$prompt(null, this.$t('liveWeb.liveUserWithdrawNewlog.confirmRefusedPrompt.title'), {
        confirmButtonText: this.$t('liveWeb.liveUserWithdrawNewlog.confirmRefusedPrompt.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveUserWithdrawNewlog.confirmRefusedPrompt.cancelButton')
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
      this.$prompt(null, this.$t('liveWeb.liveUserWithdrawNewlog.confirmWithdrawRefusedPrompt.title'), {
        confirmButtonText: this.$t('liveWeb.liveUserWithdrawNewlog.confirmWithdrawRefusedPrompt.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveUserWithdrawNewlog.confirmWithdrawRefusedPrompt.cancelButton')
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
              this.msgSuccess(this.$t('liveWeb.liveUserWithdrawNewlog.messageBox.updateLiveUserWithdrawNewlogSuccees'));
              this.open = false;
              this.getList();
            });
          } else {
            addLiveUserWithdrawNewlog(this.form).then(response => {
              this.msgSuccess(this.$t('liveWeb.liveUserWithdrawNewlog.messageBox.addLiveUserWithdrawNewlogSuccess'));
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

      this.$confirm(this.$t('liveWeb.liveUserWithdrawNewlog.confirmDeleteDialog.message', {ids: ids}), this.$t('liveWeb.liveUserWithdrawNewlog.confirmDeleteDialog.title'), {
        confirmButtonText: this.$t('liveWeb.liveUserWithdrawNewlog.confirmDeleteDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveUserWithdrawNewlog.confirmDeleteDialog.cancelButton'),
        type: "warning"
      }).then(function() {
        return delLiveUserWithdrawNewlog(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess(this.$t('liveWeb.liveUserWithdrawNewlog.messageBox.deleteSuccess'));
      }).catch(() => {
	  })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm(this.$t('liveWeb.liveUserWithdrawNewlog.confirmExportDialog.message'), this.$t('liveWeb.liveUserWithdrawNewlog.confirmExportDialog.title'), {
        confirmButtonText: this.$t('liveWeb.liveUserWithdrawNewlog.confirmExportDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveUserWithdrawNewlog.confirmExportDialog.cancelButton'),
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
