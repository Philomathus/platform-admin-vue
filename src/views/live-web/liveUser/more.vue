<template>
  <!-- 导入表 -->
  <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="visible" width="800px" top="5vh" append-to-body>
    <!--顶部按钮-->
    <div class="page-tab" style="margin-bottom: 10px">
      <button type="button" class="el-button el-button--primary el-button--mini is-plain" @click="change(1, $t('liveWeb.liveUserMore.tab1.title'))">
        <span>{{$t('liveWeb.liveUserMore.tab1.title')}}</span></button>
<!--      <button type="button" class="el-button el-button&#45;&#45;primary el-button&#45;&#45;mini is-plain" @click="change(2,'账户日志')">
        <span>账户日志</span>
      </button>-->
      <button type="button" class="el-button el-button--primary el-button--mini is-plain" @click="change(3, $t('liveWeb.liveUserMore.tab3.title'))">
        <span>{{$t('liveWeb.liveUserMore.tab3.title')}}</span></button>
      <button type="button" class="el-button el-button--primary el-button--mini is-plain" @click="change(5, $t('liveWeb.liveUserMore.tab5.title'))">
        <span>{{$t('liveWeb.liveUserMore.tab5.title')}}</span></button>
      <button type="button" class="el-button el-button--primary el-button--mini is-plain" @click="change(6, $t('liveWeb.liveUserMore.tab6.title'))">
        <span>{{$t('liveWeb.liveUserMore.tab6.title')}}</span></button>
<!--      <button type="button" class="el-button el-button&#45;&#45;success el-button&#45;&#45;mini is-plain" @click="change(4,'加入家族')">
        <span>加入家族</span></button>-->
      <button type="button" class="el-button el-button--primary el-button--mini is-plain" @click="change(7, $t('liveWeb.liveUserMore.tab7.title'))">
        <span>{{$t('liveWeb.liveUserMore.tab7.title')}}</span></button>
      <button type="button" class="el-button el-button--primary el-button--mini is-plain" @click="change(8, $t('liveWeb.liveUserMore.tab8.title'))">
        <span>{{$t('liveWeb.liveUserMore.tab8.title')}}</span></button>
      <button type="button" class="el-button el-button--primary el-button--mini is-plain" @click="change(9, $t('liveWeb.liveUserMore.tab9.title'))">
        <span>{{$t('liveWeb.liveUserMore.tab9.title')}}</span></button>
      <button type="button" class="el-button el-button--primary el-button--mini is-plain" @click="change(10, $t('liveWeb.liveUserMore.tab9.passTitle'))">
        <span>{{$t('liveWeb.liveUserMore.tab9.passTitle')}}</span></button>
    </div>
    <!--聊天室记录-->
    <el-row v-if="index===1">
      <el-form :model="queryParams" ref="queryForm" :inline="true" inline="inline">
        <el-form-item :label="$t('liveWeb.liveUserMore.tab1.queryForm.selectDateLabel')" prop="selectDate">
          <el-date-picker type="daterange" v-model="queryParams.selectDate" format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd" :style="{width: '60%'}" :start-placeholder="$t('liveWeb.liveUserMore.tab1.queryForm.selectDateStartPlaceholder')"
                          :end-placeholder="$t('liveWeb.liveUserMore.tab1.queryForm.selectDateEndPlaceholder')"
                          :range-separator="$t('liveWeb.liveUserMore.tab1.queryForm.selectDateRangeSeparator')" clearable></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('liveWeb.liveUserMore.tab1.queryForm.searchButton')}}</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('liveWeb.liveUserMore.tab1.queryForm.resetButton')}}</el-button>
        </el-form-item>
      </el-form>
      <el-table @row-click="clickRow" ref="table" :data="dbTableList" @selection-change="handleSelectionChange"
                height="260px">
        <el-table-column prop="poscatId" :label="$t('liveWeb.liveUserMore.tab1.table.postcatId')" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="poscatNickName" :label="$t('liveWeb.liveUserMore.tab1.table.poscatNickname')" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="fromPlatform" :label="$t('liveWeb.liveUserMore.tab1.table.fromPlatform')" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="userNickName" :label="$t('liveWeb.liveUserMore.tab1.table.userNickName')" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="type" :label="$t('liveWeb.liveUserMore.tab1.table.type')" :show-overflow-tooltip="true"
                         :formatter="formatterMsg"></el-table-column>
        <el-table-column prop="msg" :label="$t('liveWeb.liveUserMore.tab1.table.msg')" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="createTime" :label="$t('liveWeb.liveUserMore.tab1.table.createTime')" :show-overflow-tooltip="true"></el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"/>

      <!--adding close button here-->
      <el-button @click="visible = false" class="close-button">{{$t('liveWeb.liveUserMore.tab1.cancelButton')}}</el-button>
    </el-row>
    <!--账户日志-->
    <el-row v-if="index===2">
      <el-form :model="queryParams" ref="queryForm" :inline="true">
        <el-form-item label="状态" prop="accountType">
          <el-select v-model="queryParams.accountType" placeholder="请选择状态" clearable size="small">
            <el-option v-for="(item,index) in accountTypeList" :key="index" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table @row-click="clickRow" ref="table" :data="dbTableList" @selection-change="handleSelectionChange"
                height="260px">
