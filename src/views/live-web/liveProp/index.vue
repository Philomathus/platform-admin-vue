<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('liveWeb.liveProp.queryForm.nameLabel')" prop="name">
        <el-input
          v-model="queryParams.name"
          :placeholder="$t('liveWeb.liveProp.queryForm.namePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('liveWeb.liveProp.queryForm.typeLabel')" prop="type">
        <el-select v-model="queryParams.type" :placeholder="$t('liveWeb.liveProp.queryForm.typePlaceholder')" clearable size="small">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('liveWeb.liveProp.queryForm.searchButton')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('liveWeb.liveProp.queryForm.resetButton')}}</el-button>
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
          v-hasPermi="['admin:liveProp:add']"
        >{{$t('liveWeb.liveProp.actions.add')}}
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
          v-hasPermi="['admin:liveProp:edit']"
        >{{$t('liveWeb.liveProp.actions.edit')}}
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
          v-hasPermi="['admin:liveProp:remove']"
        >{{$t('liveWeb.liveProp.actions.remove')}}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="livePropList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="id" align="center" prop="id"/>
      <el-table-column :label="$t('liveWeb.liveProp.table.name')" align="center" prop="name"/>
      <el-table-column :label="$t('liveWeb.liveProp.table.icon')" align="center" prop="icon">
        <template slot-scope="scope">
          <el-image
            style="width: 50px;"
            :src="scope.row.icon"
            fit="contain"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveProp.table.diamonds')" align="center" prop="diamonds"/>
      <el-table-column :label="$t('liveWeb.liveProp.table.ticket')" align="center" prop="ticket"/>
      <el-table-column :label="$t('liveWeb.liveProp.table.isMuch')" align="center" prop="isMuch" :formatter="isMuchFormat"/>
      <el-table-column :label="$t('liveWeb.liveProp.table.type')" align="center" prop="type" :formatter="typeFormat"/>
      <el-table-column :label="$t('liveWeb.liveProp.table.isAnimated')" align="center" prop="isAnimated" :formatter="animatedFormat"/>
      <el-table-column :label="$t('liveWeb.liveProp.table.isEffect')" align="center" key="isEffect" v-if="columns[0].visible">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isEffect"
            active-value="1"
            inactive-value="0"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:liveProp:edit']"
          >修改
          </el-button>
          <el-button
            style="color: #FF5722"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:liveProp:remove']"
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

    <!-- 添加或修改礼物列对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="700px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">

        <div class="el-row">
          <div class="el-col-lg-13">
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入道具名"/>
             </el-form-item><br>
             <el-form-item label="消费钻石" prop="diamonds">
              <el-input v-model="form.diamonds" placeholder="请输入"/>
             </el-form-item><br>
             <el-form-item label="主播获得热度:" prop="ticket">
              <el-input v-model="form.ticket" placeholder="请输入"/>
             </el-form-item>
          </div>
          <div class="el-col-lg-11">
            <el-form-item label="图标" prop="icon">
              <imageUpload v-model="form.icon" path="give"/>
            </el-form-item>
          </div>
        </div>

        <el-form-item label="连续">
          <el-radio-group v-model="form.isMuch">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="展示动画">
          <el-radio-group v-model="form.isAnimated">
            <el-radio label="0">普通礼物</el-radio>
            <el-radio label="1">gif礼物</el-radio>
            <el-radio label="2">大型动画礼物</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="svga动画" prop="animatedUrl" v-if="form.isAnimated === '2'">
          <fileUpload v-model="form.animatedUrl" path="give"/>
        </el-form-item>

        <el-form-item label="是否特殊礼物">
          <el-radio-group v-model="form.isSpecial">
            <el-radio label="0">正常</el-radio>
            <el-radio label="1">特殊</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="form.type">
            <el-radio label="0">礼物</el-radio>
            <el-radio label="1">打赏</el-radio>
            <el-radio label="2">守护</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.isEffect">
            <el-radio label="1">有效</el-radio>
            <el-radio label="0">无效</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" placeholder="请输入排序"  type="number" class="col-w240"/>
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
  listLiveProp,
  getLiveProp,
  delLiveProp,
  addLiveProp,
  updateLiveProp,
  exportLiveProp
} from '@/api/live-web/liveProp/liveProp'
import ImageUpload from '@/components/ImageUpload'
import FileUpload from '@/components/FileUpload'

