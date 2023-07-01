<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
          <el-form-item :label="$t('liveWeb.liveUser.queryForm.userIdsLabel')" prop="userIds" label-width="70">
            <el-input
              v-model="queryParams.userIds"
              :placeholder="$t('liveWeb.liveUser.queryForm.userIdsPlaceholder')"
              clearable
              size="small"
              type="text"
              class="no-number"
              id="user-ids"
              oninput="this.value=this.value.replace(/[^\d,]/g,'')"
              @keyup.enter.native="handleQuery" />
          </el-form-item>

          <el-form-item :label="$t('global.selectDate')" prop="selectDate" label-width="200">
            <el-date-picker type="daterange" v-model="selectDate" format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd" :style="{width: '240px'}" :start-placeholder="$t('liveWeb.liveUser.queryForm.selectDateStartPlaceholder')"
                            :end-placeholder="$t('liveWeb.liveUser.queryForm.selectDateEndPlaceholder')"
                            :range-separator="$t('liveWeb.liveUser.queryForm.selectDateRangeSeparator')" clearable :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="nickName">
            <el-input
              v-model="queryParams.nickName"
              :placeholder="$t('liveWeb.liveUser.queryForm.nickNamePlaceholder')"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item prop="mobile" class="phone">
            <el-input
              v-model="queryParams.mobile"
              :placeholder="$t('liveWeb.liveUser.queryForm.phonePlaceholder')"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item prop="isBan" class="is-ban">
            <el-select v-model="queryParams.isBan" :placeholder="$t('liveWeb.liveUser.queryForm.isBanPlaceholder')" class="col-w240" clearable>
              <el-option :label="$t('liveWeb.liveUser.table.isBan0')" value="0"></el-option>
              <el-option :label="$t('liveWeb.liveUser.table.isBan1')" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="isAuthentication" class="is-authentication">
            <el-select v-model="queryParams.isAuthentication" :placeholder="$t('liveWeb.liveUser.queryForm.isAuthenticationPlaceholder')" clearable>
              <el-option :label="$t('liveWeb.liveUser.table.isAuthentication0')" value="0"></el-option>
              <el-option :label="$t('liveWeb.liveUser.table.isAuthentication1')" value="1"></el-option>
              <el-option :label="$t('liveWeb.liveUser.table.isAuthentication2')" value="2"></el-option>
              <el-option :label="$t('liveWeb.liveUser.table.isAuthentication3')" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="mobile" class="family-id">
            <el-input
              v-model="queryParams.familyId"
              :placeholder="$t('liveWeb.liveUser.queryForm.mobilePlaceholder')"
              clearable
              size="small"
              type="number"
              class="no-number"
              @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item class="handle-btn">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('liveWeb.liveUser.queryForm.searchButton')}}</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('liveWeb.liveUser.queryForm.resetButton')}}</el-button>
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
          v-hasPermi="['admin:liveUser:add']">{{$t('liveWeb.liveUser.actions.add')}}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:liveUser:export']">{{$t('liveWeb.liveUser.actions.export')}}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="sendRoomMsg"
          v-hasPermi="['admin:liveUser:add']">{{$t('liveWeb.liveUser.actions.liveRoomAssistant')}}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          size="mini"
          class="disabled-btn"
          :disabled="multiple"
          @click="joinFamilyBulk"
        >{{$t('liveWeb.liveUser.actions.batchJoin')}}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          size="mini"
          class="disabled-btn"
          :disabled="multiple"
          @click="kickOutFamilyBulk"
        >{{$t('liveWeb.liveUser.actions.batchKickOut')}}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <!-- liveUser显示数据表部分从这里开始 liveUser display data table section start from here-->
    <el-table stripe v-loading="loading" :data="liveUserList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" align="center"/>
      <el-table-column :label="$t('liveWeb.liveUser.table.id')" min-width="120" align="center" prop="id"/>
      <el-table-column :label="$t('liveWeb.liveUser.table.nickName')" min-width="160" :show-overflow-tooltip="true" align="center" prop="nickName"/>
      <el-table-column :label="$t('liveWeb.liveUser.table.weixinAccount')" min-width="100" align="center" prop="weixinAccount"
                       :show-overflow-tooltip="true"/>
      <el-table-column :label="$t('liveWeb.liveUser.table.familyName')" min-width="100" align="center" prop="familyName" :show-overflow-tooltip="true">
        <template v-slot="{row}">
          <span v-if="row.familyId === 0">{{$t('liveWeb.liveUser.table.familyId0')}}</span>
          <el-popover
            v-else
            placement="top"
            :title="row.familyName"
            width="200"
            trigger="click">
            <table>
              <tr>
                <td style="text-align: right">{{$t('liveWeb.liveUser.table.familyIdPopover')}}</td>
                <td style="text-align: left">{{ row.familyId }}</td>
              </tr>
              <tr>
                <td style="text-align: right">{{$t('liveWeb.liveUser.table.familyUserIdPopover')}}</td>
                <td style="text-align: left">{{ row.familyUserId }}</td>
              </tr>
              <tr>
                <td style="text-align: right">{{$t('liveWeb.liveUser.table.familyNickNamePopover')}}</td>
                <td style="text-align: left">{{ row.familyNickName }}</td>
              </tr>
            </table>
            <a slot="reference" style="color: #00afff">{{ row.familyName }}</a>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveUser.table.familyChieftain')" min-width="150" align="center" prop="familyChieftain"
                       :formatter="fmFamilyChieftain"/>
      <!--  isAuthentication 选择选项部分从这里开始 isAuthentication select options section start from here -->
      <el-table-column :label="$t('liveWeb.liveUser.table.isAuthentication')" align="center" width="135px">
        <template v-slot="{row}">
          <el-select v-model="row.isAuthentication"
                     :placeholder="$t('liveWeb.liveUser.table.isAuthenticationPlaceholder')" size="small"
                     @change="changeAuthType(row)">
            <el-option
              v-for="(dict,i) in typeAuthList"
              :key="'B'+ i"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)">
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column :label="$t('liveWeb.liveUser.table.ticket')" min-width="120" align="center" prop="ticket"/>
      <el-table-column :label="$t('liveWeb.liveUser.table.coin')" min-width="120" align="center" prop="coin"/>
      <el-table-column :label="$t('liveWeb.liveUser.table.status')" min-width="120" align="center" prop="virtualAnchor"/>
      <el-table-column :label="$t('liveWeb.liveUser.table.weixinPrice')" min-width="170" align="center" prop="weixinPrice"/>
      <el-table-column :label="$t('liveWeb.liveUser.table.weiboMoney')" min-width="120" align="center" prop="weiboMoney"/>
      <el-table-column :label="$t('liveWeb.liveUser.table.xpoint')" min-width="120" align="center" prop="xpoint"/>
      <el-table-column :label="$t('liveWeb.liveUser.table.ypoint')" min-width="120" align="center" prop="ypoint"/>
      <el-table-column :label="$t('liveWeb.liveUser.table.isBan')" width="160" align="center" prop="isBan">
        <template v-slot="{row}">
          <el-tooltip class="item" effect="dark" :content="row.isBan === 0 ? $t('liveWeb.liveUser.table.isBan0') : $t('liveWeb.liveUser.table.isBan1')" placement="top">
            <el-switch
              :active-value="0"
              :inactive-value="1"
              active-color="#5B7BFA"
              inactive-color="#dadde5"
              v-model="row.isBan"
              @change=displayCheck(row)>
            </el-switch>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveUser.table.mobile')" min-width="130" align="center" prop="mobile"/>
      <el-table-column :label="$t('liveWeb.liveUser.table.loginIp')" min-width="150" :show-overflow-tooltip="true" align="left" prop="loginIp"/>
      <el-table-column :label="$t('liveWeb.liveUser.table.banRemark')" min-width="200" align="center" prop="banRemark" :show-overflow-tooltip="true"/>
      <el-table-column :label="$t('liveWeb.liveUser.table.operation')" min-width="200" align="center" class-name="small-padding fixed-width" fixed="right">
        <template v-slot="{row}">
          <el-button
            size="small"
            plain
            type="primary"
            icon="el-icon-s-check"
            @click="kickOutLive(row)"
            v-hasPermi="['admin:liveUser:edit']"
            v-show="row.familyId > 0 && row.familyChieftain !== 1">
            {{$t('liveWeb.liveUser.table.kickOutButton')}}
          </el-button>
          <el-button
            size="small"
            plain
            type="primary"
            icon="el-icon-s-check"
            @click="handleAuth(row)"
            v-hasPermi="['admin:liveUser:edit']"
            v-show="row.isAuthentication === 1">{{$t('liveWeb.liveUser.table.auditButton')}}
          </el-button>

          <!-- click on this button live Launch content dialog-->
          <el-button
            size="small"
            plain
            type="primary"
            icon="el-icon-s-check"
            @click="() => {openLiveStatus = !openLiveStatus
                           openLiveForm.id = row.id
                           //查询之前的开播信息
                            getLiveVideo(row.id);}"
            v-hasPermi="['admin:liveUser:edit']"
            v-show="row.roboter == 1 && row.liveIn != 1">{{$t('liveWeb.liveUser.table.starBroadcastButton')}}
          </el-button>
          <!-- end Launch content dialog button -->

          <el-button
            size="small"
            plain
            type="primary"
            icon="el-icon-s-check"
            @click="closeLive(row)"
            v-hasPermi="['admin:liveUser:edit']"
            v-show="row.roboter == 1 && row.liveIn == 1">{{$t('liveWeb.liveUser.table.endBroadcastButton')}}
          </el-button>
          <el-button
            size="small"
            plain
            type="success"
            icon="el-icon-menu"
            @click="handleMore(row)">{{$t('liveWeb.liveUser.table.moreButton')}}
          </el-button>
        </template>

      </el-table-column>
    </el-table>
    <!-- liveUser显示数据表部分到此结束 liveUser display data table section end here-->

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[20,50,100]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"/>

    <!-- 添加或修改主播信息对话框 Add or modify anchor information dialog-->
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="addopen" width="620px" append-to-body>
      <el-form ref="form" :model="form" label-width="120px">

        <section class="el-row">
          <div class="el-col-lg-14">
            <el-form-item :label="$t('liveWeb.liveUser.addDialog.mobileLabel')" prop="mobile">
              <el-input v-model="form.mobile"/>
            </el-form-item>
            <el-form-item :label="$t('liveWeb.liveUser.addDialog.nickNameLabel')" prop="nickName">
              <el-input v-model="form.nickName"/>
            </el-form-item>
          </div>
          <div class="el-col-lg-10">
            <el-form-item :label="$t('liveWeb.liveUser.addDialog.headImageLabel')" style="margin-left: -30px">
              <imageUpload v-model="form.headImage" path="liveVideo"/>
            </el-form-item>
          </div>
        </section>

        <el-form-item :label="$t('liveWeb.liveUser.addDialog.isAuthenticationLabel')" prop="isAuthentication">
          <el-radio-group v-model="form.isAuthentication">
            <el-radio
              v-for="dict in attestList"
              :key="dict.value"
              :label="dict.value"
            >{{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm(1)">{{$t('liveWeb.liveUser.addDialog.confirmButton')}}</el-button>
        <!--add new model close button-->
        <el-button @click="addopen = false">{{$t('liveWeb.liveUser.addDialog.cancelButton')}}</el-button>
      </div>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="sendMsg" width="500px" append-to-body>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item :label="$t('liveWeb.liveUser.liveRoomAssistantDialog.infoLabel')">
          <el-input v-model="form.info" prop="info" type="textarea" :rows="4" :placeholder="$t('liveWeb.liveUser.liveRoomAssistantDialog.infoPlaceholder')"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sendLiveMsg()">{{$t('liveWeb.liveUser.liveRoomAssistantDialog.confirmButton')}}</el-button>
      </div>
    </el-dialog>

    <!-- 开播内容对话框 Launch live content dialog-->
    <el-dialog :close-on-click-modal="false" v-loading="openLoading" :title="$t('liveWeb.liveUser.liveBroadcastDialog.title')" :visible.sync="openLiveStatus"
               width="500px" append-to-body>
      <el-form ref="form" :model="openLiveForm" label-width="120px">
        <el-form-item :label="$t('liveWeb.liveUser.liveBroadcastDialog.titleLabel')" prop="title">
          <el-input v-model.trim="openLiveForm.title"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUser.liveBroadcastDialog.flvLabel')" prop="flv">
          <el-input type="textarea" v-model.trim="openLiveForm.flv" @input="() =>{
            if(openLiveForm.flv.length>250){
              openLiveForm.flv = openLiveForm.flv.slice(0,250)
              this.$notify.warning('视频流地址长度不能超过250个字符')
            }
          }"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUser.liveBroadcastDialog.liveImageLabel')" prop="liveImage">
          <imageUpload v-model="openLiveForm.liveImage" path="liveVideo"/>
        </el-form-item>

        <el-form-item style="width: 150px" :data="lotteryInfoList" :label="$t('liveWeb.liveUser.liveBroadcastDialog.lotteryLabel')">
          <el-select v-model="openLiveForm.lottery" placeholder="" clearable style="width: 150px">
            <el-option
              v-for="lottery in lotteryInfoList"
              :label="lottery.name"
              :value="lottery.id"/>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="openLive()">{{$t('liveWeb.liveUser.liveBroadcastDialog.confirmButton')}}</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改主播信息对话框 -->
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item :label="$t('liveWeb.liveUser.editDialog.authenticationNameLabel')" prop="authenticationNameLabel">
          <el-input v-model="form.authenticationName" readonly/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUser.editDialog.contactLabel')" prop="contact">
          <el-input v-model="form.mobile" readonly/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUser.editDialog.identifyNumberLabel')" prop="identifyNumber">
          <el-input v-model="form.identifyNumber" readonly/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUser.editDialog.coinLabel')" prop="coin">
          <el-input v-model="form.coin" type="number"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUser.editDialog.weixinPriceLabel')" prop="weixinPrice">
          <el-input v-model="form.weixinPrice" type="number"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUser.editDialog.weiboMoneyLabel')" prop="weiboMoney">
          <el-input v-model="form.weiboMoney" type="number"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUser.editDialog.xpointLabel')" prop="xpoint">
          <el-input v-model="form.xpoint" type="number"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUser.editDialog.ypointLabel')" prop="ypoint">
          <el-input v-model="form.ypoint" type="number"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUser.editDialog.identifyHoldImageLabel')">
          <img :src="form.identifyHoldImage" style="width: 300px;height: 300px"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUser.editDialog.identifyPositiveImageLabel')">
          <img :src="form.identifyPositiveImage" style="width: 300px;height: 300px"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUser.editDialog.identifyNagativeImageLabel')">
          <img :src="form.identifyNagativeImage" style="width: 300px;height: 300px"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUser.editDialog.isAuthenticationLabel')" prop="isAuthentication">
          <el-radio-group v-model="form.isAuthentication">
            <el-radio
              v-for="dict in attestList"
              :key="dict.value"
              :label="dict.value"
            >{{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUser.editDialog.vExplainLabel')" prop="vExplain" v-if="form.isAuthentication === 2">
          <el-input v-model="form.vExplain"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveUser.editDialog.investorSendInfoLabel')" prop="investorSendInfo" v-if="form.isAuthentication === 3">
          <el-input v-model="form.investorSendInfo"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="form.isAuthentication > 1">
        <el-button type="primary" @click="submitForm(0)">{{$t('liveWeb.liveUser.editDialog.confirmButton')}}</el-button>
        <el-button @click="cancel">{{$t('liveWeb.liveUser.editDialog.cancelButton')}}</el-button>
      </div>
    </el-dialog>
    <more ref="more" @refMemeberData="getList()" :user-id="userId" @liveUserMore="handleQuery"></more>
  </div>
</template>

<script>
import {
  listLiveUser,
  getLiveUser,
  delLiveUser,
  addLiveUser,
  updateLiveUser,
  exportLiveUser,
  banDetail,
  getFamiily,
  openLive,
  closeLive,
  kickOutLiveUser,
  listAuth,
  changeAuth, goFamiily, updateTicket, kickOutFamily,
} from '@/api/live-web/liveUser'
import ImageUpload from '@/components/ImageUpload/index'
import more from './more'
import {pickerDateShortcuts} from '@/utils/dateUtils'
import {addH5Plugin, updateH5Plugin} from '@/api/live-web/h5/h5Plugin'
import {getLiveVideo, sendLiveMsg} from '@/api/live-web/liveVideo/liveVideo'
import {listLotteryInfo} from "@/api/platform-web/lottery/lotteryInfo";

export default {
  name: 'LiveUser',
  components: {
    ImageUpload,
    more: more
  },
  data() {
    return {
      openLoading: false,
      openLiveForm: {
        title: null,
        flv: null,
        liveImage: null,
        lottery: null
      },
      openLiveStatus: false,
      pickerOptions: {shortcuts: pickerDateShortcuts},
      // 0指未认证  1指待审核 2指认证 3指审核不通过
      attestList: [{label: this.$t('liveWeb.liveUser.table.isAuthentication1'), value: 1}, {label: this.$t('liveWeb.liveUser.table.isAuthentication2'), value: 2}, {label: this.$t('liveWeb.liveUser.table.isAuthentication3'), value: 3}],
      //所选的用户id
      userId: 0,
      // 遮罩层
      loading: true,
      addopen: false,
      sendMsg: false,
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
      // 主播信息表格数据
      liveUserList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      selectDate: null,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        userIds: null,
        nickName: null,
        isAuthentication: null,
        isBan: null,
        mobile: null,
        familyId: null
      },

      //starting live lottery list
      lotteryInfoList: [],
      typeAuthList: [],
      remark: '',
      remarked: '',
      muteRemark: false,

      // 表单参数
      form: {},
      // 表单校验
      rules: {
        vExplain: [
          {required: true, message: this.$t('liveWeb.liveUser.editDialog.validation.vExplain'), trigger: 'blur'}
        ],
        investorSendInfo: [
          {required: true, message: this.$t('liveWeb.liveUser.editDialog.validation.investorSendInfo'), trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.init()
    this.getLotteryList();
    this.getAuthList();
  },
  activated() {
    this.init()
  },
  watch: {
    selectDate: function (newVal, oldVal) {
      if (newVal === null) {
        this.queryParams.sendStartTime = undefined
        this.queryParams.sendEndTime = undefined
      } else {
        this.queryParams.sendStartTime = this.selectDate[0] + ' 00:00:00'
        this.queryParams.sendEndTime = this.selectDate[1] + ' 23:59:59'
      }
    }
  },
  methods: {
    //查询主播的直播状态
    getLiveVideo(id) {
      this.openLoading = true
      var that = this
      getLiveVideo(id).then((res) => {
        if (res.data) {
          that.openLiveForm.title = res.data.title
          that.openLiveForm.flv = res.data.playUrl
          that.openLiveForm.liveImage = res.data.liveImage
          that.openLiveForm.lottery = res.data.lottery
        }
      }).finally(() => {
        this.openLoading = false
      });
    },
    init() {
      const familyId = this.$route.query.familyId
      if (familyId && familyId >= 0) {
        this.queryParams.familyId = familyId
      } else {
        this.queryParams.familyId = null
      }
      this.getList()
    },
    //修改禁播状态
    displayCheck(row) {
      if (row.isBan) {
        this.opens(this.$t('liveWeb.liveUser.confirmBanPrompt.message'), row, row.isBan)
      } else {
        this.banDetail(row, row.isBan)
      }
    },
    opens(hint, row, type) {
      var that = this
      this.$prompt(hint, this.$t('liveWeb.liveUser.confirmBanPrompt.title'), {
        confirmButtonText: this.$t('liveWeb.liveUser.confirmBanPrompt.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveUser.confirmBanPrompt.cancelButton')
        /*inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '验证码格式不正确'*/
      }).then(({value}) => {
        that.banDetail(row, type, value)
      }).catch(() => {
        row.isBan = row.isBan === 0 ? 1 : 0
      })

    },
    banDetail(row, type, value) {
      banDetail({
        id: row.id,
        isBan: type,
        banRemark: value
      }).then((res) => {
        this.$notify.success(res.msg)
        row.isBan = type
        this.getList()
      }).catch(() => {
        this.$notify.error(this.$t('liveWeb.liveUser.messageBox.banErrorMessage'))
      })
    },

    /** select more than one rows */
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },

    /** 查询主播信息列表 */
    getList() {
      this.loading = true
      listLiveUser(this.queryParams).then(response => {
        this.liveUserList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    /** 更多按钮操作 */
    handleMore(row) {
      this.userId = row.id
      this.$refs.more.show(this.userId, row.mobile)
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        authenticationName: null,
        isAuthentication: null,
        mobile: null,
        identifyHoldImage: null,
        identifyPositiveImage: null,
        identifyNagativeImage: null,
        investorSendInfo: null,
        vExplain: null,
        identifyNumber: null,
        coin: null,
        xpoint: null,
        ypoint: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.addopen = true
      this.title = this.$t('liveWeb.liveUser.addDialog.title')
    },
    sendRoomMsg() {
      this.reset()
      this.sendMsg = true
      this.title = this.$t('liveWeb.liveUser.liveRoomAssistantDialog.title')
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id
      getLiveUser(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = this.$t('liveWeb.liveUser.editDialog.title')
      })
    },
    /** 提交按钮 */
    submitForm(type) {
      const that = this
      if (type) {
        addLiveUser(this.form).then(res => {
          if (res.code === 200) {
            that.msgSuccess(res.msg);
            that.showopen = false;
            that.getList();
          } else {
            that.msgError(res.msg);
          }
        });
      } else {
        that.$refs['form'].validate(valid => {
          if (valid) {
            //是否确认{not}通过审核此主播?

            that.$confirm(this.$t('liveWeb.liveUser.confirmSubmitFormType0.message', {not: that.form.isAuthentication === 3 ? '不' : ''}),
              this.$t('liveWeb.liveUser.confirmSubmitFormType0.title'),
              {
                confirmButtonText: this.$t('liveWeb.liveUser.confirmSubmitFormType0.confirmButton'),
                cancelButtonText: this.$t('liveWeb.liveUser.confirmSubmitFormType0.cancelButton'),
                type: 'warning'
              }).then(function () {
              return updateLiveUser(that.form)
            }).then(response => {
              if (response.code === 200) {
                that.msgSuccess(this.$t('liveWeb.liveUser.messageBox.submitSuccess'))
              } else if (response.code === 500) {
                that.msgError(response.msg)
              }
              this.open = false
              that.getList()
            }).catch(function () {
            })
          }
        })
      }
    },
    /** 提交按钮 */
    sendLiveMsg() {
      const that = this
      sendLiveMsg(this.form).then(res => {
        that.msgSuccess(res.msg);
        that.sendMsg = false;
        that.getList();
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams

      this.$confirm(this.$t('liveWeb.liveUser.confirmExportDialog.message'), this.$t('liveWeb.liveUser.confirmExportDialog.title'), {
        confirmButtonText: this.$t('liveWeb.liveUser.confirmExportDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveUser.confirmExportDialog.cancelButton'),
        type: 'warning'
      }).then(function () {
        return exportLiveUser(queryParams)
      }).then(response => {
        this.downloadExcel(response, '主播列表')
      }).catch(() => {
      })
    },
    handleAuth(row) {
      this.reset()
      getLiveUser(row.id).then(response => {
        this.form = response.data
        this.open = true
        this.title = this.$t('liveWeb.liveUser.editDialog.title')
      })
    },
    //开播
    openLive() {
      var that = this;
      this.loading = true
      let lotteryName = null;
      for (const index in this.lotteryInfoList) {
        const info = this.lotteryInfoList[index]
        if (this.openLiveForm.lottery === info.id) {
          lotteryName = info.name;
          break
        }
      }
      openLive({
        id: this.openLiveForm.id,
        title: this.openLiveForm.title,
        flv: this.openLiveForm.flv,
        liveImage: this.openLiveForm.liveImage,
        lotteryId: this.openLiveForm.lottery,
        lotteryName: lotteryName
      }).then(response => {
        that.openLiveStatus = false;
        that.$notify.success(this.$t('liveWeb.liveUser.messageBox.openLiveSuccess'))
        that.getList();
      }).catch((err) => {
        that.$notify.error(this.$t('liveWeb.liveUser.messageBox.openLiveError'))
      })
    },
    //关播
    closeLive(row) {
      var that = this;
      this.loading = true
      closeLive({id: row.id}).then(response => {
        that.$notify.success(this.$t('liveWeb.liveUser.messageBox.closeLiveSuccess'))
        that.getList();
      }).catch((err) => {
        that.$notify.error(this.$t('liveWeb.liveUser.messageBox.closeLiveError'))
      })
    },
    //踢出主播
    kickOutLive(row) {
      const id = row.id
      const t = this;
      this.$confirm(this.$t('liveWeb.liveUser.confirmKickOutDialog.message'), this.$t('liveWeb.liveUser.confirmKickOutDialog.title'), {
        confirmButtonText: this.$t('liveWeb.liveUser.confirmKickOutDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveUser.confirmKickOutDialog.cancelButton'),
        type: 'warning'
      }).then(function () {
        kickOutLiveUser(id).then(response => {
          t.$notify.success(this.$t('liveWeb.liveUser.messageBox.kickOutSuccess'))
          t.getList();
        }).catch((err) => {
          t.$notify.error(this.$t('liveWeb.liveUser.messageBox.kickOutError'))
        })
      })
    },

    kickOutFamilyBulk() {
      this.$confirm(this.$t('liveWeb.liveUser.confirmKickOutFamilyBulkDialog.message'), this.$t('liveWeb.liveUser.confirmKickOutFamilyBulkDialog.title'), {
        confirmButtonText: this.$t('liveWeb.liveUser.confirmKickOutFamilyBulkDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveUser.confirmKickOutFamilyBulkDialog.cancelButton'),
        type: 'warning'
      }).then(() => {
        kickOutFamily({
          userIdSet: this.ids
        }).then(res => {
          if (res.code === 200) {
            this.$notify.success(res.msg)
            this.getList();
          } else {
            this.$message.error(res.msg)
          }
        }).catch((err) => {
          this.$notify.error(this.$t('liveWeb.liveUser.messageBox.kickOutFamilyBulkError'))
        })
      }).catch(() => {
      });
    },

    /** 查询彩票名称列表 Query lottery name list*/
    getLotteryList() {
      this.loading = true;
      listLotteryInfo({status: 1}).then(response => {
        this.lotteryInfoList = response.rows;
      });
    },

    /** 查询彩票名称列表 Query Authentication list*/
    getAuthList() {
      this.getDicts('live_user_auth_type').then(response => {
        this.typeAuthList = response.data
      })
    },

    /** change isAuthentication type start from here*/
    changeAuthType(row) {
      changeAuth({
        id: row.id,
        isAuthentication: row.isAuthentication
      }).then((res) => {
        if (res.code === 0) {
          this.$notify.success(this.$t('liveWeb.liveUser.messageBox.changeAuthTypeSuccess'))
        } else {
          this.$notify.error(this.$t('liveWeb.liveUser.messageBox.changeAuthTypeError1'))
        }
      }).catch(() => {
        this.$notify.error(this.$t('liveWeb.liveUser.messageBox.changeAuthTypeError2'))
      }).finally(() => {
        this.getList()
      })
    },
    /** end isAuthentication type change here*/


    joinFamilyBulk() {
      this.$prompt(this.$t('liveWeb.liveUser.confirmJoinFamilyBulkPrompt.message'), {
        confirmButtonText: this.$t('liveWeb.liveUser.confirmJoinFamilyBulkPrompt.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveUser.confirmJoinFamilyBulkPrompt.cancelButton'),
        inputPattern: /^(\-|\+)?\d+(\.\d+)?$/,
        inputErrorMessage: this.$t('liveWeb.liveUser.confirmJoinFamilyBulkPrompt.inputErrorMessage')
      }).then(({value}) => {
        goFamiily({
          familyId: value,
          userIdSet: this.ids
        }).then((res) => {
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        }).catch(() => {
          this.$notify.error(this.$t('liveWeb.liveUser.messageBox.joinFamilyBulkError'))
        })
      }).catch(() => {
      });
    },

    fmFamilyChieftain(row) {
      return row.familyChieftain === 1 ? this.$t('liveWeb.liveUser.table.familyChieftain1') : this.$t('liveWeb.liveUser.table.familyChieftainOthers')
    }

  }
}
</script>

<style>

#user-ids{
  width: 300px
}

@media only screen and (min-width: 1300px) and (max-width: 1322px){
  .phone{
    margin-left: 66px;
  }
}

@media only screen and (min-width: 1323px) and (max-width: 1572px){
  .is-ban{
    margin-left: 66px;
  }
}

@media only screen and (min-width: 1572px) and (max-width: 1600px){
  .is-authentication{
    margin-left: 66px;
  }
}

@media only screen and (min-width: 1600px) {
  .family-id{
    margin-left: 66px;
  }
}


</style>
