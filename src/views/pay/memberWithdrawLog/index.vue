<template>
  <div class="app-container">
    <el-button type="success" id="copy1" @click="copy1">出款笔数 {{ this.totalData.total || 0 }}</el-button>
    <el-button type="warning" id="copy2" @click="copy2">总出款金额 {{ this.totalData.successTotal || 0 }}</el-button>
    <el-button type="info" id="copy3" @click="copy3">成功率 {{ numberUtil.toPercent(this.totalData.successRate) }}</el-button>
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px" style="margin-top: 20px">
      <el-form-item label="修改日期" prop="searchTime">
        <el-date-picker type="datetimerange" v-model="queryParams.searchTime" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '100%'}" start-placeholder="开始时间"
                        end-placeholder="结束时间" range-separator="至"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="status">
        <el-select v-model="queryParams.status" placeholder="全部状态" clearable size="small">
          <el-option value="-1" label="首次提现会员"/>
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="searchValue">
        <el-input
          v-model="queryParams.searchValue"
          placeholder="会员ID/会员账号/收款人/订单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="金额" prop="withdrawMoney">
        <el-input
          v-model="queryParams.priceMin"
          placeholder="￥"
          clearable
          autocomplete="on"
          min="0"
          size="small"
          style="width: 80px"
          @keyup.enter.native="handleQuery"
        />
        -
        <el-input
          v-model="queryParams.priceMax"
          placeholder="￥"
          clearable
          autocomplete="on"
          min="0"
          size="small"
          style="width: 80px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['pay:memberWithdrawLog:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :stripe="true" v-loading="loading" :data="memberWithdrawLogList"
              @selection-change="handleSelectionChange">
      <el-table-column label="会员ID" min-width="150" align="center" prop="memberId">
        <template v-slot="{row}">
          <a style="color: #00afff" @click="funds(row.memberId)">{{row.memberId}}</a>
        </template>
      </el-table-column>
      <el-table-column label="会员账号" min-width="100" align="center" prop="account"/>
      <el-table-column label="入款出款比" min-width="100" align="center" prop="rechargeWithdrawRate"/>
      <el-table-column label="提现金额" min-width="100" align="center" prop="withdrawMoney"/>
      <el-table-column label="收款人" min-width="100" align="center" prop="bankUserName"/>
      <el-table-column label="银行账号" min-width="180" align="center" prop="bankAccount"/>
      <el-table-column label="银行" min-width="120" align="center" prop="bankName"/>
      <el-table-column label="状态" min-width="120" align="center" prop="status">
        <template slot-scope="scope">
          <span
            :style="{color: (status = statusOptions[parseInt(scope.row.status)]).color}">{{ status.dictLabel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否首次" min-width="90" align="center" prop="first" :formatter="firstFormat"/>
      <el-table-column label="操作人" min-width="100" align="center" prop="opName"/>
      <el-table-column label="审核备注" min-width="200" align="center" prop="remark"/>
      <el-table-column label="下单时间" min-width="150" align="center" prop="createTime"/>
      <el-table-column label="最后修改时间" min-width="150" align="center" prop="updateTime"/>
      <el-table-column label="操作" min-width="200" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            v-if="scope.row.status == 0"
            icon="el-icon-lock"
            @click="handleLock(scope.row)"
            v-has-permi="['pay:memberWithdrawLog:lock']"
          >锁定
          </el-button>
          <el-button
            size="mini"
            type="text"
            v-if="scope.row.status == 1"
            icon="el-icon-unlock"
            @click="handleUnlock(scope.row)"
            v-has-permi="['pay:memberWithdrawLog:unlock']"
          >解锁
          </el-button>
          <el-button
            size="mini"
            type="text"
            style="color: #5FB878"
            v-if="scope.row.status == 1"
            icon="el-icon-circle-check"
            @click="handleWithdraw(scope.row)"
            v-has-permi="['pay:memberWithdrawLog:artificial']"
          >出款
          </el-button>
          <el-button
            size="mini"
            type="text"
            style="color: #FF5722"
            v-if="scope.row.status < 2 || scope.row.status == 5"
            icon="el-icon-circle-close"
            @click="handleRefused(scope.row)"
            v-has-permi="['pay:memberWithdrawLog:refused']"
          >拒绝
          </el-button>
          <el-button
            size="mini"
            type="text"
            style="color: #FFB800"
            v-if="scope.row.status == 5"
            icon="el-icon-s-custom"
            @click="handleArtificialWithdraw(scope.row)"
            v-has-permi="['pay:memberWithdrawLog:artificial']"
          >人工出款
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[100,200,500,1000]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改会员提现信息对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" title="资金明细" :visible.sync="fundsOpen" width="400"
               append-to-body>
      <el-table :stripe="true" v-loading="loading" :data="fundsData" @selection-change="handleSelectionChange">
        <el-table-column label="项目名称" min-width="150" align="center" prop="class_twoname"/>
        <el-table-column label="项目值" min-width="150" align="center" prop="t_value"/>
      </el-table>
    </el-dialog>

    <!-- 添加或修改会员提现信息对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" title="出款明细" :visible.sync="open" width="500px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="会员编号" prop="memberId">
          <el-input v-model="form.memberId" readonly/>
        </el-form-item>
        <el-form-item label="会员账号" prop="account">
          <el-input v-model="form.account" readonly/>
        </el-form-item>
        <el-form-item label="真实姓名" prop="bankUserName">
          <el-input v-model="form.bankUserName" readonly/>
        </el-form-item>
        <el-form-item label="银行名称" prop="bankName">
          <el-input v-model="form.bankName" readonly/>
        </el-form-item>
        <el-form-item label="银行账号" prop="bankAccount">
          <el-input v-model="form.bankAccount" readonly/>
        </el-form-item>
        <el-form-item label="申请出款" prop="withdrawMoney">
          <el-input v-model="form.withdrawMoney" readonly/>
        </el-form-item>
        <el-form-item label="提现订单号" prop="orderNo">
          <el-input v-model="form.orderNo" readonly/>
        </el-form-item>
        <el-form-item label="Google验证码" prop="googleAuthCode">
          <el-input v-model="form.googleAuthCode" placeholder="代付需输入Google验证码"/>
        </el-form-item>
        <el-form-item label="代付平台" prop="payAgentPlatId">
          <el-select v-model="form.payAgentPlatId" placeholder="代付需选择代付平台" clearable size="small">
            <el-option v-for="plat in payAgentPlatformOptions" :key="plat.id" :label="plat.name" :value="plat.id"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">

        <el-button
          type="primary"
          plain
          size="mini"
          @click="handlePayAgent"
          v-has-permi="['pay:payAgentPlatform:order']"
        >代 付
        </el-button>
        <el-button
          type="success"
          plain size="mini"
          @click="handleArtificialWithdraw"
          v-has-permi="['pay:memberWithdrawLog:artificial']"
        >出 款
        </el-button>
        <el-button
          type="danger"
          plain
          size="mini"
          @click="handleDialogRefused"
          v-has-permi="['pay:memberWithdrawLog:refused']"
        >拒 绝
        </el-button>
        <el-button
          type="info"
          plain
          size="mini"
          @click="cancel"
        >取 消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    listMemberWithdrawLog,
    getMemberWithdrawLog,
    addMemberWithdrawLog,
    updateMemberWithdrawLog,
    exportMemberWithdrawLog,
    refusedMemberWithdrawLog,
    lockMemberWithdrawLog,
    unlockMemberWithdrawLog,
    artificialMemberWithdrawLog,
    getMemberWithdrawReport,
    getCountTotal
  } from '@/api/platform-web/pay/memberWithdrawLog'
  import {effectListPayAgentPlatform, payAgentOrder} from '@/api/platform-web/pay/payAgentPlatform'

  export default {
    name: 'MemberWithdrawLog',
    components: {},
    data() {
      return {
        // 头部数据
        totalData: {},
        // 遮罩层
        loading: true,
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
        // 会员提现信息表格数据
        memberWithdrawLogList: [],
        // 弹出层标题
        title: '',
        //资金明细
        fundsOpen: false,
        //资金明细数据
        fundsData: [],
        // 是否显示弹出层
        open: false,
        // 状态(0申请中1锁定2审核不通过3人工入款成功 4代付中5代付失败6代付成功)字典
        statusOptions: [],
        // 是否首次1是0否字典
        firstOptions: [],
        // 代付平台
        payAgentPlatformOptions: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 100,
          searchValue: null,
          status: null,
          searchTime: [],
          priceMin: null,
          priceMax: null,
          orderByColumn: 'create_time',
          isAsc: 'desc'
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          googleAuthCode: [
            {required: true, message: 'google验证码不能为空', trigger: 'blur'}
          ],
          payAgentPlatId: [
            {required: true, message: '请选择代付平台', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.getList()
      this.getCountTotal()
      this.getDicts('withdraw_log_status').then(response => {
        this.statusOptions = response.data
      })
      this.getDicts('first').then(response => {
        this.firstOptions = response.data
      })
    },
    methods: {
      funds(userId) {
        debugger
        getMemberWithdrawReport(userId).then((res) => {
          console.log(res)
          this.fundsData = res.data
        });
        this.fundsOpen = true

      },
      //复制
      copy1() {
        let text = document.getElementById('copy1').innerText;
        let inputElement = document.createElement('input')
        inputElement.value = text;
        document.body.appendChild(inputElement);
        inputElement .select(); //选中文本
        document.execCommand("copy"); //执行浏览器复制命令
        inputElement.remove();
        this.msgSuccess("复制成功")
      },
      copy2() {
        let text = document.getElementById('copy2').innerText;
        let inputElement = document.createElement('input')
        inputElement.value = text;
        document.body.appendChild(inputElement);
        inputElement .select(); //选中文本
        document.execCommand("copy"); //执行浏览器复制命令
        inputElement.remove();
        this.msgSuccess("复制成功")
      },
      copy3() {
        let text = document.getElementById('copy3').innerText;
        let inputElement = document.createElement('input')
        inputElement.value = text;
        document.body.appendChild(inputElement);
        inputElement .select(); //选中文本
        document.execCommand("copy"); //执行浏览器复制命令
        inputElement.remove();
        this.msgSuccess("复制成功")
      },
      getCountTotal(){
        getCountTotal(this.queryParams).then((res) => {
                this.totalData = res.data;
              });
      },
      /** 查询会员提现信息列表 */
      getList() {
        this.loading = true
        listMemberWithdrawLog(this.queryParams).then(response => {
          this.memberWithdrawLogList = response.rows
          this.total = response.total
          this.loading = false
        })
      },
      // 状态(0申请中1锁定2审核不通过3人工入款成功 4代付中5代付失败6代付成功)字典翻译
      statusFormat(row, column) {
        return this.selectDictLabel(this.statusOptions, row.status)
      },
      // 是否首次1是0否字典翻译
      firstFormat(row, column) {
        return this.selectDictLabel(this.firstOptions, row.first)
      },
      // 取消按钮
      cancel() {
        this.open = false
        this.reset()
      },
      // 表单重置
      reset() {
        this.form = {
          searchValue: null,
          withdrawMoney: null,
          status: null,
          updateTime: []
        }
        this.resetForm('form')
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1
        this.getList()
        this.getCountTotal()
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm('queryForm')
        this.handleQuery()
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.id)
        this.single = selection.length !== 1
        this.multiple = !selection.length
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateMemberWithdrawLog(this.form).then(response => {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              })
            } else {
              addMemberWithdrawLog(this.form).then(response => {
                this.msgSuccess('新增成功')
                this.open = false
                this.getList()
              })
            }
          }
        })
      },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams
        this.$confirm('是否确认导出所有会员提现信息数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          return exportMemberWithdrawLog(queryParams)
        }).then(response => {
          this.download(response.msg)
        }).catch(() => {
        })
      },
      handleLock(row) {
        lockMemberWithdrawLog({
          id: row.id
        }).then(response => {
          this.msgSuccess(response.msg)
          this.getList()
        })
      },
      handleUnlock(row) {
        unlockMemberWithdrawLog({
          id: row.id
        }).then(response => {
          this.msgSuccess(response.msg)
          this.getList()
        })
      },
      handleWithdraw(row) {
        this.reset()
        const id = row.id
        getMemberWithdrawLog(id)
          .then(response => {
            this.form = response.data
            this.open = true
          })
          .then(() => {
            //代付平台
            effectListPayAgentPlatform().then(response => {
              this.payAgentPlatformOptions = response.data
            })
          })
      },
      handleArtificialWithdraw() {
        artificialMemberWithdrawLog({
          id: this.form.id
        }).then(response => {
          this.msgSuccess(response.msg)
          if (response.code == 200) {
            this.open = false
            this.getList()
          }
        })
      },
      promptRefused(id) {
        this.$prompt(null, '请输入拒绝出款原因', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
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
      handleRefused(row) {
        this.promptRefused(row.id)
      },
      handleDialogRefused() {
        this.promptRefused(this.form.id)
      },
      handlePayAgent() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            payAgentOrder({
              payAgentPlatId: this.form.payAgentPlatId,
              withdrawOrderNo: this.form.orderNo,
              googleAuthCode: this.form.googleAuthCode
            }).then(response => {
              this.msgSuccess(response.msg)
              if (response.code == 200) {
                this.open = false
                this.getList()
              }
            })
          }
        })
      }
    }
  }
</script>
