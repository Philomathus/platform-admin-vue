<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <!--      <el-form-item label="彩票ID" prop="lotteryId">
              <el-input
                v-model="queryParams.lotteryId"
                placeholder="请输入彩票ID"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>-->
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--     <el-form-item label="开始时间" prop="start">
             <el-date-picker clearable size="small"
               v-model="queryParams.start"
               type="date"
               value-format="yyyy-MM-dd"
               placeholder="选择开始时间">
             </el-date-picker>
           </el-form-item>
           <el-form-item label="结束时间" prop="end">
             <el-date-picker clearable size="small"
               v-model="queryParams.end"
               type="date"
               value-format="yyyy-MM-dd"
               placeholder="选择结束时间">
             </el-date-picker>
           </el-form-item>
           <el-form-item label="派奖比例" prop="pRate">
             <el-input
               v-model="queryParams.pRate"
               placeholder="请输入派奖比例"
               clearable
               size="small"
               @keyup.enter.native="handleQuery"
             />
           </el-form-item>
           <el-form-item label="奖金池最小生效废弃）" prop="minPrize">
             <el-input
               v-model="queryParams.minPrize"
               placeholder="请输入奖金池最小生效废弃）"
               clearable
               size="small"
               @keyup.enter.native="handleQuery"
             />
           </el-form-item>
           <el-form-item label="最小投注" prop="minBet">
             <el-input
               v-model="queryParams.minBet"
               placeholder="请输入最小投注"
               clearable
               size="small"
               @keyup.enter.native="handleQuery"
             />
           </el-form-item>
           <el-form-item label="预备派奖金额" prop="prePrize">
             <el-input
               v-model="queryParams.prePrize"
               placeholder="请输入预备派奖金额"
               clearable
               size="small"
               @keyup.enter.native="handleQuery"
             />
           </el-form-item>
           <el-form-item label="实际派奖金额" prop="actPrize">
             <el-input
               v-model="queryParams.actPrize"
               placeholder="请输入实际派奖金额"
               clearable
               size="small"
               @keyup.enter.native="handleQuery"
             />
           </el-form-item>
           <el-form-item label="wheel_type为0是抽奖转盘,1是皮肤转盘" prop="wheelType">
             <el-select v-model="queryParams.wheelType" placeholder="请选择wheel_type为0是抽奖转盘,1是皮肤转盘" clearable size="small">
               <el-option label="请选择字典生成" value="" />
             </el-select>
           </el-form-item>-->
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
          v-hasPermi="['lottery:wheelLottery:add']"
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
          v-hasPermi="['lottery:wheelLottery:edit']"
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
          v-hasPermi="['lottery:wheelLottery:remove']"
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
          v-hasPermi="['lottery:wheelLottery:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="wheelLotteryList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="彩票ID-日期" align="center" prop="id"/>
      <el-table-column label="彩票ID" align="center" prop="lotteryId"/>
      <el-table-column label="名称" align="center" prop="name"/>

      <!--      <el-table-column label="派奖比例" align="center" prop="pRate" />
            <el-table-column label="奖金池最小生效废弃）" align="center" prop="minPrize" />-->
      <el-table-column label="最小投注" align="center" prop="minBet"/>
      <el-table-column label="预备派奖金额" align="center" prop="prePrize"/>
      <el-table-column label="实际派奖金额" align="center" prop="actPrize"/>
      <el-table-column label="开始时间" align="center" prop="start" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.start, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center" prop="end" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.end, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <!--      <el-table-column label="转盘类型" align="center" prop="wheelType" :formatter="formatterType"/>-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['lottery:wheelLottery:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['lottery:wheelLottery:remove']"
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

    <!-- 添加或修改转盘彩票对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
