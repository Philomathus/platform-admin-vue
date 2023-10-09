<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item :label="$t('global.selectDate')" prop="ctime">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          :start-placeholder="$t('global.datePickerStartDatePlaceholder')"
          :end-placeholder="$t('global.datePickerEndDatePlaceholder')"
          :range-separator="$t('global.selectDateRangeSeparator')"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('activity.activityManage.activityQuestInfo.tableDialog.title')" prop="title">
        <el-input
          v-model="queryParams.title"
          :placeholder="$t('activity.activityManage.activityQuestInfo.tableDialog.titlePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item :label="$t('activity.activityManage.activityQuestInfo.tableDialog.kindId')" prop="kindId">-->
<!--        <el-select-->
<!--          filterable-->
<!--          v-model="queryParams.kindId"-->
<!--          :placeholder="$t('activity.activityManage.activityQuestInfo.tableDialog.kindIdPlaceholder')"-->
<!--          clearable-->
<!--          size="small"-->
<!--          style="width: 240px"-->
<!--        >-->
<!--          <el-option-->
<!--            v-for="dict in kindIdOptions"-->
<!--            :key="dict.id"-->
<!--            :label="dict.kindId"-->
<!--            :value="dict.kindId"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item :label="$t('activity.activityManage.activityQuestInfo.tableDialog.platformId')" prop="platformId">-->
<!--        <el-select-->
<!--          filterable-->
<!--          v-model="queryParams.platformId"-->
<!--          :placeholder="$t('activity.activityManage.activityQuestInfo.tableDialog.platformIdPlaceholder')"-->
<!--          clearable-->
<!--          size="small"-->
<!--          style="width: 240px"-->
<!--        >-->
<!--          <el-option-->
<!--            v-for="dict in platformIdOptions"-->
<!--            :key="dict.id"-->
<!--            :label="dict.name"-->
<!--            :value="dict.id"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{
            $t('global.searchButton')
          }}
        </el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{
            $t('global.resetButton')
          }}
        </el-button>
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
          v-hasPermi="['admin:activityQuestInfo:add']"
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
          v-hasPermi="['admin:activityQuestInfo:edit']"
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
          v-hasPermi="['admin:activityQuestInfo:remove']"
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
          v-hasPermi="['admin:activityQuestInfo:export']"
        >{{ $t('global.exportButton') }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="activityQuestInfoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column :label="$t('activity.activityManage.activityQuestInfo.tableDialog.title')" align="center"
                       prop="title" min-width="140"/>
      <el-table-column :label="$t('global.icon')" align="center"
                       prop="icon">
        <template slot-scope="scope">
          <el-image
            style="height:50px"
            :src="scope.row.icon"
            fit="contain"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column :label="$t('activity.activityManage.activityQuestInfo.tableDialog.index')" align="center"
                       prop="indexs"/>
      <el-table-column :label="$t('activity.activityManage.activityQuestInfo.tableDialog.target')" align="center"
                       prop="target" min-width="150"/>
      <el-table-column :label="$t('activity.activityManage.activityQuestInfo.tableDialog.reward')" align="center"
                       prop="reward"/>
      <el-table-column :label="$t('activity.activityManage.activityQuestInfo.tableDialog.content')" align="center"
                       prop="content"/>
      <el-table-column :label="$t('activity.activityManage.activityQuestInfo.tableDialog.detail')" min-width="200"
                       align="center" prop="detail"/>
      <el-table-column :label="$t('activity.activityManage.activityQuestInfo.tableDialog.kindId')" align="center"
                       prop="kindId"/>
      <el-table-column :label="$t('activity.activityManage.activityQuestInfo.tableDialog.platformId')" align="center"
                       prop="platformName" min-width="140"/>
      <el-table-column :label="$t('activity.activityManage.activityQuestInfo.tableDialog.taskMode')" align="center"
                       prop="taskMode" :formatter="hasTaskModeFormat" min-width="100"/>
      <el-table-column :label="$t('activity.activityManage.activityQuestInfo.tableDialog.ctime')" align="center"
                       prop="ctime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.ctime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('global.operationColumn')" align="center"
                       class-name="small-padding fixed-width" min-width="140" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:activityQuestInfo:edit']"
          >{{ $t('global.edit') }}
          </el-button>
          <el-button
            style="color: #FF5722"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:activityQuestInfo:remove']"
          >{{ $t('global.delete') }}
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

    <!-- 添加任务信息对话框 Add Task Info dialog start here
         CSS Code designed
                          ===>
                                { ----  css code wrote on bottom ----
                                  col-width-40  = width : 40%,
                                  col-width-45h = width ： 45.5%,
                                  ml5           = margin-left ： 5%
                                }
    -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="850px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="130px">
        <el-row>
          <el-col class="col-width-w45h">
            <el-form-item :label="$t('activity.activityManage.activityQuestInfo.tableDialog.title')" prop="title">
              <el-input v-model="form.title"
                        :placeholder="$t('activity.activityManage.activityQuestInfo.tableDialog.titlePlaceholder')"/>
            </el-form-item>
          </el-col>
          <el-col class="col-width-w45h">
            <el-form-item :label="$t('activity.activityManage.activityQuestInfo.tableDialog.index')" prop="indexs">
              <el-input v-model="form.indexs" type="number" class="no-number"
                        :placeholder="$t('activity.activityManage.activityQuestInfo.tableDialog.indexPlaceholder')"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col class="col-width-w40">
            <el-form-item :label="$t('activity.activityManage.activityQuestInfo.tableDialog.typeId')" prop="typeId">
              <el-select
                filterable
                v-model="form.typeId"
                :placeholder="$t('activity.activityManage.activityQuestInfo.tableDialog.typeIdPlaceholder')"
                clearable
                size="small"
                class="select-type">
                <el-option
                  v-for="dict in activityQuestTypeOptions"
                  :key="dict.id"
                  :label="dict.name"
                  :value="dict.id"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="col-width-w40 ml5">
            <el-form-item :label="$t('activity.activityManage.activityQuestInfo.tableDialog.gameId')" prop="gameId">
              <el-select
                filterable
                v-model="form.gameId"
                :placeholder="$t('activity.activityManage.activityQuestInfo.tableDialog.gameIdPlaceholder')"
                clearable
                size="small"
                class="select-type">
                <el-option
                  v-for="dict in gameInfoOptions"
                  :key="dict.id"
                  :label="dict.name"
                  :value="dict.id"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col class="col-width-w40">
            <el-form-item :label="$t('activity.activityManage.activityQuestInfo.tableDialog.kindId')" prop="kindId">
              <el-select
                filterable
                v-model="form.kindId"
                :placeholder="$t('activity.activityManage.activityQuestInfo.tableDialog.kindIdPlaceholder')"
                clearable
                size="small"
                class="select-type">
                <el-option
                  v-for="dict in kindIdOptions"
                  :key="dict.id"
                  :label="dict.kindId"
                  :value="dict.kindId"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="col-width-w40 ml5">
            <el-form-item :label="$t('activity.activityManage.activityQuestInfo.tableDialog.platformId')"
                          prop="platformId">
              <el-select
                filterable
                v-model="form.platformId"
                :placeholder="$t('activity.activityManage.activityQuestInfo.tableDialog.platformIdPlaceholder')"
                clearable
                size="small"
                class="select-type">
                <el-option
                  v-for="dict in platformIdOptions"
                  :key="dict.id"
                  :label="dict.name"
                  :value="dict.id"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col class="col-width-w40">
            <el-form-item :label="$t('activity.activityManage.activityQuestInfo.tableDialog.taskMode')" prop="taskMode">
              <el-select
                filterable
                v-model="form.taskMode"
                :placeholder="$t('activity.activityManage.activityQuestInfo.tableDialog.taskModePlaceholder')"
                clearable
                size="small"
                style="width: 240px">
                <el-option
                  v-for="dict in taskMode"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="col-width-w45h ml5">
            <el-form-item :label="$t('activity.activityManage.activityQuestInfo.tableDialog.target')" prop="target">
              <el-input v-model="form.target" type="number" class="no-number"
                        :placeholder="$t('activity.activityManage.activityQuestInfo.tableDialog.targetPlaceholder')"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col class="col-width-w45h">
            <el-form-item :label="$t('activity.activityManage.activityQuestInfo.tableDialog.reward')" prop="reward">
              <el-input v-model="form.reward" type="number" class="no-number"
                        :placeholder="$t('activity.activityManage.activityQuestInfo.tableDialog.rewardPlaceholder')"/>
            </el-form-item>
          </el-col>
          <el-col class="col-width-w45h">
            <el-form-item :label="$t('activity.activityManage.activityQuestInfo.tableDialog.detail')" prop="detail">
              <el-input v-model="form.detail" type="textarea"
                        :placeholder="$t('activity.activityManage.activityQuestInfo.tableDialog.detailPlaceholder')"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col class="col-width-w45h">
            <el-form-item :label="$t('activity.activityManage.activityQuestInfo.tableDialog.icon')" prop="icon">
              <imageUpload v-model="form.icon" path="ActivityQuestInfo"/>
            </el-form-item>
          </el-col>
          <el-col class="col-width-w45h">
            <el-form-item :label="$t('activity.activityManage.activityQuestInfo.tableDialog.content')">
              <el-input v-model="form.content" type="textarea"
                        :placeholder="$t('activity.activityManage.activityQuestInfo.tableDialog.contentPlaceholder')"
                        rows="6"/>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{ $t('global.submitButton') }}</el-button>
        <el-button @click="cancel">{{ $t('global.cancelButton') }}</el-button>
      </div>
    </el-dialog>
    <!-- 添加任务信息对话框 Add Task Info dialog end here-->


    <!-- 修改任务信息对话框
    Modify (edit) task information dialog start here
            CSS Code designed
                          ===>
                                { ----  css code wrote on bottom ----
                                  col-width-40  = width : 40%,
                                  col-width-45h = width ： 45.5%,
                                  ml5           = margin-left ： 5%
                                }
    -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="opene" width="850px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rulese" label-width="130px">

        <el-row>
          <el-col class="col-width-w45h">
            <el-form-item :label="$t('activity.activityManage.activityQuestInfo.tableDialog.title')" prop="title">
              <el-input v-model="form.title" :placeholder="$t('activity.activityManage.activityQuestInfo.tableDialog.titlePlaceholder')"/>
            </el-form-item>
          </el-col>
          <el-col class="col-width-w45h">
            <el-form-item :label="$t('activity.activityManage.activityQuestInfo.tableDialog.index')" prop="indexs">
              <el-input v-model="form.indexs" type="number" class="no-number" :placeholder="$t('activity.activityManage.activityQuestInfo.tableDialog.indexPlaceholder')"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col class="col-width-w40">
            <el-form-item :label="$t('activity.activityManage.activityQuestInfo.tableDialog.typeId')" prop="typeId">
              <el-select
                filterable
                v-model="form.typeId"
                :placeholder="$t('activity.activityManage.activityQuestInfo.tableDialog.typeIdPlaceholder')"
                clearable
                size="small"
                class="select-type">
                <el-option
                  v-for="dict in activityQuestTypeOptions"
                  :key="dict.id"
                  :label="dict.name"
                  :value="dict.id"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="col-width-w40 ml5">
            <el-form-item :label="$t('activity.activityManage.activityQuestInfo.tableDialog.gameId')" prop="gameId">
              <el-select
                filterable
                v-model="form.gameId"
                :placeholder="$t('activity.activityManage.activityQuestInfo.tableDialog.gameIdPlaceholder')"
                clearable
                size="small"
                class="select-type">
                <el-option
                  v-for="dict in gameInfoOptions"
                  :key="dict.id"
                  :label="dict.name"
                  :value="dict.id"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col class="col-width-w40">
            <el-form-item :label="$t('activity.activityManage.activityQuestInfo.tableDialog.kindId')" prop="kindId">
              <el-select
                filterable
                v-model="form.kindId"
                :placeholder="$t('activity.activityManage.activityQuestInfo.tableDialog.kindIdPlaceholder')"
                clearable
                size="small"
                class="select-type">
                <el-option
                  v-for="dict in kindIdOptions"
                  :key="dict.id"
                  :label="dict.kindId"
                  :value="dict.kindId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="col-width-w40 ml5">
            <el-form-item :label="$t('activity.activityManage.activityQuestInfo.tableDialog.platformId')" prop="platformId">
              <el-select
                filterable
                v-model="form.platformId"
                :placeholder="$t('activity.activityManage.activityQuestInfo.tableDialog.platformIdPlaceholder')"
                clearable
                size="small"
                class="select-type">
                <el-option
                  v-for="dict in platformIdOptions"
                  :key="dict.id"
                  :label="dict.name"
                  :value="dict.id"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col class="col-width-w45h">
            <el-form-item :label="$t('activity.activityManage.activityQuestInfo.tableDialog.target')" prop="target">
              <el-input v-model="form.target" type="number" class="no-number" :placeholder="$t('activity.activityManage.activityQuestInfo.tableDialog.targetPlaceholder')"/>
            </el-form-item>
          </el-col>
          <el-col class="col-width-w45h ">
            <el-form-item :label="$t('activity.activityManage.activityQuestInfo.tableDialog.reward')" prop="reward">
              <el-input v-model="form.reward" type="number" class="no-number" :placeholder="$t('activity.activityManage.activityQuestInfo.tableDialog.rewardPlaceholder')"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col class="col-width-w45h">
            <el-form-item :label="$t('activity.activityManage.activityQuestInfo.tableDialog.detail')" prop="detail">
              <el-input v-model="form.detail" type="textarea" :placeholder="$t('activity.activityManage.activityQuestInfo.tableDialog.detailPlaceholder')" rows="6"/>
            </el-form-item>
          </el-col>
          <el-col class="col-width-w40">
            <el-form-item :label="$t('activity.activityManage.activityQuestInfo.tableDialog.icon')" prop="icon">
              <imageUpload v-model="form.icon" path="ActivityQuestInfo"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item :label="$t('activity.activityManage.activityQuestInfo.tableDialog.content')">
            <el-input v-model="form.content" type="textarea" :placeholder="$t('activity.activityManage.activityQuestInfo.tableDialog.contentPlaceholder')" rows="7" style="width:90%"/>
          </el-form-item>
        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{ $t('global.submitButton') }}</el-button>
        <el-button @click="cancel">{{ $t('global.cancelButton') }}</el-button>
      </div>

    </el-dialog>
    <!-- 修改任务信息对话框  Modify task information dialog end here-->

  </div>
