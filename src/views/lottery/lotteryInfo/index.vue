<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item :label="$t('lottery.lotteryInfo.form.nameLabel')" prop="name">
        <el-input
          v-model="queryParams.name"
          :placeholder="$t('lottery.lotteryInfo.form.namePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('lottery.lotteryInfo.form.statusLabel')" prop="status">
        <el-select v-model="queryParams.status" :placeholder="$t('lottery.lotteryInfo.form.statusPlaceholder')" clearable size="small">
          <el-option
            v-for="item in status"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!--      <el-form-item label="开奖形式" prop="official">-->
      <!--        <el-select v-model="queryParams.official" placeholder="请选择开奖形式" clearable size="small">-->
      <!--          <el-option-->
      <!--            v-for="item in official"-->
      <!--            :key="item.value"-->
      <!--            :label="item.label"-->
      <!--            :value="item.value">-->
      <!--          </el-option>-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <el-form-item :label="$t('lottery.lotteryInfo.form.typeLabel')" prop="type">
        <el-select v-model="queryParams.type" :placeholder="$t('lottery.lotteryInfo.form.typePlaceholder')" clearable size="small">
          <el-option
            v-for="item in type"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!--      <el-form-item label="杀率" prop="killRate">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.killRate"-->
      <!--          placeholder="请输入杀率"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="最小投注金额" prop="minCost">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.minCost"-->
      <!--          placeholder="请输入最小投注金额"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="周期" prop="cycle">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.cycle"-->
      <!--          placeholder="请输入周期"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('global.searchButton')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('global.resetButton')}}</el-button>
      </el-form-item>
    </el-form>

    <el-table stripe v-loading="loading" :data="lotteryInfoList">
      <el-table-column :label="$t('lottery.lotteryInfo.tableColumns.name')" align="center" prop="name"/>
      <el-table-column :label="$t('lottery.lotteryInfo.tableColumns.type')" align="center" prop="type">
        <template v-slot="{row}">
          <a @click="$router.push({path: '/lottery/lotteryMethod',query: { lotteryType: row.type}})"
             style="color: #00afff"> {{ row.type }}</a>
        </template>
      </el-table-column>
      <el-table-column :label="$t('lottery.lotteryInfo.tableColumns.icon')" align="center" prop="icon">
        <template slot-scope="scope">
          <el-image
            style="height:50px"
            :src="scope.row.icon"
            fit="contain"
          >
          </el-image>
        </template>
      </el-table-column>
<!--     Status Handler Switch Button  -->
      <el-table-column :label="$t('lottery.lotteryInfo.tableColumns.status')" align="center" prop="status" :formatter="formatterStatus">
          <template v-slot="{row}">
            <el-switch
              :inactive-value="0"
              :active-value="1"
              inactive-color="#dadde5"
              active-color="#5B7BFA"
              v-model="row.status"
              @change=formatterStatus(row)>
            </el-switch>
        </template>
      </el-table-column>

      <el-table-column :label="$t('lottery.lotteryInfo.tableColumns.killRate')" align="center" prop="killRate"/>
      <el-table-column :label="$t('lottery.lotteryInfo.tableColumns.cycle')" align="center" prop="cycle"/>
      <el-table-column :label="$t('lottery.lotteryInfo.tableColumns.minCost')" align="center" prop="minCost"/>

