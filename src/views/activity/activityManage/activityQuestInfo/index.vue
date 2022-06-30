<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="发布时间" prop="ctime">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入标题"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="平台游戏类型" prop="kindId">
        <el-select
          filterable
          v-model="queryParams.kindId"
          placeholder="请选择平台游戏类型"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in kindIdOptions"
            :key="dict.id"
            :label="dict.kindId"
            :value="dict.kindId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="平台类型" prop="platformId">
        <el-select
          filterable
          v-model="queryParams.platformId"
          placeholder="请选择平台类型"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in platformIdOptions"
            :key="dict.id"
            :label="dict.name"
            :value="dict.id"
          />
        </el-select>
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
          v-hasPermi="['admin:activityQuestInfo:add']"
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
          v-hasPermi="['admin:activityQuestInfo:edit']"
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
          v-hasPermi="['admin:activityQuestInfo:remove']"
        >删除
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
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="activityQuestInfoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="标题" align="center" prop="title"/>
      <el-table-column label="图标" align="center" prop="icon">
        <template slot-scope="scope">
          <el-image
            style="height:50px"
            :src="scope.row.icon"
            fit="contain"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="排序号" align="center" prop="indexs"/>
      <el-table-column label="目标任务量" align="center" prop="target"/>
      <el-table-column label="完成后增加的资金" align="center" prop="reward"/>
      <el-table-column label="描述" align="center" prop="content"/>
      <el-table-column label="任务有效时间" min-width="200" align="center" prop="detail"/>
      <el-table-column label="平台游戏类型" align="center" prop="kindId"/>
      <el-table-column label="平台类型" align="center" prop="platformName"/>
      <el-table-column label="任务模式" align="center" prop="taskMode" :formatter="hasTaskModeFormat"/>
      <el-table-column label="发布时间" align="center" prop="ctime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.ctime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:activityQuestInfo:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:activityQuestInfo:remove']"
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
              <el-form-item label="标题" prop="title">
                <el-input v-model="form.title" placeholder="请输入标题"/>
              </el-form-item>
            </el-col>
            <el-col class="col-width-w45h">
              <el-form-item label="排序号" prop="indexs">
                <el-input v-model="form.indexs" type="number" class="no-number" placeholder="请输入排序号"/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col class="col-width-w40">
                <el-form-item label="任务类型" prop="typeId">
                  <el-select
                    filterable
                    v-model="form.typeId"
                    placeholder="请选择任务类型"
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
                <el-form-item label="所属游戏" prop="gameId">
                  <el-select
                    filterable
                    v-model="form.gameId"
                    placeholder="请选择所属游戏"
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
            <el-form-item label="平台游戏类型" prop="kindId">
              <el-select
                filterable
                v-model="form.kindId"
                placeholder="请选择平台游戏类型"
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
            <el-form-item label="平台类型" prop="platformId">
              <el-select
                filterable
                v-model="form.platformId"
                placeholder="请选择平台类型"
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
              <el-form-item label="任务模式" prop="taskMode">
                <el-select
                  filterable
                  v-model="form.taskMode"
                  placeholder="请选择任务模式"
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
              <el-form-item label="目标任务量" prop="target">
                <el-input v-model="form.target" type="number" class="no-number" placeholder="请输入目标任务量"/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col class="col-width-w45h">
              <el-form-item label="完成后增加资金" prop="reward">
                <el-input v-model="form.reward" type="number" class="no-number" placeholder="请输入完成后增加的资金"/>
              </el-form-item>
            </el-col>
            <el-col class="col-width-w45h">
              <el-form-item label="任务有效时间" prop="detail">
                <el-input v-model="form.detail" type="textarea" placeholder="请输入内容"/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col class="col-width-w45h">
              <el-form-item label="图标" prop="icon">
                <imageUpload v-model="form.icon" path="ActivityQuestInfo"/>
              </el-form-item>
            </el-col>
            <el-col class="col-width-w45h">
              <el-form-item label="描述">
                <el-input v-model="form.content" type="textarea" placeholder="请输入内容" rows="6"/>
              </el-form-item>
            </el-col>
          </el-row>

      </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
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
             <el-form-item label="标题" prop="title">
               <el-input v-model="form.title" placeholder="请输入标题"/>
             </el-form-item>
           </el-col>
           <el-col class="col-width-w45h">
             <el-form-item label="排序号" prop="indexs">
               <el-input v-model="form.indexs" type="number" class="no-number" placeholder="请输入排序号"/>
             </el-form-item>
           </el-col>
         </el-row>

         <el-row>
           <el-col class="col-width-w40">
             <el-form-item label="任务类型" prop="typeId">
               <el-select
                 filterable
                 v-model="form.typeId"
                 placeholder="请选择任务类型"
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
             <el-form-item label="所属游戏" prop="gameId">
               <el-select
                 filterable
                 v-model="form.gameId"
                 placeholder="请选择所属游戏"
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
              <el-form-item label="平台游戏类型" prop="kindId">
                <el-select
                  filterable
                  v-model="form.kindId"
                  placeholder="请选择平台游戏类型"
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
              <el-form-item label="平台类型" prop="platformId">
                <el-select
                  filterable
                  v-model="form.platformId"
                  placeholder="请选择平台类型"
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
              <el-form-item label="目标任务量" prop="target">
                <el-input v-model="form.target" type="number" class="no-number" placeholder="请输入目标任务量"/>
              </el-form-item>
            </el-col>
            <el-col class="col-width-w45h ">
              <el-form-item label="完成后增加资金" prop="reward">
                <el-input v-model="form.reward" type="number" class="no-number" placeholder="请输入完成后增加的资金"/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col class="col-width-w45h">
              <el-form-item label="任务有效时间" prop="detail">
                <el-input v-model="form.detail" type="textarea" placeholder="请输入内容" rows="6"/>
              </el-form-item>
            </el-col>
            <el-col class="col-width-w40">
              <el-form-item label="图标" prop="icon">
                <imageUpload v-model="form.icon" path="ActivityQuestInfo"/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
          <el-form-item label="描述">
            <el-input v-model="form.content" type="textarea" placeholder="请输入内容" rows="7" style="width:90%"/>
          </el-form-item>
          </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
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
          {required: true, message: "图标不能不上传", trigger: "blur"}
        ],
        title: [
          {required: true, message: "标题不能为空", trigger: "blur"}
        ],
        indexs: [
          {required: true, message: "排序号不能为空", trigger: "blur"}
        ],
        typeId: [
          {required: true, message: "任务类型不能为空", trigger: "blur"}
        ],
        target: [
          {required: true, message: "目标任务量不能为空", trigger: "blur"}
        ],
        reward: [
          {required: true, message: "完成后增加的资金不能为空", trigger: "blur"}
        ],
        detail: [
          {required: true, message: "任务有效时间不能为空", trigger: "blur"}
        ],
        gameId: [
          {required: true, message: "所属游戏不能为空", trigger: "blur"}
        ],
        kindId: [
          {required: true, message: "平台游戏类型不能为空", trigger: "blur"}
        ],
        platformId: [
          {required: true, message: "平台类型不能为空", trigger: "blur"}
        ],
        taskMode: [
          {required: true, message: "任务模式不能为空", trigger: "blur"}
        ]
      },
      rulese: {
        icon: [
          {required: true, message: "图标不能不上传", trigger: "blur"}
        ],
        title: [
          {required: true, message: "标题不能为空", trigger: "blur"}
        ],
        indexs: [
          {required: true, message: "排序号不能为空", trigger: "blur"}
        ],
        typeId: [
          {required: true, message: "任务类型不能为空", trigger: "blur"}
        ],
        target: [
          {required: true, message: "目标任务量不能为空", trigger: "blur"}
        ],
        reward: [
          {required: true, message: "完成后增加的资金不能为空", trigger: "blur"}
        ],
        detail: [
          {required: true, message: "任务有效时间不能为空", trigger: "blur"}
        ],
        gameId: [
          {required: true, message: "所属游戏不能为空", trigger: "blur"}
        ],
        kindId: [
          {required: true, message: "平台游戏类型不能为空", trigger: "blur"}
        ],
        platformId: [
          {required: true, message: "平台类型不能为空", trigger: "blur"}
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
    hasTaskModeFormat(row,column){
      return row.taskMode==0?'永久任务':'每日任务';
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
      this.title = '添加任务信息'
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
        this.title = '修改任务信息'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateActivityQuestInfo(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.opene = false
              this.getList()
            })
          } else {
            addActivityQuestInfo(this.form).then(response => {
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
      this.$confirm('是否确认删除"' + row.title + '"?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return delActivityQuestInfo(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
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
        return exportActivityQuestInfo(queryParams)
      }).then(response => {
        this.downloadExcel(response, '任务信息')
      }).catch(() => {
      })
    }
  }
}
</script>


<style>
    .col-width-w40{
      width: 40%;
    }
    .col-width-w45h{
      width: 45.5%;
    }
    .ml5{
      margin-left: 5%;
    }
    .select-type{
      width: 240px;
    }

</style>