export default {
  name: 'LiveProp',
  components: {
    ImageUpload,
    FileUpload
  },
  data() {
    return {
      //状态选择栏
      typeOptions: [{
        value: '0',
        label: '礼物'
      }, {
        value: '1',
        label: '打赏'
      }, {
        value: '2',
        label: '守护'
      }],
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
      livePropList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        score: null,
        diamonds: null,
        icon: null,
        ticket: null,
        isMuch: null,
        sort: null,
        isRedEnvelope: null,
        isAnimated: null,
        isSpecial: null,
        isEffect: null,
        animType: null,
        robotDiamonds: null,
        pcIcon: null,
        pcGif: null,
        gifGiftShowStyle: null,
        animatedUrl: null,
        type: null
      },
      // 列信息
      columns: [
        {key: 0, label: `状态`, visible: true}
      ],
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询礼物列列表 */
    getList() {
      this.loading = true
      listLiveProp(this.queryParams).then(response => {
        this.livePropList = response.rows
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
        name: null,
        score: null,
        diamonds: null,
        icon: null,
        ticket: null,
        isMuch: null,
        sort: null,
        isRedEnvelope: null,
        isAnimated: null,
        isSpecial: '0',
        isEffect: null,
        animType: null,
        robotDiamonds: null,
        pcIcon: null,
        pcGif: null,
        gifGiftShowStyle: null,
        animatedUrl: null,
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
      this.title = '添加礼物列'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getLiveProp(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改礼物列'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.form.animType = 'svga'
          this.form.score = 0
          if (this.form.id != null) {
            updateLiveProp(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addLiveProp(this.form).then(response => {
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
      this.$confirm(this.$t('liveWeb.liveProp.confirmRemoveDialog.message', {ids: ids}), this.$t('liveWeb.liveProp.confirmRemoveDialog.title'), {
        confirmButtonText: this.$t('liveWeb.liveProp.confirmRemoveDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveProp.confirmRemoveDialog.cancelButton'),
        type: 'warning'
      }).then(function () {
        return delLiveProp(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess(this.$t('liveWeb.liveProp.messageBox.removeSuccess'))
      })
    },
    isMuchFormat(row, column) {
      if (row.isMuch == '1') {
        return this.$t('liveWeb.liveProp.table.isMuch1')
      } else {
        return this.$t('liveWeb.liveProp.table.isMuchOthers')
      }
    },
    typeFormat(row, column) {
      if (row.type == '0') {
        return this.$t('liveWeb.liveProp.table.type0')
      } else if (row.type == '1') {
        return this.$t('liveWeb.liveProp.table.type1')
      } else {
        return this.$t('liveWeb.liveProp.table.type2')
      }
    },
    animatedFormat(row, column) {
      if (row.isAnimated == '0') {
        return this.$t('liveWeb.liveProp.table.isAnimated0')
      } else if (row.isAnimated == '1') {
        return this.$t('liveWeb.liveProp.table.isAnimated1')
      } else {
        return this.$t('liveWeb.liveProp.table.isAnimatedOthers')
      }
    },
    // 状态修改
    handleStatusChange(row) {
      let text = row.isEffect === '0' ? this.$t('liveWeb.liveProp.table.isEffect0') : this.$t('liveWeb.liveProp.table.isEffect1')

      this.$confirm(this.$t('liveWeb.liveProp.confirmStatusChangeDialog.message', {text: text, name: row.name}), this.$t('liveWeb.liveProp.confirmStatusChangeDialog.title'), {
        confirmButtonText: this.$t('liveWeb.liveProp.confirmStatusChangeDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveProp.confirmStatusChangeDialog.cancelButton'),
        type: 'warning'
      }).then(function () {
        var data = {}
        data.id = row.id
        data.isEffect = row.isEffect
        return updateLiveProp(data)
      }).then(() => {
        this.msgSuccess(this.$t('liveWeb.liveProp.messageBox.statusChangeSuccess', {text: text}))
      }).catch(function () {
        row.isEffect = row.isEffect === '0' ? '1' : '0'
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return exportLiveProp(queryParams)
      }).then(response => {
        this.downloadExcel(response, '礼物')
      }).catch(() => {
      })
    }
  }
}
</script>
