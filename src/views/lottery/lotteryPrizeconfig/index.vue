<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item prop="lotteryName">
        <el-select
          filterable
          v-model="queryParams.lotteryName"
          placeholder="请选择彩种"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in LotteryInfoNameOptions"
            :key="dict.name"
            :label="dict.name"
            :value="dict.name"
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
          v-hasPermi="['admin:lotteryPrizeconfig:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:lotteryPrizeconfig:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="lotteryPrizeconfigList" @selection-change="handleSelectionChange">
      <el-table-column width="55" align="center"/>
      <el-table-column label="彩种ID" align="center" prop="lotteryId"/>
      <el-table-column label="彩种名称" align="center" prop="lotteryName"/>
      <el-table-column label="杀率阀值" align="center" prop="lotteryKillrate"/>
      <el-table-column label="杀率禁用时间点" align="center" prop="lotteryNokillratehour"/>
      <el-table-column label="随机开启不杀概率" align="center" prop="lotteryRandom"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:lotteryPrizeconfig:edit']"
          >修改
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

    <!-- 添加开奖配置对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="opene" width="800px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="130px">
        <el-form-item label="彩种编号" prop="lotteryId">
          <el-input v-model="form.lotteryId" placeholder="请输入彩种编号"/>
        </el-form-item>
        <el-form-item label="彩种名称" prop="lotteryName">
          <el-input v-model="form.lotteryName" placeholder="请输入彩种名称"/>
        </el-form-item>
        <el-form-item label="杀率阀值" prop="lotteryKillrate">
          <el-input v-model="form.lotteryKillrate" placeholder="请输入杀率阀值"/>
        </el-form-item>
        <el-form-item label="随机开启不杀概率" prop="lotteryRandom">
          <el-input v-model="form.lotteryRandom" placeholder="请输入随机开启不杀概率"/>
        </el-form-item>
        <el-form-item label="杀率禁用时间点" prop="lotteryNokillratehour">
          <template>
            <el-select v-model="form.lotteryNokillratehour" multiple placeholder="请选择杀率禁用时间点(可多选)" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addsubmitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 修改开奖配置对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="800px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="130px">
        <el-form-item label="彩种编号" prop="lotteryId">
          <el-input v-model="form.lotteryId" placeholder="请输入彩种编号" readonly/>
        </el-form-item>
        <el-form-item label="彩种名称" prop="lotteryName">
          <el-input v-model="form.lotteryName" placeholder="请输入彩种名称" readonly/>
        </el-form-item>
        <el-form-item label="杀率阀值" prop="lotteryKillrate">
          <el-input v-model="form.lotteryKillrate" placeholder="请输入杀率阀值"/>
        </el-form-item>
        <el-form-item label="随机开启不杀概率" prop="lotteryRandom">
          <el-input v-model="form.lotteryRandom" placeholder="请输入随机开启不杀概率"/>
        </el-form-item>
        <el-form-item label="杀率禁用时间点" prop="lotteryNokillratehour">
          <template>
            <el-checkbox-group v-model="lotteryNokillratehours">
              <el-checkbox label="0"></el-checkbox>
              <el-checkbox label="1"></el-checkbox>
              <el-checkbox label="2"></el-checkbox>
              <el-checkbox label="3"></el-checkbox>
              <el-checkbox label="4"></el-checkbox>
              <el-checkbox label="5"></el-checkbox>
              <el-checkbox label="6"></el-checkbox>
              <el-checkbox label="7"></el-checkbox>
              <el-checkbox label="8"></el-checkbox>
              <el-checkbox label="9"></el-checkbox>
              <el-checkbox label="10"></el-checkbox>
              <el-checkbox label="11"></el-checkbox>
              <el-checkbox label="12"></el-checkbox>
              <el-checkbox label="13"></el-checkbox>
              <el-checkbox label="14"></el-checkbox>
              <el-checkbox label="15"></el-checkbox>
              <el-checkbox label="16"></el-checkbox>
              <el-checkbox label="17"></el-checkbox>
              <el-checkbox label="18"></el-checkbox>
              <el-checkbox label="19"></el-checkbox>
              <el-checkbox label="20"></el-checkbox>
              <el-checkbox label="21"></el-checkbox>
              <el-checkbox label="22"></el-checkbox>
              <el-checkbox label="23"></el-checkbox>
            </el-checkbox-group>
          </template>
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
  listLotteryPrizeconfig,
  getLotteryPrizeconfig,
  delLotteryPrizeconfig,
  addLotteryPrizeconfig,
  updateLotteryPrizeconfig,
  exportLotteryPrizeconfig,
  LotteryInfoName
} from "@/api/platform-web/lottery/lotteryPrizeconfig";