<!--        <el-table-column type="selection" width="55"></el-table-column>-->
        <el-table-column prop="id" label="编号" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="propName" label="主播ID" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="puserId" label="用户ID" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="totalDiamonds" label="日志信息" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="createDate" label="日志时间" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="num" label="钻石数" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="num" label="印票数" :show-overflow-tooltip="true"></el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </el-row>

    <!--银行卡-->
    <el-row v-if="index===7">
        <el-table @row-click="clickRow" ref="table" :data="liveBankList">
        <el-table-column prop="id" v-if="index===100"/>
        <el-table-column prop="realName" :label="$t('liveWeb.liveUserMore.tab7.realName')" :show-overflow-tooltip="true" min-width="80" align="center">
          <template v-slot="{row}" v-if="index===7">
            <el-input v-model.trim="row.realName"></el-input>
          </template>
          </el-table-column>
        <el-table-column prop="bankAccount" :label="$t('liveWeb.liveUserMore.tab7.bankAccount')" :show-overflow-tooltip="true" min-width="150" align="center">
          <template v-slot="{row}" v-if="index===7">
            <el-input v-model.trim="row.bankAccount"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="bankName" :label="$t('liveWeb.liveUserMore.tab7.bankName')"  min-width="80" align="center">
          <template v-slot="{row}" v-if="index===7">
            <el-select
            filterable
            v-model="row.bankName"
            placeholder=""
            clearable
            size="small"
            style="min-width: 120px"
          >
            <el-option
              v-for="dict in banklists"
              :key="dict.id"
              :label="dict.bankName"
              :value="dict.bankName"
            />
          </el-select>
          </template>
        </el-table-column>
        <el-table-column :label="$t('liveWeb.liveUserMore.tab7.operation')" min-width="90" align="center">
          <template v-slot="{row}"  v-if="index===7">
            <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(row)"
            >{{$t('liveWeb.liveUserMore.tab7.editButton')}}
            </el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(row)"
            >{{$t('liveWeb.liveUserMore.tab7.deleteButton')}}
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
<!--adding close button here-->
      <el-button @click="visible = false" class="close-button">{{$t('liveWeb.liveUserMore.tab7.cancelButton')}}</el-button>
    </el-row>

    <!--收礼物日志-->
    <el-row v-if="index===3">
      <el-form :model="queryParams" ref="queryForm" :inline="true">
        <el-form-item :label="$t('liveWeb.liveUserMore.tab3.queryForm.selectDateLabel')" prop="selectDate">
          <el-date-picker type="daterange" v-model="queryParams.selectDate" format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd" :style="{width: '60%'}" :start-placeholder="$t('liveWeb.liveUserMore.tab3.queryForm.selectDateStartPlaceholder')"
                          :end-placeholder="$t('liveWeb.liveUserMore.tab3.queryForm.selectDateEndPlaceholder')"
                          :range-separator="$t('liveWeb.liveUserMore.tab3.queryForm.selectDateRangeSeparator')" clearable></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUserMore.tab3.queryForm.giftNameLabel')" prop="giftName">
          <el-input
            v-model="queryParams.giftName"
            :placeholder="$t('liveWeb.liveUserMore.tab3.queryForm.giftNamePlaceholder')"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('liveWeb.liveUserMore.tab3.queryForm.searchButton')}}</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('liveWeb.liveUserMore.tab3.queryForm.resetButton')}}</el-button>
        </el-form-item>
      </el-form>
      <el-table @row-click="clickRow" ref="table" :data="dbTableList" @selection-change="handleSelectionChange"
                height="260px">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="propId" :label="$t('liveWeb.liveUserMore.tab3.table.propId')" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="propName" :label="$t('liveWeb.liveUserMore.tab3.table.propName')" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="perUserId" :label="$t('liveWeb.liveUserMore.tab3.table.perUserId')" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="totalDiamonds" :label="$t('liveWeb.liveUserMore.tab3.table.totalDiamonds')" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="createDate" :label="$t('liveWeb.liveUserMore.tab3.table.createDate')" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="num" :label="$t('liveWeb.liveUserMore.tab3.table.num')" :show-overflow-tooltip="true"></el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"/>

      <el-button @click="visible = false" style="float: right;margin-top: 35px">{{$t('liveWeb.liveUserMore.tab3.cancelButton')}}</el-button>
    </el-row>

    <!--提现比例-->
    <el-row v-if="index===5">
      <el-form :model="liveUserRate" ref="liveUserRate" :inline="false" :rules="RateRules">
        <el-form-item :label="$t('liveWeb.liveUserMore.tab5.coinLabel')" prop="coin">
          <el-input v-model="liveUserRate.coin" type="number" class="no-number"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUserMore.tab5.weixinPriceLabel')" prop="weixinPrice">
          <el-input v-model="liveUserRate.weixinPrice" type="number" class="no-number"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUserMore.tab5.weiboMoneyLabel')" prop="weiboMoney">
          <el-input v-model="liveUserRate.weiboMoney" type="number" class="no-number"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUserMore.tab5.xpointLabel')" prop="xpoint">
          <el-input v-model="liveUserRate.xpoint" type="number" class="no-number"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUserMore.tab5.ypointLabel')" prop="ypoint">
          <el-input v-model="liveUserRate.ypoint" type="number" class="no-number"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUserMore.tab5.qqIdLabel')" prop="qqId" class="no-number">
          <el-time-picker
            arrow-control
            v-model="liveUserRate.qqId"
            value-format="HH:mm:ss"
            :placeholder="$t('liveWeb.liveUserMore.tab5.qqIdPlaceholder')">
          </el-time-picker>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUserMore.tab5.qqTokenLabel')" prop="qqToken" class="no-number">
          <el-time-picker
            arrow-control
            v-model="liveUserRate.qqToken"
            value-format="HH:mm:ss"
            :placeholder="$t('liveWeb.liveUserMore.tab5.qqTokenPlaceholder')">
          </el-time-picker>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editRate">{{$t('liveWeb.liveUserMore.tab5.confirmButton')}}</el-button>
          <el-button @click="visible = false">{{$t('liveWeb.liveUserMore.tab5.cancelButton')}}</el-button>
        </el-form-item>
      </el-form>
    </el-row>

    <!--重置手机号 reset phone number-->
    <el-row v-if="index===6">
      <el-form ref="mobileForm"  label-width="110px" :model="mobileForm" :rules="mobileRules">