<!--        <el-form-item label="彩票ID" prop="lotteryId">
          <el-input v-model="form.lotteryId" placeholder="请输入彩票ID"/>
        </el-form-item>-->
        <el-form-item label="彩票名称" prop="name">
            <el-select v-model="form.name" placeholder="请选择彩票名称" clearable size="small" :disabled="disAbleName" @change="changeId">
              <el-option
                v-for="dict in lotteryList "
                :value="{form: form,dict: dict}"
                :label="dict.name"
              />
            </el-select>
        </el-form-item>

        <!--        <el-form-item label="派奖比例" prop="pRate">
                  <el-input v-model="form.pRate" placeholder="请输入派奖比例" />
                </el-form-item>
                <el-form-item label="奖金池最小生效废弃）" prop="minPrize">
                  <el-input v-model="form.minPrize" placeholder="请输入奖金池最小生效废弃）" />
                </el-form-item>-->
        <el-form-item label="最小投注" prop="minBet">
          <el-input v-model="form.minBet" type="number" placeholder="请输入最小投注"/>
        </el-form-item>
        <el-form-item label="预备派奖金额" prop="prePrize">
          <el-input v-model="form.prePrize" type="number" placeholder="请输入预备派奖金额"/>
        </el-form-item>
        <!--        <el-form-item label="实际派奖金额" prop="actPrize">
                  <el-input v-model="form.actPrize" placeholder="请输入实际派奖金额" />
                </el-form-item>
                <el-form-item label="wheel_type为0是抽奖转盘,1是皮肤转盘" prop="wheelType">
                    <el-select v-model="form.wheelType" placeholder="请选择转盘类型" clearable size="small">
                      <el-option
                        v-for="dict in typeList "
                        :key="dict.dictValue"
                        :value="parseInt(dict.dictValue)"
                        :label="dict.dictLabel"
                      />
                    </el-select>
                </el-form-item>-->
        <el-form-item label="开始时间" prop="start">
          <el-date-picker clearable size="small"
                          v-model="form.start"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="end">
          <el-date-picker clearable size="small"
                          v-model="form.end"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择结束时间">
          </el-date-picker>
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
    listWheelLottery,
    getWheelLottery,
    delWheelLottery,
    addWheelLottery,
    updateWheelLottery,
    exportWheelLottery
  } from "@/api/platform-web/lottery/wheelLottery";
  import {listLotteryInfo,} from "@/api/platform-web/lottery/lotteryInfo";
  export default {
    name: "WheelLottery",
    components: {},
    data() {
      return {
        disAbleName: false,
        // 彩票列表
        lotteryList: [],
        // 类型列表
        typeList: [],
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
        // 转盘彩票表格数据
        wheelLotteryList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          lotteryId: null,
          name: null,
          start: null,
          end: null,
          pRate: null,
          minPrize: null,
          minBet: null,
          prePrize: null,
          actPrize: null,
          wheelType: null,
          orderByColumn: 'id',
          isAsc: 'desc'
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          lotteryId: [
            {required: true, message: "彩票ID不能为空", trigger: "blur"}
          ],
        }
      };
    },
    created() {
      this.getList();
      this.getDicts('sys_wheel_type').then(response => {
        this.typeList = response.data;
      });
      listLotteryInfo({
        pageNum: null,
        pageSize: null,
        name: null,
        type: null,
        status: 1,
        icon: null,
        official: null,
        killRate: null,
        minCost: null,
        cycle: null,
      }).then(response => {
        this.lotteryList = response.rows;
      });
    },
    methods: {
      changeId(row){
        var form = row.form;
        var dict = row.dict;
        form.name = dict.name;
        // form.id = dict.id;
        form.lotteryId = dict.id;
      },
      formatterType(row) {
        var msg;
        this.typeList.forEach((value, index, array) => {
          if (value.dictValue == row.wheelType) {
            msg = value.dictLabel
          }
        });
        return msg;
      },
      /** 查询转盘彩票列表 */
      getList() {
        this.loading = true;
        listWheelLottery(this.queryParams).then(response => {
          this.wheelLotteryList = response.rows;
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
          lotteryId: null,
          name: null,
          start: null,
          end: null,
          pRate: null,
          minPrize: null,
          minBet: null,
          prePrize: null,
          actPrize: null,
          wheelType: null
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
        this.disAbleName = false
        this.reset();
        this.open = true;
        this.title = "添加转盘彩票";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.disAbleName = true
        this.reset();
        const id = row.id || this.ids
        getWheelLottery(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改转盘彩票";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateWheelLottery(this.form).then(response => {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              this.form.id = this.form.lotteryId
              addWheelLottery(this.form).then(response => {
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
        this.$confirm('是否确认删除转盘彩票编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return delWheelLottery(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {
        })
      },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams;
        this.$confirm('是否确认导出所有转盘彩票数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return exportWheelLottery(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(() => {
        })
      }
    }
  };
</script>
