<template>
  <div class="app-container">
    <el-button type="primary">有效下注 {{ numberUtil.toFixed(totalData.totalSuccessBet) }}</el-button>
    <el-button type="success">总下注 {{ numberUtil.toFixed(totalData.totalBet) }}</el-button>
    <el-button type="warning">盈利 {{ numberUtil.toFixed(totalData.totalIncome) }}</el-button>
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" style="margin-top: 20px">
      <el-form-item label="日期范围" prop="selectDate">
        <el-date-picker type="datetimerange" v-model="queryParams.selectDate" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '90%'}" start-placeholder="开始时间"
                        end-placeholder="开始时间"
                        range-separator="至" clearable
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="account">
        <el-input
          v-model="queryParams.account"
          placeholder="请输入会员ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="platformId">
        <el-input
          v-model="queryParams.agent"
          placeholder="请输入平台ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="kindId">
        <el-input
          v-model="queryParams.sonPlatformName"
          placeholder="请输入子平台名称"
          clearable
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
          v-hasPermi="['member:memberGameData:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="memberGameDataList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="会员ID" align="center" prop="account">
        <template v-slot="{row}">
          <a @click="" style="color: #00afff" v-if="row.platformId==10000||row.platformId==80000">{{ row.account }}</a>
          <div v-else>{{ row.account }}</div>
        </template>
      </el-table-column>
      <!--      <el-table-column label="本地ID" align="center" prop="id" />-->
      <!--      <el-table-column label="游戏局号" align="center" prop="gameId" />-->
      <el-table-column label="平台ID" align="center" prop="agent"/>
      <el-table-column label="平台名称" align="center" prop="platformName"/>
      <el-table-column label="子平台名称" align="center" prop="sonPlatformName"/>
      <!--      <el-table-column label="游戏id" align="center" prop="kindId" />-->
      <el-table-column label="有效下注" align="center" prop="cellScore"/>
      <el-table-column label="总下注" align="center" prop="allBet"/>
      <el-table-column label="盈利" align="center" prop="profit"/>
      <el-table-column label="抽水" align="center" prop="revenue"/>
      <!--      <el-table-column label="本地平台id" align="center" prop="platformId" />-->
      <!--      <el-table-column label="游戏平台类型" align="center" prop="platformType" />-->
      <!--      <el-table-column label="洗码状态" align="center" prop="status" :formatter="formatterStatus"/>-->
      <el-table-column label="游戏开始时间" align="center" width="150px" prop="gameStartTime"/>
      <el-table-column label="游戏结束时间" align="center" width="150px" prop="gameEndTime"/>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改会员注单数据对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="游戏局号" prop="gameId">
          <el-input v-model="form.gameId" placeholder="请输入游戏局号"/>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="form.account" placeholder="请输入账号"/>
        </el-form-item>
        <el-form-item label="游戏id" prop="kindId">
          <el-input v-model="form.kindId" placeholder="请输入游戏id"/>
        </el-form-item>
        <el-form-item label="有效下注" prop="cellScore">
          <el-input v-model="form.cellScore" placeholder="请输入有效下注"/>
        </el-form-item>
        <el-form-item label="总下注" prop="allBet">
          <el-input v-model="form.allBet" placeholder="请输入总下注"/>
        </el-form-item>
        <el-form-item label="盈利" prop="profit">
          <el-input v-model="form.profit" placeholder="请输入盈利"/>
        </el-form-item>
        <el-form-item label="抽水" prop="revenue">
          <el-input v-model="form.revenue" placeholder="请输入抽水"/>
        </el-form-item>
        <el-form-item label="游戏结束时间" prop="gameEndTime">
          <el-input v-model="form.gameEndTime" placeholder="请输入游戏结束时间"/>
        </el-form-item>
        <el-form-item label="本地平台id" prop="platformId">
          <el-input v-model="form.platformId" placeholder="请输入本地平台id"/>
        </el-form-item>
        <el-form-item label="代理编号" prop="agent">
          <el-input v-model="form.agent" placeholder="请输入代理编号"/>
        </el-form-item>
        <el-form-item label="游戏平台类型" prop="platformType">
          <el-select v-model="form.platformType" placeholder="请选择游戏平台类型">
            <el-option label="请选择字典生成" value=""/>
          </el-select>
        </el-form-item>
        <el-form-item label="0:未洗码1已经洗码">
          <el-radio-group v-model="form.status">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="游戏开始时间" prop="gameStartTime">
          <el-input v-model="form.gameStartTime" placeholder="请输入游戏开始时间"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listMemberGameData,
  getMemberGameData,
  delMemberGameData,
  addMemberGameData,
  updateMemberGameData,
  exportMemberGameData,
  getCount
} from '@/api/platform-web/member/memberGameData'

export default {
  name: 'MemberGameData',
  components: {},
  data() {
    return {
      //统计数据
      totalData: {
        totalSuccessBet: 0,
        totalBet: 0,
        totalIncome: 0
      },
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
      // 会员注单数据表格数据
      memberGameDataList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        gameId: null,
        account: null,
        kindId: null,
        cellScore: null,
        allBet: null,
        profit: null,
        revenue: null,
        gameEndTime: null,
        platformId: null,
        agent: null,
        platformType: null,
        status: null,
        gameStartTime: null,
        selectDate: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],
        orderByColumn: 'game_end_time',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        gameId: [
          { required: true, message: '游戏局号不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    var userId = this.$route.query.userId
    var createTime = this.$route.query.createTime
    if (createTime) {
      this.queryParams.account = userId
      this.queryParams.selectDate[0] = createTime
      this.queryParams.selectDate[1] = this.parseTime(this.getTodayEndTime())
    }
    this.getList()
    this.getCount()
  },
  methods: {
    // 0:未洗码1已经洗码
    formatterStatus(row) {
      if (row.status == 0) {
        return '未洗码'
      } else if (row.status == 1) {
        return '已洗码'
      } else {
        return '未知'
      }
    },
    getCount() {
      getCount(this.queryParams).then((res) => {
        console.info(res)
        if (res.data) {
          this.totalData = res.data
        }
      })
    },
    /** 查询会员注单数据列表 */
    getList() {
      this.loading = true
      listMemberGameData(this.queryParams).then(response => {
        this.memberGameDataList = response.rows
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
        gameId: null,
        account: null,
        kindId: null,
        cellScore: null,
        allBet: null,
        profit: null,
        revenue: null,
        gameEndTime: null,
        platformId: null,
        agent: null,
        platformType: null,
        status: 0,
        gameStartTime: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
      this.getCount()
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
      this.title = '添加会员注单数据'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getMemberGameData(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改会员注单数据'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateMemberGameData(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addMemberGameData(this.form).then(response => {
              this.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$confirm('是否确认删除会员注单数据编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delMemberGameData(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有会员注单数据数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportMemberGameData(queryParams)
      }).then(response => {
        this.download(response.msg)
      })
    }
  }
}
</script>