<!-- mobile hide and display full number -->
        <el-form-item :label="$t('liveWeb.liveUserMore.tab6.mobileLabel')" prop="mobile">
          <el-input v-model="mobileForm.mobile" :placeholder="$t('liveWeb.liveUserMore.tab6.mobilePlaceholder')" style="width: 78%" readonly/>
          <el-button type="primary" style="float: right" @click="liveUserFullMobile()">{{$t('liveWeb.liveUserMore.tab6.viewMobileButton')}}</el-button>
        </el-form-item>

<!--   change mobile number add new mobile number -->
        <el-form-item :label="$t('liveWeb.liveUserMore.tab6.newMobileLabel')" prop="newMobile">
          <el-input v-model="mobileForm.newMobile" :placeholder="$t('liveWeb.liveUserMore.tab6.newMobilePlaceholder')"/>
        </el-form-item>


        <el-form-item :label="$t('liveWeb.liveUserMore.tab6.googleAuthCodeLabel')" prop="googleAuthCode">
          <el-input v-model="mobileForm.googleAuthCode" :placeholder="$t('liveWeb.liveUserMore.tab6.googleAuthCodePlaceholder')"/>
        </el-form-item>
        <el-form-item class="edit-close-btn">
          <el-button type="primary" @click="updateMobile()" >{{$t('liveWeb.liveUserMore.tab6.confirmButton')}}</el-button>
          <el-button @click="visible = false">{{$t('liveWeb.liveUserMore.tab6.cancelButton')}}</el-button>
        </el-form-item>
      </el-form>

    </el-row>

    <!--重置提现密码-->
    <el-row v-if="index===9">
      <el-form ref="paypasswordForm" :model="paypasswordForm" :rules="paypasswordRules" label-width="110px">
        <el-form-item :label="$t('liveWeb.liveUserMore.tab9.passwordLabel')" prop="password">
          <el-input v-model="form.payPassword" :placeholder="$t('liveWeb.liveUserMore.tab9.passwordPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUserMore.tab9.googleAuthCodeLabel')" prop="googleAuthCode">
          <el-input v-model="form.googleAuthCode" :placeholder="$t('liveWeb.liveUserMore.tab9.googleAuthCodePlaceholder')"/>
        </el-form-item>
        <el-form-item class="edit-close-btn">
          <el-button type="primary"
                     @click="handlePaypassword()"
                     v-has-permi="['admin:liveUser:reset']">{{$t('liveWeb.liveUserMore.tab9.confirmButton')}}
          </el-button>
          <el-button @click="visible = false">{{$t('liveWeb.liveUserMore.tab9.cancelButton')}}</el-button>
        </el-form-item>
      </el-form>
    </el-row>

    <!--密码-->
    <!--TODO: CHANGE AND ADD FIELDS -->
    <el-row v-if="index===10">
      <el-form ref="passwordForm" :model="password" :rules="passwordRules" label-width="110px">
        <el-form-item :label="$t('liveWeb.liveUserMore.tab9.passwordLabel')" prop="password">
          <el-input v-model="form.password" :placeholder="$t('liveWeb.liveUserMore.tab9.passwordPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUserMore.tab9.googleAuthCodeLabel')" prop="googleAuthCode">
          <el-input v-model="form.googleAuthCode" :placeholder="$t('liveWeb.liveUserMore.tab9.googleAuthCodePlaceholder')"/>
        </el-form-item>
        <el-form-item class="edit-close-btn">
          <el-button type="primary"
                     @click="handleLivePassword()"
                     v-has-permi="['admin:liveUser:reset']">{{$t('liveWeb.liveUserMore.tab9.confirmButton')}}
          </el-button>
          <el-button @click="visible = false">{{$t('liveWeb.liveUserMore.tab9.cancelButton')}}</el-button>
        </el-form-item>
      </el-form>
    </el-row>

