<template>
  <div>
    <!-- 导入表 -->
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :title="title"
      :visible.sync="visible"
      width="1435px"
      top="5vh"
      append-to-body
    >
      <!--顶部按钮-->
      <div class="page-tab" style="margin-bottom: 20px">
        <button type="button" class="el-button el-button--primary el-button--mini is-plain"
                @click="change(3, $t('members.memberInfo.more.exCred') )">
          <span>{{ $t('members.memberInfo.more.exCred') }}</span>
        </button>
        <button type="button" class="el-button el-button--primary el-button--mini is-plain"
                @click="change(1, $t('members.memberInfo.more.threeWay') )">
          <span>{{ $t('members.memberInfo.more.threeWay') }}</span>
        </button>
        <button type="button" class="el-button el-button--primary el-button--mini is-plain"
                @click="change(5, $t('members.memberInfo.more.bCard') )">
          <span>{{ $t('members.memberInfo.more.bCard') }}</span>
        </button>
        <button type="button" class="el-button el-button--primary el-button--mini is-plain"
                @click="change(10, $t('members.memberInfo.more.sms') )">
          <span>{{ $t('members.memberInfo.more.sms') }}</span>
        </button>
        <button type="button" class="el-button el-button--primary el-button--mini is-plain"
                @click="change(11, $t('members.memberInfo.more.rCp') )">
          <span>{{ $t('members.memberInfo.more.rCp') }}</span>
        </button>
        <button type="button" class="el-button el-button--primary el-button--mini is-plain"
                @click="change(13, $t('members.memberInfo.more.rIc') )">
          <span>{{ $t('members.memberInfo.more.rIc') }}</span>
        </button>

        <!--Follow Members tab added by rajesh index:16 represent follow members-->
        <button type="button" class="el-button el-button--primary el-button--mini is-plain"
                @click="change(16, $t('members.memberInfo.more.fAnc') )">
          <span>{{ $t('members.memberInfo.more.fAnc') }}</span>
        </button>
        <!--End follow members tab here  -->

        <button type="button" class="el-button el-button--primary el-button--mini is-plain"
                @click="change(17, $t('members.memberInfo.more.gAnc') )">
          <span>{{ $t('members.memberInfo.more.gAnc') }}</span>
        </button>

        <button type="button" class="el-button el-button--success el-button--mini is-plain"
                @click="change(2, $t('members.memberInfo.more.fDet') )">
          <span>{{ $t('members.memberInfo.more.fDet') }}</span>
        </button>

        <button
          type="button"
          class="el-button el-button--success el-button--mini is-plain"
          @click="change(6, $t('members.memberInfo.more.rPass') )"
          v-has-permi="['member:memberInfo:resetBox']">
          <span>{{ $t('members.memberInfo.more.rPass') }}</span>
        </button>

        <button
          type="button"
          class="el-button el-button--success el-button--mini is-plain"
          @click="change(7, $t('members.memberInfo.more.rwPass') )"
          v-has-permi="['member:memberInfo:resetTx']">
          <span>{{ $t('members.memberInfo.more.rwPass') }}</span>
        </button>

        <button type="button"
                class="el-button el-button--primary el-button--mini is-plain"
                @click="change(4, $t('members.memberInfo.more.rlPass') )">
          <span>{{ $t('members.memberInfo.more.rlPass') }}</span></button>

        <button
          type="button"
          class="el-button el-button--success el-button--mini is-plain"
          @click="change(8, $t('members.memberInfo.more.cFix') )"
          v-has-permi="['member:memberInfo:bcodeRepair']">
          <span>{{ $t('members.memberInfo.more.cFix') }}</span>
        </button>

        <button type="button" class="el-button el-button--success el-button--mini is-plain"
                @click="change(9, $t('members.memberInfo.more.mVip') )">
          <span>{{ $t('members.memberInfo.more.mVip') }}</span>
        </button>

        <button type="button" class="el-button el-button--success el-button--mini is-plain"
                @click="change(12, $t('members.memberInfo.more.imban') )">
          <span>{{ $t('members.memberInfo.more.imban') }}</span>
        </button>

        <button type="button" class="el-button el-button--success el-button--mini is-plain"
                @click="change(15, $t('members.memberInfo.more.dShow') )">
          <span>{{ $t('members.memberInfo.more.dShow') }}</span>
        </button>
      </div>


      <!--积分明细-->
      <el-row v-if="index===1">
        <el-table @row-click="clickRow" ref="table" :data="dbTableList" height="460px" v-loading="loading">
          <el-table-column prop="name" :label=" $t('members.memberInfo.more.gName') " :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="value" :label=" $t('members.memberInfo.more.amt') " :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="createTime" :label=" $t('global.operationColumn') ">
            <template v-slot="{row}" v-if="index===1">
              <el-button @click="gameEsc(row)">{{ $t('members.memberInfo.more.lDiv') }}</el-button>
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
          <el-form-item :label=" $t('members.memberInfo.more.amtEx') " prop="score">
            <el-input v-model="form.score" type="number" :placeholder=" $t('members.memberInfo.more.pAmt') "/>
          </el-form-item>
          <el-form-item :label=" $t('members.memberInfo.more.dType') " prop="moneydes">
            <el-select v-model="form.moneydes" :placeholder=" $t('members.memberInfo.more.dType') " clearable size="small">
              <el-option
                v-for="item in moneydesOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label=" $t('members.memberInfo.more.pRem') " prop="remarkPay">
            <el-input v-model="form.remarkPay" :placeholder=" $t('members.memberInfo.more.pNote') "/>
          </el-form-item>
          <el-form-item :label=" $t('members.memberInfo.more.exCredRem') " prop="mk">
            <el-input v-model="form.mk" :placeholder=" $t('members.memberInfo.more.pNoteR') "/>
          </el-form-item>
          <el-form-item :label=" $t('members.memberInfo.more.oRem') " prop="ordermk">
            <el-input v-model="form.ordermk" :placeholder=" $t('members.memberInfo.more.pfOM') "/>
          </el-form-item>
          <el-form-item :label=" $t('members.memberInfo.more.amtCoded') " prop="betMoney">
            <el-input v-model="form.betMoney" type="number" :placeholder=" $t('members.memberInfo.more.alsoCode') "
                      @blur="codeMoney(form.betMoney,form.score)"/>
          </el-form-item>
          <el-form-item :label=" $t('members.memberInfo.more.cMult') " prop="beatNum">
            <el-input v-model="form.beatNum" type="number"
                      :placeholder=" $t('members.memberInfo.more.peAC') "/>
          </el-form-item>
          <el-form-item :label=" $t('members.memberInfo.more.gCaptcha') " prop="googleAuthCode">
            <el-input v-model="form.googleAuthCode" :placeholder=" $t('members.memberInfo.more.pgAC') "/>
          </el-form-item>
        </el-form>
      </el-row>
      <!--重置密码-->
      <el-row v-if="index===4">
        <el-form ref="form" :model="form" :rules="rules" label-width="110px">
          <el-form-item :label=" $t('members.memberInfo.more.resPass') " prop="password">
            <el-input v-model="form.password" :placeholder=" $t('members.memberInfo.more.pNP') "/>
          </el-form-item>
          <el-form-item :label=" $t('members.memberInfo.more.gvc') " prop="googleAuthCode">
            <el-input v-model="form.googleAuthCode" :placeholder=" $t('members.memberInfo.more.pgvc') "/>
          </el-form-item>
        </el-form>
      </el-row>
      <!--发送短信-->
      <el-row v-if="index===10">
        <el-form label-width="110px">
          <el-form-item :label=" $t('members.memberInfo.more.sMess') ">
            <el-select
              filterable
              v-model="msg"
              :placeholder=" $t('members.memberInfo.more.psms') "
              clearable
              size="small"
              style="width: 240px"
            >
              <el-option
                v-for="dict in msgList "
                :key="dict.dictValue"
                :value="dict.dictValue"
                :label="dict.dictLabel"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-row>
      <!--重置手机号 update phone number-->
      <el-row v-if="index===11">
        <el-form ref="mobileForm" label-width="110px" :model="mobileForm" :rules="mobileRules">
          <el-form-item :label=" $t('members.memberInfo.more.ocpn') " prop="phone">
            <el-input v-model="mobileForm.phone" :placeholder=" $t('members.memberInfo.more.pocpn') " readonly class="col-87pr mr10"/>
            <el-button type="primary" @click="fullMobile()" v-has-permi="['member:memberInfo:fullMobile']">{{ $t('members.memberInfo.more.vCp') }}
            </el-button>
          </el-form-item>
          <el-form-item :label=" $t('members.memberInfo.more.ncp') " prop="newMobile">
            <el-input v-model="mobileForm.newMobile" :placeholder=" $t('members.memberInfo.more.pncp') "/>
          </el-form-item>
          <el-form-item :label=" $t('members.memberInfo.more.gvc') " prop="googleAuthCode">
            <el-input v-model="mobileForm.googleAuthCode" :placeholder=" $t('members.memberInfo.more.pgvc') "/>
          </el-form-item>
          <!--          <el-form-item>-->
          <!--            <el-button type="primary" @click="updateMobile()" v-has-permi="['member:memberInfo:updateMobile']">确 定-->
          <!--            </el-button>-->
          <!--          </el-form-item>-->
        </el-form>
      </el-row>
      <!--重置邀请码 reset invitation code-->
      <el-row v-if="index===13">
        <el-form ref="formInviterCode" :model="form" :rules="inviterCodeRules" label-width="110px">
          <el-form-item :label=" $t('members.memberInfo.more.ric') " prop="inviterCode">
            <el-input v-model="form.inviterCode" :placeholder=" $t('members.memberInfo.more.peic') "/>
          </el-form-item>
          <el-form-item :label=" $t('members.memberInfo.more.gvc') " prop="googleAuthCode">
            <el-input v-model="form.googleAuthCode" :placeholder=" $t('members.memberInfo.more.pgvc') "/>
          </el-form-item>
        </el-form>
      </el-row>
      <!--域名展示-->
      <el-row v-if="index===15">
        <el-form label-width="110px">
          <el-form-item :label=" $t('members.memberInfo.more.lDom') ">
            {{ this.registerDomain }}
          </el-form-item>
          <el-form-item :label=" $t('members.memberInfo.more.rDomn') ">
            {{ this.LoginDomain }}
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
          <el-table-column align="center" prop="realName" :label=" $t('global.realName') " :show-overflow-tooltip="true"
                           min-width="120">
            <template v-slot="{row}" v-if="index===5">
              <el-input v-model="row.realName"></el-input>
            </template>
          </el-table-column>

          <el-table-column align="center" prop="bankName" :label=" $t('members.memberInfo.more.bName') " :show-overflow-tooltip="true"
                           min-width="135">
            <template v-slot="{row}" v-if="index===5">
              <el-select filterable
                         v-model="row.bankId">
                <el-option v-for="dict in bankListOptions"
                           :key="dict.id"
                           :label="dict.bankName"
                           :value="dict.id"/>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="bankAccount" :label=" $t('members.memberInfo.more.bcNum') " :show-overflow-tooltip="true" min-width="150"
                           align="center">
            <template v-slot="{row}" v-if="index===5">
              <el-input v-model="row.bankAccount"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="bankAddress" :label=" $t('members.memberInfo.more.bAdd') " :show-overflow-tooltip="true"
                           min-width="140">
            <template v-slot="{row}" v-if="index===5">
              <el-input v-model="row.bankAddress"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" :label=" $t('members.memberInfo.more.bTime') " :show-overflow-tooltip="true" min-width="110"
                           align="center"></el-table-column>
          <el-table-column :label=" $t('global.operationColumn') " min-width="140" align="center">
            <template v-slot="{row}" v-if="index===5">
              <el-button
                @click="unbind(row)"
                v-show="row.dv==1"
                type="primary"
                disabled
                size="mini"
                v-has-permi="['member:memberInfo:unbindCard']"
              >{{ $t('members.memberInfo.more.mcUnb') }}
              </el-button>
              <el-button
                @click="unbind(row)"
                v-show="row.dv==0"
                type="primary"
                size="mini"
                v-has-permi="['member:memberInfo:unbindCard']"
              >{{ $t('members.memberInfo.more.subUnb') }}
              </el-button>
              <el-button
                @click="changeBank(row)"
                size="mini"
                type="warning"
                style="margin-left: 1px"
                v-has-permi="['member:memberInfo:changeBank']"
              >{{ $t('members.memberInfo.more.cMod') }}
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
      <!--   关注主播- Follow the anchor created by Rajesh-->
      <el-row v-if="index===16">
        <el-table
          @row-click="clickRow"
          ref="table"
          :data="dbTableList"
          @selection-change="handleSelectionChange"
          height="460px"
          v-loading="loading">
          <el-table-column :label=" $t('members.memberInfo.more.hid') " align="center" prop="id" min-width="120px"/>
          <el-table-column :label=" $t('members.memberInfo.more.nAnc') " align="center" prop="nickName" min-width="120px"/>
        </el-table>
      </el-row>
      <!--  END 关注主播- Follow the anchor function created by Rajesh -->
      <el-row v-if="index===17">
        <el-table
          @click="clickRow"
          :data="guard"
          height="460px"
          v-loading="loading">
          <el-table-column :label=" $t('members.memberInfo.more.hid') "  align="center" prop="anchorId"     min-width="120px"/>
          <el-table-column :label=" $t('members.memberInfo.more.gType') " align="center" prop="type"  :formatter="guardianTypeFormat"       min-width="120px"/>
          <el-table-column :label=" $t('members.memberInfo.more.startTime') " align="center" prop="startTime" min-width="120px"/>
          <el-table-column :label=" $t('members.memberInfo.more.exTime') " align="center" prop="guardEndTime" min-width="120px"/>
        </el-table>
      </el-row>
      <!-- footer slots adding to all models -->
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handlePassword"
          v-show="index === 4"
          v-has-permi="['member:memberInfo:resetPwd']"
        >{{ $t('members.memberInfo.more.det') }}
        </el-button>
        <el-button
          type="primary"
          @click="handleImportTable"
          v-show="index === 3"
          v-has-permi="['member:memberInfo:addScore']"
        >{{ $t('members.memberInfo.more.det') }}
        </el-button>

        <el-button
          type="primary" @click="updateMobile()"
          v-show="index ===11"
          v-has-permi="['member:memberInfo:updateMobile']">
          {{ $t('members.memberInfo.more.det') }}
        </el-button>

        <el-button
          type="primary"
          @click="sendMsg()"
          v-show="index ===10"
          v-has-permi="['member:memberInfo:sendMsg']">
          {{ $t('members.memberInfo.more.det') }}
        </el-button>

        <el-button
          type="primary"
          v-show="index===13"
          @click="updateInviterCode()">
          {{ $t('members.memberInfo.more.det') }}
        </el-button>

        <el-button @click="visible = false">{{ $t('global.cancelButton') }}</el-button>
      </div>
      <!--  end footer slots for all dialog models-->
    </el-dialog>
    <!-- 修改vip等级 -->
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :title=" $t('members.memberInfo.more.mVIP') "
      :visible.sync="showVip"
      width="400px"
      append-to-body
      :show-close="false"
      :close-on-press-escape="false"
    >{{ $t('members.memberInfo.more.vl') }}
      <el-input v-model="vip"/>
      {{ $t('global.nickname') }}
      <el-input v-model="nickName"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showVip = !showVip">{{ $t('members.memberInfo.more.cancel') }}</el-button>
        <el-button
          type="primary"
          :disabled="showVipDisabled"
          @click="updateVip"
          v-has-permi="['member:memberInfo:updateVip']"
        >{{ $t('members.memberInfo.more.sub') }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :title=" $t('members.memberInfo.more.dEnab') "
      :visible.sync="im"
      width="600px"
      append-to-body
      :show-close="false"
      :close-on-press-escape="false">
      {{ $t('members.memberInfo.more.remban') }} {{ this.ImList.ShuttedUntil }}
      <br/>
      {{ $t('members.memberInfo.more.mAcc') }} {{ this.ImList.Member_Account }}
      <br/>
      {{ $t('global.nickname') }} {{ this.ImList.nickName }}
      <br/>
      {{ $t('members.memberInfo.more.imbantime') }}
      <br/>
      <br/>
      <div>{{ $t('members.memberInfo.more.btime') }}
        <el-input width="200px" v-model="banSpeakTime" type="number"/>
      </div>
      <br/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="im = !im">{{ $t('members.memberInfo.more.cancel') }}</el-button>
        <el-button
          type="primary"
          :disabled="showImDisabled"
          @click="updateIm"
          v-has-permi="['member:memberInfo:imBan']"
        >{{ $t('members.memberInfo.more.snow') }}
        </el-button>
      </div>
    </el-dialog>
    <TableShow ref="tableShow"></TableShow>
  </div>

</template>

<script>
import {gameBalance, gameEsc} from '@/api/platform-web/game/base'
import {
  memberWithdrawLog,
  addScore,
  resetPassword,
  cardList,
  resetSafe,
  unbindCard,
  changeBank,
  getMemberInfo,
  resetWithdrawal, memberBcodeRepair, updateVip,
  sendMsg, updateMobile, fullMobile, imDelete, updateInviterCode, followList, listLiveGuard
} from '@/api/platform-web/member/memberInfo'
import {userImMute} from '@/api/platform-web/live-web/ImMute'
// import { hideKMobile } from '@/utils/mobile.js'
import TableShow from '@/views/pay/memberWithdrawLog/tableShow.vue';
import {getMemberWithdrawReport} from "@/api/platform-web/pay/memberWithdrawLog";
import {positiveInteger, validMobile, validNumber} from '../../../utils/validate'
import {checkTwoLogin} from "@/utils/permission";
import {listBankList} from "@/api/platform-web/pay/bankList";

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
      registerDomain: null,
      LoginDomain: null,
      guardianType: [],
      //弹出框标题
      title: '加分',
      //页面编码
      index: 3,
      // 遮罩层
      visible: false,
      // 选中数组值
      tables: [],
      bankListOptions: [],
      ImList: {
        Member_Account: null,
        nickName: null,
        ShuttedUntil: null
      },
      //入款类型
      moneydesOptions: [{
        value: '1',
        label: '人工入款'
      },
        {
          value: '2',
          label: '优惠活动'
        }
      ],
      //加分提交的数据
      form: {
        beatNum: null,
        googleAuthCode: null,
        id: null,
        mk: null,
        moneydes: null,
        ordermk: null,
        remarkPay: null,
        score: null,
        betMoney: null
      },
      // 总条数
      total: 0,
      // 表数据
      dbTableList: [],
      guard: [],
      queryLiveGuardParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
      },
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
          {required: true, message: this.$t('members.memberInfo.more.old') , trigger: 'blur'},
          {max: 100, message: this.$t('members.memberInfo.more.lold') },
          {validator: validMobile, trigger: "blur"}
        ],
        newMobile: [
          {required: true, message: this.$t('members.memberInfo.more.newcp') , trigger: 'blur'},
          {max: 11, message: this.$t('members.memberInfo.more.lnewcp') },
          {validator: validMobile, trigger: "blur"}
        ],
        googleAuthCode: [
          {required: true, message: this.$t('members.memberInfo.more.gcapnot') , trigger: 'blur'},
          {validator: validNumber, trigger: "blur"}
        ]
      },
      // 加分表单校验
      inviterCodeRules: {
        inviterCode: [
          {required: true, message: this.$t('members.memberInfo.more.ricbe') , trigger: 'blur'},
          {max: 500, message: this.$t('members.memberInfo.more.lricbe') }
        ],
        googleAuthCode: [
          {required: true, message: this.$t('members.memberInfo.more.gCap') , trigger: 'blur'},
          {validator: validNumber, trigger: "blur"}
        ]
      },
      // 加分表单校验
      rules: {
        password: [
          {required: true, message: this.$t('members.memberInfo.more.resPassEmp') , trigger: 'blur'},
          {max: 30, message: this.$t('members.memberInfo.more.rpl') }
        ],
        score: [
          {required: true, message: this.$t('members.memberInfo.more.epcannot') , trigger: 'blur'}
        ],
        moneydes: [
          {required: true, message: this.$t('members.memberInfo.more.ennot') , trigger: 'blur'}
        ],
        mk: [
          {required: true, message: this.$t('members.memberInfo.more.cinot') , trigger: 'blur'}, {
            max: 200,
            message: this.$t('members.memberInfo.more.lengthcomm')
          }
        ],
        ordermk: [
          {required: true, message: this.$t('members.memberInfo.more.onemp') , trigger: 'blur'}, {
            max: 200,
            message: this.$t('members.memberInfo.more.lengthcomm')
          }
        ],
        googleAuthCode: [
          {required: true, message: this.$t('members.memberInfo.more.gCap') , trigger: 'blur'},
          {validator: validNumber, trigger: "blur"}
        ]
      }
    }
  },
  // /*监听器,监听单个变量,param就是data的变量*/
  // watch: {
  //   vip: function (newVal, oldVal) {
  //     if (newVal < this.oldVip) {
  //       this.$notify.error('vip等级只能大于之前的等级')
  //       this.showVipDisabled = true
  //     } else {
  //       this.showVipDisabled = false
  //     }
  //   }
  // },
  created() {
    this.getDicts('member_msg').then(response => {
      this.msgList = response.data
    })

    this.getDicts('guardian_type').then(response => {
      this.guardianType = response.data
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
            that.$notify.success( this.$t('members.memberInfo.more.cellChange') )
            that.visible = false
            that.$emit('refMemeberData')
          })
        }
      })
    },
    fullMobile() {
      if (checkTwoLogin()) {
        fullMobile(this.memberId).then((res) => {
          this.mobileForm = res.data
          if (!this.mobileForm.phone) {
            this.$message.error( this.$t('members.memberInfo.more.cellnot') )
          } else {
            this.$message.success( this.$t('members.memberInfo.more.cellComp') )
          }
        })
      }
    },
    updateInviterCode() {
      var that = this
      this.$refs['formInviterCode'].validate(valid => {
        if (valid) {
          updateInviterCode(this.form.inviterCode, this.form.googleAuthCode, this.memberId).then((res) => {
            that.$notify.success( this.$t('members.memberInfo.more.icMod') )
            that.visible = false
            that.$emit('refMemeberData')
          })
        }
      })

    },
    sendMsg() {
      sendMsg(this.msg, this.memberId).then((res) => {
        if (res.code === 0) {
          this.resetForm('form')
          this.visible = false
          this.$notify.success( this.$t('members.memberInfo.more.sendSucc') )
          this.$emit('refMemeberData')
        }
      }).catch((err) => {
        this.$notify.error(error)
      }).finally(() => {
        this.loading = false
      })
    },
    gameEsc(row) {
      this.loading = true
      gameEsc(row.type, this.memberId).then((res) => {
        if (res.code === 200) {
          this.$notify.success( this.$t('members.memberInfo.more.dsSucc') )
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
          return this.$t('members.memberInfo.more.bTran')
      }
      return this.$t('members.memberInfo.more.unk')
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
      this.$confirm( this.$t('members.memberInfo.more.bci') , this.$t('global.promptTitle') , {
        confirmButtonText: this.$t('members.memberInfo.more.det') ,
        cancelButtonText: this.$t('members.memberInfo.more.cancel') ,
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
          message: this.$t('members.memberInfo.more.cnced')
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
          hint = this.$t('members.memberInfo.more.sres')
          this.open(hint, 1)
          break
        case 7 :
          hint = this.$t('members.memberInfo.more.pgvc')
          this.open(hint, 2)
          break
        case 8 :
          hint = this.$t('members.memberInfo.more.pgvc')
          this.open(hint, 3)
          break
        case 9 :
          hint = this.$t('members.memberInfo.more.pvl')
          this.open(hint, 4)
          break
        case 12 :
          hint = this.$t('members.memberInfo.more.imban')
          this.open(hint, 5)
          break
        case 2 :
          hint = this.$t('members.memberInfo.more.fDet')
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
          confirmButtonText: this.$t('members.memberInfo.more.det') ,
          cancelButtonText: this.$t('members.memberInfo.more.cancel') ,
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: this.$t('members.memberInfo.more.succOp')
          })
          resetSafe({userId: this.memberId}).then((res) => {
            if (res.code === 0) {
              this.$notify.success( this.$t('members.memberInfo.more.rsSucc') )
            } else {
              this.$notify.error( this.$t('members.memberInfo.more.fSafe') )
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('members.memberInfo.more.cnced')
          })
        })
      } else if (type == 2) {
        this.$prompt(hint, this.$t('global.promptTitle') , {
          confirmButtonText: this.$t('members.memberInfo.more.det') ,
          cancelButtonText: this.$t('members.memberInfo.more.cancel') ,
          inputPattern: /^[0-9]{1,10}$/,
          inputErrorMessage: this.$t('members.memberInfo.more.fvcnc') ,
        }).then(({value}) => {
          resetWithdrawal({
            googleAuthCode: value,
            id: this.memberId
          }).then((res) => {
            if (res.code === 0) {
              this.$notify.success( this.$t('members.memberInfo.more.rws') )
            } else {
              this.$notify.error( this.$t('members.memberInfo.more.rwf') )
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('members.memberInfo.more.cinp')
          })
        })
      } else if (type == 3) {
        this.$prompt(hint,  this.$t('global.promptTitle') , {
          confirmButtonText: this.$t('members.memberInfo.more.det') ,
          cancelButtonText: this.$t('members.memberInfo.more.cancel') ,
          inputPattern: /^[0-9]{1,10}$/,
          inputErrorMessage: this.$t('members.memberInfo.more.fvcnc') ,
        }).then(({value}) => {
          memberBcodeRepair({
            googleAuthCode: value,
            id: this.memberId
          }).then((res) => {
            if (res.code === 0) {
              this.$notify.success( this.$t('members.memberInfo.more.rdSucc') )
            } else {
              this.$notify.error( this.$t('members.memberInfo.more.fixCode') )
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('members.memberInfo.more.cinp')
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
      if (that.vip > 50) {
        this.$message.error( this.$t('members.memberInfo.more.maxVip') )
      } else if (that.vip < this.oldVip) {
        this.$message.error( this.$t('members.memberInfo.more.vipMod') )
      } else {
        updateVip({
          nickName: that.nickName,
          vip: that.vip,
          id: that.memberId
        }).then((res) => {
          console.info(res)
          if (res.code === 0) {
            that.oldVip = that.vip
            that.$message.success(res.data)
            that.showVip = false
            that.$emit('refMemeberData')
          } else if (res.code === 1) {
            that.$message.error(res.data)
          } else {
            that.$notify.error( this.$t('members.memberInfo.more.vipModF') )
          }
        })
      }
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
          listBankList({}).then(response => {
            this.bankListOptions = response.rows;
          })
          this.cardList()
          break
        case 12:
          this.getMemberImInfo()
          break
        case 15:
          this.getMemberInfo()
          break
        case 16:                     //added case 16 by rajesh
          this.followList()
          break
        case 17:
          this.queryLiveGuard()
          break
      }
    },
    //获取详细信息
    getMemberInfo() {
      this.loading = true
      getMemberInfo(this.memberId).then((res) => {
          if (res.code === 200) {
            if (res.data.linkUrl !== null) {
              this.dbTableList = res.data.linkUrl.split(",")
              this.registerDomain = this.dbTableList[0]
              this.LoginDomain = this.dbTableList[1]
              this.loading = false
            }
          }
        }
      )
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
        this.$notify.warning( this.$t('members.memberInfo.more.fThree') )
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
        this.$notify.warning( this.$t('members.memberInfo.more.flfund') )
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
          this.$message.success(res.msg)
          this.$emit('refMemeberData')
        } else {
          this.$message.warning(res.msg)
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
        this.$notify.warning('获取银行卡列表失败')
        this.loading = false
      })
      listBankList({}).then(response => {
        this.bankListOptions = response.rows;
        this.loading = false;
      })
    },

    //follow List function created by rajesh
    followList() {
      this.dbTableList = []
      this.loading = true
      followList({
        id: this.memberId,
        // _: new Date().getTime()
      }).then((res) => {
        this.dbTableList = res.data
        this.loading = false
      }).catch((error) => {
        this.$notify.warning( this.$t('members.memberInfo.more.ffollow') )
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
    codeMoney(betMoney, score) {
      if (betMoney != "" && betMoney != null) {
        this.form.beatNum = (betMoney / score).toFixed(2);
      }
    },
    queryLiveGuard(){
      this.queryLiveGuardParams.userId = this.memberId;
      listLiveGuard(this.queryLiveGuardParams).then(res => {
        this.guard = res.rows;
        this.loading = false;
      })
    },

    guardianTypeFormat(row, column) {
      return this.selectDictLabel(this.guardianType, row.type)
    },


  }
}
</script>
