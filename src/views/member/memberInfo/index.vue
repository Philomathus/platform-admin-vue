<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch">
      <el-form-item prop="status" style="width: 110px;">
        <el-select v-model="queryParams.status" placeholder="全部状态" clearable size="small">
          <el-option v-for="(item,index) in typeList" :key="index" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="queryParams.searchValue"
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
      <el-form-item prop="channelcode">
        <el-input
          v-model="queryParams.channelcode"
          placeholder="渠道号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="昵称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="loginIp">
        <el-input
          v-model="queryParams.loginIp"
          placeholder="登录IP"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="loginIp">
        <el-input
          v-model="queryParams.bankAccount"
          placeholder="银行卡号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item style="float: right">
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
          @click="handleExport"
          v-hasPermi="['member:memberInfo:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :stripe="true" v-loading="loading" :data="memberInfoList" @selection-change="handleSelectionChange">
      <el-table-column label="会员ID" align="center" prop="id" min-width="120px"/>
      <el-table-column label="账号" align="center" prop="userName" min-width="100px"/>
      <el-table-column label="昵称" :show-overflow-tooltip="true" align="center" prop="nickName" min-width="160"/>
      <el-table-column label="会员vip" align="center" prop="vip" min-width="70px"/>
      <el-table-column label="积分" :show-overflow-tooltip="true" align="center" prop="totalAccount" min-width="120px"/>
      <el-table-column label="保险箱余额" :show-overflow-tooltip="true" align="center" prop="boxAccount" min-width="120px"/>
      <el-table-column label="状态" align="center" min-width="110px">
        <template v-slot="{row}">
          <el-select v-model="row.status" placeholder="请选择状态" size="small"
                     @change="changeType(row)"
          >
            <el-option v-for="(item,index) in typeList" :key="index" :label="item.label" :value="item.value"/>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" align="center" prop="regTime" width="160"/>
      <el-table-column label="登陆次数" align="center" prop="loginNum" min-width="100px"/>
      <el-table-column label="登录ip" :show-overflow-tooltip="true" align="center" prop="loginIp" width="180"/>
      <el-table-column label="打码账户" align="center" prop="codeAccount" min-width="100px"/>
      <el-table-column label="累计有效投注" align="center" prop="codeTotal" min-width="100px"/>
      <el-table-column label="邀请码" align="center" prop="inviterCode" min-width="100px"/>
      <el-table-column label="佣金" align="center" prop="inviteMoney" min-width="100px"/>
      <el-table-column label="渠道号" align="center" prop="channelcode" min-width="100px"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-menu"
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

    <!-- 添加或修改用户信息对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="账号" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入账号"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <more ref="more" :member-id="memberId" :member-code="memberCode" @memberMore="handleQuery"></more>
  </div>
</template>

<script>
import {
  listMemberInfo,
  getMemberInfo,
  addMemberInfo,
  updateMemberInfo,
  exportMemberInfo,
  changeStatus
} from '@/api/platform-web/member/memberInfo'
import more from './more'

export default {
  name: 'MemberInfo',
  components: {
    more: more
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 传递到子组件的memberId/memberCode
      memberCode: 0,
      memberId: null,
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
      // 用户信息表格数据
      memberInfoList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 状态列表0= 禁用 1=正常 2=测试号3=超管号
      typeList: [
        { label: '禁用', value: 0 },
        { label: '正常', value: 1 },
        { label: '测试号', value: 2 },
        { label: '超管号', value: 3 }
      ],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        bankAccount: null,
        searchValue: null, //会员Id,账号,手机号
        status: null,
        loginIp: null,
        nickName: null,
        inviterCode: null,
        channelcode: null,
        orderByColumn: 'reg_time',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        memberCode: [
          { required: true, message: '会员ID不能为空', trigger: 'blur' }
        ],
        cxAgent: [
          { required: true, message: '代理编号不能为空', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        loginNum: [
          { required: true, message: '登陆次数不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    //修改用户状态
    changeType(row) {
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
      })
    },
    //格式化列表状态
    formatterStatus(row, column) {
      var status = row.status
      if (status === 0) {
        return '禁用'
      } else if (status === 1) {
        return '正常'
      } else if (status === 2) {
        return '测试号'
      } else if (status === 3) {
        return '超管号'
      } else {
        return '未知'
      }

    },
    /** 查询用户信息列表 */
    getList() {
      this.loading = true

      listMemberInfo(this.queryParams).then(response => {
        this.memberInfoList = response.rows
        this.total = response.total
        this.loading = false
      })
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
        userName: null,
        password: null
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
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加用户信息'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
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
      this.$refs.more.show(this.memberId,this.memberCode)
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有会员列表数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportMemberInfo(queryParams)
      }).then(response => {
        this.download(response.msg)
      })
    }
  }
}
</script>
