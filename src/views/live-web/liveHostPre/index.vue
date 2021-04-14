<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item prop="dateDay">
        <el-date-picker clearable size="small"
                        v-model="queryParams.dateDay"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        style="width: 150px"
                        :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-select v-model="queryParams.live" placeholder="直播时间" style="width: 100px" size="small" clearable>
          <el-option label="0点" value="0"></el-option>
          <el-option label="1点" value="1"></el-option>
          <el-option label="2点" value="2"></el-option>
          <el-option label="3点" value="3"></el-option>
          <el-option label="4点" value="4"></el-option>
          <el-option label="5点" value="5"></el-option>
          <el-option label="6点" value="6"></el-option>
          <el-option label="7点" value="7"></el-option>
          <el-option label="8点" value="8"></el-option>
          <el-option label="9点" value="9"></el-option>
          <el-option label="10点" value="10"></el-option>
          <el-option label="11点" value="11"></el-option>
          <el-option label="12点" value="12"></el-option>
          <el-option label="13点" value="13"></el-option>
          <el-option label="14点" value="14"></el-option>
          <el-option label="15点" value="15"></el-option>
          <el-option label="16点" value="16"></el-option>
          <el-option label="17点" value="17"></el-option>
          <el-option label="18点" value="18"></el-option>
          <el-option label="19点" value="19"></el-option>
          <el-option label="20点" value="20"></el-option>
          <el-option label="21点" value="21"></el-option>
          <el-option label="22点" value="22"></el-option>
          <el-option label="23点" value="23"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="familyId">
        <el-input
          style="width: 150px"
          v-model="queryParams.familyId"
          placeholder="请输入家族ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="hostId">
        <el-input
          style="width: 150px"
          v-model="queryParams.hostId"
          placeholder="请输入主播ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="hostName">
        <el-input
          style="width: 150px"
          v-model="queryParams.hostName"
          placeholder="请输入直播昵称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="全部状态"
          clearable
          size="small"
          style="width: 130px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          plain-->
