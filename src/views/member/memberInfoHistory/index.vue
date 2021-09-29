<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch">
      <el-form-item label="日期范围" prop="regTime">
        <el-date-picker type="datetimerange" v-model="dateRange" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '90%'}" start-placeholder="开始时间"
                        end-placeholder="开始时间"
                        range-separator="至" clearable :default-time="['00:00:00', '23:59:59']" :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="status" style="width: 110px;">
        <el-select v-model="queryParams.status" placeholder="全部状态" clearable size="small">
<!--          <el-option v-for="(item,index) in typeList" :key="index" :label="item.label" :value="item.value"/>-->
          <el-option
            v-for="dict in typeList"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="parseInt(dict.dictValue)"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="searchValue">
        <el-input
          v-model.trim="queryParams.searchValue"
          placeholder="会员ID/账号/手机号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="inviterCode" style="width: 110px;">
        <el-input
          v-model="queryParams.inviterCode"
          placeholder="邀请码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="channelcode" style="width: 110px;">
        <el-select v-model="queryParams.channelcode" placeholder="全部类型" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="nickName" style="width: 110px;">
        <el-input
          v-model="queryParams.nickName"
          placeholder="昵称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="loginIp" style="width: 110px;">
        <el-input
          v-model="queryParams.loginIp"
          placeholder="登录IP"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="loginIp" style="width: 110px;">
        <el-input
          v-model="queryParams.bankAccount"
          placeholder="银行卡号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="loginIp" style="width: 110px;">
        <el-input
          v-model="queryParams.email"
          placeholder="登录备注"
          clearable
          size="small"
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
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['member:memberInfo:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="openExport"
          v-hasPermi="['member:memberInfo:export']"
        >导出
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="openIpBlackList()"
        >查看封停ip
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :stripe="true" v-loading="loading" :data="memberInfoList" @selection-change="handleSelectionChange">
      <el-table-column label="会员ID" align="center" prop="id" min-width="120px"/>
      <el-table-column label="账号" align="center" prop="userName" min-width="100px"/>
      <el-table-column label="昵称" :show-overflow-tooltip="true" align="center" prop="nickName" min-width="160"/>
<!--      <el-table-column label="会员vip" align="center" prop="vip" min-width="70px"/>-->
<!--      <el-table-column label="积分" :show-overflow-tooltip="true" align="center" prop="totalAccount" min-width="120px"/>-->
<!--      <el-table-column label="保险箱余额" :show-overflow-tooltip="true" align="center" prop="boxAccount" min-width="120px"/>-->
      <el-table-column label="登录时间" align="center" prop="loginTime" min-width="110px"/>
      <el-table-column label="状态" align="center" min-width="110px">
        <template v-slot="{row}">
          <el-select v-model="row.status" placeholder="请选择状态" size="small"
                     @change="changeType(row)"
          >
            <!--<el-option v-for="(item,index) in typeList" :key="index" :label="item.label" :value="item.value"/>-->
            <el-option
              v-for="dict in typeList"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" align="center" prop="regTime" width="160"/>
      <el-table-column label="登陆次数" align="center" prop="loginNum" min-width="100px"/>
      <el-table-column label="登录ip" :show-overflow-tooltip="true" align="center" prop="loginIp" width="180"/>
      <el-table-column label="是否禁言" align="center" prop="speak">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.speak"
            active-value="1"
            inactive-value="0"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="打码账户" align="center" prop="codeAccount" min-width="100px"/>

      <el-table-column label="累计有效投注" align="center" prop="codeTotal" min-width="100px"/>
      <el-table-column label="邀请码" align="center" prop="inviterCode" min-width="100px"/>
      <el-table-column label="用户类型" align="center" prop="channelcode" min-width="100px">
        <template slot-scope="scope">
          <span v-if="scope.row.channelcode == null" :style="{'color': '#5FB878'}">会员</span>
          <span v-else :style="{color: (channelcode = statusOptions[parseInt(scope.row.channelcode)]).color}">{{ channelcode.dictLabel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录备注" align="center" prop="email" :show-overflow-tooltip="true" min-width="130px"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            icon="el-icon-menu"
            size="small"
            @click="handleMore(scope.row)"
            v-hasPermi="['member:memberInfo:query']"
          >更多
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[20,50,100,200]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 禁用备注弹框 -->
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      title="备注禁用原因"
      :visible.sync="muteRemark"
      width="400px"
      append-to-body
      :show-close="false"
      :close-on-press-escape="false"
    >
      <el-input v-model="id" v-show="false"/>
      <el-input v-model="status" v-show="false"/>
      <el-select
        v-model="remark"
        placeholder="请选择禁用原因"
        clearable
        style="min-width: 360px"
      >
        <el-option
          v-for="dict in muteRemarkOptions"
          :key="dict.dictValue"
          :label="dict.dictLabel"
          :value="dict.dictValue"
        />
      </el-select>
      <el-input v-model="remarked" placeholder="请输入禁用原因" v-if="this.remark == '其他'"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUser()">取消</el-button>
        <el-button type="primary" @click="submitMuteRemark">立即提交</el-button>
      </div>
    </el-dialog>

    <!-- 禁言备注弹框 -->
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      title="备注禁言原因"
      :visible.sync="muteRemarkSpeak"
      width="400px"
      append-to-body
      :show-close="false"
      :close-on-press-escape="false"
    >
      <el-input v-model="id" v-show="false"/>
      <el-input v-model="speak" v-show="false"/>
      <el-select
        v-model="remark"
        placeholder="请选择禁言原因"
        clearable
        style="min-width: 360px"
      >
        <el-option
          v-for="dict in muteRemarkOptions"
          :key="dict.dictValue"
          :label="dict.dictLabel"
          :value="dict.dictValue"
        />
      </el-select>
      <el-input v-model="remarked" placeholder="请输入禁言原因" v-if="this.remark == '其他'"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSpeak()">取消</el-button>
        <el-button type="primary" @click="submitMuteRemarkSpeak">立即提交</el-button>
      </div>
    </el-dialog>


    <!-- 添加或修改用户信息对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" >
        <el-form-item label="手机号" style="margin-bottom: 0px">
          <el-input v-model="phone" placeholder="请输入手机号" maxlength="11" minlength="11" @blur="changetPhone(phone)"/>
        </el-form-item>
        <el-form-item label="建议:" >
          <span style="color: #00afff">
          请统一测试账号格式,默认格式已生成,请只输入后四位
            </span>
        </el-form-item>
        <el-form-item label="密码" prop="password" style="margin-bottom: 0px">
          <el-input v-model="password" placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item label="提示:">
          <span style="color: #00afff">
          密码自动分配,为电话号码后六位
          </span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <more ref="more" @refMemeberData="getList()" :member-id="memberId" :member-code="memberCode"
          @memberMore="handleQuery"></more>

    <!--查看封停ip-->
    <el-dialog :close-on-click-modal="false" title="查看封停ip" :visible.sync="speakIpBlackListList"
               width="1200px" append-to-body>
      <el-form :model="queryParam" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
        <el-form-item label="会员id" prop="userId">
          <el-input
            v-model="queryParam.userId"
            placeholder="会员id"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="会员ip" prop="userIp">
          <el-input
            v-model="queryParam.userIp"
            placeholder="会员ip"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQueryIpBlack">搜索</el-button>
        </el-form-item>
      </el-form>

      <el-table :stripe="true" v-loading="loading" :data="speakIpBlackData">
        <el-table-column type="selection" width="55" align="center"/>
        <el-table-column label="会员ID" align="center" prop="userId"/>
        <el-table-column label="会员ip" align="center" prop="userIp"/>
        <el-table-column label="封停备注" align="center" prop="msg"/>
        <el-table-column label="封停时间" align="center" prop="createTime"/>
        <el-table-column label="操作" min-width="60" align="center" class-name="small-padding fixed-width" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdateIpBlack(scope.row)"
            >解封
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page-sizes="[10,20,100]"
        :page.sync="queryParam.pageNum"
        :limit.sync="queryParam.pageSize"
        @pagination="openIpBlackList"
      />
    </el-dialog>
    <ExcelPrompt ref="excelPrompt" @downLoadExcel="handleExport"></ExcelPrompt>
  </div>
</template>

<script>
  import {
    listMemberInfo,
    getMemberInfo,
    addMemberInfo,
    updateMemberInfo,
    exportMemberInfo,
    changeSpeak,
    changeStatus,
    changeStatusBan,
    listSpeakIpBlackList,
    updateSpeakIpBlackList,
    getConfigEnvironment
  } from '@/api/platform-web/member/memberInfoHistory'
  import more from './more'
  import {pickerDateTimeShortcuts} from '@/utils/dateUtils'
  import ExcelPrompt from '@/layout/components/prompt/excelPrompt.vue';

  export default {
    name: 'MemberInfo',
    components: {
      more: more,
      ExcelPrompt
    },
    data() {
      return {
        //phone 手机号前四位
        phone: null,
        //password 密码
        password: null,
        //代理号
        agent: null,
        // 类型
        statusOptions: [],
        pickerOptions: {shortcuts: pickerDateTimeShortcuts},
        // 遮罩层
        loading: true,
        // 传递到子组件的memberId/memberCode
        memberCode: 0,
        memberId: null,
        // 日期范围
        dateRange: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],
        //禁言禁用
        id: '',
        speak: '',
        status: '',
        remark: '',
        remarked: '',
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
        //禁言备注弹框
        muteRemark: false,
        muteRemarkSpeak: false,
        fromMuteRemark: {},
        fromMuteRemarkSpeak: {},
        muteRemarkOptions: [],
        //会员发言表格数据
        speakIpBlackData: [],
        speakIpBlackListList: false,
        // 用户信息表格数据
        memberInfoList: [],
        // 弹出层标题
        title: '',
        // 是否显示弹出层
        open: false,
        // 状态列表0= 禁用 1=正常 2=测试号3=超管号
        typeList: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 20,
          email:'',
          bankAccount: '',
          searchValue: '', //会员Id,账号,手机号
          status: '',
          loginIp: '',
          nickName: '',
          inviterCode: '',
          channelcode: '',
          downLoadDate: [],
          // orderByColumn: 'reg_time',
          // isAsc: 'desc'
        },
        queryParam: {
          pageNum: 1,
          pageSize: 20,
          orderByColumn: 'create_time',
          isAsc: 'desc'
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          /*          phone: [
                      {required: true, message: '手机号不能为空', trigger: 'blur'}
                    ],*/
          // password: [
          //   {required: true, message: '密码不能为空', trigger: 'blur'}
          // ],
          /*          userName: [
                      {required: true, message: '账号不能为空', trigger: 'blur'}
                    ],
                    loginNum: [
                      {required: true, message: '登陆次数不能为空', trigger: 'blur'}
                    ]*/
        }
      }
    },
    created() {
      this.getList()
      getConfigEnvironment('agent_id').then(response => {
        this.phone = '100' + response.data.envValue
      })
      this.getDicts('muteRemarkOptions').then(response => {
        this.muteRemarkOptions = response.data
      })
      this.getDicts('member_type').then(response => {
        this.typeList = response.data
      })
      this.getDicts('device_type').then(response => {
        this.statusOptions = response.data
      })
    },
    methods: {
      changetPhone(phone) {
        if (phone) {
          this.password = phone.substr(5, 6)
          this.$forceUpdate()
        }
      },
      //修改用户状态
      changeType(row) {
        //打开备注禁用弹框
        if (row.status === 0) {
          this.remark = null
          this.remarked = null
          this.id = row.id
          this.status = row.status
          this.muteRemark = true
        } else {
          changeStatus({
            id: row.id,
            status: row.status
          }).then((res) => {
            if (res.code === 0) {
              this.$notify.success('状态修改成功')
            } else {
              this.$notify.error('状态修改失败')
            }
          }).catch(() => {
            this.$notify.error('网络异常')
          }).finally(() =>{
            this.getList()
          })
        }
      },
      //禁用备注提交
      submitMuteRemark(row) {
        if (this.remarked != null) {
          this.remark = this.remarked;
        }
        changeStatusBan(this.id, this.status, this.remark).then((res) => {
          if (res.code === 0) {
            this.$notify.success('状态修改成功')
            this.muteRemark = false
          } else {
            this.$notify.error('状态修改失败')
          }
        }).catch(() => {
          this.$notify.error('网络异常')
        })
      },
      /** 查询用户信息列表 */
      getList() {
        this.loading = true
        // if (this.queryParams.bankAccount===''  &&
        //     this.queryParams.email===''  &&
        //     this.queryParams.searchValue===''  &&
        //     this.queryParams.status===''  &&
        //     this.queryParams.loginIp===''  &&
        //     this.queryParams.nickName===''  &&
        //     this.queryParams.inviterCode===''  &&
        //     this.queryParams.channelcode==='' ) {
        //   this.queryParams = this.addDateRange(this.queryParams, this.dateRange);
        // }else {
          this.queryParams = this.addDateRange(this.queryParams, this.dateRange);
        //   this.queryParams.params = []
        // }
        listMemberInfo(this.queryParams).then(response => {
          this.memberInfoList = response.rows
          this.total = response.total
          this.loading = false
        })
      },
      openIpBlackList() {
        this.speakIpBlackListList = true
        this.title = '查看已封停的ip'
        listSpeakIpBlackList(this.queryParam).then(response => {
          this.speakIpBlackData = response.rows
          this.total = response.total
          this.loading = false
        })
      },
      searchIpBlackList() {
        listSpeakIpBlackList(this.queryParam).then(response => {
          this.speakIpBlackData = response.rows
          this.total = response.total
          this.loading = false
        })
      },
      /** 修改按钮操作 */
      handleUpdateIpBlack(row) {
        var that = this
        this.$confirm('确定要' + row.userId + '解封吗?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          var data = {}
          data.userIp = row.userIp
          data.userId = row.userId
          return updateSpeakIpBlackList(data)
        }).then(() => {
          that.msgSuccess('解封成功')
          this.openIpBlackList()
          that.getList()
        })

      },
      //禁用弹窗取消按钮
      cancelUser() {
        this.muteRemark = false
        this.getList();
      },
      //禁言弹窗取消按钮
      cancelSpeak() {
        this.muteRemarkSpeak = false
        this.getList();
      },
      // 取消按钮
      cancel() {
        this.open = false
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1
        this.getList()
      },
      handleQueryIpBlack() {
        this.queryParam.pageNum = 1
        this.searchIpBlackList()
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
      /** 新增按钮操作 */
      handleAdd() {
        this.open = true
        this.title = '添加测试用户信息'
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        const id = row.id || this.ids
        getMemberInfo(id).then(response => {
          this.form = response.data
          this.open = true
          this.title = '修改用户信息'
        })
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateMemberInfo(this.form).then(response => {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              })
            } else {
              this.form.phone = this.phone;
              this.form.password = this.password;
              addMemberInfo(this.form).then(response => {
                this.msgSuccess('新增成功')
                this.open = false
                this.getList()
              })
            }
          }
        })
      },
      /** 更多按钮操作 */
      handleMore(row) {
        this.memberCode = row.memberCode
        this.memberId = row.id
        this.$refs.more.show(this.memberId, this.memberCode,row.vip,row.nickName,row.phone)
      },
      openExport() {
        this.$refs.excelPrompt.open=true;
      },
      /** 导出按钮操作 */
      handleExport(date) {
        const queryParams = this.queryParams
        queryParams.params = []
        queryParams.downLoadDate = date
        this.$confirm('是否确认导出所有会员列表数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          return exportMemberInfo(queryParams)
        }).then(response => {
          this.downloadExcel(response, '会员列表')
        })
      },
      //打开备注禁言弹框
      handleStatusChange(row) {
        if (row.speak === "0") {
          changeSpeak(row.id, row.speak, null).then(response => {
            this.msgSuccess('解禁成功')
          })
        } else {
          this.remark = null
          this.remarked = null
          this.id = row.id
          this.speak = row.speak
          this.muteRemarkSpeak = true
        }
      },
      //禁言备注提交
      submitMuteRemarkSpeak() {
        if (this.remarked != null) {
          this.remark = this.remarked;
        }
        changeSpeak(this.id, this.speak, this.remark).then(response => {
          this.msgSuccess('禁言成功')
          this.muteRemarkSpeak = false
          this.getList()
        })
      }
    },
  }
</script>
