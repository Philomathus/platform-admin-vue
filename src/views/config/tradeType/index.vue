<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="交易类型" prop="type">
        <el-input
          v-model="queryParams.type"
          placeholder="请输入交易类型"
          clearable
          size="small"
          type="number"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="交易名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入交易名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="交易说明" prop="des">
        <el-input
          v-model="queryParams.des"
          placeholder="请输入交易说明"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{ $t('global.searchButton') }}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ $t('global.resetButton') }}</el-button>
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
          v-hasPermi="['config:tradeType:add']"
        >{{ $t('global.addButton') }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdateSelect"
          v-hasPermi="['config:tradeType:edit']"
        >{{ $t('global.editButton') }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDeleteSelect"
          v-hasPermi="['config:tradeType:remove']"
        >{{ $t('global.deleteButton') }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="tradeTypeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="交易类型" align="center" prop="type"/>
      <el-table-column label="交易名称" align="center" prop="name"/>
      <el-table-column label="交易说明" align="center" prop="des"/>
      <el-table-column label="$t('global.operationColumn')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['config:tradeType:edit']"
          >{{ $t('global.editButton') }}
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['config:tradeType:remove']"
          >{{ $t('global.deleteButton') }}
          </el-button>
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

    <!-- 添加或修改资金交易类型对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title"  :dialogType="dialogType" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="交易类型" prop="type">
          <el-input v-model="form.type" placeholder="请输入交易类型" type="number"/>
        </el-form-item>
        <el-form-item label="交易名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入交易名称"/>
        </el-form-item>
        <el-form-item label="交易说明" prop="des">
          <el-input v-model="form.des" placeholder="请输入交易说明"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{ $t('global.submitButton') }}</el-button>
        <el-button @click="cancel">{{ $t('global.cancelButton') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listTradeType, getTradeType, delTradeType, addTradeType, updateTradeType } from '@/api/platform-web/config/tradeType'
import { delPayType } from '@/api/platform-web/pay/payType'

export default {
  name: 'TradeType',
  components: {},
  data() {
    return {
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
      // 资金交易类型表格数据
      tradeTypeList: [],
      // 弹出层标题
      title: '',
      dialogType:'',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        type: null,
        name: null,
        des: null,
        orderByColumn: 'type'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        type: [
          { required: true, message: '交易类型不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '交易名称不能为空', trigger: 'blur' }
        ],
        des: [
          { required: true, message: '交易说明不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询资金交易类型列表 */
    getList() {
      this.loading = true
      listTradeType(this.queryParams).then(response => {
        this.tradeTypeList = response.rows
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
        type: null,
        name: null,
        des: null
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
      this.ids = selection.map(item => item.type)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加资金交易类型'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const type = row.type || this.ids
      getTradeType(type).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改资金交易类型'
        this.dialogType='1'
      })
    },
    /** 修改按钮操作 */
    handleUpdateSelect() {
      this.reset()
      const type =this.ids
      getTradeType(type).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改资金交易类型'
        this.dialogType='1'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.dialogType == '1') {
            updateTradeType(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addTradeType(this.form).then(response => {
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
      const types = row.type || this.ids
      this.$confirm('是否确认删除资金交易类型编号为"' + types + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delTradeType(types)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {
      })
    },
    /** 删除按钮操作 */
    handleDeleteSelect() {
      const types =this.ids
      this.$confirm('是否确认删除资金交易类型编号为"' + types + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delTradeType(types)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {
      })
    },

  }
}
</script>
