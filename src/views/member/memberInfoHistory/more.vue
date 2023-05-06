<template>
  <div>
    <!-- 导入表 -->
      <el-dialog
        v-dialogDrag
        :close-on-click-modal="false"
        :title="title"
        :visible.sync="visible"
        width="1185px"
        top="5vh"
        append-to-body>
      <!--顶部按钮-->
      <div class="page-tab mb20">
        <button type="button"
                class="el-button el-button--primary el-button--mini is-plain" @click="change(3, $t('members.memberInfoHistory.more.eCred') )">
          <span>{{ $t('members.memberInfoHistory.more.eCred') }}</span>
        </button>
        <button type="button"
                class="el-button el-button--primary el-button--mini is-plain" @click="change(1, $t('members.memberInfoHistory.more.twGame') )">
          <span>{{ $t('members.memberInfoHistory.more.twGame') }}</span>
        </button>
        <button type="button"
                class="el-button el-button--primary el-button--mini is-plain" @click="change(5, $t('members.memberInfoHistory.more.bCard') )">
          <span>{{ $t('members.memberInfoHistory.more.bCard') }}</span>
        </button>
        <button type="button"
                class="el-button el-button--primary el-button--mini is-plain" @click="change(10, $t('members.memberInfoHistory.more.sms') )">
          <span>{{ $t('members.memberInfoHistory.more.sms') }}</span>
        </button>
        <button type="button"
                class="el-button el-button--primary el-button--mini is-plain" @click="change(4, $t('members.memberInfoHistory.more.rPass') )">
          <span>{{ $t('members.memberInfoHistory.more.rPass') }}</span>
        </button>