</template>

<script>
import {
  listActivityQuestInfo,
  getActivityQuestInfo,
  delActivityQuestInfo,
  addActivityQuestInfo,
  updateActivityQuestInfo,
  exportActivityQuestInfo,
  activityQuestTypes,
  gameInfoName,
  kindIdSelect,
  platformIdSelect
} from '@/api/activity/activityQuestInfo'
import ImageUpload from '@/components/ImageUpload'
import {pickerDateShortcuts} from "@/utils/dateUtils";

export default {
  name: 'ActivityQuestInfo',
  components: {
    ImageUpload
  },
  data() {
    return {
      pickerOptions: {shortcuts: pickerDateShortcuts},
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 日期范围
      dateRange: [],
      //任务类型
      activityQuestTypeOptions: [],
      //所属游戏
      gameInfoOptions: [],
      taskMode: [{
        value: 0,
        label: '永久任务'
      }, {
        value: 1,
        label: '每日任务'
      }],
      //平台游戏类型
      kindIdOptions: [],
      //平台类型
      platformIdOptions: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 任务信息表格数据
      activityQuestInfoList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      opene: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        icon: null,
        title: null,
        ctime: null,
        indexs: null,
        typeId: null,
        target: null,
        reward: null,
        detail: null,
        content: null,
        gameId: null,
        kindId: null,
        platformId: null,
        orderByColumn: 'ctime',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        icon: [
          {required: true, message: this.$t('activity.activityManage.activityQuestInfo.validation.icon'), trigger: "blur"}
        ],
        title: [
          {required: true, message: this.$t('activity.activityManage.activityQuestInfo.validation.title'), trigger: "blur"}
        ],
        indexs: [
          {required: true, message: this.$t('activity.activityManage.activityQuestInfo.validation.index'), trigger: "blur"}
        ],
        typeId: [
          {required: true, message: this.$t('activity.activityManage.activityQuestInfo.validation.typeId'), trigger: "blur"}
        ],
        target: [
          {required: true, message: this.$t('activity.activityManage.activityQuestInfo.validation.target'), trigger: "blur"}
        ],
        reward: [
          {required: true, message: this.$t('activity.activityManage.activityQuestInfo.validation.reward'), trigger: "blur"}
        ],
        detail: [
          {required: true, message: this.$t('activity.activityManage.activityQuestInfo.validation.detail'), trigger: "blur"}
        ],
        gameId: [
          {required: true, message: this.$t('activity.activityManage.activityQuestInfo.validation.gameId'), trigger: "blur"}
        ],
        kindId: [
          {required: true, message: this.$t('activity.activityManage.activityQuestInfo.validation.kindId'), trigger: "blur"}
        ],
        platformId: [
          {required: true, message: this.$t('activity.activityManage.activityQuestInfo.validation.platformId'), trigger: "blur"}
        ],
        taskMode: [
          {required: true, message: this.$t('activity.activityManage.activityQuestInfo.validation.taskMode'), trigger: "blur"}
        ]
      },
      rulese: {
        icon: [
          {required: true, message: this.$t('activity.activityManage.activityQuestInfo.validation.icon'), trigger: "blur"}
        ],
        title: [
          {required: true, message: this.$t('activity.activityManage.activityQuestInfo.validation.title'), trigger: "blur"}
        ],
        indexs: [
          {required: true, message: this.$t('activity.activityManage.activityQuestInfo.validation.index'), trigger: "blur"}
        ],
        typeId: [
          {required: true, message: this.$t('activity.activityManage.activityQuestInfo.validation.typeId'), trigger: "blur"}
        ],
        target: [
          {required: true, message: this.$t('activity.activityManage.activityQuestInfo.validation.target'), trigger: "blur"}
        ],
        reward: [
          {required: true, message: this.$t('activity.activityManage.activityQuestInfo.validation.reward'), trigger: "blur"}
        ],
        detail: [
          {required: true, message: this.$t('activity.activityManage.activityQuestInfo.validation.detail'), trigger: "blur"}
        ],
        gameId: [
          {required: true, message: this.$t('activity.activityManage.activityQuestInfo.validation.gameId'), trigger: "blur"}
        ],
        kindId: [
          {required: true, message: this.$t('activity.activityManage.activityQuestInfo.validation.kindId'), trigger: "blur"}
        ],
        platformId: [
          {required: true, message: this.$t('activity.activityManage.activityQuestInfo.validation.platformId'), trigger: "blur"}
        ]
      }
    }
  },
  created() {
    this.getList()
    //任务类型
    activityQuestTypes().then(response => {
      this.activityQuestTypeOptions = response.data
    })
    //所属游戏
    gameInfoName().then(response => {
      this.gameInfoOptions = response.data
    })
    //平台游戏类型
    kindIdSelect().then(response => {
      console.info(response.data)
      this.kindIdOptions = response.data
    })
    //平台类型
    platformIdSelect().then(response => {
      this.platformIdOptions = response.data
    })
  },
  methods: {
    /** 查询任务信息列表 */
    getList() {
      this.loading = true
      listActivityQuestInfo(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.activityQuestInfoList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.opene = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        icon: null,
        title: null,
        ctime: null,
        indexs: null,
        typeId: null,
        target: null,
        reward: null,
        detail: null,
        content: null,
        gameId: null,
        kindId: null,
        platformId: null,
        taskMode: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    hasTaskModeFormat(row, column) {
      return row.taskMode == 0 ? this.$t('activity.activityManage.activityQuestInfo.permanentTask') : this.$t('activity.activityManage.activityQuestInfo.dailyTask');
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
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
      //任务类型
      activityQuestTypes().then(response => {
        this.activityQuestTypeOptions = response.data
      })
      this.title = this.$t('activity.activityManage.activityQuestInfo.addTitle')
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      //任务类型
      activityQuestTypes().then(response => {
        this.activityQuestTypeOptions = response.data
      })
      getActivityQuestInfo(id).then(response => {
        this.form = response.data
        this.opene = true
        this.title = this.$t('activity.activityManage.activityQuestInfo.editTitle')
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateActivityQuestInfo(this.form).then(response => {
              this.msgSuccess(this.$t('global.editSuccessMsg'))
              this.opene = false
              this.getList()
            })
          } else {
            addActivityQuestInfo(this.form).then(response => {
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
      }).then(function () {
        return delActivityQuestInfo(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess(this.$t('global.deleteSuccessMsg'));
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm(this.$t('global.confirmExport'), this.$t('global.confirmExportTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: 'warning'
      }).then(function () {
        return exportActivityQuestInfo(queryParams)
      }).then(response => {
        this.downloadExcel(response, this.$t('global.exportResponse'))
      }).catch(() => {
      })
    }
  }
}
</script>


<style>
.col-width-w40 {
  width: 40%;
}

.col-width-w45h {
  width: 45.5%;
}

.ml5 {
  margin-left: 5%;
}

.select-type {
  width: 240px;
}

</style>
