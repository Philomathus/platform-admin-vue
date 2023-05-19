<template>
  <div class="app-container">
    <template>
      <!--      <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">-->
      <!--        <el-form-item label="参数名称" prop="envTitle">-->
      <!--          <el-select v-model="titleCode.envTitle" @change="changeType" filterable placeholder="请选择参数名称">-->
      <!--            <el-option-->
      <!--              v-for="(item,index) in titleCodeList"-->
      <!--              :key="index"-->
      <!--              :label="item.envTitle"-->
      <!--              :value="item">-->
      <!--            </el-option>-->
      <!--          </el-select>-->
      <!--        </el-form-item>-->
      <!--        <el-form-item label="参数编码" prop="envCode">-->
      <!--          <el-select v-model="titleCode.envCode" @change="changeType" filterable placeholder="请选择参数编码">-->
      <!--            <el-option-->
      <!--              v-for="(item,index) in titleCodeList"-->
      <!--              :key="index"-->
      <!--              :label="item.envCode"-->
      <!--              :value="item"-->

      <!--            >-->
      <!--            </el-option>-->
      <!--          </el-select>-->
      <!--        </el-form-item>-->
      <!--        <el-form-item>-->
      <!--          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>-->
      <!--          &lt;!&ndash; <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>&ndash;&gt;-->
      <!--        </el-form-item>-->
      <!--      </el-form>-->
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane v-for="(item,index) in tabList" :lazy="true" :label="item.dictLabel" :name="item.dictValue">
          <comprehensive v-if="item.dictValue==='1'"></comprehensive>
          <game-bet v-if="item.dictValue==='2'"></game-bet>
          <recharge-statistics v-if="item.dictValue==='3'"></recharge-statistics>
          <income-day v-if="item.dictValue==='4'"></income-day>
          <agent-count v-if="item.dictValue==='5'"></agent-count>
        </el-tab-pane>

      </el-tabs>
    </template>

  </div>
</template>

<script>
import {
  listConfigEnvironment,
  getConfigEnvironment,
  delConfigEnvironment,
  addConfigEnvironment,
  updateConfigEnvironmentList,
  exportConfigEnvironment,
  getTitleIndex
} from "@/api/platform-web/config/configEnvironment";
import agentCount from '@/views/report/agentCount/index.vue';
import comprehensive from '@/views/report/comprehensiveStatistics/index.vue';
import gameBet from '@/views/report/gameBet/index.vue';
import incomeDay from '@/views/report/incomeDay/index.vue';
import rechargeStatistics from '@/views/report/rechargeStatistics/index.vue';

