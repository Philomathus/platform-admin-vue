<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-container>
        <el-aside style="width: auto;background-color: white;margin-left: -40px">
          <el-form-item label="主播ID" prop="userIds" style="margin-top: 10px">
            <el-input
              v-model="queryParams.userIds"
              placeholder="主播ID,批量搜索请用英文逗号隔开"
              clearable
              size="small"
              type="text"
              class="no-number"
              id="user-ids"
              oninput="this.value=this.value.replace(/[^\d,]/g,'')"/>
          </el-form-item>
        </el-aside>
        <el-main style="position: relative">
          <el-form-item label="注册日期" prop="selectDate" style="margin-left: -20px">
            <el-date-picker type="daterange" v-model="selectDate" format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd" :style="{width: '240px'}" start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            range-separator="至" clearable :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="nickName">
            <el-input
              v-model="queryParams.nickName"
              placeholder="主播昵称"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item prop="mobile" class="phone">
            <el-input
              v-model="queryParams.mobile"
              placeholder="手机号"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item prop="isBan" class="is-ban">
            <el-select v-model="queryParams.isBan" placeholder="是否禁播" class="col-w240" clearable>
              <el-option label="正常" value="0"></el-option>
              <el-option label="禁播" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="isAuthentication" class="is-authentication">
            <el-select v-model="queryParams.isAuthentication" placeholder="全部状态" clearable>
              <el-option label="未认证" value="0"></el-option>
              <el-option label="待审核" value="1"></el-option>
              <el-option label="已认证" value="2"></el-option>
              <el-option label="审核不通过" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="mobile" class="mobile">
            <el-input
              v-model="queryParams.familyId"
              placeholder="家族ID"
              clearable
              size="small"
              type="number"
              class="no-number"
              @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item class="handle-btn">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-main>
      </el-container>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['admin:liveUser:add']">新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:liveUser:export']">导出
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="sendRoomMsg"
          v-hasPermi="['admin:liveUser:add']">直播间小助手
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
        >批量加入家族
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
        >批量踢出家族
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <!-- liveUser显示数据表部分从这里开始 liveUser display data table section start from here-->
    <el-table stripe v-loading="loading" :data="liveUserList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" align="center"/>
      <el-table-column label="主播ID" min-width="120" align="center" prop="id"/>
      <el-table-column label="主播昵称" min-width="140" :show-overflow-tooltip="true" align="center" prop="nickName"/>
      <el-table-column label="主播名片" min-width="100" align="center" prop="weixinAccount"
                       :show-overflow-tooltip="true"/>
      <el-table-column label="所属家族" min-width="100" align="center" prop="familyName" :show-overflow-tooltip="true">
        <template v-slot="{row}">
          <span v-if="row.familyId === 0">未加入家族</span>
          <el-popover
            v-else
            placement="top"
            :title="row.familyName"
            width="200"
            trigger="click">
            <table>
              <tr>
                <td style="text-align: right">家 族 ID：</td>
                <td style="text-align: left">{{ row.familyId }}</td>
              </tr>
              <tr>
                <td style="text-align: right">家 族 长 ID：</td>
                <td style="text-align: left">{{ row.familyUserId }}</td>
              </tr>
              <tr>
                <td style="text-align: right">家族长昵称：</td>
                <td style="text-align: left">{{ row.familyNickName }}</td>
              </tr>
            </table>
            <a slot="reference" style="color: #00afff">{{ row.familyName }}</a>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="是否家族长" min-width="150" align="center" prop="familyChieftain"
                       :formatter="fmFamilyChieftain"/>
      <!--  isAuthentication 选择选项部分从这里开始 isAuthentication select options section start from here -->
      <el-table-column label="状态" align="center" width="135px">
        <template v-slot="{row}">
          <el-select v-model="row.isAuthentication"
                     placeholder="请选择状态" size="small"
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

      <el-table-column label="印票" min-width="120" align="center" prop="ticket"/>
      <el-table-column label="时薪" min-width="120" align="center" prop="coin"/>
      <el-table-column label="时薪任务" min-width="120" align="center" prop="weixinPrice"/>
      <el-table-column label="礼物任务" min-width="120" align="center" prop="weiboMoney"/>
      <el-table-column label="彩票抽成" min-width="120" align="center" prop="xpoint"/>
      <el-table-column label="礼物抽成" min-width="120" align="center" prop="ypoint"/>
      <el-table-column label="是否禁播" width="80" align="center" prop="isBan">
        <template v-slot="{row}">
          <el-tooltip class="item" effect="dark" :content="row.isBan === 0 ? '正常' : '禁播'" placement="top">
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
      <el-table-column label="手机号" min-width="100" align="center" prop="mobile"/>
      <el-table-column label="登陆IP" min-width="150" :show-overflow-tooltip="true" align="left" prop="loginIp"/>
      <el-table-column label="禁播原因" min-width="200" align="center" prop="banRemark" :show-overflow-tooltip="true"/>
      <el-table-column label="操作" min-width="200" align="center" class-name="small-padding fixed-width" fixed="right">
        <template v-slot="{row}">
          <el-button
            size="small"
            plain
            type="primary"
            icon="el-icon-s-check"
            @click="kickOutLive(row)"
            v-hasPermi="['admin:liveUser:edit']"
            v-show="row.familyId > 0 && row.familyChieftain !== 1">
            踢出家族
          </el-button>
          <el-button
            size="small"
            plain
            type="primary"
            icon="el-icon-s-check"
            @click="handleAuth(row)"
            v-hasPermi="['admin:liveUser:edit']"
            v-show="row.isAuthentication === 1">审核
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
            v-show="row.roboter == 1 && row.liveIn != 1">开播
          </el-button>
          <!-- end Launch content dialog button -->

          <el-button
            size="small"
            plain
            type="primary"
            icon="el-icon-s-check"
            @click="closeLive(row)"
            v-hasPermi="['admin:liveUser:edit']"
            v-show="row.roboter == 1 && row.liveIn == 1">关播
          </el-button>
          <el-button
            size="small"
            plain
            type="success"
            icon="el-icon-menu"
            @click="handleMore(row)">更多
          </el-button>
        </template>

      </el-table-column>

      <!--      <el-table-column label="可用印票" min-width="120" align="center" prop="ticket"/>

            <el-table-column label="粉丝" min-width="120" align="center" prop="fansCount"/>
            <el-table-column label="注册时间" min-width="160" :show-overflow-tooltip="true" align="center" prop="createTime"/>-->
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
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model="form.mobile"/>
            </el-form-item>
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="form.nickName"/>
            </el-form-item>
          </div>
          <div class="el-col-lg-10">
            <el-form-item label="用户头像" style="margin-left: -30px">
              <imageUpload v-model="form.headImage" path="liveVideo"/>
            </el-form-item>
          </div>
        </section>

        <el-form-item label="类型" prop="isAuthentication">
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
        <el-button type="primary" @click="submitForm(1)">确 定</el-button>
        <!--add new model close button-->
        <el-button @click="addopen = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="sendMsg" width="500px" append-to-body>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="小助手消息">
          <el-input v-model="form.info" prop="info" type="textarea" :rows="4" placeholder="请输入发送小助手消息"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sendLiveMsg()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 开播内容对话框 Launch live content dialog-->
    <el-dialog :close-on-click-modal="false" v-loading="openLoading" title="开播信息" :visible.sync="openLiveStatus"
               width="500px" append-to-body>
      <el-form ref="form" :model="openLiveForm" label-width="120px">
        <el-form-item label="标题" prop="title">
          <el-input v-model.trim="openLiveForm.title"/>
        </el-form-item>
        <el-form-item label="视频流地址" prop="flv">
          <el-input type="textarea" v-model.trim="openLiveForm.flv" @input="() =>{
            if(openLiveForm.flv.length>250){
              openLiveForm.flv = openLiveForm.flv.slice(0,250)
              this.$notify.warning('视频流地址长度不能超过250个字符')
            }
          }"/>
        </el-form-item>
        <el-form-item label="开播背景" prop="liveImage">
          <imageUpload v-model="openLiveForm.liveImage" path="liveVideo"/>
        </el-form-item>

        <el-form-item style="width: 150px" :data="lotteryInfoList" label="彩票">
          <el-select v-model="openLiveForm.lottery" placeholder="" clearable style="width: 150px">
            <el-option
              v-for="lottery in lotteryInfoList"
              :label="lottery.name"
              :value="lottery.id"/>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="openLive()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改主播信息对话框 -->
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="真实姓名" prop="authenticationName">
          <el-input v-model="form.authenticationName" readonly/>
        </el-form-item>
        <el-form-item label="手机号" prop="contact">
          <el-input v-model="form.mobile" readonly/>
        </el-form-item>
        <el-form-item label="身份证号码" prop="identifyNumber">
          <el-input v-model="form.identifyNumber" readonly/>
        </el-form-item>
        <el-form-item label="时薪" prop="coin">
          <el-input v-model="form.coin" type="number"/>
        </el-form-item>
        <el-form-item label="开播时长任务" prop="weixinPrice">
          <el-input v-model="form.weixinPrice" type="number"/>
        </el-form-item>
        <el-form-item label="收礼礼物" prop="weiboMoney">
          <el-input v-model="form.weiboMoney" type="number"/>
        </el-form-item>
        <el-form-item label="彩票抽成" prop="xpoint">
          <el-input v-model="form.xpoint" type="number"/>
        </el-form-item>
        <el-form-item label="礼物抽成" prop="ypoint">
          <el-input v-model="form.ypoint" type="number"/>
        </el-form-item>
        <el-form-item label="手持身份证照片">
          <img :src="form.identifyHoldImage" style="width: 300px;height: 300px"/>
        </el-form-item>
        <el-form-item label="身份证正面">
          <img :src="form.identifyPositiveImage" style="width: 300px;height: 300px"/>
        </el-form-item>
        <el-form-item label="身份证反面">
          <img :src="form.identifyNagativeImage" style="width: 300px;height: 300px"/>
        </el-form-item>
        <el-form-item label="类型" prop="isAuthentication">
          <el-radio-group v-model="form.isAuthentication">
            <el-radio
              v-for="dict in attestList"
              :key="dict.value"
              :label="dict.value"
            >{{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="认证说明" prop="vExplain" v-if="form.isAuthentication === 2">
          <el-input v-model="form.vExplain"/>
        </el-form-item>
        <el-form-item label="拒绝理由" prop="investorSendInfo" v-if="form.isAuthentication === 3">
          <el-input v-model="form.investorSendInfo"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="form.isAuthentication > 1">
        <el-button type="primary" @click="submitForm(0)">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
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
      attestList: [{label: '待审核', value: 1}, {label: '认证', value: 2}, {label: '审核不通过', value: 3}],
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
          {required: true, message: '认证说明不能为空', trigger: 'blur'}
        ],
        investorSendInfo: [
          {required: true, message: '拒绝理由不能为空', trigger: 'blur'}
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
        this.opens('主播禁播备注', row, row.isBan)
      } else {
        this.banDetail(row, row.isBan)
      }
    },
    opens(hint, row, type) {
      var that = this
      this.$prompt(hint, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
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
        this.$notify.error('修改禁播状态失败')
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
      this.title = '添加虚拟主播'
    },
    sendRoomMsg() {
      this.reset()
      this.sendMsg = true
      this.title = '直播间小助手'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id
      getLiveUser(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改主播信息'
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
            that.$confirm('是否确认' + (that.form.isAuthentication === 3 ? '不' : '') + '通过审核此主播?',
              '警告',
              {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(function () {
              return updateLiveUser(that.form)
            }).then(response => {
              if (response.code === 200) {
                that.msgSuccess('审核成功')
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
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
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
        this.title = '修改主播信息'
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
        that.$notify.success("开播成功")
        that.getList();
      }).catch((err) => {
        that.$notify.error("开播失败")
      })
    },
    //关播
    closeLive(row) {
      var that = this;
      this.loading = true
      closeLive({id: row.id}).then(response => {
        that.$notify.success("关播成功")
        that.getList();
      }).catch((err) => {
        that.$notify.error("关播失败")
      })
    },
    //踢出主播
    kickOutLive(row) {
      const id = row.id
      const t = this;
      this.$confirm('确定踢出主播昵称:[' + row.nickName + ']?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        kickOutLiveUser(id).then(response => {
          t.$notify.success("踢出成功")
          t.getList();
        }).catch((err) => {
          t.$notify.error("踢出主播失败")
        })
      })
    },

    kickOutFamilyBulk() {
      this.$confirm('确定批量踢出家族吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
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
          this.$notify.error("踢出家族失败")
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
          this.$notify.success('状态修改成功')
        } else {
          this.$notify.error('状态修改失败')
        }
      }).catch(() => {
        this.$notify.error('网络异常')
      }).finally(() => {
        this.getList()
      })
    },
    /** end isAuthentication type change here*/


    joinFamilyBulk() {
      this.$prompt('批量加入家族', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^(\-|\+)?\d+(\.\d+)?$/,
        inputErrorMessage: '请输入数字类型'
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
          this.$notify.error('加入家族失败')
        })
      }).catch(() => {
      });
    },

    fmFamilyChieftain(row) {
      return row.familyChieftain === 1 ? '是' : '否'
    }

  }
}
</script>

<style>

#user-ids{
  width: 300px
}

@media only screen and (min-width: 1300px){
  .is-authentication,.phone{
    margin-left: 47px;
  }
}

@media only screen and (min-width: 1400px){
    .is-ban,.handle-btn{
      margin-left: 0px;
    }
}
@media only screen and (min-width: 1500px){
  .is-authentication,.phone{
    margin-left: 0;
  }
  .is-ban,.handle-btn{
    margin-left: 47px;
  }
}

@media only screen and (min-width: 1600px){
  .is-ban{
    margin-left: 47px;
  }
  .handle-btn{
    margin-left: 0;
  }
}


@media only screen and (min-width: 1800px) {
  .is-authentication,.is-ban{
    margin-left: 0;
  }
  .mobile{
    margin-left: 47px;
  }
}

</style>
