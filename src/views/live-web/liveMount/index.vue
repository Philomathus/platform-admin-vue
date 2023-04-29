<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('liveWeb.liveMount.queryForm.gvipLabel')" prop="gvip">
        <el-input
          v-model="queryParams.gvip"
          :placeholder="$t('liveWeb.liveMount.queryForm.gvipPlaceholder')"
          clearable
          size="small"
          type="number"
          class="no-number"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('liveWeb.liveMount.queryForm.nameLabel')" prop="name">
        <el-input
          v-model="queryParams.name"
          :placeholder="$t('liveWeb.liveMount.queryForm.namePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('liveWeb.liveMount.queryForm.searchButton')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('liveWeb.liveMount.queryForm.resetButton')}}</el-button>
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
          v-hasPermi="['admin:liveMount:add']"
        >{{$t('liveWeb.liveMount.actions.add')}}
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
          v-hasPermi="['admin:liveMount:edit']"
        >{{$t('liveWeb.liveMount.actions.edit')}}
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
          v-hasPermi="['admin:liveMount:remove']"
        >{{$t('liveWeb.liveMount.actions.remove')}}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="liveMountList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column :label="$t('liveWeb.liveMount.table.id')" align="center" prop="id"/>
      <el-table-column :label="$t('liveWeb.liveMount.table.gvip')" align="center" prop="gvip"/>
      <el-table-column :label="$t('liveWeb.liveMount.table.name')" align="center" prop="name"/>
      <el-table-column :label="$t('liveWeb.liveMount.table.status')" align="center" key="status" v-if="columns[0].visible">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveMount.table.iconUrl')" align="center" prop="iconUrl">
        <template slot-scope="scope">
          <el-image
            style="width: 50px;"
            :src="scope.row.iconUrl"
            fit="contain"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveMount.table.price')" align="center" prop="price"/>
      <el-table-column :label="$t('liveWeb.liveMount.table.disPrice')" align="center" prop="disPrice"/>
      <el-table-column :label="$t('liveWeb.liveMount.table.vday')" align="center" prop="vday"/>
      <el-table-column :label="$t('liveWeb.liveMount.table.oder')" align="center" prop="oder"/>
      <el-table-column :label="$t('liveWeb.liveMount.table.operation')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:liveMount:edit']"
          >{{$t('liveWeb.liveMount.table.editButton')}}
          </el-button>
          <el-button
            style="color: #FF5722"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:liveMount:remove']"
          >{{$t('liveWeb.liveMount.table.removeButton')}}
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

    <!-- 添加或修改礼物列对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="85px">

        <div class="el-row">
          <div class="el-col-lg-12">
            <el-form-item :label="$t('liveWeb.liveMount.addEditDialog.gvipLabel')" prop="gvip">
              <el-input v-model="form.gvip" :placeholder="$t('liveWeb.liveMount.addEditDialog.gvipPlaceholder')"/>
            </el-form-item>
            <el-form-item :label="$t('liveWeb.liveMount.addEditDialog.nameLabel')" prop="name">
              <el-input v-model="form.name" :placeholder="$t('liveWeb.liveMount.addEditDialog.namePlaceholder')"/>
            </el-form-item>
            <el-form-item :label="$t('liveWeb.liveMount.addEditDialog.statusLabel')">
              <el-radio-group v-model="form.status">
                <el-radio label="0">{{$t('liveWeb.liveMount.addEditDialog.status0')}}</el-radio>
                <el-radio label="1">{{$t('liveWeb.liveMount.addEditDialog.status1')}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="el-col-lg-12">
            <el-form-item :label="$t('liveWeb.liveMount.addEditDialog.iconUrlLabel')" prop="iconUrl">
              <imageUpload v-model="form.iconUrl" path="mount"/>
            </el-form-item>
          </div>

        </div>

        <el-form-item :label="$t('liveWeb.liveMount.addEditDialog.svgUrlLabel')" prop="svgUrl">
          <fileUpload v-model="form.svgUrl" path="mount"/>
        </el-form-item>

        <div class="el-row">
          <div class="el-col-lg-12">
            <el-form-item :label="$t('liveWeb.liveMount.addEditDialog.priceLabel')" prop="price">
              <el-input v-model="form.price" :placeholder="$t('liveWeb.liveMount.addEditDialog.pricePlaceholder')"/>
            </el-form-item>
          </div>
          <div class="el-col-lg-12">
            <el-form-item :label="$t('liveWeb.liveMount.addEditDialog.disPriceLabel')" prop="disPrice">
              <el-input v-model="form.disPrice" :placeholder="$t('liveWeb.liveMount.addEditDialog.disPricePlaceholder')"/>
            </el-form-item>
          </div>
        </div>

        <div class="el-row">
          <div class="el-col-lg-12">
            <el-form-item :label="$t('liveWeb.liveMount.addEditDialog.vdayLabel')" prop="vday">
              <el-input v-model="form.vday" :placeholder="$t('liveWeb.liveMount.addEditDialog.vdayPlaceholder')"/>
            </el-form-item>
          </div>
          <div class="el-col-lg-12">
            <el-form-item :label="$t('liveWeb.liveMount.addEditDialog.oderLabel')" prop="oder">
              <el-input type="number" v-model="form.oder"/>
            </el-form-item>
          </div>
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{$t('liveWeb.liveMount.addEditDialog.confirmButton')}}</el-button>
        <el-button @click="cancel">{{$t('liveWeb.liveMount.addEditDialog.cancelButton')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listLiveMount,
  getLiveMount,
  delLiveMount,
  addLiveMount,
  updateLiveMount,
  exportLiveMount
} from '@/api/live-web/liveMount/liveMount'
import ImageUpload from '@/components/ImageUpload'
import FileUpload from '@/components/FileUpload'

export default {
  name: 'LiveMount',
  components: {
    ImageUpload,
    FileUpload
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
      // 礼物列表格数据
      liveMountList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        gvip: null,
        name: null,
        status: null,
        iconUrl: null,
        svgUrl: null,
        price: null,
        disPrice: null,
        vday: null,
        oder : null
      },
      // 列信息
      columns: [
        {key: 0, label: `状态`, visible: true}
      ],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        id: [
          {required: true, message: this.$t('liveWeb.liveMount.addEditDialog.validations.id'), trigger: 'blur'}
        ],
        name: [
          {required: true, message: this.$t('liveWeb.liveMount.addEditDialog.validations.name'), trigger: 'blur'}
        ],
        status: [
          {required: true, message: this.$t('liveWeb.liveMount.addEditDialog.validations.status'), trigger: 'blur'}
        ],
        iconUrl: [
          {required: true, message: this.$t('liveWeb.liveMount.addEditDialog.validations.iconUrl'), trigger: 'blur'}
        ],
        gvip: [
          {required: true, message: this.$t('liveWeb.liveMount.addEditDialog.validations.gvip'), trigger: 'blur'}
        ], svgUrl: [
          {required: true, message: this.$t('liveWeb.liveMount.addEditDialog.validations.svgUrl'), trigger: 'blur'}
        ], price: [
          {required: true, message: this.$t('liveWeb.liveMount.addEditDialog.validations.price'), trigger: 'blur'}
        ], disPrice: [
          {required: true, message: this.$t('liveWeb.liveMount.addEditDialog.validations.disPrice'), trigger: 'blur'}
        ], vday: [
          {required: true, message: this.$t('liveWeb.liveMount.addEditDialog.validations.vday'), trigger: 'blur'}
        ],
        oder: [
          {required: true, message: this.$t('liveWeb.liveMount.addEditDialog.validations.oder'), trigger: 'blur'}
        ]

      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询礼物列列表 */
    getList() {
      this.loading = true
      listLiveMount(this.queryParams).then(response => {
        this.liveMountList = response.rows
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
        gvip: null,
        name: null,
        status: 0,
        iconUrl: null,
        svgUrl: null,
        price: null,
        disPrice: null,
        vday: null,
        oder : 0
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
      this.title = this.$t('liveWeb.liveMount.addEditDialog.titleAdd')
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getLiveMount(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = this.$t('liveWeb.liveMount.addEditDialog.titleEdit')
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLiveMount(this.form).then(response => {
              this.msgSuccess(this.$t('liveWeb.liveMount.messageBox.updateLiveMountSuccess'))
              this.open = false
              this.getList()
            })
          } else {
            addLiveMount(this.form).then(response => {
              this.msgSuccess(this.$t('liveWeb.liveMount.messageBox.addLiveMountSuccess'))
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

      this.$confirm(this.$t('liveWeb.liveMount.confirmRemoveDialog.message', {ids: ids}), this.$t('liveWeb.liveMount.confirmRemoveDialog.title'), {
        confirmButtonText: this.$t('liveWeb.liveMount.confirmRemoveDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveMount.confirmRemoveDialog.cancelButton'),
        type: 'warning'
      }).then(function () {
        return delLiveMount(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess(this.$t('liveWeb.liveMount.messageBox.removeSuccess'))
      })
    },
    // 状态修改
    handleStatusChange(row) {
      let text = row.status === '0' ? this.$t('liveWeb.liveMount.table.status0') : this.$t('liveWeb.liveMount.table.status1')

      this.$confirm(this.$t('liveWeb.liveMount.confirmStatusChangeDialog.message', {text: text, name: row.name}), this.$t('liveWeb.liveMount.confirmStatusChangeDialog.title'), {
        confirmButtonText: this.$t('liveWeb.liveMount.confirmStatusChangeDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveMount.confirmStatusChangeDialog.cancelButton'),
        type: 'warning'
      }).then(function () {
        var data = {}
        data.id = row.id
        data.status = row.status
        return updateLiveMount(data)
      }).then(() => {
        this.msgSuccess(this.$t('liveWeb.liveMount.messageBox.statusChangeSuccess', {text: text}))
      }).catch(function () {
        row.status = row.status === '0' ? '1' : '0'
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有礼物列数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return exportLiveMount(queryParams)
      }).then(response => {
        this.downloadExcel(response, '坐骑')
      }).catch(() => {
      })
    }
  }
}
</script>
