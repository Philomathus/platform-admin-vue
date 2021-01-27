<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="域名分组" prop="dgroup">
        <el-select v-model="queryParams.dgroup" placeholder="请选择域名分组" clearable size="small">
          <el-option
            v-for="dict in dgroupOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="域名" prop="domain">
        <el-input
          v-model="queryParams.domain"
          placeholder="请输入域名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="动态编码" prop="dcode">
        <el-input
          v-model="queryParams.dcode"
          placeholder="请输入动态编码"
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
          v-hasPermi="['config:domain:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['config:domain:edit']"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['config:domain:remove']"
        >删除
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="domainList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="域名分组" align="center" prop="dgroup" :formatter="dgroupFormat"/>
      <el-table-column label="域名" align="center" prop="domain"/>
      <el-table-column align="center" prop="dcode" :formatter="dcodeFormat">
        <template slot="header">
          <span>动态编码</span>
          <el-tooltip popper-class="tooltip" placement="top">
            <i class="el-icon-question"></i>
            <div slot="content" class="tooltip-content">
              <div>1、测试内容测试内容测试内容，</div>
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark"/>
      <el-table-column label="排序" align="center" prop="sort"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['config:domain:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['config:domain:remove']"
          >删除
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

    <!-- 添加或修改域名配置对话框 -->
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="域名分组" prop="dgroup">
          <el-select v-model="form.dgroup" placeholder="请选择域名分组">
            <el-option
              v-for="dict in dgroupOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="域名" prop="domain">
          <el-input v-model="form.domain" placeholder="请输入域名"/>
        </el-form-item>
        <el-form-item label="动态编码" prop="dcode">
          <el-input v-model="form.dcode" placeholder="请输入动态编码"/>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input type="number" v-model="form.sort" placeholder="请输入排序"/>
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
import { listDomain, getDomain, delDomain, addDomain, updateDomain } from '@/api/platform-web/config/domain'

export default {
  name: 'Domain',
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
      // 域名配置表格数据
      domainList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 域名分组字典
      dgroupOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        domain: null,
        dcode: null,
        dgroup: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        domain: [
          { required: true, message: '域名不能为空', trigger: 'blur' },
          {
            validator: function(rule, value, callback) {
              if (/(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(value) == false) {
                callback(new Error('请输入正确的Url'))
              } else {
                callback()
              }
            }, trigger: 'blur'
          }
        ],
        dgroup: [
          { required: true, message: '域名分组不能为空', trigger: 'change' }
        ],
        sort: [
          { required: true, message: '排序不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
    this.getDicts('config_domain_group').then(response => {
      this.dgroupOptions = response.data
    })
  },
  methods: {
    /** 查询域名配置列表 */
    getList() {
      this.loading = true
      listDomain(this.queryParams).then(response => {
        this.domainList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 域名分组字典翻译
    dgroupFormat(row, column) {
      return this.selectDictLabel(this.dgroupOptions, row.dgroup)
    },
    dcodeFormat(row, column) {
      if (row.dcode) {
        return '\$\{' + row.dcode + '\}'
      }
      return null
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
        domain: null,
        dcode: null,
        dgroup: null,
        remark: null,
        sort: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null
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
      this.title = '添加域名配置'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getDomain(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改域名配置'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDomain(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addDomain(this.form).then(response => {
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
      this.$confirm('是否确认删除域名配置编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delDomain(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      })
    }
  }
}
</script>
