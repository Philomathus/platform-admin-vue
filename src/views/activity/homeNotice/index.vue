<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('activity.homeNotice.tableDialog.title')" prop="title">
        <el-input
          v-model="queryParams.title"
          :placeholder="$t('activity.homeNotice.tableDialog.titlePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('global.status')" prop="status">
        <el-select v-model="queryParams.status" :placeholder="$t('global.statusPlaceholder')" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('activity.homeNotice.tableDialog.type')" prop="type">
        <el-select v-model="queryParams.type" :placeholder="$t('activity.homeNotice.tableDialog.typePlaceholder')" clearable size="small">
          <el-option
            v-for="dict in typeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
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
          v-hasPermi="['activity:homeNotice:add']"
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
          v-hasPermi="['activity:homeNotice:edit']"
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
          v-hasPermi="['activity:homeNotice:remove']"
        >{{ $t('global.deleteButton') }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['activity:homeNotice:export']"
        >{{ $t('global.exportButton') }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="homeNoticeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column :label="$t('activity.homeNotice.tableDialog.title')" align="center" prop="title"/>
      <el-table-column :label="$t('activity.homeNotice.tableDialog.content')" align="center" prop="content">
        <template v-slot="{row}">
          <div v-html="row.content" style="max-height: 120px"></div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('activity.homeNotice.tableDialog.index')" align="center" prop="indexs"/>

      <el-table-column :label="$t('global.status')" align="center" prop="status">
        <template slot-scope="scope">
          <span :style="{color: (status = statusOptions[parseInt(scope.row.status)]).color}">{{ status.dictLabel }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('activity.homeNotice.tableDialog.type')" align="center" prop="type" :formatter="typeFormat"/>
      <el-table-column :label="$t('global.operationColumn')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['activity:homeNotice:edit']"
          >{{ $t('global.editButton') }}
          </el-button>
          <el-button
            style="color: #FF5722"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['activity:homeNotice:remove']"
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

    <!-- 添加或修改系统公告对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('activity.homeNotice.tableDialog.title')" prop="title">
          <el-input v-model="form.title" :placeholder="$t('activity.homeNotice.tableDialog.titlePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.homeNotice.tableDialog.content')">
          <el-input v-model="form.content" type="textarea" :placeholder="$t('activity.homeNotice.tableDialog.contentPlaceholder')" rows="5"/>
        </el-form-item>
        <el-form-item :label="$t('activity.homeNotice.tableDialog.index')" prop="indexs">
          <el-input v-model="form.indexs" :placeholder="$t('activity.homeNotice.tableDialog.indexPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('global.status')">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="parseInt(dict.dictValue)"
            >{{ dict.dictLabel }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('activity.homeNotice.tableDialog.type')" prop="type">
          <el-select v-model="form.type" :placeholder="$t('activity.homeNotice.tableDialog.typePlaceholder')">
            <el-option
              v-for="dict in typeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
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
import {
  listHomeNotice,
  getHomeNotice,
  delHomeNotice,
  addHomeNotice,
  updateHomeNotice,
  exportHomeNotice
} from '@/api/activity/homeNotice'

export default {
  name: 'HomeNotice',
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
      // 系统公告表格数据
      homeNoticeList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 状态字典
      statusOptions: [],
      // 类型字典
      typeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: null,
        status: null,
        type: null,
        orderByColumn: 'type,indexs',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    }
  },
  created() {
    this.getList()
    this.getDicts('home_notice_status').then(response => {
      this.statusOptions = response.data
    })
    this.getDicts('home_notice_type').then(response => {
      this.typeOptions = response.data
    })
  },
  methods: {
    /** 查询系统公告列表 */
    getList() {
      this.loading = true
      listHomeNotice(this.queryParams).then(response => {
        this.homeNoticeList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status)
    },
    // 类型字典翻译
    typeFormat(row, column) {
      return this.selectDictLabel(this.typeOptions, row.type)
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
        title: null,
        content: null,
        updateTime: null,
        indexs: null,
        status: 0,
        type: null
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
      this.title = this.t('activity.homeNotice.addTitle')
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getHomeNotice(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = this.t('activity.homeNotice.EditTitle')
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateHomeNotice(this.form).then(response => {
              this.msgSuccess(this.$t('global.editSuccessMsg'));
              this.open = false
              this.getList()
            })
          } else {
            addHomeNotice(this.form).then(response => {
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
      this.$confirm(this.$t('global.deleteConfirm') + ids + '"?', this.$t('global.deleteConfirmTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: 'warning'
      }).then(function() {
        return delHomeNotice(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess(this.$t('global.deleteSuccessMsg'));
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm(this.$t('global.confirmExport'), this.$t('global.confirmExportTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: "warning"
      }).then(function() {
        return exportHomeNotice(queryParams)
      }).then(response => {
        (response.msg)
      }).catch(() => {
      })
    }
  }
}
</script>
