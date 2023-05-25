<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item prop="name">
        <el-input
          v-model="queryParams.name"
          :placeholder="$t('liveWeb.family.queryForm.namePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="userId">
        <el-input
          type="number"
          class="no-number"
          v-model.trim="queryParams.userId"
          :placeholder="$t('liveWeb.family.queryForm.userIdPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="id">
        <el-input
          type="number"
          class="no-number"
          v-model="queryParams.id"
          :placeholder="$t('liveWeb.family.queryForm.idPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-select v-model="queryParams.status" :placeholder="$t('liveWeb.family.queryForm.statusPlaceholder')" clearable>
          <el-option :label="$t('liveWeb.family.queryForm.status0')" value="0"></el-option>
          <el-option :label="$t('liveWeb.family.queryForm.status1')" value="1"></el-option>
          <el-option :label="$t('liveWeb.family.queryForm.status2')" value="2"></el-option>
          <el-option :label="$t('liveWeb.family.queryForm.status3')" value="3"></el-option>
          <el-option :label="$t('liveWeb.family.queryForm.status4')" value="4"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('liveWeb.family.queryForm.searchButton')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('liveWeb.family.queryForm.resetButton')}}</el-button>
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
          v-hasPermi="['admin:liveFamily:add']"
        >{{$t('liveWeb.family.actions.add')}}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="liveFamilyList">
      <el-table-column label="ID" min-width="120" align="center" prop="id">
        <template v-slot="{row}">
          <a style="color: #00afff" @click="familyShow(row.id)">{{ row.id }}</a>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.family.table.name')" :show-overflow-tooltip="true" min-width="120" align="center" prop="name"/>
      <el-table-column :label="$t('liveWeb.family.table.notice')" :show-overflow-tooltip="true" min-width="120" align="center" prop="notice"/>
      <el-table-column :label="$t('liveWeb.family.table.manifesto')" :show-overflow-tooltip="true" min-width="150" align="center" prop="manifesto"/>
      <el-table-column :label="$t('liveWeb.family.table.nickName')" min-width="120" align="center" prop="nickName"/>
      <el-table-column :label="$t('liveWeb.family.table.userId')" min-width="120" align="center" prop="userId"/>
      <el-table-column :label="$t('liveWeb.family.table.userCount')" min-width="120" align="center" prop="userCount"/>
      <el-table-column :label="$t('liveWeb.family.table.createTimes')" width="160" align="center" prop="createTimes">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTimes, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.family.table.status')" min-width="120" align="center" prop="status">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0" style="color: #0000FF">{{$t('liveWeb.family.table.status0')}}</span>
          <span v-if="scope.row.status === 1" style="color: #5FB878">{{$t('liveWeb.family.table.status1')}}</span>
          <span v-if="scope.row.status === 2" style="color: #FF5722">{{$t('liveWeb.family.table.status2')}}</span>
          <span v-if="scope.row.status === 3" style="color: #FF5722">{{$t('liveWeb.family.table.status3')}}</span>
          <span v-if="scope.row.status === 4" style="color: #C0C0C0">{{$t('liveWeb.family.table.status4')}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.family.table.contribution')" min-width="120" align="center" prop="contribution"/>
      <el-table-column :label="$t('liveWeb.family.table.videoTime')" min-width="120" align="center" prop="videoTime"/>
      <el-table-column :label="$t('liveWeb.family.table.memo')" :show-overflow-tooltip="true" min-width="220" align="center" prop="memo"/>
      <el-table-column :label="$t('liveWeb.family.table.operation')" min-width="280" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            plain
            v-show="scope.row.status != 4"
            @click="handleUpdateFamily(scope.row)"
            v-hasPermi="['admin:liveFamily:edit']"
          >{{$t('liveWeb.family.table.updateFamilyButton')}}
          </el-button>
          <el-button
            size="small"
            type="info"
            plain
            v-show="scope.row.status != 4"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:liveFamily:remove']"
          >{{$t('liveWeb.family.table.removeButton')}}
          </el-button>
          <el-button
            size="small"
            type="danger"
            plain
            v-show="scope.row.status == 1"
            @click="handleUpdate(scope.row,2)"
            v-hasPermi="['admin:liveFamily:edit']"
          >{{$t('liveWeb.family.table.updateFlag2Button')}}
          </el-button>
          <el-button
            size="small"
            type="success"
            plain
            v-show="scope.row.status == 3"
            @click="handleUpdate(scope.row,3)"
            v-hasPermi="['admin:liveFamily:edit']"
          >{{$t('liveWeb.family.table.updateFlag3Button')}}
          </el-button>
          <el-button
            size="small"
            type="success"
            plain
            v-show="scope.row.status ==0"
            @click="handleUpdate(scope.row,1)"
          >{{$t('liveWeb.family.table.updateFlag1Button')}}
          </el-button>
          <el-button
            size="small"
            type="danger"
            plain
            v-show="scope.row.status ==0"
            @click="handleUpdate(scope.row,0)"
          >{{$t('liveWeb.family.table.updateFlag0Button')}}
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
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="650px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <div class="el-row">
          <div class="el-col-lg-14">
            <el-form-item :label="$t('liveWeb.family.addUpdateDialog.nameLabel')" prop="name" v-if="form.id == null">
              <el-input v-model="form.name" :placeholder="$t('liveWeb.family.addUpdateDialog.namePlaceholder')"/>
            </el-form-item>
            <el-form-item :label="$t('liveWeb.family.addUpdateDialog.userIdLabel')" prop="userId">
              <el-input v-model="form.userId" :placeholder="$t('liveWeb.family.addUpdateDialog.userIdPlaceholder')"/>
            </el-form-item>
            <el-form-item :label="$t('liveWeb.family.addUpdateDialog.nickNameLabel')" prop="nickName">
              <el-input v-model="form.nickName" :placeholder="$t('liveWeb.family.addUpdateDialog.nickNamePlaceholder')"/>
            </el-form-item>
          </div>
          <div class="el-col-lg-10">
            <el-form-item :label="$t('liveWeb.family.addUpdateDialog.logoLabel')" prop="logo">
              <imageUpload v-model="form.logo" path="liveFamily"/>
            </el-form-item>
          </div>

        </div>

        <el-form-item :label="$t('liveWeb.family.addUpdateDialog.manifestoLabel')" prop="manifesto">
          <el-input v-model="form.manifesto" :placeholder="$t('liveWeb.family.addUpdateDialog.manifestoPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.family.addUpdateDialog.noticeLabel')" prop="notice">
          <el-input v-model="form.notice" type="textarea" :placeholder="$t('liveWeb.family.addUpdateDialog.noticePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.family.addUpdateDialog.memoLabel')" prop="memo">
          <el-input v-model="form.memo" type="textarea" :placeholder="$t('liveWeb.family.addUpdateDialog.memoPlaceholder')"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{$t('liveWeb.family.addUpdateDialog.confirmButton')}}</el-button>
        <el-button @click="cancel">{{$t('liveWeb.family.addUpdateDialog.cancelButton')}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  listLiveFamily,
  getLiveFamily,
  delLiveFamily,
  addLiveFamily,
  updateLiveFamily,
  exportLiveFamily
} from '@/api/live-web/family/liveFamily'
import ImageUpload from "@/components/ImageUpload";