export default {
  name: "LotteryPrizeconfig",
  components: {},
  data() {
    return {
      //下拉多选杀率禁用时间点
      options: [
        {value: '0', label: '0点'},
        {value: '1', label: '1点'},
        {value: '2', label: '2点'},
        {value: '3', label: '3点'},
        {value: '4', label: '4点'},
        {value: '5', label: '5点'},
        {value: '6', label: '6点'},
        {value: '7', label: '7点'},
        {value: '8', label: '8点'},
        {value: '9', label: '9点'},
        {value: '10', label: '10点'},
        {value: '11', label: '11点'},
        {value: '12', label: '12点'},
        {value: '13', label: '13点'},
        {value: '14', label: '14点'},
        {value: '15', label: '15点'},
        {value: '16', label: '16点'},
        {value: '17', label: '17点'},
        {value: '18', label: '18点'},
        {value: '19', label: '19点'},
        {value: '20', label: '20点'},
        {value: '21', label: '21点'},
        {value: '22', label: '22点'},
        {value: '23', label: '23点'}
      ],
      //全部彩种
      LotteryInfoNameOptions: [],
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
      // 开奖配置表格数据
      lotteryPrizeconfigList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      opene: false,
      //杀率禁用时间点多选框
      lotteryNokillratehours: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        lotteryName: null,
        lotteryKillrate: null,
        lotteryNokillratehour: null,
        lotteryRandom: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        lotteryId:
          { required: true, message: '彩种编号不能为空', trigger: 'blur' }
      }
    };
  },
  created() {
    this.getList();
    //全部彩种
    LotteryInfoName().then(response => {
      this.LotteryInfoNameOptions = response.data
    })
  },
  methods: {
    /** 查询开奖配置列表 */
    getList() {
      this.loading = true;
      listLotteryPrizeconfig(this.queryParams).then(response => {
        this.lotteryPrizeconfigList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.opene = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        lotteryId: null,
        lotteryName: null,
        lotteryKillrate: null,
        lotteryNokillratehour: null,
        lotteryRandom: null
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
      this.ids = selection.map(item => item.lotteryId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.opene = true;
      this.title = "添加开奖配置";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const lotteryId = row.lotteryId || this.ids
      getLotteryPrizeconfig(lotteryId).then(response => {
        if (response.data.lotteryNokillratehour != null) {
        this.lotteryNokillratehours = response.data.lotteryNokillratehour.split(',')
      }
        this.form = response.data;
        this.open = true;
        this.title = "修改开奖配置";
      });
    },
    /** 修改提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if(this.lotteryNokillratehours != null){
            this.form.lotteryNokillratehour = this.lotteryNokillratehours.join(',')
          }
          updateLotteryPrizeconfig(this.form).then(response => {
            this.msgSuccess("修改成功");
            this.open = false;
            this.getList();
          });
        }
      });
    },
    /** 添加提交按钮 */
    addsubmitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.lotteryNokillratehour != null) {
            this.form.lotteryNokillratehour = this.form.lotteryNokillratehour.join(',')
            addLotteryPrizeconfig(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.opene = false;
              this.getList();
            });
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const lotteryIds = row.lotteryId || this.ids;
      this.$confirm('是否确认删除开奖配置编号为"' + lotteryIds + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delLotteryPrizeconfig(lotteryIds);
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
        return exportLotteryPrizeconfig(queryParams);
      }).then(response => {
        this.downloadExcel(response, '开奖配置');
      }).catch(() => {
      })
    }
  }
};
</script>