<!--    <div slot="footer" class="dialog-footer" v-if="index!==5">
      <el-button type="primary" @click="handleImportTable">确 定</el-button>
      <el-button @click="visible = false">取 消</el-button>
    </div>-->
  </el-dialog>
</template>

<script>
    import {listDbTable, importTable} from "@/api/platform-web/tool/gen";
    import {
      goFamiily,
      updateTicket,
      chatPage,
      receiveProplist,
      logPage,
      banks,
      updateLiveUser,
      getLiveUser,
      updateMobile,
      getLiveUserBank,
      updateLiveUserBank,
      delLiveUserBank,
      resetPaypassword,
      liveFullMobile, resetLivePassword
    } from "@/api/live-web/liveUser";
    import {checkTwoLogin} from "@/utils/permission";

    export default {
        props: {
/*            userId: {
                required: false,
                default: 0,
            },*/
        },
        data() {
            return {
              //数据结构
              detailsList: {},
              //银行卡
              banklists: [],
              userId : null,
              //弹出框标题
              title: '积分明细',
              // 提现比例
              liveUserRate: {coin: 0,xpoint: 0,ypoint: 0,weixinPrice:0,weiboMoney:0,qqId:'00:00:00',qqToken:'23:59:59'},
                //页面编码
                index: 1,
/*                //用户id
                userId: undefined,*/
                // 遮罩层
                visible: false,
              mobileForm: {},
              paypasswordForm: {},
              password:{},
              // 重置提现密码表单校验
              paypasswordRules: {
                payPassword: [
                  {required: true, message: this.$t('liveWeb.liveUserMore.tab9.validations.payPassword'), trigger: 'blur'},
                  {max: 30, message: this.$t('liveWeb.liveUserMore.tab9.validations.payPasswordMax')}
                ],
              },

              passwordRules: {
                payPassword: [
                  {required: true, message: this.$t('liveWeb.liveUserMore.tab9.validations.payPassword'), trigger: 'blur'},
                  {max: 6, message: this.$t('liveWeb.liveUserMore.tab9.validations.payPasswordMax')},
                  {min: 6, message: this.$t('liveWeb.liveUserMore.tab9.validations.payPasswordMax')}
                ],
              },

              //手机号校验规则
              mobileRules: {
                mobile: [
                  {required: true, message: this.$t('liveWeb.liveUserMore.tab6.validations.mobile'), trigger: 'blur'}
                ],
                newMobile: [
                  {required: true, message: this.$t('liveWeb.liveUserMore.tab6.validations.newMobile'), trigger: 'blur'}
                ],
                googleAuthCode: [
                  {required: true, message: this.$t('liveWeb.liveUserMore.tab6.validations.googleAuthCode'), trigger: 'blur'}
                ],
              },
              //提现比例校验规则
              RateRules: {
                coin: [
                  {required: true, message: this.$t('liveWeb.liveUserMore.tab5.validations.coin'), trigger: 'blur'}
                ],
                weixinPrice: [
                  {required: true, message: this.$t('liveWeb.liveUserMore.tab5.validations.weixinPrice'), trigger: 'blur'}
                ],
                weiboMoney: [
                  {required: true, message: this.$t('liveWeb.liveUserMore.tab5.validations.weiboMoney'), trigger: 'blur'}
                ],
                qqId: [
                  {required: true, message: this.$t('liveWeb.liveUserMore.tab5.validations.qqId'), trigger: 'blur'}
                ],
                qqToken: [
                  {required: true, message: this.$t('liveWeb.liveUserMore.tab5.validations.qqToken'), trigger: 'blur'}
                ],
                xpoint: [
                  {required: true, message: this.$t('liveWeb.liveUserMore.tab5.validations.xpoint'), trigger: 'blur'}
                ],
                ypoint: [
                  {required: true, message: this.$t('liveWeb.liveUserMore.tab5.validations.ypoint'), trigger: 'blur'}
                ],
              },
              //银行卡校验规则
              BankCardrules: {
                realName: [
                  {required: true, message: '真实姓名不能为空', trigger: 'blur'}
                ],
                bankAccount: [
                  {required: true, message: '银行卡号不能为空', trigger: 'blur'}
                ],
                bankAddress: [
                  {required: true, message: '银行地址不能为空', trigger: 'blur'}
                ],
              },
              //修改银行卡表格
              UpdateBankForm: {},
                // 选中数组值
                tables: [],
                //账户类型
                accountTypeList: [{label: '充值',value: 0}, {label: '提现',value: 1}, {label: '赠送道具',value: 2}, {label: '兑换印票',value: 3}, {label: '分享获得印票',value: 4}, {label: '登录赠送积分',value: 5}, {label: '观看付费直播',value: 6}, {label: '游戏',value: 7}],
                //加分提交的数据
                form: {
                    beatNum: '',
                    googleAuthCode: '',
                    id: '',
                    mk: '',
                    moneydes: '',
                    ordermk: '',
                    score: ''
                },
                // 总条数
                total: 0,
                //表格
                openBank: null,
                // 表数据
                dbTableList: [],
                liveBankList: [],
                // 查询参数
                queryParams: {
                    selectDate: undefined,//选择日期
                    giftName: undefined,//礼物名称
                    accountType: undefined,//账户类型
                    pageNum: 1,
                    pageSize: 10,
                    tableName: undefined,
                    tableComment: undefined
                }
            };
        },
        methods: {
          updateMobile(){
            var that = this;
            this.$refs['mobileForm'].validate(valid => {
              if (valid) {
                this.mobileForm.userId = this.userId + ''
                updateMobile(this.mobileForm).then((res) => {
                  that.$notify.success(this.$t('liveWeb.liveUserMore.messageBox.updateMobileSuccess'))
                  that.visible = false
                  that.$emit('liveUserMore');
                })
              }
            })
          },

          /**  click to check full mobile number  */
          liveUserFullMobile() {
            if (checkTwoLogin()) {
                liveFullMobile(this.userId+'').then((res) => {
                this.mobileForm = res.data
                  if(!this.mobileForm.mobile){
                    this.$message.error(this.$t('liveWeb.liveUserMore.messageBox.liveUserFullMobileSuccess'));
                  }else{
                    this.$message.success(this.$t('liveWeb.liveUserMore.messageBox.liveUserFullMobileError'))
                  }
              })
            }
          },

            formatterMsg(row, column) {
                var type = row.type;
                if (type === 0) {
                    return this.$t('liveWeb.liveUserMore.tab1.table.type0');
                } else {
                    return this.$t('liveWeb.liveUserMore.tab1.table.type1');
                }
            },
            //银行卡类型格式化
            formatterBankType(row, column) {
                switch (column.type) {
                    case 1:
                        return '银行卡转账';
                        break;
                }
                return '未知';
            },
            //切换页面
            change(index, title) {
                this.index = index
                this.title = title
                //切换页面重置数据
                this.reset()
                var hint = '';
                switch (index) {
                    case 4 :
                        hint = this.$t('liveWeb.liveUserMore.inputPrompt.familyIdMessage')
                        this.open(hint, 2);
                        break;
                    case 8 :
                        hint = this.$t('liveWeb.liveUserMore.inputPrompt.printedTicketMessage')
                        this.open(hint, 2);
                        break;
                }
                //其他的就是获取列表
                this.getList()
            },
            reset() {
                this.form = {
                    beatNum: '',
                    googleAuthCode: '',
                    id: '',
                    mk: '',
                    moneydes: '',
                    ordermk: '',
                    score: ''
                },
                    // 总条数
                    this.total = 0,
                    // 表数据
                    this.dbTableList = [],
                    // 查询参数
                    this.queryParams = {
                        selectDate: undefined,//选择日期
                        giftName: undefined,//礼物名称
                        pageNum: 1,
                        pageSize: 10,
                        tableName: undefined,
                        tableComment: undefined
                    }
            },
            //打开提示框,type为1是打开不用输信息的提示框,2为输信息的
            open(hint, type) {
                if (type === 1) {
                    this.$confirm(hint, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                } else if (type === 2){
                    this.$prompt(hint, this.$t('liveWeb.liveUserMore.inputPrompt.title'), {
                        confirmButtonText: this.$t('liveWeb.liveUserMore.inputPrompt.confirmButton'),
                        cancelButtonText: this.$t('liveWeb.liveUserMore.inputPrompt.cancelButton'),
                        inputPattern: /^(\-|\+)?\d+(\.\d+)?$/,
                        inputErrorMessage: this.$t('liveWeb.liveUserMore.inputPrompt.inputErrorMessage')
                    }).then(({value}) => {
                        if (this.index === 4) {
                            goFamiily({
                                familyId: value,
                                id: this.userId
                            }).then((res) => {
                                if (res.code === 200){
                                  this.$message.success('加入家族成功')
                                } else {
                                  this.$message.error(res.msg)
                                }
                            }).catch(() => {
                              this.$notify.error('加入家族失败')
                            })
                        } else if(this.index === 8){
                          updateTicket({
                            ticket: value,
                            id: this.userId
                          }).then((res) => {
                            if (res.code === 200){
                              this.$message.success(res.msg)
                              this.$emit('refMemeberData')
                            } else if(res.code === 100) {
                              this.$message.error(res.msg)
                            }
                          }).catch(() => {
                            this.$notify.error(this.$t('liveWeb.liveUserMore.messageBox.updateTicketError'))
                          })
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消输入'
                        });
                    });
                }
            },

          /** 重置提现密码 */
          handlePaypassword() {
            this.$refs['paypasswordForm'].validate(valid => {
              if (valid) {
                this.resetPaypassword()
              }
            })
          },

          //重置提现密码提交接口
          resetPaypassword() {
            this.loading = true
            resetPaypassword({
              paypassword: this.form.payPassword,
              googleAuthCode: this.form.googleAuthCode,
              id: this.userId
            }).then((res) => {
              if (res.code === 0) {
                this.resetForm('paypasswordForm')
                this.visible = false
                this.$notify.success(res.msg)
                this.$emit('refMemeberData')
              }
            }).catch((error) => {
              this.$notify.error(error)
            }).finally(() => {
              this.loading = false
            })
          },

          handleLivePassword() {
            this.$refs['passwordForm'].validate(valid => {
              if (valid) {
                this.loading = true
                resetLivePassword({
                  password: this.form.password,
                  googleAuthCode: this.form.googleAuthCode,
                  id: this.userId
                }).then((res) => {
                  if (res.code === 0) {
                    this.resetForm('passwordForm')
                    this.visible = false
                    this.$notify.success(res.msg)
                    this.$emit('refMemeberData')
                  }
                }).catch((error) => {
                  this.$notify.error(error)
                }).finally(() => {
                  this.loading = false
                })
              }
            })
          },

            // 显示弹框
            show(userId,mobile) {
                this.userId = userId
                this.mobileForm.mobile = mobile
                this.getList();
                this.visible = true;
            },
            clickRow(row) {
                this.$refs.table.toggleRowSelection(row);
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.tables = selection.map(item => item.tableName);
            },
            // 查询表数据
            getList() {
                switch (this.index) {
                    case 1:
                        this.chatPage();
                        break;
                    case 2:
                        this.logPage();
                        break;
                    case 3:
                        this.receiveProplist()
                        break;
                    case 5:
                        this.queryRate()
                        break;
                    case 7:
                        this.queryBank()
                        break;
                }
            },
            //获取聊天记录列表
            chatPage() {
                var data = {
                    poscatId: this.userId,
                    pageNum: this.queryParams.pageNum,
                    pageSize: this.queryParams.pageSize,
                    _: new Date().getTime(),
                    sendStartTime: this.queryParams.selectDate===undefined ? undefined : this.queryParams.selectDate[0] +' 00:00:00',
                    sendEndTime: this.queryParams.selectDate===undefined ? undefined : this.queryParams.selectDate[1] +' 23:59:59',
                }
                chatPage(data).then((res) => {
                    if (res.code === 200) {
                        this.dbTableList = res.rows;
                        this.total = res.total;
                    }
                }).catch(() => {
                    this.$notify.error(this.$t('liveWeb.liveUserMore.messageBox.chatPageError'))
                });
            },
            //接受礼物日志
            receiveProplist() {
                var data = {
                    toUserId: this.userId,
                    pageNum: this.queryParams.pageNum,
                    pageSize: this.queryParams.pageSize,
                    _: new Date().getTime(),
                    orderByColumn: 'create_time',
                    isAsc: 'desc',
                    startTime: (this.queryParams.selectDate===undefined || this.queryParams.selectDate===null) ? undefined : this.queryParams.selectDate[0] +' 00:00:00',
                    endTime: (this.queryParams.selectDate===undefined || this.queryParams.selectDate===null) ? undefined : this.queryParams.selectDate[1] +' 23:59:59',
                    propName: this.queryParams.giftName,
                }
                receiveProplist(data).then((res) => {
                    if (res.code === 200) {
                        this.dbTableList = res.rows;
                        this.total = res.total;
                    }
                }).catch(() => {
                    this.$notify.error(this.$t('liveWeb.liveUserMore.messageBox.receiveProplistError'))
                });
            },
          //修改主播提现比例
            editRate() {
            if (this.liveUserRate.qqId==null || this.liveUserRate.qqId==''){
              this.liveUserRate.qqId='00:00:00';
            }
            if (this.liveUserRate.qqToken==null || this.liveUserRate.qqToken==''){
                this.liveUserRate.qqToken='23:59:59';
            }
            if (this.liveUserRate.qqId>this.liveUserRate.qqToken){
              this.$notify.warning(this.$t('liveWeb.liveUserMore.messageBox.editRateError'))
              return;
            }
              return updateLiveUser(this.liveUserRate).then((res) => {
                      this.$notify.success(this.$t('liveWeb.liveUserMore.messageBox.updateLiveUserSuccess'))
                    }).catch(() => {
                      this.$notify.success(this.$t('liveWeb.liveUserMore.messageBox.updateLiveUserError'))
                    });
            },
          //查询主播提现比例
          queryRate() {
            getLiveUser(this.userId).then(response => {
              this.liveUserRate = response.data
            })
          },
          //查询主播银行卡
          queryBank() {
            this.dbTableList = []
            getLiveUserBank(this.userId).then(response => {
                this.liveBankList = response.rows
                this.total = response.total;
            })
            //银行卡列表
            banks().then(response => {
              this.banklists = response.data
            })
          },

          //修改主播银行卡
          handleUpdate(row) {
          this.$confirm(this.$t('liveWeb.liveUserMore.tab7.confirmUpdateDialog.message'), this.$t('liveWeb.liveUserMore.tab7.confirmUpdateDialog.title'), {
            confirmButtonText: this.$t('liveWeb.liveUserMore.tab7.confirmUpdateDialog.confirmButton'),
            cancelButtonText: this.$t('liveWeb.liveUserMore.tab7.confirmUpdateDialog.cancelButton'),
            type: 'warning'
          }).then(() => {
            this.loading = true
            updateLiveUserBank(row).then(res => {
              this.msgSuccess(this.$t('liveWeb.liveUserMore.messageBox.updateLiveUserBankSuccess'));
              this.queryBank();
            }).catch(() => {
              this.$notify.error(this.$t('liveWeb.liveUserMore.messageBox.updateLiveUserBankError1'))
            }).finally(() => {
              this.loading = false
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('liveWeb.liveUserMore.messageBox.updateLiveUserBankError2')
            });
          });
        },
          /** 删除按钮操作 */
          handleDelete(row) {
            const bankAccount = row.bankAccount;
            this.$confirm(this.$t('liveWeb.liveUserMore.tab7.confirmDeleteDialog.message', {bankAccount: row.bankAccount}), this.$t('liveWeb.liveUserMore.tab7.confirmDeleteDialog.title'), {
              confirmButtonText: this.$t('liveWeb.liveUserMore.tab7.confirmDeleteDialog.confirmButton'),
              cancelButtonText: this.$t('liveWeb.liveUserMore.tab7.confirmDeleteDialog.cancelButton'),
              type: "warning"
            }).then(function () {
              return delLiveUserBank(bankAccount);
            }).then(() => {
              this.queryBank();
              this.msgSuccess(this.$t('liveWeb.liveUserMore.messageBox.deleteSuccess'));
            }).catch(() => {
              this.msgWarning(this.$t('liveWeb.liveUserMore.messageBox.deleteError'))
            });
          },
            //获取账户日志
            logPage(){
                logPage({podcastId: this.userId,
                    pageNum: this.queryParams.pageNum,
                    pageSize: this.queryParams.pageSize,
                    type: this.queryParams.accountType,
                    _: new Date().getTime()}).then((res) => {
                    if (res.code === 200) {
                        this.detailsList = res.rows;
                        this.total = res.total;
                    }
                }).catch(() => {
                    this.$notify.error(this.$t('liveWeb.liveUserMore.messageBox.logPageError'))
                });
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
            /** 导入按钮操作 */
            handleImportTable() {
                importTable({tables: this.tables.join(",")}).then(res => {
                    this.msgSuccess(res.msg);
                    if (res.code === 200) {
                        this.visible = false;
                        this.$emit("ok");
                    }
                });
            }
        }
    };
</script>


<style>
    .close-button{
      float: right;
      margin-top: 20px;
    }
    .edit-close-btn{
      float: right;
    }
</style>
