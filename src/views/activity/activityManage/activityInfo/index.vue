<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item prop="title">
        <el-input
          v-model="queryParams.title"
          :placeholder="$t('activity.releaseTime')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item prop="ctime">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          :start-placeholder="$t('activity.startDatePlaceholder')"
          :end-placeholder="$t('activity.endDatePlaceholder')"
          :range-separator="$t('activity.rangeSeparator')"
          :picker-options="pickerOptions">

        </el-date-picker>
      </el-form-item>
      <el-form-item prop="status">
        <el-select v-model="queryParams.status"
                   :placeholder="$t('activity.selectStatus')"
                   clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{
            $t('global.searchButton')
          }}
        </el-button>
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
          v-hasPermi="['admin:activityInfo:add']">{{ $t('global.addButton') }}
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
          v-hasPermi="['admin:activityInfo:edit']">{{ $t('global.editButton') }}
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
          v-hasPermi="['admin:activityInfo:remove']">{{ $t('global.deleteButton') }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:activityInfo:export']">{{ $t('global.exportButton') }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="activityInfoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column :label="$t('activity.activityManage.activityInfo.tableDialog.title')" align="center" prop="title"
                       min-width="180"/>
      <el-table-column :label="$t('global.icon')" align="center" prop="icon"
                       min-width="160">
        <template slot-scope="scope">
          <el-image
            style="height:60px"
            :src="scope.row.icon"
            fit="contain">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column :label="$t('activity.activityManage.activityInfo.tableDialog.activityDetails')" align="center"
                       prop="content" min-width="160">
        <template v-slot="{row}">
          <div v-html="row.content" style="max-height: 80px"></div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('activity.activityManage.activityInfo.tableDialog.releaseTime')" align="center"
                       prop="ctime" min-width="160">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.ctime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('activity.activityManage.activityInfo.tableDialog.jumpType')" align="center"
                       prop="type" :formatter="formatterType" min-width="160"/>
      <el-table-column :label="$t('activity.activityManage.activityInfo.tableDialog.iconUrl')" align="center" prop="url"
                       min-width="160"/>
      <el-table-column :label="$t('activity.activityManage.activityInfo.tableDialog.status')" align="center"
                       prop="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            @change="handleStatusChange(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column :label="$t('global.sort')" align="center" prop="order"
                       min-width="160"/>
      <el-table-column :label="$t('global.operation')" align="center"
                       class-name="small-padding fixed-width" fixed="right" min-width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:activityInfo:editButton']">{{ $t('global.editButton') }}
          </el-button>
          <el-button
            style="color: #FF5722"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:activityInfo:remove']">{{
              $t('global.deleteButton')
            }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"/>

    <!-- 添加或修改活动信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="90px">

        <div class="el-row">
          <div class="el-col el-col-12">
            <el-form-item :label="$t('activity.activityManage.activityInfo.tableDialog.title')" prop="title">
              <el-input v-model="form.title"
                        :placeholder="$t('activity.activityManage.activityInfo.tableDialog.titlePlaceholder')"/>
            </el-form-item>
            <br>
            <el-form-item
              :label="$t('activity.activityManage.activityInfo.tableDialog.typeId')" prop="typeId">
              <el-select
                filterable
                v-model="form.typeId"
                :placeholder="$t('activity.activityManage.activityInfo.tableDialog.typeIdPlaceholder')"
                clearable
                size="small"
                style="width: 240px">
                <el-option
                  v-for="dict in activityTypeOptions"
                  :key="dict.id"
                  :label="dict.name"
                  :value="dict.id"/>
              </el-select>
            </el-form-item>
            <br>
            <el-form-item :label="$t('activity.activityManage.activityInfo.tableDialog.sort')" prop="order">
              <el-input v-model="form.order"
                        :placeholder="$t('activity.activityManage.activityInfo.tableDialog.sortPlaceholder')"
                        type="number"/>
            </el-form-item>
          </div>
          <div class="el-col el-col-8">
            <el-form-item :label="$t('activity.activityManage.activityInfo.tableDialog.icon')" prop="icon">
              <imageUpload v-model="form.icon" path="ActivityInfo"/>
            </el-form-item>
          </div>
        </div>

        <el-form-item :label="$t('activity.activityManage.activityInfo.tableDialog.jumpType')" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio :label="0">{{ $t('activity.activityManage.activityInfo.tableDialog.activityDetails') }}</el-radio>
            <el-radio :label="1">{{ $t('activity.activityManage.activityInfo.tableDialog.jumpLink') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('activity.activityManage.activityInfo.tableDialog.activityDetails')" prop="content"
                      v-if="form.type == 0">
          <editor v-model="form.content" path="ActivityInfo"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityManage.activityInfo.tableDialog.url')" prop="url"
                      v-if="form.type == 1">
          <el-input v-model="form.url"
                    :placeholder="$t('activity.activityManage.activityInfo.tableDialog.urlPlaceholders')"/>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{ $t('activity.submitButton') }}</el-button>
        <el-button @click="cancel">{{ $t('activity.cancelButton') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listActivityInfo,
  getActivityInfo,
  delActivityInfo,
  addActivityInfo,
  updateActivityInfo,
  exportActivityInfo,
  activityTypes,
  changeActivityInfoStatus
} from "@/api/activity/activityInfo";
import ImageUpload from "@/components/ImageUpload";
import Editor from "@/components/WangEditor";
import {pickerDateShortcuts} from "@/utils/dateUtils";

export default {
  name: "ActivityInfo",
  components: {
    ImageUpload,
    Editor,
  },
  data() {
    return {
      // 1=qq,2=微信
      formatterType(row) {
        if (row.type == 0) {
          return '活动详情'
        } else if (row.type == 1) {
          return '跳转链接'
        } else {
          return ''
        }
      },
      pickerOptions: {shortcuts: pickerDateShortcuts},
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 日期范围
      dateRange: [],
      //活动类型
      activityTypeOptions: [],
      statusOptions: [],
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 活动信息表格数据
      activityInfoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      type: "",
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: null,
        ctime: null,
        status: null,
        orderByColumn: '',
        isAsc: ''
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        title: [
          {
            required: true, message: this.$t('activity.activityManage.activityInfo.validation.title')
            , trigger: "blur"
          }
        ],
        icon: [
          {
            required: true, message: this.$t('activity.activityManage.activityInfo.validation.icon')
            , trigger: "blur"
          }
        ],
        typeId: [
          {
            required: true, message: this.$t('activity.activityManage.activityInfo.validation.typeId')
            , trigger: "blur"
          }
        ],
        type: [
          {
            required: true, message: this.$t('activity.activityManage.activityInfo.validation.type')
            , trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getList();
    //活动类型
    activityTypes().then(response => {
      this.activityTypeOptions = response.data
    })
    //状态字典
    this.getDicts('activityInfo_status').then(response => {
      this.statusOptions = response.data
    })
  },
  methods: {
    /** 查询活动信息列表 */
    getList() {
      this.loading = true;
      listActivityInfo(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.activityInfoList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        title: null,
        ctime: null,
        indexs: null,
        typeId: null,
        content: '',
        url: null,
        order: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      //活动类型
      activityTypes().then(response => {
        this.activityTypeOptions = response.data
      })
      this.title = this.$t('activity.activityManage.activityInfo.addActivityTitle');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      //活动类型
      activityTypes().then(response => {
        this.activityTypeOptions = response.data
      })
      getActivityInfo(id).then(response => {
        response.data.type = response.data.type + ""
        this.form = response.data;
        this.open = true;
        this.title = this.$t('activity.activityManage.activityInfo.editActivityTitle');
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateActivityInfo(this.form).then(response => {
              this.msgSuccess(this.$t('activity.editSuccessMsg'));
              this.open = false;
              this.getList();
            });
          } else {
            addActivityInfo(this.form).then(response => {
              this.msgSuccess(this.$t('activity.addSuccessMsg'));
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm(this.$t('activity.deleteConfirm1') + row.title + '"?', this.$t('activity.deleteConfirmTitle'), {
        confirmButtonText: this.$t('activity.confirmButton'),
        cancelButtonText: this.$t('activity.cancelConfirmButton'),
        type: "warning"
      }).then(function () {
        return delActivityInfo(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess(this.$t('activity.deleteSuccessMsg'));
      })
    },
    //修改状态
    handleStatusChange(row) {
      let text = row.status === '1'
        ? this.$t('activity.statusEnable')
        : this.$t('activity.statusDisable')
      this.$confirm(this.$t('activity.statusEditSuccess')
        + text
        + '""'
        + this.title
        + this.$t('activity.statusConfirmQuestion'),
        this.$t('activity.statusConfirmTitle'), {
          confirmButtonText: this.$t('activity.confirmButton'),
          cancelButtonText: this.$t('activity.cancelButton'),
          type: 'warning'
        }).then(function () {
        return changeActivityInfoStatus(row.id, row.status)
      }).then(() => {
        this.msgSuccess(text + this.$t('activity.statusEditSuccess'))
      }).catch(function () {
        row.status = row.status === '0' ? '1' : '0'
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm(this.$t('activity.confirmExport'), this.$t('activity.confirmExportTitle'), {
        confirmButtonText: this.$t('activity.confirmButton'),
        cancelButtonText: this.$t('activity.cancelButton'),
        type: 'warning'
      }).then(function () {
        return exportActivityInfo(queryParams);
      }).then(response => {
        this.downloadExcel(response, this.$t('activity.activityManage.activityInfo.exportResponse'))
      }).catch(() => {
      })
    }
  }
};
</script>
