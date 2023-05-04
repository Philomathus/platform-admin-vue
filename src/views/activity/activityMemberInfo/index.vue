<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.inviterCode')" prop="inviterCode">
        <el-input
          v-model="queryParams.inviterCode"
          :placeholder="$t('activity.activityMemberInfo.tableDialog.inviterCodePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.loginIp')" prop="loginIp">
        <el-input
          v-model="queryParams.loginIp"
          :placeholder="$t('activity.activityMemberInfo.tableDialog.loginIpPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('global.selectDate')" prop="selectDate">
        <el-date-picker type="datetimerange" v-model="queryParams.selectDate" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '90%'}"
                        :start-placeholder="$t('global.selectDateStartPlaceholder')"
                        :end-placeholder="$t('global.selectDateEndPlaceholder')"
                        :range-separator="$t('global.selectDateRangeSeparator')"
                        clearable :default-time="['00:00:00', '23:59:59']" :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery"> {{
            $t('global.searchButton')
          }}
        </el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{
            $t('global.resetButton')
          }}
        </el-button>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQueryIp">{{
            $t('activity.ipDuplicateCheckButton')
          }}
        </el-button>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery(1)">{{
            $t('activity.mobilePhoneSerialNumberCheckButton')
          }}
        </el-button>
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
                v-hasPermi="['activity:activityMemberInfo:add']"
              >{{ $t('global.addButton') }}</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button
                type="success"
                plain
                icon="el-icon-edit"
                size="mini"
                :disabled="single"
                @click="handleUpdate"
                v-hasPermi="['activity:activityMemberInfo:edit']"
              >{{ $t('global.editButton') }}</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button
                type="danger"
                plain
                icon="el-icon-delete"
                size="mini"
                :disabled="multiple"
                @click="handleDelete"
                v-hasPermi="['activity:activityMemberInfo:remove']"
              >{{ $t('global.deleteButton') }}</el-button>
            </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['activity:activityMemberInfo:export']"
        >{{ $t('global.exportButton') }}
        </el-button>
        <el-button
          type="info"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handlePhone"
          v-hasPermi="['activity:activityMemberInfo:export']"
        >{{ $t('activity.displayMobilePhoneNumberButton') }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="activityMemberInfoList" @selection-change="handleSelectionChange">
      <!--      <el-table-column type="selection" width="55" align="center" />-->
      <el-table-column :label="$t('activity.activityMemberInfo.tableDialog.id')" align="center" prop="id"/>
      <el-table-column :label="$t('activity.activityMemberInfo.tableDialog.regTime')" align="center" prop="regTime"
                       width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.regTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('activity.activityMemberInfo.tableDialog.loginTime')" align="center" prop="loginTime"
                       width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.loginTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('activity.activityMemberInfo.tableDialog.phone')" align="center" prop="phone"/>
      <el-table-column :label="$t('activity.activityMemberInfo.tableDialog.loginIp')" align="center" prop="loginIp"/>
      <el-table-column :label="$t('activity.activityMemberInfo.tableDialog.vip')" align="center" prop="vip"/>
      <el-table-column :label="$t('activity.activityMemberInfo.tableDialog.inviterCode')" align="center"
                       prop="inviterCode"/>

      <!--      <el-table-column :label="会员编号" align="center" prop="memberCode" />
            <el-table-column :label="代理编号" align="center" prop="cxAgent" />
            <el-table-column :label="账号" align="center" prop="userName" />
            <el-table-column :label="姓名" align="center" prop="realName" />
            <el-table-column :label="状态(0= 禁用 1=正常 2=测试号3=超管号)" align="center" prop="status" />

            <el-table-column :label="余额" align="center" prop="totalAccount" />
            <el-table-column :label="邮箱" align="center" prop="email" />
            <el-table-column :label="密码" align="center" prop="password" />
            <el-table-column :label="是否在线(1是0否)" align="center" prop="isOnline" />
            <el-table-column :label="性别(1男0女)" align="center" prop="sex" />
            <el-table-column :label="注册ip" align="center" prop="registIp" />
            <el-table-column :label="登录地址" align="center" prop="loginAddress" />
            <el-table-column :label="登录设备(1 ios 2 android)" align="center" prop="loginDev" />
            <el-table-column :label="昵称" align="center" prop="nickName" />
            <el-table-column :label="生日" align="center" prop="birthDay" />
            <el-table-column :label="qq" align="center" prop="qq" />
            <el-table-column :label="微信" align="center" prop="wechat" />
            <el-table-column :label="头像" align="center" prop="headImg" />
            <el-table-column :label="在线时长" align="center" prop="onlineTime" />
            <el-table-column :label="股东网址" align="center" prop="linkUrl" />

            <el-table-column :label="保险箱余额" align="center" prop="boxAccount" />
            <el-table-column :label="保险箱密码" align="center" prop="boxPass" />
            <el-table-column :label="上次洗码时间" align="center" prop="cleanTime" width="180">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.cleanTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="总的充值金额" align="center" prop="levelIntegral" />
            <el-table-column :label="佣金" align="center" prop="inviteMoney" />
            <el-table-column :label="打码账户" align="center" prop="codeAccount" />
            <el-table-column :label="玩家所在游戏平台" align="center" prop="pid" />
            <el-table-column :label="累计有效投注" align="center" prop="codeTotal" />
            <el-table-column :label="渠道号" align="center" prop="channelcode" />
            <el-table-column :label="0=正常 1 =禁言" align="center" prop="speak" />
            <el-table-column :label="登陆次数" align="center" prop="loginNum" />
            <el-table-column :label="客户端版本号" align="center" prop="version" />
            <el-table-column :label="提现密码(md5加密)" align="center" prop="withdrawalPass" />
            <el-table-column :label="设备ID" align="center" prop="deviceId" />-->
      <!--      <el-table-column :label="操作" align="center" class-name="small-padding fixed-width">-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-button-->
      <!--            size="mini"-->
      <!--            type="text"-->
      <!--            icon="el-icon-edit"-->
      <!--            @click="handleUpdate(scope.row)"-->
      <!--            v-hasPermi="['activity:activityMemberInfo:edit']"-->
      <!--          >{{ $t('global.editButton') }}</el-button>-->
      <!--          <el-button-->
      <!--            size="mini"-->
      <!--            type="text"-->
      <!--            icon="el-icon-delete"-->
      <!--            @click="handleDelete(scope.row)"-->
      <!--            v-hasPermi="['activity:activityMemberInfo:remove']"-->
      <!--          >{{ $t('global.deleteButton') }}</el-button>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="ipOpen" width="500px"
               append-to-body>
      <h3>{{ $t('activity.activityMemberInfo.tableDialog.duplicateIpHeader') }}</h3>
      <div style="max-height: 600px; overflow-y: scroll">
        <el-table stripe v-loading="loading" :data="ipList" @selection-change="handleSelectionChange">
          <el-table-column :label="$t('activity.activityMemberInfo.tableDialog.inviterCode')" align="center"
                           prop="inviterCode"/>
          <el-table-column :label="$t('activity.activityMemberInfo.tableDialog.loginIp')" align="center"
                           prop="loginIp"/>
          <el-table-column :label="$t('activity.activityMemberInfo.tableDialog.count')" align="center" prop="count"/>
        </el-table>
      </div>
    </el-dialog>
    <!-- 添加或修改会员推广管理对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.memberCode')" prop="memberCode">
          <el-input v-model="form.memberCode"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.memberCodePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.cxAgent')" prop="cxAgent">
          <el-input v-model="form.cxAgent"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.cxAgentPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.userName')" prop="userName">
          <el-input v-model="form.userName"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.userNamePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.realName')" prop="realName">
          <el-input v-model="form.realName"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.realNamePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.status')">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">{{ $t('activity.activityMemberInfo.tableDialog.statusRadio') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.vip')" prop="vip">
          <el-input v-model="form.vip" :placeholder="$t('activity.activityMemberInfo.tableDialog.vipPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.totalAccount')" prop="totalAccount">
          <el-input v-model="form.totalAccount"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.totalAccountPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.phone')" prop="phone">
          <el-input v-model="form.phone" :placeholder="$t('activity.activityMemberInfo.tableDialog.phonePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.email')" prop="email">
          <el-input v-model="form.email" :placeholder="$t('activity.activityMemberInfo.tableDialog.emailPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.password')" prop="password">
          <el-input v-model="form.password"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.passwordPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.isOnline')" prop="isOnline">
          <el-input v-model="form.isOnline"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.isOnlinePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.sex')" prop="sex">
          <el-select v-model="form.sex" :placeholder="$t('activity.activityMemberInfo.tableDialog.sexPlaceholder')">
            <el-option :label="$t('activity.activityMemberInfo.tableDialog.sexSelect')" value=""/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.regTime')" prop="regTime">
          <el-date-picker clearable size="small"
                          v-model="form.regTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          :placeholder="$t('activity.activityMemberInfo.tableDialog.regTimePlaceholder')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.registIp')" prop="registIp">
          <el-input v-model="form.registIp"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.registIpPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.loginIp')" prop="loginIp">
          <el-input v-model="form.loginIp"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.loginIpPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.loginAddress')" prop="loginAddress">
          <el-input v-model="form.loginAddress"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.loginAddressPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.loginDev')" prop="loginDev">
          <el-input v-model="form.loginDev"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.loginDevPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.nickName')" prop="nickName">
          <el-input v-model="form.nickName"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.nickNamePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.birthDay')" prop="birthDay">
          <el-input v-model="form.birthDay"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.birthDayPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.inviterCode')" prop="qq">
          <el-input v-model="form.qq"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.inviterCodePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.inviterCode')" prop="wechat">
          <el-input v-model="form.wechat"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.inviterCodePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.headImg')" prop="headImg">
          <el-input v-model="form.headImg"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.headImgPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.onlineTime')" prop="onlineTime">
          <el-input v-model="form.onlineTime"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.onlineTimePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.linkUrl')" prop="linkUrl">
          <el-input v-model="form.linkUrl"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.linkUrlPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.loginTime')" prop="loginTime">
          <el-date-picker clearable size="small"
                          v-model="form.loginTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          :placeholder="$t('activity.activityMemberInfo.tableDialog.loginTimePlaceholder')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.boxAccount')" prop="boxAccount">
          <el-input v-model="form.boxAccount"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.boxAccountPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.boxPass')" prop="boxPass">
          <el-input v-model="form.boxPass"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.boxPassPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.cleanTime')" prop="cleanTime">
          <el-date-picker clearable size="small"
                          v-model="form.cleanTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          :placeholder="$t('activity.activityMemberInfo.tableDialog.cleanTimePlaceholder')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.levelIntegral')" prop="levelIntegral">
          <el-input v-model="form.levelIntegral"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.levelIntegralPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.inviterCode')" prop="inviterCode">
          <el-input v-model="form.inviterCode"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.inviterCodePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.inviteMoney')" prop="inviteMoney">
          <el-input v-model="form.inviteMoney"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.inviteMoneyPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.codeAccount')" prop="codeAccount">
          <el-input v-model="form.codeAccount"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.codeAccountPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.pid')" prop="pid">
          <el-input v-model="form.pid" :placeholder="$t('activity.activityMemberInfo.tableDialog.pidPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.codeTotal')" prop="codeTotal">
          <el-input v-model="form.codeTotal"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.codeTotalPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.channelcode')" prop="channelcode">
          <el-input v-model="form.channelcode"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.channelcodePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.speak')" prop="speak">
          <el-input v-model="form.speak" :placeholder="$t('activity.activityMemberInfo.tableDialog.speak')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.loginNum')" prop="loginNum">
          <el-input v-model="form.loginNum"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.loginNumPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.version')" prop="version">
          <el-input v-model="form.version"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.versionPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.withdrawalPass')" prop="withdrawalPass">
          <el-input v-model="form.withdrawalPass"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.withdrawalPassPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityMemberInfo.tableDialog.deviceId')" prop="deviceId">
          <el-input v-model="form.deviceId"
                    :placeholder="$t('activity.activityMemberInfo.tableDialog.deviceIdPlaceholder')"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{ $t('global.submitButton') }}</el-button>
        <el-button @click="cancel">{{ $t('global.cancelButton') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listActivityMemberInfo,
  getActivityMemberInfo,
  delActivityMemberInfo,
  addActivityMemberInfo,
  updateActivityMemberInfo,
  exportActivityMemberInfo,
  ipList
} from "@/api/platform-web/activity/activityMemberInfo";
import {pickerDateTimeShortcuts, getYesterDateStart, getYesterDateEnd} from "@/utils/dateUtils";
import {checkTwoLogin} from "@/utils/permission";

export default {
  name: "ActivityMemberInfo",
  components: {},
  data() {
    return {
      pickerOptions: {shortcuts: pickerDateTimeShortcuts},
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      //查询ip重复的列表
      ipList: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 会员推广管理表格数据
      activityMemberInfoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示ip重复的弹出层
      ipOpen: false,
      // 查询参数
      queryParams: {
        selectDate: [getYesterDateStart(), getYesterDateEnd()],
        pageNum: 1,
        pageSize: 10,
        memberCode: null,
        cxAgent: null,
        userName: null,
        realName: null,
        status: null,
        vip: null,
        totalAccount: null,
        phone: null,
        email: null,
        password: null,
        isOnline: null,
        sex: null,
        regTime: null,
        registIp: null,
        loginIp: null,
        loginAddress: null,
        loginDev: null,
        nickName: null,
        birthDay: null,
        qq: null,
        wechat: null,
        headImg: null,
        onlineTime: null,
        linkUrl: null,
        loginTime: null,
        boxAccount: null,
        boxPass: null,
        cleanTime: null,
        levelIntegral: null,
        inviterCode: null,
        inviteMoney: null,
        codeAccount: null,
        pid: null,
        codeTotal: null,
        channelcode: null,
        speak: null,
        loginNum: null,
        version: null,
        withdrawalPass: null,
        deviceId: null,
        orderByColumn: 'reg_time',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        memberCode: [
          {required: true, message: this.$t('activity.activityMemberInfo.validation.memberCode'), trigger: "blur"}
        ],
        cxAgent: [
          {required: true, message: this.$t('activity.activityMemberInfo.validation.cxAgent'), trigger: "blur"}
        ],
        userName: [
          {required: true, message: this.$t('activity.activityMemberInfo.validation.userName'), trigger: "blur"}
        ],
        loginNum: [
          {required: true, message: this.$t('activity.activityMemberInfo.validation.loginNum'), trigger: "blur"}
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询会员推广管理列表 */
    getList() {
      if (this.$store.state.permission.twoPw) {
        this.queryParams.isTwoPw = true
      } else {
        this.queryParams.isTwoPw = false
      }
      this.loading = true;
      listActivityMemberInfo(this.queryParams).then(response => {
        this.activityMemberInfoList = response.rows;
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
        memberCode: null,
        cxAgent: null,
        userName: null,
        realName: null,
        status: 0,
        vip: null,
        totalAccount: null,
        phone: null,
        email: null,
        password: null,
        isOnline: null,
        sex: null,
        regTime: null,
        registIp: null,
        loginIp: null,
        loginAddress: null,
        loginDev: null,
        nickName: null,
        birthDay: null,
        qq: null,
        wechat: null,
        headImg: null,
        onlineTime: null,
        linkUrl: null,
        loginTime: null,
        boxAccount: null,
        boxPass: null,
        cleanTime: null,
        levelIntegral: null,
        inviterCode: null,
        inviteMoney: null,
        codeAccount: null,
        pid: null,
        codeTotal: null,
        channelcode: null,
        speak: null,
        loginNum: null,
        version: null,
        withdrawalPass: null,
        deviceId: null
      };
      this.resetForm("form");
    },
    /*查询ip重复*/
    handleQueryIp() {
      this.loading = true;
      this.ipOpen = true;
      ipList(this.queryParams).then(response => {
        this.ipList = response;
        this.loading = false;
      });
    },

    /** 搜索按钮操作 */
    handleQuery(type) {
      this.queryParams.pageNum = 1;
      if (type) {
        this.queryParams.orderByColumn = 'phone',
          this.queryParams.isAsc = 'asc'
      } else {
        this.queryParams.orderByColumn = 'reg_time',
          this.queryParams.isAsc = 'desc'
      }
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
      this.title = this.$t('activity.activityMemberInfo.addTitle');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getActivityMemberInfo(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = this.$t('activity.activityMemberInfo.editTitle');
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateActivityMemberInfo(this.form).then(response => {
              this.msgSuccess(this.$t('global.editSuccessMsg'))
              this.open = false;
              this.getList();
            });
          } else {
            addActivityMemberInfo(this.form).then(response => {
              this.msgSuccess(this.$t('global.addSuccessMsg'));
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
      this.$confirm(this.$t('global.deleteConfirm') + row.title + '"?', this.$t('global.deleteConfirmTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: 'warning'
      }).then(function () {
        return delActivityMemberInfo(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess(this.$t('global.deleteSuccessMsg'));
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      if (checkTwoLogin()) {
        const queryParams = this.queryParams;
        this.$confirm(this.$t('global.confirmExport'), this.$t('global.confirmExportTitle'), {
          confirmButtonText: this.$t('global.confirmButton'),
          cancelButtonText: this.$t('global.cancelButton'),
          type: "warning"
        }).then(function () {
          return exportActivityMemberInfo(queryParams);
        }).then(response => {
          this.downloadExcel(response, this.$t('global.exportResponse'))
        }).catch(() => {
        })
      }
    },
    /** 显示手机号 */
    handlePhone() {
      //判断是否登录二级密码
      if (checkTwoLogin()) {
        this.handleQuery(1);
      }
    }
  }
};
</script>