export default {
  name: "ConfigEnvironment",
  components: {
    agentCount: agentCount,
    comprehensive: comprehensive,
    gameBet: gameBet,
    incomeDay: incomeDay,
    rechargeStatistics: rechargeStatistics
  },
  data() {
    return {
      //tab的选中
      activeName: '1',
      //tab的集合   游戏投注报表 充值综合统计 平台推广统计
      tabList: [{dictLabel: this.$t('report.index.pis'), dictValue: "1"}, {dictLabel: this.$t('report.index.gbs'), dictValue: "2"}, {
        dictLabel: this.$t('report.index.ccs'),
        dictValue: "3"
      }, {dictLabel: this.$t('report.index.prs'), dictValue: "4"}, {dictLabel: this.$t('report.index.pps'), dictValue: "5"},],
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
      // 【请填写功能名称】表格数据
      configEnvironmentList: [],
      types: [{label: this.$t('report.index.enable'), value: 1}, {label: this.$t('report.index.disable'), value: 0}],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 50,
        envValue: null,
        envDes: null,
        envGroup: null,
        envSort: null,
        envStatus: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        envGroup: [
          {required: true, message: this.$t('report.index.tpg'), trigger: "blur"}
        ],
        envSort: [
          {required: true, message: this.$t('report.index.sce'), trigger: "blur"}
        ],
        envStatus: [
          {required: true, message: this.$t('report.index.statce'), trigger: "blur"}
        ]
      }
    };
  },
  created() {
    /*         //获取提示列表
             this.getList(1);
             //获取对应页面的列表
             this.getDicts("config_environment_group").then(response => {
                 this.tabList = response.data;
                 //通过tabList的对应的类型的groupId来查询对应的类型
                 this.getList();
             });
             //获取开关按钮提示
             this.getDicts("server_sms_status").then(response => {
                 this.statusList = response.data;
             });*/
  },
  methods: {
    /*选中值之后调用的事件*/
    changeType(item) {
      this.titleCode.envCode = item.envCode;
      this.titleCode.envTitle = item.envTitle;
    },
    /*切换调用的方法*/
    handleClick(tab, event) {
      this.activeName = tab.name
      // this.getList();
      // console.log(tab, event);
    },
    /** 查询【请填写功能名称】列表 */
    getList(type) {
      this.loading = true;
      var that = this;
      if (!type) {
        var dictValue = this.tabList[parseInt(this.activeName) - 1].dictValue;
        this.queryParams.envGroup = dictValue
      }
      listConfigEnvironment(this.queryParams).then(response => {
        this.configEnvironmentList = response.rows.sort(function (a, b) {
          return a.envSort - b.envSort
        });
        if (type) {
          that.titleCodeList = this.configEnvironmentList;
        } else {
          this.total = response.total;
          this.loading = false;
        }
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
        envCode: null,
        envValue: null,
        envDes: null,
        envGroup: null,
        envSort: null,
        envStatus: 0
      };
      this.resetForm("form");
    },
    handleQueryTitle() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if (this.envTitle === '' && this.envCode === '') {
        this.$notify.warning( this.$t('report.index.ptap') )
        return
      }
      // this.queryParams.pageNum = 1;
      getTitleIndex({title: this.titleCode.envTitle, code: this.titleCode.envCode}).then((res) => {
        if (res.code === 200) {
          console.log(res)
          if (res.data) {
            this.activeName = res.data + ''
            this.getList();
          } else {
            this.$notify.warning( this.$t('report.index.ncf') )
          }
          // this.activeName = tab.index
          // this.getList();
        }
      }).catch(() => {
        this.$notify.error( this.$t('report.index.na') )
      });
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.envCode)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    handleConfirm() {
      updateConfigEnvironmentList(this.configEnvironmentList).then(response => {
        this.msgSuccess( this.$t('report.index.ms') );
        this.open = false;
        this.getList();
      });
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = this.$t('report.index.apf') ;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const envCode = row.envCode || this.ids
      getConfigEnvironment(envCode).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = this.$t('report.index.mpf') ;
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.envCode != null) {
            updateConfigEnvironment(this.form).then(response => {
              this.msgSuccess( this.$t('report.index.ms') );
              this.open = false;
              this.getList();
            });
          } else {
            addConfigEnvironment(this.form).then(response => {
              this.msgSuccess( this.$t('report.index.as') );
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const envCodes = row.envCode || this.ids;
      this.$confirm( this.$t('report.index.wcd', {ecode: envCodes}) , this.$t('global.dialogTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: "warning"
      }).then(function () {
        return delConfigEnvironment(envCodes);
      }).then(() => {
        this.getList();
        this.msgSuccess( this.$t('global.deleteSuccessMsg'));
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm( this.$t('report.index.dyc'), this.$t('global.dialogTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: "warning"
      }).then(function () {
        return exportConfigEnvironment(queryParams);
      }).then(response => {
        this.downloadExcel(response, this.$t('report.index.rf'))
      }).catch(() => {
      })
    }
  }
};
</script>

<style>
/*  .ban{
    background-color: #909399
  }*/
.ban {
  -webkit-text-fill-color: #ededed !important;
  /*    -webkit-box-shadow: 0 0 0px 1000px transparent  inset !important;
      background-color:transparent;
      background-image: none;
      !* //背景色透明  生效时长  过渡效果  启用时延迟的时间 *!
      transition: background-color 50000s ease-in-out 0s;*/
}
</style>
