<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
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
          v-hasPermi="['server:im:add']"
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
          v-hasPermi="['server:im:edit']"
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
          v-hasPermi="['server:im:remove']"
        >删除
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="imList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="ID" align="center" prop="id"/>
      <el-table-column label="名称" align="center" prop="name"/>
      <el-table-column label="appId" align="center" prop="appId"/>
      <el-table-column label="管理员账号" align="center" prop="identify"/>
      <el-table-column label="全员组" align="center" prop="fullGroup"/>
      <el-table-column label="在线组" align="center" prop="onlineGroup"/>
      <el-table-column label="状态" align="center" prop="isEffect">
        <template slot-scope="scope">
          <span :style="{color: (status = isEffectOptions[parseInt(scope.row.isEffect)]).color}">{{ status.dictLabel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            v-if="scope.row.isEffect != 1"
            style="color: #5FB878"
            @click="handleEffect(scope.row)"
            v-hasPermi="['server:im:effect']"
          >激活
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

    <!-- 添加或修改IM即时通讯服务配置对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称"/>
        </el-form-item>
        <el-form-item label="appId" prop="appId">
          <el-input v-model="form.appId" placeholder="请输入appId"/>
        </el-form-item>
        <el-form-item label="appKey" prop="appKey">
          <el-input v-model="form.appKey" placeholder="请输入appKey"/>
        </el-form-item>
        <el-form-item label="IM管理员账号" prop="identify">
          <el-input v-model="form.identify" placeholder="请输入IM管理员账号"/>
        </el-form-item>
        <el-form-item label="全员组" prop="fullGroup">
          <el-input v-model="form.fullGroup" placeholder="请输入全员组"/>
        </el-form-item>
        <el-form-item label="在线组" prop="onlineGroup">
          <el-input v-model="form.onlineGroup" placeholder="请输入在线组"/>
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
import { listIm, getIm, delIm, addIm, updateIm, effectIm } from '@/api/platform-web/server/im'

export default {
  name: 'Im',
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
      // IM即时通讯服务配置表格数据
      imList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 状态字典
      isEffectOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        orderByColumn: 'is_effect',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        appId: [
          { required: true, message: 'appId不能为空', trigger: 'blur' }
        ],
        appKey: [
          { required: true, message: 'appKey不能为空', trigger: 'blur' }
        ],
        identify: [
          { required: true, message: 'IM管理员账号不能为空', trigger: 'blur' }
        ],
        fullGroup: [
          { required: true, message: '全员组不能为空', trigger: 'blur' }
        ],
        onlineGroup: [
          { required: true, message: '在线组不能为空', trigger: 'blur' }
        ],
        isEffect: [
          { required: true, message: '状态不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
    this.getDicts('server_im_status').then(response => {
      this.isEffectOptions = response.data
    })
  },
  methods: {
    /** 查询IM即时通讯服务配置列表 */
    getList() {
      this.loading = true
      listIm(this.queryParams).then(response => {
        this.imList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 状态字典翻译
    isEffectFormat(row, column) {
      return this.selectDictLabel(this.isEffectOptions, row.isEffect)
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
        name: null,
        appId: null,
        appKey: null,
        identify: null,
        fullGroup: null,
        onlineGroup: null,
        provider: null,
        isEffect: 0
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
      this.title = '添加IM即时通讯服务配置'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getIm(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改IM即时通讯服务配置'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateIm(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addIm(this.form).then(response => {
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
      for (const item of this.imList) {
        for (const id of ids) {
          if (id === item.id && item.isEffect === 1) {
            this.msgWarning('编号' + id + '已激活，请勿删除')
            return
          }
        }
      }
      this.$confirm('是否确认删除IM即时通讯服务配置编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delIm(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {
      })
    },
    handleEffect(row) {
      var that = this
      this.$confirm('确定要激活编号为"' + row.id + '"的IM即时通讯服务吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return effectIm(row.id).then((res) => {
          that.getList()
          that.msgSuccess('激活成功')
        })
      })
    }
  }
}
</script>
