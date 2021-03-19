<template>
  <!-- 导入表 -->
  <el-dialog
    v-dialogDrag
    :close-on-click-modal="false"
    :title="title"
    :visible.sync="visible"
    width="800px"
    top="5vh"
    append-to-body
  >
    <!--顶部按钮-->
    <div class="page-tab" style="margin-bottom: 20px">
      <button type="button" class="el-button el-button--primary el-button--mini is-plain" @click="change(1,'积分明细')">
        <span>积分明细</span></button>
      <button type="button" class="el-button el-button--primary el-button--mini is-plain" @click="change(2,'资金明细')">
        <span>资金明细</span></button>
      <button type="button" class="el-button el-button--primary el-button--mini is-plain" @click="change(3,'加分')"><span>加分</span>
      </button>
      <button type="button" class="el-button el-button--primary el-button--mini is-plain" @click="change(5,'银行卡')">
        <span>银行卡</span></button>
      <button type="button" class="el-button el-button--success el-button--mini is-plain" @click="change(4,'重置密码')">
        <span>重置密码</span></button>
      <button type="button" class="el-button el-button--success el-button--mini is-plain" @click="change(6,'重置保险箱')">
        <span>重置保险箱</span></button>
      <button type="button" class="el-button el-button--success el-button--mini is-plain" @click="change(7,'重置提现')">
        <span>重置提现</span></button>
    </div>
    <!--积分明细-->
    <el-row v-if="index===1">
      <el-table @row-click="clickRow" ref="table" :data="dbTableList" height="460px" v-loading="loading">
        <el-table-column prop="name" label="游戏名称" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="value" label="金额" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="createTime" label="操作">
          <template v-slot="{row}" v-if="index===1">
            <el-button  @click="gameEsc(row)">下分</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!--资金明细-->
    <el-row v-if="index===2">
      <el-table
        @row-click="clickRow"
        ref="table"
        :data="dbTableList"
        height="460px"
        v-loading="loading"
      >
        <!--<el-table-column type="selection" width="55"></el-table-column>-->
        <el-table-column prop="class_twoname" label="项目名称" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="t_value" label="项目值" :show-overflow-tooltip="true"></el-table-column>
      </el-table>
    </el-row>
    <!--加分-->
    <el-row v-if="index===3">
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
        <el-form-item label="加分金额" prop="score">
          <el-input v-model="form.score" placeholder="请输入金额"/>
        </el-form-item>
        <el-form-item label="备注字典" prop="moneydes">
          <el-select v-model="form.moneydes" placeholder="入款备注" clearable size="small">
            <el-option v-for="(item,index) in addScoreRemarks" :key="index" :label="item.label" :value="item.label"/>
          </el-select>
        </el-form-item>
        <el-form-item label="备注信息" prop="mk">
          <el-input v-model="form.mk" placeholder="请备注具体入金原因"/>
        </el-form-item>
        <el-form-item label="订单备注" prop="ordermk">
          <el-input v-model="form.ordermk" placeholder="补单请填写补单订单号，末开奖补回请填写开期号，无则填写为0"/>
        </el-form-item>
        <el-form-item label="打码倍数" prop="beatNum">
          <el-input v-model="form.beatNum" placeholder="请输入打码倍数，默认请填写1,如未打算打码可填写为0"/>
        </el-form-item>
        <el-form-item label="google验证码" prop="googleAuthCode">
          <el-input v-model="form.googleAuthCode" placeholder="请输入google验证码"/>
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
        v-loading="loading"
      >
        <el-table-column prop="realName" label="真实姓名" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="bankName" label="银行名称" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="bankAccount" label="银行卡号" :show-overflow-tooltip="true" min-width="150"
                         align="center"></el-table-column>
        <el-table-column prop="bankAddress" label="银行地址" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="createTime" label=" 绑定时间" :show-overflow-tooltip="true" min-width="160"
                         align="center"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{row}">
            <el-button @click="unbind(row)" v-if="row.dv==1">主卡解绑</el-button>
            <el-button @click="unbind(row)" v-if="row.dv==0" >副卡解绑</el-button>
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
    </el-row>


    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleImportTable" v-if="index===3">确 定</el-button>
      <el-button @click="visible = false">取 消</el-button>
    </div>
  </el-dialog>
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
    resetWithdrawal
  } from '@/api/platform-web/member/memberInfo'

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
    data() {
      return {
        // 遮罩层
        loading: true,
        memberId: null,
        memberCode: null,
        //弹出框标题
        title: '积分明细',
        //页面编码
        index: 1,
        // 遮罩层
        visible: false,
        // 选中数组值
        tables: [],
        //加分备注别表
        addScoreRemarks: [{label: '人工备注'}, {label: '线上入款'}, {label: '线下入款'}],
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
        // 表数据
        dbTableList: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10000,
          tableName: undefined,
          tableComment: undefined
        },
        // 加分表单校验
        rules: {
          score: [
            {required: true, message: '加分金额不能为空', trigger: 'blur'}
          ],
          moneydes: [
            {required: true, message: '备注字典不能为空', trigger: 'blur'}
          ],
          mk: [
            {required: true, message: '备注信息不能为空', trigger: 'blur'}
          ],
          ordermk: [
            {required: true, message: '订单备注不能为空', trigger: 'blur'}
          ],
          beatNum: [
            {required: true, message: '打码倍数不能为空', trigger: 'blur'}
          ],
          googleAuthCode: [
            {required: true, message: 'google验证码不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      gameEsc(row) {
        this.loading = true
        gameEsc(row.type, this.memberId).then((res) => {
          if (res.code === 200) {
            this.$notify.success('下分成功')
            this.gameBalance()
          } else {
            this.$notify.error(res.msg)
          }
        }).catch(() => {
          this.$notify.error('网络异常')
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
        const id=row.id;
        const  memberId=row.memberId;
        unbindCard(id,memberId).then((res) => {
          this.msgSuccess(res.msg);
         this.cardList();
        }).catch(() => {
          this.$notify.error('网络异常')
        }).finally(() => {
          this.loading = false
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
          case 4 :
            hint = '确定重置码123456?'
            this.open(hint, 1)
            break
          case 6 :
            hint = '确定重置保险箱?'
            this.open(hint, 1)
            break
          case 7 :
            hint = '请输入您的谷歌验证码'
            this.open(hint, 2)
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
            if (this.index === 4) {
              resetPassword(this.memberCode).then((res) => {
                if (res.code === 0) {
                  this.$notify.success('重置密码成功')
                } else {
                  this.$notify.error('重置密码失败')
                }
              }).catch(() => {
                this.$notify.error('网络异常')
              })
            } else {
              resetSafe({userId: this.memberCode}).then((res) => {
                if (res.code === 0) {
                  this.$notify.success('重置保险箱成功')
                } else {
                  this.$notify.error('重置保险箱失败')
                }
              }).catch(() => {
                this.$notify.error('网络异常')
              })
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        } else {
          this.$prompt(hint, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
            /*inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            inputErrorMessage: '验证码格式不正确'*/
          }).then(({value}) => {
            this.$message({
              type: 'success',
              message: '你的谷歌验证码是: ' + value
            })
            resetWithdrawal({
              googleAuthCode: value,
              id: this.memberCode
            }).then((res) => {
              if (res.code === 0) {
                this.$notify.success('重置提现成功')
              } else {
                this.$notify.error('重置提现失败')
              }
            }).catch(() => {
              this.$notify.error('网络异常')
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            })
          })
        }

      },
      // 显示弹框
      show(memberId, memberCode) {
        this.memberId = memberId
        this.memberCode = memberCode
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
        }
      },
      //获取积分列表
      gameBalance() {
        console.log(this)
        this.dbTableList = []
        this.loading = true
        gameBalance(this.memberId).then((res) => {
            if (res.code === 200) {
              this.dbTableList = res.data
              this.loading = false
            }
          }
        ).catch(() => {
          this.$notify.warning('获取积分列表失败')
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
          ordermk: this.form.ordermk,
          score: this.form.score
        }).then((res) => {
          if (res.code === 0) {
            that.form.googleAuthCode = ''
            this.$notify.success(res.msg)
          }
        }).catch((error) => {
          // this.$notify.warning('网络异常')
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

      }
    }
  }
</script>
