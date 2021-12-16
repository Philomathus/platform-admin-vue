<template>
  <div class="app-container">
    <el-button type="primary" @click="copy1">总充值 {{ this.totalData.total.toFixed(2) }}</el-button>
    <el-button type="success" @click="copy2">总打码 {{ this.totalData.countCur.toFixed(2) }}</el-button>
    <el-button type="warning" @click="copy3">还需打码 {{ (this.totalData.total - this.totalData.countCur).toFixed(2) }}</el-button>
    <el-form :model="queryParams" ref="queryForm" style="margin-top: 10px" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="日期范围" prop="selectDate">
        <el-date-picker
          type="daterange"
          v-model="queryParams.selectDate"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          range-separator="至"
          clearable
          :picker-options="pickerOptions"
        />
      </el-form-item>
      <el-form-item prop="userId">
        <el-input
          v-model.trim="queryParams.userId"
          placeholder="会员ID"
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
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['member:memberBcode:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="memberBcodeList">
      <el-table-column label="会员ID" align="center" prop="userId"/>
      <el-table-column label="收入" align="center" prop="income"/>
      <el-table-column label="描述" align="center" prop="des"/>
      <el-table-column label="是否打码" align="center" prop="status" :formatter="formatterStatus"/>
      <el-table-column label="当前打码量" align="center" prop="cur"/>
      <el-table-column label="创建时间" align="center" prop="createTime" min-width="160"/>
      <el-table-column label="最后更新人" align="center" prop="updateBy" min-width="160"/>
      <el-table-column label="最后更新时间" align="center" prop="updateTime" min-width="160">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            style="color: #FF5722"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['member:memberBcode:edit']"
          >修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[20,50,100]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 修改会员打码数据对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="当前打码量" prop="cur">
          <el-input v-model="form.cur" placeholder="请输入当前打码量" />
        </el-form-item>
        <el-form-item label="Google验证码" prop="googleAuthCode">
          <el-input v-model="form.googleAuthCode" placeholder="请输入Google验证码"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  listMemberBcode,
  exportMemberBcode,
  getTotalData,
  getMemberBcode,
  updateMemberBcode
} from '@/api/platform-web/member/memberBcode'
import { pickerDateShortcuts } from '@/utils/dateUtils'

export default {
  name: 'MemberBcode',
  components: {},
  data() {
    return {
      pickerOptions: { shortcuts: pickerDateShortcuts },
      //顶部的三个总数据
      totalData: {
        total: 0,
        countCur: 0
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
      // 会员打码数据表格数据
      memberBcodeList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        userId: null,
        selectDate: [this.parseTime(new Date, '{y}-{m}-{d}'), this.parseTime(new Date, '{y}-{m}-{d}')],
        orderByColumn: 'create_time',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        cur: [
          {required: true, message: '当前打码量不能为空,且数值大于等于0', trigger: 'blur', pattern:'^0\\.\\d+$|^[0-9]+(\\.\\d+)?$'}
        ],
        googleAuthCode: [
          {required: true, message: 'google验证码不能为空', trigger: 'blur'}
        ],
      }
    }
  },
  created() {
    this.getList()
    this.getTotalData()
  },
  methods: {
    //复制
    copy1() {
      this.copyCommand(this.totalData.total.toFixed(2))
    },
    copy2() {
      this.copyCommand(this.totalData.countCur.toFixed(2))
    },
    copy3() {
      this.copyCommand((this.totalData.total - this.totalData.countCur).toFixed(2))
    },
    getTotalData() {
      getTotalData(this.queryParams).then((res) => {
        this.totalData = res.data
      }).catch(() => {
        this.$notify.error('网络异常')
      })
    },
    // 0:未洗码1已经洗码
    formatterStatus(row) {
      if (row.status == 0) {
        return '未打码'
      } else if (row.status == 1) {
        return '已打码'
      } else {
        return '未知'
      }
    },
    /** 查询会员打码数据列表 */
    getList() {
      this.loading = true
      listMemberBcode(this.queryParams).then(response => {
        this.memberBcodeList = response.rows
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
        userId: null,
        des: null,
        income: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        status: 0,
        cur: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if(this.queryParams.userId){
        const reg = '^[0-9_]{1,}$'
        let flag = this.queryParams.userId.match(reg)
        if(!flag){
          this.msgError("会员ID只能输入数字及下划线")
          return
        }
      }
      this.queryParams.pageNum = 1
      this.getList()
      this.getTotalData()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.pageType = 1
      const id= row.id
      getMemberBcode(id).then(response => {
        this.form = response.data;
        this.form.cur = this.form.cur + '';
        this.open = true;
        this.title = "修改会员打码数据";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.pageType === 1) {
            let cur = parseFloat(this.form.cur);
            if(cur>this.form.income){
              this.msgError("当前打码量数值不能大于收入")
              return;
            }
            updateMemberBcode(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportMemberBcode(queryParams)
      }).then(response => {
        this.downloadExcel(response, '会员打码数据')
      }).catch(() => {
      })
    }
  }
}
</script>
