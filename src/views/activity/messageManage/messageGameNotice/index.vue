<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="公告标题" prop="title">
        <el-input
          v-model="queryParams.title"
          :placeholder="请输入公告标题"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="设备端" prop="device">
        <el-input
          v-model="queryParams.device"
          :placeholder="请输入设备端"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('global.ctTime')" prop="pubdatetime">
        <el-date-picker clearable size="small"
                        v-model="queryParams.pubdatetime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        :placeholder="选择发布时间"
        >
        </el-date-picker>
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
          v-hasPermi="['admin:messageGameNotice:add']"
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
          v-hasPermi="['admin:messageGameNotice:edit']"
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
          v-hasPermi="['admin:messageGameNotice:remove']"
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
          v-hasPermi="['admin:messageGameNotice:export']"
        >{{ $t('global.exportButton') }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="messageGameNoticeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column :label="公告标题" align="center" prop="title"/>
      <el-table-column :label="设备端" align="center" prop="device"/>
      <el-table-column :label="动作" align="center" prop="action"/>
      <el-table-column :label="$t('global.ctTime')" align="center" prop="pubdatetime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.pubdatetime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="内容" align="center" prop="content"/>
      <el-table-column :label="$t('global.operationColumn')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:messageGameNotice:edit']"
          >{{ $t('global.editButton') }}
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:messageGameNotice:remove']"
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

    <!-- 添加或修改游戏公告对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="公告标题" prop="title">
          <el-input v-model="form.title" :placeholder="请输入公告标题"/>
        </el-form-item>
        <!--        <el-form-item :label="设备端" prop="device">-->
        <!--          <el-input v-model="form.device" :placeholder="请输入设备端" />-->
        <!--        </el-form-item>-->
        <el-form-item :label="$t('global.ctTime')" prop="pubdatetime">
          <el-date-picker clearable size="small"
                          v-model="form.pubdatetime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          :placeholder="选择发布时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="内容">
          <editor v-model="form.content" path="messageNotice"/>
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
  listMessageGameNotice,
  getMessageGameNotice,
  delMessageGameNotice,
  addMessageGameNotice,
  updateMessageGameNotice,
  exportMessageGameNotice
} from '@/api/activity/messageGameNotice'
import Editor from '@/components/WangEditor'

export default {
  name: 'MessageGameNotice',
  components: {
    Editor
  },
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
      // 游戏公告表格数据
      messageGameNoticeList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: null,
        device: null,
        action: null,
        pubdatetime: null,
        content: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        title: [
          { required: true, message: '公告标题不能为空', trigger: 'blur' }
        ],
        device: [
          { required: true, message: '设备端不能为空', trigger: 'blur' }
        ],
        action: [
          { required: true, message: '动作不能为空', trigger: 'blur' }
        ],
        pubdatetime: [
          { required: true, message: '发布时间不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询游戏公告列表 */
    getList() {
      this.loading = true
      listMessageGameNotice(this.queryParams).then(response => {
        this.messageGameNoticeList = response.rows
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
        title: null,
        device: null,
        action: null,
        pubdatetime: null,
        content: null
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
      this.title = '添加游戏公告'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getMessageGameNotice(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改游戏公告'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateMessageGameNotice(this.form).then(response => {
              this.msgSuccess(this.$t('global.editSuccessMsg'));
              this.open = false
              this.getList()
            })
          } else {
            addMessageGameNotice(this.form).then(response => {
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
      this.$confirm('是否确认删除游戏公告编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
cancelButtonText: this.$t('global.cancelButton'),
        type: 'warning'
      }).then(function() {
        return delMessageGameNotice(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess(this.$t('global.deleteSuccessMsg'));
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有游戏公告数据项?', '警告', {
        confirmButtonText: '确定',
cancelButtonText: this.$t('global.cancelButton'),
        type: 'warning'
      }).then(function() {
        return exportMessageGameNotice(queryParams)
      }).then(response => {
        (response.msg)
      })
    }
  }
}
</script>
