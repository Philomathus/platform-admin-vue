<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="域名分组" prop="dgroup">
        <el-select v-model="queryParams.dgroup" :placeholder="请选择域名分组" clearable size="small">
          <el-option
            v-for="dict in dgroupOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="域名" prop="domain">
        <el-input
          v-model="queryParams.domain"
          :placeholder="请输入域名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="动态编码" prop="dcode">
        <el-input
          v-model="queryParams.dcode"
          :placeholder="请输入动态编码"
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
          v-hasPermi="['config:domain:add']"
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
          @click="handleUpdate"
          v-hasPermi="['config:domain:edit']"
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
          @click="handleDelete"
          v-hasPermi="['config:domain:remove']"
        >{{ $t('global.deleteButton') }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="domainList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column :label="$t('config.domain.tableDialog.dgroup')" align="center" prop="dgroup" :formatter="dgroupFormat"/>
      <el-table-column :label="$t('config.domain.tableDialog.domain')" align="center" prop="domain"/>
      <el-table-column align="center" prop="dcode" :formatter="dcodeFormat" min-width="100px">
        <template slot="header">
          <span>{{ $t('config.domain.dynamicCoding') }}</span>
          <el-tooltip popper-class="tooltip" placement="top">
            <i class="el-icon-question"></i>
            <div slot="content" class="tooltip-content">
              <div>{{ $t('config.domain.testContent') }}</div>
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column :label="$t('config.domain.tableDialog.remark')" align="center" prop="remark"/>
      <el-table-column :label="$t('config.domain.tableDialog.index')" align="center" prop="sort"/>
      <el-table-column :label="$t('global.operationColumn')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['config:domain:edit']"
          >{{ $t('global.editButton') }}
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['config:domain:remove']"
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

    <!-- 添加或修改域名配置对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('config.domain.tableDialog.dgroup')" prop="dgroup">
          <el-select v-model="form.dgroup" :placeholder="$t('config.domain.tableDialog.dgroupPlaceholder')">
            <el-option
              v-for="dict in dgroupOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('config.domain.tableDialog.domain')" prop="domain">
          <el-input v-model="form.domain" :placeholder="$t('config.domain.tableDialog.domainPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('config.domain.tableDialog.dcode')" prop="dcode">
          <el-input v-model="form.dcode" :placeholder="$t('config.domain.tableDialog.dcodePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('config.domain.tableDialog.remark')" prop="remark">
          <el-input v-model="form.remark" type="textarea" :placeholder="$t('config.domain.tableDialog.remarkPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('config.domain.tableDialog.index')" prop="sort">
          <el-input type="number" v-model="form.sort" :placeholder="$t('config.domain.tableDialog.index')"/>
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
import { listDomain, getDomain, existsDomain, delDomain, addDomain, updateDomain } from '@/api/platform-web/config/domain'

export default {
  name: 'Domain',
  components: {},
  data() {
    const validUrl = (rule, value, callback) => {
      if (/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(value) === false) {
        callback(new Error('请输入正确的URL'))
      } else {
        callback()
      }
    }
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
        dgroup: null,
        orderByColumn: 'dgroup,sort'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        domain: [
          { required: true, message: this.$t('config.domain.validation.domain'), trigger: 'blur' },
          { required: true, validator: validUrl, trigger: 'blur' }
        ],
        dgroup: [
          { required: true, message: this.$t('config.domain.validation.dgroup'), trigger: 'change' }
        ],
        sort: [
          { required: true, message: this.$t('config.domain.validation.sort'), trigger: 'blur' }
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
      this.title = this.$t('config.domain.addTitle');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getDomain(id).then(response => {
        this.form = response.data
        this.form.domain = this.form.domain.substring(8, this.form.domain.length)
        this.open = true
        this.title = this.$t('config.domain.editTitle');
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.form.domain = this.form.domain.trim()
          if (this.form.id != null) {
            updateDomain(this.form).then(response => {
              this.msgSuccess(this.$t('global.editSuccessMsg'));
              this.open = false
              this.getList()
            })
          } else {
            addDomain(this.form).then(response => {
              this.msgSuccess(this.$t('global.addSuccessMsg'));
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
      this.$confirm(this.$t('global.deleteConfirm') + row.title + '"?', this.$t('global.deleteConfirmTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: 'warning'
      }).then(function() {
        return delDomain(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess(this.$t('global.deleteSuccessMsg'));
      })
    }
  }
}
</script>