<!--      ORDER -->
      <el-table-column :label="$t('lottery.lotteryInfo.tableColumns.order')" align="center" prop="order"/>

      <el-table-column :label="$t('lottery.lotteryInfo.tableColumns.operationLabel')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >{{$t('global.editButton')}}
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

    <!-- 添加或修改活动信息对话框 -->
    <el-dialog :title="$t('global.editButton')" :visible.sync="open" width="380px" v-loading="loading" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="90px">
        <el-form-item :label="$t('global.icon')" prop="icon">
          <imageUpload v-model="form.icon" path="LotteryInfo"/>
        </el-form-item>

        <el-form-item :label="$t('global.sort')" prop="order">
          <el-input v-model="form.order" :placeholder="$t('global.sortPlaceholder')" class="order-input"/>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{$t('global.confirmButton')}}</el-button>
        <el-button @click="cancel">{{$t('global.cancelButton')}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {listLotteryInfo, getLotteryInfo, updateLotteryInfo,statusDetail} from "@/api/platform-web/lottery/lotteryInfo";
import ImageUpload from "@/components/ImageUpload";

export default {
  name: "LotteryInfo",
  components: {
    ImageUpload
  },
  data() {
    return {
      //状态选择栏
      status: [{
        value: '1',
        label: this.$t('global.statusEnable')
      }, {
        value: '0',
        label: this.$t('global.statusDisable')
      }],
      //开奖形式选择栏
      official: [{
        value: '0',
        label: this.$t('lottery.lotteryInfo.officialLabel.official')
      }, {
        value: '1',
        label: this.$t('lottery.lotteryInfo.officialLabel.selfOpeningDatabase')
      }, {
        value: '2',
        label: this.$t('lottery.lotteryInfo.officialLabel.selfOpeningProgram')
      }],
      //所属彩种类型下拉框
      type: [{
        value: this.$t('lottery.lotteryInfo.type.timeShareValue'),
        label: this.$t('lottery.lotteryInfo.type.timeShareLabel')
      }, {
        value: this.$t("lotteryInfo.type['11select5Value']"),
        label: this.$t("lotteryInfo.type['11select5Label']")
      }, {
        value: this.$t('lottery.lotteryInfo.type.fastThreeValue'),
        label: this.$t('lottery.lotteryInfo.type.fastThreeLabel')
      }, {
        value: this.$t('lottery.lotteryInfo.type.racingValue'),
        label: this.$t('lottery.lotteryInfo.type.racingLabel')
      }, {
        value: this.$t('lottery.lotteryInfo.type.markSixValue'),
        label: this.$t('lottery.lotteryInfo.type.markSixLabel')
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
      // 彩票名称表格数据
      lotteryInfoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        name: null,
        type: null,
        status: null,
        icon: null,
        official: null,
        killRate: null,
        minCost: null,
        cycle: null,
        order : null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          {required: true, message: this.$t('lottery.lotteryInfo.rulesNameMessage'), trigger: "blur"}
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询彩票名称列表 */
    getList() {
      this.loading = true;
      listLotteryInfo(this.queryParams).then(response => {
        this.lotteryInfoList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id
      getLotteryInfo(id).then(response => {
        this.form = response.data;
        this.open = true;
      });
    },
    /** 修改图标提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          updateLotteryInfo(this.form).then(response => {
            this.msgSuccess(this.$t('lottery.lotteryInfo.updateSuccessMessage'));
            this.open = false;
            this.getList();
          });
        }
      });
    },
    // 0=官方1=自开（数据库）2=自开（程序）
    formatterofficial(row) {
      if (row.official == 0) {
        return this.$t('lottery.lotteryInfo.officialLabel.official')
      } else if (row.official == 1) {
        return this.$t('lottery.lotteryInfo.officialLabel.selfOpeningDatabase')
      } else if (row.official == 2) {
        return this.$t('lottery.lotteryInfo.officialLabel.selfOpeningProgram')
      } else {
        return ''
      }
    },

    /*<<<>>>====================================<<<<<>>>>>>>>>>
         禁用启用 Set Status Active =1 and DeActive = 0
                 started function from here
      <<<<<>>>>>=================================<<<<<<>>>>  */

    formatterStatus(row) {
      if(row.status===1 || row.status===0){
        if (row.status) {
          return this.statusDetail( row, row.status)
        } else {
          return this.statusDetail(row, row.status)
        }
      }else{
        return null;
      }
    },
    opens(hint, row, type) {
      var that = this
      this.$prompt(hint, this.$t('global.dialogTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton')
      }).then(({ value }) => {
        that.statusDetail(row, type, value)
      }).catch(() => {
        row.status = row.status === 0 ? 1 : 0
      })
    },
    statusDetail(row, type, value) {
      statusDetail({
        id: row.id,
        status: type,
        banRemark: value
      }).then((res) => {
        this.$notify.success(res.msg)
        row.status = type
        this.getList()
      }).catch(() => {
        this.$notify.error(this.$t('lottery.lotteryInfo.updateBanErrorMessage'))
      })
    },

    /*<<<>>>====================================<<<<<>>>>>>>>>>
         禁用启用 Set Status Active =1 and DeActive = 0
                 function ENDED HERE  here
      <<<<<>>>>>=================================<<<<<<>>>>  */


    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        name: null,
        type: null,
        status: 0,
        icon: null,
        official: null,
        killRate: null,
        minCost: null,
        cycle: null,
        order:null
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
    }
  }
};
</script>

<style>
      .order-input{
        width: 151px
      }
</style>
