<template>
  <div>
    <!-- 导入表 -->
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :title="title"
      :visible.sync="visible"
      width="1365px"
      top="5vh"
      append-to-body
    >
      <!--顶部按钮-->
      <div class="page-tab" style="margin-bottom: 20px">
          <button type="button" class="el-button el-button--primary el-button--mini is-plain" @click="change(3,'加分')">
            <span>加分</span></button>
          <button type="button" class="el-button el-button--primary el-button--mini is-plain" @click="change(1,'三方游戏')">
            <span>三方游戏</span></button>
          <button type="button" class="el-button el-button--primary el-button--mini is-plain" @click="change(5,'银行卡')">
            <span>银行卡</span></button>
          <button type="button" class="el-button el-button--primary el-button--mini is-plain" @click="change(10,'发送短信')">
            <span>发送短信</span></button>
          <button type="button" class="el-button el-button--primary el-button--mini is-plain" @click="change(4,'重置密码')">
            <span>重置密码</span></button>
          <button type="button" class="el-button el-button--primary el-button--mini is-plain" @click="change(11,'重置手机号')">
            <span>重置手机号</span></button>
          <button type="button" class="el-button el-button--primary el-button--mini is-plain" @click="change(13,'重置邀请码')">
            <span>重置邀请码</span></button>

  <!--Follow Members tab added by rajesh index:16 represent follow members-->
          <button type="button" class="el-button el-button--primary el-button--mini is-plain" @click="change(16,'关注主播')">
            <span>关注主播</span></button>
  <!--End follow members tab here  -->

            <button type="button" class="el-button el-button--success el-button--mini is-plain" @click="change(2,'资金明细')">
              <span>资金明细</span>
            </button>

            <button
              type="button"
              class="el-button el-button--success el-button--mini is-plain"
              @click="change(6,'重置保险箱')"
              v-has-permi="['member:memberInfo:resetBox']">
              <span>重置保险箱</span>
            </button>

            <button
              type="button"
              class="el-button el-button--success el-button--mini is-plain"
              @click="change(7,'重置提现')"
              v-has-permi="['member:memberInfo:resetTx']">
              <span>重置提现</span>
            </button>

            <button
              type="button"
              class="el-button el-button--success el-button--mini is-plain"
              @click="change(8,'打码修复')"
              v-has-permi="['member:memberInfo:bcodeRepair']">
              <span>打码修复</span>
            </button>

            <button type="button" class="el-button el-button--success el-button--mini is-plain" @click="change(9,'修改Vip')">
              <span>修改Vip</span>
            </button>

            <button type="button" class="el-button el-button--success el-button--mini is-plain" @click="change(12,'IM禁言')">
              <span>IM禁言</span>
            </button>

            <button type="button" class="el-button el-button--success el-button--mini is-plain" @click="change(15,'域名展示')">
              <span>域名展示</span>
            </button>
        </div>


      <!--积分明细-->
      <el-row v-if="index===1">
        <el-table @row-click="clickRow" ref="table" :data="dbTableList" height="460px" v-loading="loading">
          <el-table-column prop="name" label="游戏名称" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="value" label="金额" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="createTime" label="操作">
            <template v-slot="{row}" v-if="index===1">
              <el-button @click="gameEsc(row)">下分</el-button>
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
          <el-form-item label="加分金额" prop="score">
            <el-input v-model="form.score" type="number" placeholder="请输入金额"/>
          </el-form-item>
          <el-form-item label="入款类型" prop="moneydes">
            <el-select v-model="form.moneydes" placeholder="入款类型" clearable size="small">
              <el-option
                v-for="item in moneydesOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付备注" prop="remarkPay">
            <el-input v-model="form.remarkPay" placeholder="请输入支付备注"/>
          </el-form-item>
          <el-form-item label="加分备注" prop="mk">
            <el-input v-model="form.mk" placeholder="请备注具体加分入金原因"/>
          </el-form-item>
          <el-form-item label="订单备注" prop="ordermk">
            <el-input v-model="form.ordermk" placeholder="补单请填写补单订单号，末开奖补回请填写开期号，无则填写为0"/>
          </el-form-item>
          <el-form-item label="待打码金额" prop="betMoney">
            <el-input v-model="form.betMoney" type="number" placeholder="还需打码金额"
                      @blur="codeMoney(form.betMoney,form.score)"/>
          </el-form-item>
          <el-form-item label="打码倍数" prop="beatNum">
            <el-input v-model="form.beatNum" type="number"
                      placeholder="请按顺序先输入加分金额，再输入待打码金额，系统会自动计算打码倍数。默认请填写1,如未打算打码可填写为0"/>
          </el-form-item>
          <el-form-item label="谷歌验证码" prop="googleAuthCode">
            <el-input v-model="form.googleAuthCode" placeholder="请输入谷歌验证码"/>
          </el-form-item>
        </el-form>
      </el-row>


      <!--重置密码-->
      <el-row v-if="index===4">
        <el-form ref="form" :model="form" :rules="rules" label-width="110px">
          <el-form-item label="重置密码" prop="password">
            <el-input v-model="form.password" placeholder="请输入新密码"/>
          </el-form-item>
          <el-form-item label="google验证码" prop="googleAuthCode">
            <el-input v-model="form.googleAuthCode" placeholder="请输入google验证码"/>
          </el-form-item>
        </el-form>
      </el-row>

      <!--发送短信-->
      <el-row v-if="index===10">
        <el-form label-width="110px">
          <el-form-item label="短信信息">
            <el-select
              filterable
              v-model="msg"
              placeholder="请选择发送的信息"
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
          <el-form-item label="旧手机号" prop="phone">
            <el-input v-model="mobileForm.phone" placeholder="请输入旧手机号" readonly class="col-87pr mr10"/>
            <el-button type="primary" @click="fullMobile()" v-has-permi="['member:memberInfo:fullMobile']">查看完整手机号
            </el-button>
          </el-form-item>
          <el-form-item label="新手机号" prop="newMobile">
            <el-input v-model="mobileForm.newMobile" placeholder="请输入新手机号"/>
          </el-form-item>
          <el-form-item label="google验证码" prop="googleAuthCode">
            <el-input v-model="mobileForm.googleAuthCode" placeholder="请输入google验证码"/>
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
          <el-form-item label="重置邀请码" prop="inviterCode">
            <el-input v-model="form.inviterCode" placeholder="请输入邀请码"/>
          </el-form-item>
          <el-form-item label="google验证码" prop="googleAuthCode">
            <el-input v-model="form.googleAuthCode" placeholder="请输入google验证码"/>
          </el-form-item>
        </el-form>
      </el-row>


      <!--域名展示-->
      <el-row v-if="index===15">
        <el-form label-width="110px">
          <el-form-item label="登录域名">
              {{this.registerDomain}}
          </el-form-item>
          <el-form-item label="注册域名">
            {{this.LoginDomain}}
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
          <el-table-column align="center" prop="realName" label="真实姓名" :show-overflow-tooltip="true" min-width="120">
            <template v-slot="{row}" v-if="index===5">
              <el-input v-model="row.realName"></el-input>
            </template>
          </el-table-column>

          <el-table-column align="center" prop="bankName" label="银行名称" :show-overflow-tooltip="true" min-width="135">
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
          <el-table-column prop="bankAccount" label="银行卡号" :show-overflow-tooltip="true" min-width="150"
                           align="center">
            <template v-slot="{row}" v-if="index===5">
              <el-input v-model="row.bankAccount"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="bankAddress" label="银行地址" :show-overflow-tooltip="true" min-width="140">
            <template v-slot="{row}" v-if="index===5">
              <el-input v-model="row.bankAddress"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label=" 绑定时间" :show-overflow-tooltip="true" min-width="110"
                           align="center"></el-table-column>
          <el-table-column label="操作" min-width="140" align="center">
            <template v-slot="{row}" v-if="index===5">
              <el-button
                @click="unbind(row)"
                v-show="row.dv==1"
                type="primary"
                disabled
                size="mini"
                v-has-permi="['member:memberInfo:unbindCard']"
              >主卡解绑
              </el-button>
              <el-button
                @click="unbind(row)"
                v-show="row.dv==0"
                type="primary"
                size="mini"
                v-has-permi="['member:memberInfo:unbindCard']"
              >副卡解绑
              </el-button>
              <el-button
                @click="changeBank(row)"
                size="mini"
                type="warning"
                style="margin-left: 1px"
                v-has-permi="['member:memberInfo:changeBank']"
              >确认修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList" />
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
          <el-table-column label="主播ID" align="center" prop="id" min-width="120px"/>
          <el-table-column label="主播昵称" align="center" prop="nickName" min-width="120px"/>
        </el-table>
      </el-row>