export default {
  name: 'LiveFamily',
  components: {
    ImageUpload
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      id: null,
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 家族表格数据
      liveFamilyList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        logo: null,
        name: null,
        notice: null,
        manifesto: null,
        nickName: null,
        userId: null,
        userCount: null,
        createDate: null,
        createY: null,
        createM: null,
        createD: null,
        createW: null,
        memo: null,
        status: null,
        contribution: null,
        familyLevel: null,
        videoTime: null,
        score: null,
        liveLevel: null,
        familyRecom: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        logo: [
          {required: true, message: this.$t('liveWeb.family.addUpdateDialog.validation.logo'), trigger: 'change'}
        ],
        name: [
          {required: true, message: this.$t('liveWeb.family.addUpdateDialog.validation.name'), trigger: "blur"}
        ],
        userId: [
          {required: true, message: this.$t('liveWeb.family.addUpdateDialog.validation.userId'), trigger: "blur"}
        ],
        nickName: [
          {required: true, message: this.$t('liveWeb.family.addUpdateDialog.validation.nickName'), trigger: "blur"}
        ],
        manifesto: [
          {required: true, message: this.$t('liveWeb.family.addUpdateDialog.validation.manifesto'), trigger: "blur"}
        ],
        notice: [
          {required: true, message: this.$t('liveWeb.family.addUpdateDialog.validation.notice'), trigger: "blur"}
        ],
        memo: [
          {required: true, message: this.$t('liveWeb.family.addUpdateDialog.validation.memo'), trigger: "blur"}
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    familyShow(familyId) {
      this.$router.push({
        path: '/live/live/liveUser',
        query: {
          familyId: familyId
        }
      })
    },
    /** 查询家族列表 */
    getList() {
      this.loading = true
      listLiveFamily(this.queryParams).then(response => {
        this.liveFamilyList = response.rows
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
        logo: null,
        name: null,
        notice: null,
        manifesto: null,
        nickName: null,
        userId: null,
        userCount: null,
        createTime: null,
        createDate: null,
        createY: null,
        createM: null,
        createD: null,
        createW: null,
        memo: null,
        status: 0,
        contribution: null,
        familyLevel: null,
        videoTime: null,
        score: null,
        liveLevel: null,
        familyRecom: null
      }
      this.queryParams = {
        status: null
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
      this.reset()
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = this.$t('liveWeb.family.addUpdateDialog.titleAdd')
    },
    /** 修改按钮操作 */
    handleUpdateFamily(row) {
      this.reset();
      const id = row.id
      getLiveFamily(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = this.$t('liveWeb.family.addUpdateDialog.titleUpdate');
      });
    },
    /** 通过按钮操作 */
    handleUpdate(row, flag) {
      var data = {}
      data.id = row.id
      if (flag == 1) {
        data.status = 1
        this.$confirm(this.$t('liveWeb.family.confirmUpdateFlag1Dialog.message', {name: row.name}), this.$t('liveWeb.family.confirmUpdateFlag1Dialog.title'), {
          confirmButtonText: this.$t('global.confirmButton'),
          cancelButtonText: this.$t('global.cancelButton'),
          type: 'warning'
        }).then(function () {
          return updateLiveFamily(data)
        }).then(() => {
          this.getList()
          this.msgSuccess(this.$t('liveWeb.family.messageBox.updateFlag1Success'))
        })
      } else if (flag == 0) {
        data.status = 2
        this.$confirm(this.$t('liveWeb.family.confirmUpdateFlag0Dialog.message', {name: row.name}), this.$t('liveWeb.family.confirmUpdateFlag0Dialog.title'), {
          confirmButtonText: this.$t('global.confirmButton'),
          cancelButtonText: this.$t('global.cancelButton'),
          type: 'warning'
        }).then(function () {
          return updateLiveFamily(data)
        }).then(() => {
          this.getList()
          this.msgSuccess(this.$t('liveWeb.family.messageBox.updateFlag0Success'))
        })
      } else if (flag == 2) {
        data.status = 8
        this.$prompt(this.$t('liveWeb.family.confirmUpdateFlag2Prompt.message'), this.$t('liveWeb.family.confirmUpdateFlag2Prompt.title'), {
          confirmButtonText: this.$t('global.confirmButton'),
          cancelButtonText: this.$t('global.cancelButton'),
          inputPattern: /\S/,
          inputErrorMessage: this.$t('liveWeb.family.confirmUpdateFlag2Prompt.inputErrorMessage'),
          type: 'warning'
        }).then(({value}) => {
            data.memo = value
            updateLiveFamily(data).then(response => {
              this.msgSuccess(this.$t('liveWeb.family.messageBox.updateFlag2Success'))
              this.getList()
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('liveWeb.family.messageBox.updateFlag2Cancel')
          });
        })
      } else if (flag == 3) {
        data.status = 9
        this.$prompt(this.$t('liveWeb.family.confirmUpdateFlag3Prompt.message'), this.$t('liveWeb.family.confirmUpdateFlag3Prompt.title'), {
          confirmButtonText: this.$t('global.confirmButton'),
          cancelButtonText: this.$t('global.cancelButton'),
          inputPattern: /\S/,
          inputErrorMessage: this.$t('liveWeb.family.confirmUpdateFlag3Prompt.inputErrorMessage'),
          type: 'warning'
        }).then(({value}) => {
            data.memo = value
          updateLiveFamily(data).then(response => {
            this.msgSuccess(this.$t('liveWeb.family.messageBox.updateFlag3Success'))
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('liveWeb.family.messageBox.updateFlag3Cancel')
          });
        })
      }
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLiveFamily(this.form).then(response => {
              if (response.data.code == 0) {
                this.msgError(response.data.msg)
              } else {
                this.msgSuccess(response.data.msg)
                this.open = false
                this.getList()
              }
            })
          } else {
            addLiveFamily(this.form).then(response => {
              if (response.data.code == 0) {
                this.msgError(response.data.msg)
              } else {
                this.msgSuccess(response.data.msg)
                this.open = false
                this.getList()
              }
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const id = row.id
      this.$confirm(this.$t('liveWeb.family.confirmRemoveDialog.message', {name: row.name}), this.$t('liveWeb.family.confirmRemoveDialog.title'), {
        confirmButtonText: this.$t('liveWeb.family.confirmRemoveDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.family.confirmRemoveDialog.cancelButton'),
        type: 'warning'
      }).then(function () {
        return delLiveFamily(id)
      }).then(() => {
        this.getList()
        this.msgSuccess(this.$t('liveWeb.family.messageBox.removeSuccess'))
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm(this.$t('liveWeb.family.confirmExportDialog.message'), this.$t('liveWeb.family.confirmExportDialog.title'), {
        confirmButtonText: this.$t('liveWeb.family.confirmExportDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.family.confirmExportDialog.cancelButton'),
        type: 'warning'
      }).then(function () {
        return exportLiveFamily(queryParams)
      }).then(response => {
        (response.msg)
      })
    }
  }
}
</script>