<!--          icon="el-icon-plus"-->
<!--          size="mini"-->
<!--          @click="handleAdd"-->
<!--          v-hasPermi="['admin:liveHostPre:add']"-->
<!--        >新增-->
<!--        </el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          plain-->
<!--          icon="el-icon-plus"-->
<!--          size="mini"-->
<!--          @click="handleUpdate(scope.row)"-->
<!--          v-hasPermi="['admin:liveHostPre:edit']"-->
<!--        >修改-->
<!--        </el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="danger"-->
<!--          plain-->
<!--          icon="el-icon-delete"-->
<!--          size="mini"-->
<!--          :disabled="multiple"-->
<!--          @click="handleDelete"-->
<!--          v-hasPermi="['admin:liveHostPre:remove']"-->
<!--        >删除-->
<!--        </el-button>-->
<!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:liveHostPre:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="liveHostPreList" @selection-change="handleSelectionChange">
      <el-table-column label="日期+主播ID" align="center" prop="id" min-width="160"/>
      <el-table-column label="家族ID" align="center" prop="familyId">
        <template slot-scope="scope">
          <span type="text" v-if="scope.row.familyId == 0">散户</span>
        </template>
      </el-table-column>
      <el-table-column label="主播ID" align="center" prop="hostId"/>
      <el-table-column label="直播昵称" align="center" prop="hostName" min-width="100"/>
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
        <span :style="{color: (status = statusOptions[parseInt(scope.row.status)]).color}">
            {{ status.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="0点" align="center" prop="live0">
        <template slot-scope="scope">
          <span :style="{color: (live0 = liveOptions[parseInt(scope.row.live0)]).color}">
            {{ live0.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="1点" align="center" prop="live1">
        <template slot-scope="scope">
          <span :style="{color: (live1 = liveOptions[parseInt(scope.row.live1)]).color}">
            {{ live1.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="2点" align="center" prop="live2">
        <template slot-scope="scope">
          <span :style="{color: (live2 = liveOptions[parseInt(scope.row.live2)]).color}">
            {{ live2.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="3点" align="center" prop="live3">
        <template slot-scope="scope">
          <span :style="{color: (live3 = liveOptions[parseInt(scope.row.live3)]).color}">
            {{ live3.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="4点" align="center" prop="live4">
        <template slot-scope="scope">
          <span :style="{color: (live4 = liveOptions[parseInt(scope.row.live4)]).color}">
            {{ live4.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="5点" align="center" prop="live5">
        <template slot-scope="scope">
          <span :style="{color: (live5 = liveOptions[parseInt(scope.row.live5)]).color}">
            {{ live5.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="6点" align="center" prop="live6">
        <template slot-scope="scope">
          <span :style="{color: (live6 = liveOptions[parseInt(scope.row.live6)]).color}">
            {{ live6.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="7点" align="center" prop="live7">
        <template slot-scope="scope">
          <span :style="{color: (live7 = liveOptions[parseInt(scope.row.live7)]).color}">
            {{ live7.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="8点" align="center" prop="live8">
        <template slot-scope="scope">
          <span :style="{color: (live8 = liveOptions[parseInt(scope.row.live8)]).color}">
            {{ live8.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="9点" align="center" prop="live9">
        <template slot-scope="scope">
          <span :style="{color: (live9 = liveOptions[parseInt(scope.row.live9)]).color}">
            {{ live9.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="10点" align="center" prop="live10">
        <template slot-scope="scope">
          <span :style="{color: (live10 = liveOptions[parseInt(scope.row.live10)]).color}">
            {{ live10.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="11点" align="center" prop="live11">
        <template slot-scope="scope">
          <span :style="{color: (live11 = liveOptions[parseInt(scope.row.live11)]).color}">
            {{ live11.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="12点" align="center" prop="live12">
        <template slot-scope="scope">
          <span :style="{color: (live12 = liveOptions[parseInt(scope.row.live12)]).color}">
            {{ live12.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="13点" align="center" prop="live13">
        <template slot-scope="scope">
          <span :style="{color: (live13 = liveOptions[parseInt(scope.row.live13)]).color}">
            {{ live13.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="14点" align="center" prop="live14">
        <template slot-scope="scope">
          <span :style="{color: (live14 = liveOptions[parseInt(scope.row.live14)]).color}">
            {{ live14.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="15点" align="center" prop="live15">
        <template slot-scope="scope">
          <span :style="{color: (live15 = liveOptions[parseInt(scope.row.live15)]).color}">
            {{ live15.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="16点" align="center" prop="live16">
        <template slot-scope="scope">
          <span :style="{color: (live16 = liveOptions[parseInt(scope.row.live16)]).color}">
            {{ live16.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="17点" align="center" prop="live17">
        <template slot-scope="scope">
          <span :style="{color: (live17 = liveOptions[parseInt(scope.row.live17)]).color}">
            {{ live17.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="18点" align="center" prop="live18">
        <template slot-scope="scope">
          <span :style="{color: (live18 = liveOptions[parseInt(scope.row.live18)]).color}">
            {{ live18.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="19点" align="center" prop="live19">
        <template slot-scope="scope">
          <span :style="{color: (live19 = liveOptions[parseInt(scope.row.live19)]).color}">
            {{ live19.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="20点" align="center" prop="live20">
        <template slot-scope="scope">
          <span :style="{color: (live20 = liveOptions[parseInt(scope.row.live20)]).color}">
            {{ live20.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="21点" align="center" prop="live21">
        <template slot-scope="scope">
          <span :style="{color: (live21 = liveOptions[parseInt(scope.row.live21)]).color}">
            {{ live21.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="22点" align="center" prop="live22">
        <template slot-scope="scope">
          <span :style="{color: (live22 = liveOptions[parseInt(scope.row.live22)]).color}">
            {{ live22.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="23点" align="center" prop="live23">
        <template slot-scope="scope">
          <span :style="{color: (live23 = liveOptions[parseInt(scope.row.live23)]).color}">
            {{ live23.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="success"
            v-show="scope.row.status == 0"
            @click="handleUpdateStatus(scope.row,1)"
          >通过
          </el-button>
          <el-button
            size="small"
            type="danger"
            v-show="scope.row.status == 0"
            @click="handleUpdateStatus(scope.row,2)"
          >驳回
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

    <!-- 添加或修改主播开播时间预约对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="家族ID" prop="familyId">
          <el-input v-model="form.familyId" placeholder="请输入家族ID"/>
        </el-form-item>
        <el-form-item label="主播ID" prop="hostId">
          <el-input v-model="form.hostId" placeholder="请输入主播ID"/>
        </el-form-item>
        <el-form-item label="直播昵称" prop="hostName">
          <el-input v-model="form.hostName" placeholder="请输入直播昵称"/>
        </el-form-item>
        <el-form-item label="0=申请1通过2=驳回">
          <el-radio-group v-model="form.status">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="直播时间" prop="live0">
          <el-input v-model="form.live0" placeholder="请输入直播时间"/>
        </el-form-item>
        <el-form-item label="直播时间" prop="live1">
          <el-input v-model="form.live1" placeholder="请输入直播时间"/>
        </el-form-item>
        <el-form-item label="直播时间" prop="live2">
          <el-input v-model="form.live2" placeholder="请输入直播时间"/>
        </el-form-item>
        <el-form-item label="直播时间" prop="live3">
          <el-input v-model="form.live3" placeholder="请输入直播时间"/>
        </el-form-item>
        <el-form-item label="直播时间" prop="live4">
          <el-input v-model="form.live4" placeholder="请输入直播时间"/>
        </el-form-item>
        <el-form-item label="直播时间" prop="live5">
          <el-input v-model="form.live5" placeholder="请输入直播时间"/>
        </el-form-item>
        <el-form-item label="直播时间" prop="live6">
          <el-input v-model="form.live6" placeholder="请输入直播时间"/>
        </el-form-item>
        <el-form-item label="直播时间" prop="live7">
          <el-input v-model="form.live7" placeholder="请输入直播时间"/>
        </el-form-item>
        <el-form-item label="直播时间" prop="live8">
          <el-input v-model="form.live8" placeholder="请输入直播时间"/>
        </el-form-item>
        <el-form-item label="直播时间" prop="live9">
          <el-input v-model="form.live9" placeholder="请输入直播时间"/>
        </el-form-item>
        <el-form-item label="直播时间" prop="live10">
          <el-input v-model="form.live10" placeholder="请输入直播时间"/>
        </el-form-item>
        <el-form-item label="直播时间" prop="live11">
          <el-input v-model="form.live11" placeholder="请输入直播时间"/>
        </el-form-item>
        <el-form-item label="直播时间" prop="live12">
          <el-input v-model="form.live12" placeholder="请输入直播时间"/>
        </el-form-item>
        <el-form-item label="直播时间" prop="live13">
          <el-input v-model="form.live13" placeholder="请输入直播时间"/>
        </el-form-item>
        <el-form-item label="直播时间" prop="live14">
          <el-input v-model="form.live14" placeholder="请输入直播时间"/>
        </el-form-item>
        <el-form-item label="直播时间" prop="live15">
          <el-input v-model="form.live15" placeholder="请输入直播时间"/>
        </el-form-item>
        <el-form-item label="直播时间" prop="live16">
          <el-input v-model="form.live16" placeholder="请输入直播时间"/>
        </el-form-item>
        <el-form-item label="直播时间" prop="live17">
          <el-input v-model="form.live17" placeholder="请输入直播时间"/>
        </el-form-item>
        <el-form-item label="直播时间" prop="live18">
          <el-input v-model="form.live18" placeholder="请输入直播时间"/>
        </el-form-item>
        <el-form-item label="直播时间" prop="live20">
          <el-input v-model="form.live20" placeholder="请输入直播时间"/>
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
  listLiveHostPre,
  getLiveHostPre,
  delLiveHostPre,
  addLiveHostPre,
  updateLiveHostPre,
  exportLiveHostPre
} from "@/api/live-web/liveHostPre/liveHostPre";
import {concat} from "lodash";
import {pickerDateTimeShortcuts} from "@/utils/dateUtils";

export default {
  name: "LiveHostPre",
  components: {},
  data() {
    return {
      pickerOptions: {shortcuts: pickerDateTimeShortcuts},
      // 遮罩层
      loading: true,
      // 状态字典
      statusOptions: [],
      liveOptions: [],
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
      // 主播开播时间预约表格数据
      liveHostPreList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        dateDay: this.parseTime(new Date(), '{y}-{m}-{d}'),
        pageNum: 1,
        pageSize: 10,
        familyId: null,
        hostId: null,
        hostName: null,
        status: null,
        live: null,
        live0: null,
        live1: null,
        live2: null,
        live3: null,
        live4: null,
        live5: null,
        live6: null,
        live7: null,
        live8: null,
        live9: null,
        live10: null,
        live11: null,
        live12: null,
        live13: null,
        live14: null,
        live15: null,
        live16: null,
        live17: null,
        live18: null,
        live19: null,
        live20: null,
        live21: null,
        live22: null,
        live23: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    };
  },
  created() {
    this.getList();
    this.getDicts('liveHostPre_status').then(response => {
      this.statusOptions = response.data
    })
    this.getDicts('liveHostPre_live').then(response => {
      this.liveOptions = response.data
    })
  },
  methods: {
    /** 查询主播开播时间预约列表 */
    getList() {
      this.loading = true;
      listLiveHostPre(this.queryParams).then(response => {
        this.liveHostPreList = response.rows;
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
        familyId: null,
        hostId: null,
        hostName: null,
        status: 0,
        live0: null,
        live1: null,
        live2: null,
        live3: null,
        live4: null,
        live5: null,
        live6: null,
        live7: null,
        live8: null,
        live9: null,
        live10: null,
        live11: null,
        live12: null,
        live13: null,
        live14: null,
        live15: null,
        live16: null,
        live17: null,
        live18: null,
        live19: null,
        live20: null,
        live21: null,
        live22: null,
        live23: null
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
      this.title = "添加主播开播时间预约";
    },
    /** 通过驳回按钮操作 */
    handleUpdateStatus(row, flag) {
      var data = {}
      data.id = row.id
      if (flag == 1) {
        data.status = 1
        this.$confirm('是否确认通过"' + row.hostName + '"的申请?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          return updateLiveHostPre(data)
        }).then(() => {
          this.getList()
          this.msgSuccess('审核通过')
        })
      } else if (flag == 2) {
        data.status = 2
        this.$prompt('请输入驳回原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '驳回原因不能为空',
          type: 'warning'
        }).then(({value}) => {
          data.remark = value
          updateLiveHostPre(data).then(response => {
            this.msgSuccess('驳回成功')
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        })
      }
    },
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLiveHostPre(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改主播开播时间预约";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLiveHostPre(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLiveHostPre(this.form).then(response => {
              this.msgSuccess("新增成功");
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
      this.$confirm('是否确认删除主播开播时间预约编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delLiveHostPre(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return exportLiveHostPre(queryParams);
      }).then(response => {
        this.downloadExcel(response, '主播开播时间预约');
      }).catch(() => {
      })
    }
  }
};
</script>
