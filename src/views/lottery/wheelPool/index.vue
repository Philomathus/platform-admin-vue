<template>
  <div class="app-container">

    <!--数据列表表 wheel pool data list table-->
    <el-table stripe v-loading="loading" :data="wheelPoolList" class="el-table--border">
      <el-table-column label="主键" align="center" prop="id"  min-width="120"/>
      <el-table-column label="名称" align="center" prop="name"  min-width="120"/>
      <el-table-column label="每秒增加奖池金额" align="center" prop="secMoney"  min-width="120"/>
      <el-table-column label="上限金额" align="center" prop="limitMoney"  min-width="120"/>
      <el-table-column label="中奖比例" align="center" prop="weight"  min-width="120"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" min-width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:wheelPool:edit']"
          >修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改轮池对话框 modify the wheel pool dialog box -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="每秒金额" prop="secMoney">
          <el-input v-model="form.secMoney" placeholder="请输入每秒增加奖池金额" />
        </el-form-item>
        <el-form-item label="上限金额" prop="limitMoney">
          <el-input v-model="form.limitMoney" placeholder="请输入上限金额" />
        </el-form-item>
        <el-form-item label="中奖比例" prop="weight">
          <el-input v-model="form.weight" placeholder="请输入中奖比例" />
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
import { listWheelPool, getWheelPool, updateWheelPool} from "@/api/platform-web/lottery/wheelPool";

export default {
  name: "WheelPool",
  components: {
  },
  data() {
    return {
      // 遮罩层 - loading layer
      loading: true,

      // 显示搜索条件 -show search
      showSearch: true,

      //轮池列表 wheel pool list
      wheelPoolList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层 Whether to show the popup layer
      open: false,
      // 查询参数
      queryParams: {
        name: null,
        secMoney: null,
        limitMoney: null,
        weight: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 获取轮池的所有列表 get all list of wheel pool*/
    getList() {
      this.loading = true;
      listWheelPool(this.queryParams).then(response => {
        this.wheelPoolList = response.rows;
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
        name: null,
        secMoney: null,
        limitMoney: null,
        weight: null
      };
      this.resetForm("form");
    },

    /** 更新轮池查询 update wheel pool query */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getWheelPool(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改 wheelPool";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateWheelPool(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },

  }
};
</script>