<!--  END 关注主播- Follow the anchor function created by Rajesh -->

<!-- footer slots adding to all models -->
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="handlePassword"
          v-show="index === 4"
          v-has-permi="['member:memberInfo:resetPwd']"
        >确 定
        </el-button>
        <el-button
          type="primary"
          @click="handleImportTable"
          v-show="index === 3"
          v-has-permi="['member:memberInfo:addScore']"
        >确 定
        </el-button>

          <el-button
            type="primary" @click="updateMobile()"
            v-show="index ===11"
            v-has-permi="['member:memberInfo:updateMobile']">
            确 定
          </el-button>

        <el-button
          type="primary"
          @click="sendMsg()"
          v-show="index ===10"
          v-has-permi="['member:memberInfo:sendMsg']">
          确 定
        </el-button>

        <el-button
          type="primary"
          v-show="index===13"
          @click="updateInviterCode()">
          确 定
        </el-button>

        <el-button @click="visible = false">取 消</el-button>
      </div>
<!--  end footer slots for all dialog models-->

    </el-dialog>
    <!-- 修改vip等级 -->
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      title="修改vip等级和昵称"
      :visible.sync="showVip"
      width="400px"
      append-to-body
      :show-close="false"
      :close-on-press-escape="false"
    >Vip等级
      <el-input v-model="vip"/>
      昵称
      <el-input v-model="nickName"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showVip = !showVip">取消</el-button>
        <el-button
          type="primary"
          :disabled="showVipDisabled"
          @click="updateVip"
          v-has-permi="['member:memberInfo:updateVip']"
        >立即提交
        </el-button>
      </div>
    </el-dialog>

    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      title="禁用启用IM发言"
      :visible.sync="im"
      width="600px"
      append-to-body
      :show-close="false"
      :close-on-press-escape="false">
      剩余禁言时间: {{ this.ImList.ShuttedUntil }}
      <br/>
      会员账号: {{ this.ImList.Member_Account }}
      <br/>
      昵称: {{ this.ImList.nickName }}
      <br/>
      IM禁言时间备注：0取消禁言,4294967295永久禁言,其它值具体禁言时间,以秒为单位
      <br/>
      <br/>
      <div>禁言时间（单位秒）
        <el-input width="200px" v-model="banSpeakTime" type="number"/>
      </div>
      <br/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="im = !im">取消</el-button>
        <el-button
          type="primary"
          :disabled="showImDisabled"
          @click="updateIm"
          v-has-permi="['member:memberInfo:imBan']"
        >立即提交
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
  sendMsg, updateMobile, fullMobile, imDelete, updateInviterCode,followList
} from '@/api/platform-web/member/memberInfo'
import {userImMute} from '@/api/platform-web/live-web/ImMute'
// import { hideKMobile } from '@/utils/mobile.js'
import TableShow from '@/views/pay/memberWithdrawLog/tableShow.vue';
import {getMemberWithdrawReport} from "@/api/platform-web/pay/memberWithdrawLog";
import {positiveInteger, validMobile, validNumber} from '../../../utils/validate'
import {checkTwoLogin} from "@/utils/permission";
import { listBankList } from "@/api/platform-web/pay/bankList";
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
      }, {
        value: '2',
        label: '线上入款'
      }, {
        value: '3',
        label: '线下入款'
      }],
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
          {required: true, message: '旧手机号码不能为空', trigger: 'blur'},
          {max: 100, message: "旧手机号码长度不能超过11位"},
          {validator: validMobile, trigger: "blur"}
        ],
        newMobile: [
          {required: true, message: '新手机号码不能为空', trigger: 'blur'},
          {max: 11, message: "新手机号码长度不能超过11位"},
          {validator: validMobile, trigger: "blur"}
        ],
        googleAuthCode: [
          {required: true, message: '谷歌验证码不能为空', trigger: 'blur'},
          {validator: validNumber, trigger: "blur"}
        ]
      },
      // 加分表单校验
      inviterCodeRules: {
        inviterCode: [
          {required: true, message: '重置邀请码不能为空', trigger: 'blur'},
          {max: 500, message: "重置邀请码长度不能超过500个字符"}
        ],
        googleAuthCode: [
          {required: true, message: 'google验证码不能为空', trigger: 'blur'},
          {validator: validNumber, trigger: "blur"}
        ]
      },
      // 加分表单校验
      rules: {
        password: [
          {required: true, message: '重置密码不能为空', trigger: 'blur'},
          {max: 30, message: "重置密码长度不能超过30个字符"}
        ],
        score: [
          {required: true, message: '加分金额不能为空', trigger: 'blur'}
        ],
        moneydes: [
          {required: true, message: '入款备注不能为空', trigger: 'blur'}
        ],
        mk: [
          {required: true, message: '备注信息不能为空', trigger: 'blur'}, {max: 200, message: "备注信息长度不能超过200位"}
        ],
        ordermk: [
          {required: true, message: '订单备注不能为空', trigger: 'blur'}, {max: 200, message: "备注信息长度不能超过200位"}
        ],
        googleAuthCode: [
          {required: true, message: 'google验证码不能为空', trigger: 'blur'},
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
            that.$notify.success('手机号修改成功')
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
          if(!this.mobileForm.phone){
            this.$message.error('手机号码不可用')
          }else{
            this.$message.success('完整手机号码已展示')
          }
        })
      }
    },
    updateInviterCode() {
      var that = this
      this.$refs['formInviterCode'].validate(valid => {
        if (valid) {
          updateInviterCode(this.form.inviterCode, this.form.googleAuthCode, this.memberId).then((res) => {
            that.$notify.success('邀请码修改成功')
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
          this.$notify.success('发送短信成功')
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
          this.$notify.success('下分成功')
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
          return '银行卡转账'
      }
      return '未知'
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
      this.$confirm('是否修改银行卡信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
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
          message: '已取消'
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
          hint = '确定重置保险箱?'
          this.open(hint, 1)
          break
        case 7 :
          hint = '请输入您的谷歌验证码'
          this.open(hint, 2)
          break
        case 8 :
          hint = '请输入您的谷歌验证码'
          this.open(hint, 3)
          break
        case 9 :
          hint = '请输入Vip等级'
          this.open(hint, 4)
          break
        case 12 :
          hint = 'IM禁言'
          this.open(hint, 5)
          break
        case 2 :
          hint = '资金明细'
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
        this.$confirm(hint, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          resetSafe({userId: this.memberId}).then((res) => {
            if (res.code === 0) {
              this.$notify.success('重置保险箱成功')
            } else {
              this.$notify.error('重置保险箱失败')
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      } else if (type == 2) {
        this.$prompt(hint, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[0-9]{1,10}$/,
          inputErrorMessage: '验证码格式不正确,0-10数字,请重新输入',
        }).then(({value}) => {
          resetWithdrawal({
            googleAuthCode: value,
            id: this.memberId
          }).then((res) => {
            if (res.code === 0) {
              this.$notify.success('重置提现成功')
            } else {
              this.$notify.error('重置提现失败')
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      } else if (type == 3) {
        this.$prompt(hint, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[0-9]{1,10}$/,
          inputErrorMessage: '验证码格式不正确,0-10数字,请重新输入',
        }).then(({value}) => {
          memberBcodeRepair({
            googleAuthCode: value,
            id: this.memberId
          }).then((res) => {
            if (res.code === 0) {
              this.$notify.success('修复打码数据成功')
            } else {
              this.$notify.error('修复打码数据失败')
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
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
      if(that.vip > 50){
        this.$message.error("vip等级最大为50级")
      } else if(that.vip < this.oldVip) {
        this.$message.error("vip等级修改不能小于之前的等级")
      } else { updateVip({
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
          that.$notify.error('vip等级修改失败')
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
        this.$notify.warning('获取三方游戏列表失败')
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
        this.$notify.warning('获取资金明细列表失败')
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
        this.$notify.warning('获取关注列表失败')
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
    }
  }
}
</script>