<!--        <button type="button" class="el-button el-button&#45;&#45;primary el-button&#45;&#45;mini is-plain" @click="change(11,'重置手机号')">-->
<!--          <span>重置手机号</span>-->
<!--        </button>-->

        <button type="button"
                class="el-button el-button--primary el-button--mini is-plain" @click="change(11, $t('members.memberInfoHistory.more.rcp') )">
          <span>{{ $t('members.memberInfoHistory.more.rcp') }}</span>
        </button>

        <button type="button"
                class="el-button el-button--primary el-button--mini is-plain" @click="change(13, $t('members.memberInfoHistory.more.ric') )">
          <span>{{ $t('members.memberInfoHistory.more.ric') }}</span>
        </button>

          <button type="button"
                  class="el-button el-button--success el-button--mini is-plain" @click="change(2, $t('members.memberInfoHistory.more.fdet') )">
            <span>{{ $t('members.memberInfoHistory.more.fdet') }}</span>
          </button>
          <button type="button"
                  class="el-button el-button--success el-button--mini is-plain" @click="change(6, $t('members.memberInfoHistory.more.rsafe') )" v-has-permi="['member:memberInfo:resetBox']">
            <span>{{ $t('members.memberInfoHistory.more.rsafe') }}</span>
          </button>
          <button type="button"
                  class="el-button el-button--success el-button--mini is-plain" @click="change(7, $t('members.memberInfoHistory.more.rwith') )" v-has-permi="['member:memberInfo:resetTx']">
            <span>{{ $t('members.memberInfoHistory.more.rwith') }}</span>
          </button>
          <button type="button"
                  class="el-button el-button--success el-button--mini is-plain" @click="change(8, $t('members.memberInfoHistory.more.cfix') )" v-has-permi="['member:memberInfo:bcodeRepair']">
            <span>{{ $t('members.memberInfoHistory.more.cfix') }}</span>
          </button>
          <button type="button"
                  class="el-button el-button--success el-button--mini is-plain" @click="change(9, $t('members.memberInfoHistory.more.mvip') )">
            <span>{{ $t('members.memberInfoHistory.more.mvip') }}</span>
          </button>
          <button type="button"
                  class="el-button el-button--success el-button--mini is-plain" @click="change(12, $t('members.memberInfoHistory.more.imban') )">
            <span>{{ $t('members.memberInfoHistory.more.imban') }}</span>
          </button>
        </div>

      <!--积分明细-->
      <el-row v-if="index===1">
        <el-table @row-click="clickRow" ref="table" :data="dbTableList" height="460px" v-loading="loading">
          <el-table-column prop="name" :label=" $t('members.memberInfoHistory.more.gname') " :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="value" :label=" $t('members.memberInfoHistory.more.amt') " :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="createTime" :label=" $t('global.operationColumn') ">
            <template v-slot="{row}" v-if="index===1">
              <el-button @click="gameEsc(row)">{{ $t('members.memberInfoHistory.more.ldiv') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!--资金明细-->
<!--      <el-row v-if="index===2">
        <el-table
          @row-click="clickRow"
          ref="table"
          :data="dbTableList"
          height="460px"
          v-loading="loading"
        >
          &lt;!&ndash;<el-table-column type="selection" width="55"></el-table-column>&ndash;&gt;
          <el-table-column prop="class_twoname" label="项目名称" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="t_value" label="项目值" :show-overflow-tooltip="true"></el-table-column>
        </el-table>
      </el-row>-->
      <!--加分-->
      <el-row v-if="index===3">
        <el-form ref="form" :model="form" :rules="rules" label-width="110px">
           <div class="el-row">
              <div class="el-col el-col-9">
                <el-form-item :label=" $t('members.memberInfoHistory.more.aep') " prop="score">
                  <el-input v-model="form.score" type="number" :placeholder=" $t('members.memberInfoHistory.more.pea') "/>
                </el-form-item>
              </div>
              <div class="el-col el-col-9">
                <el-form-item :label=" $t('members.memberInfoHistory.more.dtype') " prop="moneydes">
                  <el-select v-model="form.moneydes" :placeholder=" $t('members.memberInfoHistory.more.dtype') " clearable size="small">
                    <el-option
                      v-for="item in moneydesOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <el-form-item :label=" $t('members.memberInfoHistory.more.pRem') " prop="remarkPay">
              <el-input v-model="form.remarkPay" :placeholder=" $t('members.memberInfoHistory.more.pnote') "/>
            </el-form-item>
            <el-form-item :label=" $t('members.memberInfoHistory.more.eRem') " prop="mk">
              <el-input v-model="form.mk" placeholder=" $t('members.memberInfoHistory.more.prap') "/>
            </el-form-item>
            <el-form-item :label=" $t('members.memberInfoHistory.more.orem') " prop="ordermk">
              <el-input v-model="form.ordermk" :placeholder=" $t('members.memberInfoHistory.more.pfro') "/>
            </el-form-item>
            <el-form-item :label=" $t('members.memberInfoHistory.more.acoded') " prop="betMoney">
              <el-input v-model="form.betMoney" type="number" :placeholder=" $t('members.memberInfoHistory.more.aca') " @blur="codeMoney(form.betMoney,form.score)"/>
            </el-form-item>
            <el-form-item :label=" $t('members.memberInfoHistory.more.cmult') " prop="beatNum">
              <el-input v-model="form.beatNum" type="number" :placeholder=" $t('members.memberInfoHistory.more.peax') "/>
            </el-form-item>
            <el-form-item :label=" $t('members.memberInfoHistory.more.gcap') " prop="googleAuthCode">
              <el-input v-model="form.googleAuthCode" :placeholder=" $t('members.memberInfoHistory.more.pgac') "  />
            </el-form-item>
        </el-form>
      </el-row>
      <!--重置密码-->
      <el-row v-if="index===4">
          <el-form ref="form" :model="form" :rules="rules" label-width="110px">
            <el-form-item :label=" $t('members.memberInfoHistory.more.rpass') " prop="password">
              <el-input v-model="form.password" :placeholder=" $t('members.memberInfoHistory.more.penp') "/>
            </el-form-item>
            <el-form-item :label=" $t('members.memberInfoHistory.more.gvc') " prop="googleAuthCode">
              <el-input v-model="form.googleAuthCode" :placeholder=" $t('members.memberInfoHistory.more.pegvc') "/>
            </el-form-item>
          </el-form>
      </el-row>
      <!--重置邀请码-->
      <el-row v-if="index===13">
          <el-form ref="formInviterCode" :model="form" :rules="inviterCodeRules" label-width="110px">
            <el-form-item :label=" $t('members.memberInfoHistory.more.ric') " prop="inviterCode">
              <el-input v-model="form.inviterCode" :placeholder=" $t('members.memberInfoHistory.more.peic') "/>
            </el-form-item>
            <el-form-item :label=" $t('members.memberInfoHistory.more.gvc') " prop="googleAuthCode">
              <el-input v-model="form.googleAuthCode" :placeholder=" $t('members.memberInfoHistory.more.pegvc') "/>
            </el-form-item>
          </el-form>
      </el-row>
      <!--发送短信-->
      <el-row v-if="index===10">
        <el-form label-width="110px">
          <el-form-item :label=" $t('members.memberInfoHistory.more.smsm') ">
            <el-select  filterable
                        v-model="msg"
                        :placeholder=" $t('members.memberInfoHistory.more.psms') "
                        clearable
                        size="small"
                        class="col-w240">
              <el-option
                        v-for="dict in msgList "
                        :key="dict.dictValue"
                        :value="dict.dictLabel"
                        :label="dict.dictLabel"/>
            </el-select>
          </el-form-item>
        </el-form>
      </el-row>
      <!--重置手机号 display full number-->
      <el-row v-if="index===11">
          <el-form ref="mobileForm" label-width="110px" :model="mobileForm" :rules="mobileRules">
            <el-form-item :label=" $t('members.memberInfoHistory.more.ocpn') " prop="phone">
              <el-input v-model="mobileForm.phone" :placeholder=" $t('members.memberInfoHistory.more.peocpn') " class="col-85pr mr10" readonly/>
              <el-button type="primary" @click="fullMobile()" v-has-permi="['member:memberInfo:fullMobile']">{{ $t('members.memberInfoHistory.more.vfcpn') }}</el-button>
            </el-form-item>
            <el-form-item :label=" $t('members.memberInfoHistory.more.ncpn') " prop="newMobile">
              <el-input v-model="mobileForm.newMobile" :placeholder=" $t('members.memberInfoHistory.more.pencn') "/>
            </el-form-item>
            <el-form-item :label=" $t('members.memberInfoHistory.more.gvc') " prop="googleAuthCode">
              <el-input v-model="mobileForm.googleAuthCode" :placeholder=" $t('members.memberInfoHistory.more.pegvc') "/>
            </el-form-item>
          </el-form>
      </el-row>

      <!--银行卡-->
      <el-row v-if="index===5">
        <el-table
          @row-click="clickRow"
          ref="table"
          :data="dbTableList"
          @selection-change="handleSelectionChange"
          height="460px"
          v-loading="loading">
          <el-table-column prop="realName" :label=" $t('global.realName') " :show-overflow-tooltip="true" min-width="120">
            <template v-slot="{row}" v-if="index===5">
              <el-input v-model="row.realName"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="bankName" :label=" $t('members.memberInfoHistory.more.bname') " :show-overflow-tooltip="true" min-width="120">
            <template v-slot="{row}" v-if="index===5">
              <el-input v-model="row.bankName"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="bankAccount" :label=" $t('members.memberInfoHistory.more.bcnum') " :show-overflow-tooltip="true" min-width="180"
                           align="center">
            <template v-slot="{row}" v-if="index===5">
              <el-input v-model="row.bankAccount"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="bankAddress" :label=" $t('members.memberInfoHistory.more.badd') " :show-overflow-tooltip="true" min-width="150">
            <template v-slot="{row}" v-if="index===5">
              <el-input v-model="row.bankAddress"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" :label=" $t('members.memberInfoHistory.more.btime') " :show-overflow-tooltip="true" min-width="160"
                           align="center"
          ></el-table-column>
          <el-table-column :label=" $t('global.operationColumn') " min-width="200">
            <template v-slot="{row}" v-if="index===5">
              <el-button
                @click="unbind(row)"
                v-show="row.dv==1"
                type="primary"
                disabled
                size="mini"
                v-has-permi="['member:memberInfo:unbindCard']">{{ $t('members.memberInfoHistory.more.mcunb') }}
              </el-button>
              <el-button
                @click="unbind(row)"
                v-show="row.dv==0"
                type="primary"
                size="mini"
                v-has-permi="['member:memberInfo:unbindCard']">{{ $t('members.memberInfoHistory.more.scunb') }}
              </el-button>
              <el-button
                @click="changeBank(row)"
                size="mini"
                type="warning"
                style="margin-left: 0"
                v-has-permi="['member:memberInfo:changeBank']">{{ $t('members.memberInfoHistory.more.cmod') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"/>
      </el-row>

<!--  slots start from here-->
      <div slot="footer" class="dialog-footer">
        <el-button type="primary"
                   @click="handlePassword"
                   v-show="index === 4"
                   v-has-permi="['member:memberInfo:resetPwd']">{{ $t('members.memberInfoHistory.more.det') }}
        </el-button>

        <el-button type="primary"
                   @click="handleImportTable"
                   v-show="index === 3"
                   v-has-permi="['member:memberInfo:addScore']">{{ $t('members.memberInfoHistory.more.det') }}
        </el-button>

        <el-button type="primary"
                   @click="sendMsg()"
                   v-show="index === 10"
                   v-has-permi="['member:memberInfo:sendMsg']">{{ $t('members.memberInfoHistory.more.det') }}
        </el-button>

        <el-button type="primary"
                   @click="updateMobile()"
                   v-show="index===11"
                   v-has-permi="['member:memberInfo:updateMobile']">{{ $t('members.memberInfoHistory.more.det') }}
        </el-button>

        <el-button type="primary"
                   @click="updateInviterCode()"
                   v-show="index===13">{{ $t('members.memberInfoHistory.more.det') }}
        </el-button>

        <el-button @click="visible = false">{{ $t('global.cancelButton') }}</el-button>
      </div>
    </el-dialog>
    <!-- 禁用备注弹框 -->
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :title=" $t('members.memberInfoHistory.more.mvipln') "
      :visible.sync="showVip"
      width="400px"
      append-to-body
      :show-close="false"
      :close-on-press-escape="false">
      {{ $t('members.memberInfoHistory.more.vlvl') }}
      <el-input v-model="vip"/>
      {{ $t('global.nickname') }}
      <el-input v-model="nickName"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showVip = !showVip">{{ $t('members.memberInfoHistory.more.cnc') }}</el-button>
        <el-button
          type="primary"
          :disabled="showVipDisabled"
          @click="updateVip"
          v-has-permi="['member:memberInfo:updateVip']">{{ $t('members.memberInfoHistory.more.snow') }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :title=" $t('members.memberInfoHistory.more.dims') "
      :visible.sync="im"
      width="600px"
      append-to-body
      :show-close="false"
      :close-on-press-escape="false">
      {{ $t('members.memberInfoHistory.more.remban') }} {{ this.ImList.ShuttedUntil }}
      <br/>
      {{ $t('members.memberInfoHistory.more.macc') }} {{ this.ImList.Member_Account }}
      <br/>
      {{ $t('global.nickname') }} {{ this.ImList.nickName }}
      <br/>
      {{ $t('members.memberInfoHistory.more.imbtime') }}
      <br/>
      <br/>
      <div>{{ $t('members.memberInfoHistory.more.bant') }}
        <el-input width="200px" v-model="banSpeakTime" type="number"/>
      </div>
      <br/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="im = !im">{{ $t('members.memberInfoHistory.more.cnc') }}</el-button>
        <el-button
          type="primary"
          :disabled="showImDisabled"
          @click="updateIm"
          v-has-permi="['member:memberInfo:imBan']">{{ $t('members.memberInfoHistory.more.snow') }}
        </el-button>
      </div>
    </el-dialog>
    <TableShow ref="tableShow" ></TableShow>
  </div>

</template>

<script>
import { gameBalance, gameEsc } from '@/api/platform-web/game/base'
import {
  memberWithdrawLog,
  addScore,
  resetPassword,
  cardList,
  resetSafe,
  unbindCard,
  changeBank,
  resetWithdrawal,
  memberBcodeRepair,
  updateVip,
  sendMsg,
  updateMobile,
  fullMobile,
  imDelete,
  updateInviterCode,
  userImMute,
  getMemberWithdrawReport
} from '@/api/platform-web/member/memberInfoHistory'
// import { hideKMobile } from '@/utils/mobile.js'
import TableShow from '@/views/member/memberInfoHistory/tableShow.vue';
import { positiveInteger, validMobile, validNumber } from '../../../utils/validate'
import {checkTwoLogin} from "@/utils/permission";

export default {
  props: {
    /*    memberId: {
          required: false,
          default: null
        },
        memberCode: {
          required: false,
          default: 0
        }*/
  },
  components: {TableShow},
  data() {
    return {
      showVip: false,
      im: false,
      showVipDisabled: false,
      showImDisabled: false,
      msg: '',
      // 遮罩层
      loading: true,
      memberId: null,
      memberCode: null,
      vip: null,
      oldVip: null,
      nickName: null,
      banSpeakTime: null,
      msgList: [],
      mobileForm: {},
      //弹出框标题
      title: this.$t('members.memberInfoHistory.more.ecred'),
      //页面编码
      index: 3,
      // 遮罩层
      visible: false,
      // 选中数组值
      tables: [],
      ImList: {
        Member_Account: null,
        nickName: null,
        ShuttedUntil: null
      },
      //入款类型
      moneydesOptions: [{
        value: '1',
        label: this.$t('members.memberInfoHistory.more.snow')
      }],
      //加分提交的数据
      form: {
        beatNum: '',
        googleAuthCode: '',
        id: '',
        mk: '',
        remarkPay: '',
        moneydes: '',
        ordermk: '',
        score: '',
        betMoney:''
      },
      // 总条数
      total: 0,
      // 表数据
      dbTableList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10000,
        tableName: undefined,
        tableComment: undefined
      },
      //手机号校验规则
      mobileRules: {
        oldMobile: [
          { required: true, message: this.$t('members.memberInfoHistory.more.ocne'), trigger: 'blur' },
          {max: 100,message: this.$t('members.memberInfoHistory.more.lopn') },
          { validator: validMobile , trigger: "blur"  }
        ],
        newMobile: [
          { required: true, message: this.$t('members.memberInfoHistory.more.ncne'), trigger: 'blur' },
          {max: 11,message: this.$t('members.memberInfoHistory.more.lcne') },
          { validator: validMobile , trigger: "blur"  }
        ],
        googleAuthCode: [
          { required: true, message: this.$t('members.memberInfoHistory.more.gcce'), trigger: 'blur' },
          { validator: validNumber , trigger: "blur"  }
        ]
      },
      // 加分表单校验
      inviterCodeRules: {
        inviterCode: [
          { required: true, message: this.$t('members.memberInfoHistory.more.ricce'), trigger: 'blur' },
          { max: 500,message: this.$t('members.memberInfoHistory.more.lricce') }
        ],
        googleAuthCode: [
          { required: true, message: this.$t('members.memberInfoHistory.more.gcce'), trigger: 'blur' },
          { validator: validNumber , trigger: "blur"  }
        ]
      },
      // 加分表单校验
      rules: {
        password: [
          { required: true, message: this.$t('members.memberInfoHistory.more.rpassemp'), trigger: 'blur' },
          { max: 30,message: this.$t('members.memberInfoHistory.more.rpl') }
        ],
        score: [
          { required: true, message: this.$t('members.memberInfoHistory.more.taep'), trigger: 'blur' }
        ],
        moneydes: [
          { required: true, message: this.$t('members.memberInfoHistory.more.tetemp'), trigger: 'blur' }
        ],
        mk: [
          { required: true, message: this.$t('members.memberInfoHistory.more.tetemp'), trigger: 'blur' },{max: 200,message: this.$t('members.memberInfoHistory.more.tlci') }
        ],
        ordermk: [
          { required: true, message: this.$t('members.memberInfoHistory.more.once'), trigger: 'blur' },{max: 200,message: this.$t('members.memberInfoHistory.more.tlci') }
        ],
        googleAuthCode: [
          { required: true, message: this.$t('members.memberInfoHistory.more.gcce'), trigger: 'blur' },
          { validator: validNumber , trigger: "blur"  }
        ]
      }
    }
  },
  /*监听器,监听单个变量,param就是data的变量*/
  watch: {
    vip: function(newVal, oldVal) {
      if (newVal < this.oldVip) {
        this.$notify.error( this.$t('members.memberInfoHistory.more.vpl') )
        this.showVipDisabled = true
      } else {
        this.showVipDisabled = false
      }
    }
  },
  created() {
    this.getDicts('member_msg').then(response => {
      this.msgList = response.data
    })
  },
  methods: {
    funds(userId) {
      getMemberWithdrawReport(userId).then((res) => {
        this.$refs.tableShow.show(res.data);
      })
    },
    updateMobile() {
      var that = this
      this.$refs['mobileForm'].validate(valid => {
        if (valid) {
          this.mobileForm.memberId = this.memberId
          updateMobile(this.mobileForm).then((res) => {
            that.$notify.success( this.$t('members.memberInfoHistory.more.cpn') )
            that.visible = false
            that.$emit('refMemeberData')
          })
        }
      })
    },
    fullMobile() {
      if (checkTwoLogin()) {
        fullMobile(this.memberId).then((res) => {
          this.$message.success( this.$t('members.memberInfoHistory.more.cnd') )
          this.mobileForm = res.data
        })
      }
    },
    updateInviterCode() {
      var that = this
      this.$refs['formInviterCode'].validate(valid => {
        if (valid) {
          updateInviterCode(this.form.inviterCode, this.form.googleAuthCode, this.memberId).then((res) => {
            that.$notify.success( this.$t('members.memberInfoHistory.more.icms') )
            that.visible = false
            that.$emit('refMemeberData')
          })
        }
      })

    },
    sendMsg() {
      sendMsg(this.msg, this.memberId).then((res) => {

      }).catch((err) => {

      }).finally(() => {

      })
    },
    gameEsc(row) {
      this.loading = true
      gameEsc(row.type, this.memberId).then((res) => {
        if (res.code === 200) {
          this.$notify.success( this.$t('members.memberInfoHistory.more.dss') )
          this.gameBalance()
        } else {
          this.$notify.error(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    //银行卡类型格式化
    formatterBankType(row, column) {
      switch (column.type) {
        case 1:
          return this.$t('members.memberInfoHistory.more.bct')
      }
      return this.$t('members.memberInfoHistory.more.unk')
    },
    unbind(row) {
      this.loading = true
      const id = row.id
      const memberId = row.memberId
      unbindCard(id, memberId).then((res) => {
        this.msgSuccess(res.msg)
        this.cardList()
      }).finally(() => {
        this.loading = false
      })
    },
    changeBank(row) {
      this.$confirm( this.$t('members.memberInfoHistory.more.wcbc') , this.$t('global.promptTitle'), {
        confirmButtonText: this.$t('members.memberInfoHistory.more.det') ,
        cancelButtonText: this.$t('members.memberInfoHistory.more.cnc') ,
        type: 'warning'
      }).then(() => {
        this.loading = true
        changeBank(row).then((res) => {
          this.msgSuccess(res.msg)
          this.cardList()
        }).finally(() => {
          this.loading = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('members.memberInfoHistory.more.cancel')
        })
      })

    },

    //切换页面
    change(index, title) {
      this.index = index
      this.title = title
      this.reset()
      var hint = ''
      //如果是重置密码,保险箱,体现
      switch (index) {
        case 6 :
          hint = this.$t('members.memberInfoHistory.more.srs')
          this.open(hint, 1)
          break
        case 7 :
          hint = this.$t('members.memberInfoHistory.more.pegvc')
          this.open(hint, 2)
          break
        case 8 :
          hint = this.$t('members.memberInfoHistory.more.pegvc')
          this.open(hint, 3)
          break
        case 9 :
          hint = this.$t('members.memberInfoHistory.more.pevip')
          this.open(hint, 4)
          break
        case 12 :
          hint = this.$t('members.memberInfoHistory.more.imban')
          this.open(hint, 5)
          break
        case 2 :
          hint = this.$t('members.memberInfoHistory.more.imban')
          this.funds(this.memberId);
          break
      }
      //其他的就是获取列表
      this.getList()
    },
    reset() {
      // 总条数
      this.total = 0
      // 表数据
      this.dbTableList = []
    },
    //打开提示框
    open(hint, type) {
      if (type === 1) {
        this.$confirm(hint, this.$t('global.promptTitle') , {
          confirmButtonText: this.$t('members.memberInfoHistory.more.det'),
          cancelButtonText: this.$t('members.memberInfoHistory.more.cnc'),
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: this.$t('members.memberInfoHistory.more.sop')
          })
          resetSafe({ userId: this.memberId }).then((res) => {
            if (res.code === 0) {
              this.$notify.success( this.$t('members.memberInfoHistory.more.rss') )
            } else {
              this.$notify.error( this.$t('members.memberInfoHistory.more.frs') )
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('members.memberInfoHistory.more.cancel')
          })
        })
      } else if (type == 2) {
        this.$prompt(hint, this.$t('global.promptTitle') , {
          confirmButtonText: this.$t('members.memberInfoHistory.more.det'),
          cancelButtonText: this.$t('members.memberInfoHistory.more.cnc'),
          inputPattern: /^[0-9]{1,10}$/,
          inputErrorMessage: this.$t('members.memberInfoHistory.more.fvc'),
        }).then(({ value }) => {
          resetWithdrawal({
            googleAuthCode: value,
            id: this.memberId
          }).then((res) => {
            if (res.code === 0) {
              this.$notify.success( this.$t('members.memberInfoHistory.more.rws') )
            } else {
              this.$notify.error( this.$t('members.memberInfoHistory.more.rwf') )
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('members.memberInfoHistory.more.cip')
          })
        })
      } else if (type == 3) {
        this.$prompt(hint, this.$t('global.promptTitle') , {
          confirmButtonText: this.$t('members.memberInfoHistory.more.det'),
          cancelButtonText: this.$t('members.memberInfoHistory.more.cnc'),
          inputPattern: /^[0-9]{1,10}$/,
          inputErrorMessage: this.$t('members.memberInfoHistory.more.fvc'),
        }).then(({ value }) => {
          memberBcodeRepair({
            googleAuthCode: value,
            id: this.memberId
          }).then((res) => {
            if (res.code === 0) {
              this.$notify.success( this.$t('members.memberInfoHistory.more.rcds') )
            } else {
              this.$notify.error( this.$t('members.memberInfoHistory.more.fcdf') )
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('members.memberInfoHistory.more.cip')
          })
        })
      } else if (type == 4) {
        this.showVip = !this.showVip
      } else if (type == 5) {
        this.im = !this.im
      }

    },
    updateVip() {
      var that = this
      updateVip({
        nickName: that.nickName,
        vip: that.vip,
        id: that.memberId
      }).then((res) => {
        if (res.code === 0) {
          that.oldVip = that.vip
          that.$notify.success( this.$t('members.memberInfoHistory.more.vlms') )
          that.showVip = false
          that.$emit('refMemeberData')
        } else {
          that.$notify.error( this.$t('members.memberInfoHistory.more.vlmf') )
        }
      })
    },
    updateIm() {
      var that = this
      imDelete({
        banSpeakTime: that.banSpeakTime,
        id: that.memberId

      }).then((res) => {
        that.msgSuccess(res.msg)
        that.im = false
      })
    },
    // 显示弹框
    show(memberId, memberCode, vip, nickName, phone) {
      this.memberId = memberId
      this.memberCode = memberCode
      this.mobileForm.phone = phone
      // this.mobileForm.oldMobile = hideKMobile(phone)
      this.vip = vip
      this.oldVip = vip
      this.nickName = nickName
      this.getList()
      this.visible = true
    },
    clickRow(row) {
      this.$refs.table.toggleRowSelection(row)
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.tables = selection.map(item => item.tableName)
    },
    // 查询表数据
    getList() {
      switch (this.index) {
        case 1:
          this.gameBalance()
          break
        case 2:
          this.memberWithdrawLog()
          break
        case 5:
          this.cardList()
          break
        case 12:
          this.getMemberImInfo()
          break
      }
    },
    //获取im禁言
    getMemberImInfo() {
      this.loading = true
      userImMute(this.memberId).then((res) => {
          if (res.code === 200) {
            this.ImList = res.data[0]
            this.loading = false
          }
        }
      )
    },
    //获取积分列表
    gameBalance() {
      this.dbTableList = []
      this.loading = true
      gameBalance(this.memberId).then((res) => {
          if (res.code === 200) {
            this.dbTableList = res.data
            this.loading = false
          }
        }
      ).catch(() => {
        this.$notify.warning( this.$t('members.memberInfoHistory.more.fthree') )
        this.loading = false
      })
    },
    //获取资金明细列表
    memberWithdrawLog() {
      this.dbTableList = []
      this.loading = true
      memberWithdrawLog({
        id: this.memberId,
        _: new Date().getTime()
      }).then((res) => {
        if (res.code === 0) {
          this.dbTableList = res.data
          this.total = res.count
          this.loading = false
        }
      }).catch(() => {
        this.$notify.warning( this.$t('members.memberInfoHistory.more.ffund') )
        this.loading = false
      })
    },
    //加分提交接口
    addScore() {
      var that = this
      this.loading = true
      addScore({
        beatNum: this.form.beatNum,
        googleAuthCode: this.form.googleAuthCode,
        id: this.memberId,
        mk: this.form.mk,
        moneydes: this.form.moneydes,
        remarkPay: this.form.remarkPay,
        ordermk: this.form.ordermk,
        score: this.form.score
      }).then((res) => {
        if (res.code === 0) {
          this.resetForm('form')
          this.visible = false
          this.$notify.success(res.msg)
          this.$emit('refMemeberData')
        }
      }).finally(() => {
        this.loading = false
      })
    },
    //重置密码提交接口
    resetPassword() {
      this.loading = true
      resetPassword({
        password: this.form.password,
        googleAuthCode: this.form.googleAuthCode,
        id: this.memberId
      }).then((res) => {
        if (res.code === 0) {
          this.resetForm('form')
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
    //银行卡列表接口
    cardList() {
      this.dbTableList = []
      this.loading = true
      cardList({
        id: this.memberId,
        page: this.queryParams.pageNum,
        limit: this.queryParams.pageSize,
        orderBy: 'create_time desc',
        _: new Date().getTime()
      }).then((res) => {
        if (res.code === 0) {
          this.dbTableList = res.data
          this.total = res.count
          this.loading = false
        }
      }).catch((error) => {
        this.$notify.warning( this.$t('members.memberInfoHistory.more.fbcard') )
        this.loading = false
      })
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
    /** 导入按钮操作 */
    handleImportTable() {
      /*importTable({tables: this.tables.join(",")}).then(res => {
          this.msgSuccess(res.msg);
          if (res.code === 200) {
              this.visible = false;
              this.$emit("ok");
          }
      });*/
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.addScore()
        }
      })
    },
    /** 重置密码操作 */
    handlePassword() {
      /*importTable({tables: this.tables.join(",")}).then(res => {
          this.msgSuccess(res.msg);
          if (res.code === 200) {
              this.visible = false;
              this.$emit("ok");
          }
      });*/
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.resetPassword()
        }
      })

    },
    /** 计算打码倍数 */
    codeMoney(betMoney,score) {
      if (betMoney!=""&&betMoney!=null){
        this.form.beatNum= (betMoney/score).toFixed(2);
      }
    }
  }
}
</script>
