<template>
  <div class="app-container">

    <!--数据列表表 wheel pool data list table-->
    <el-table stripe v-loading="loading" :data="wheelPoolList" class="el-table--border">
      <el-table-column :label="$t('lottery.wheelPool.tableColumns.id')" align="center" prop="id"  min-width="120"/>
      <el-table-column :label="$t('global.name')" align="center" prop="name"  min-width="120"/>
      <el-table-column :label="$t('lottery.wheelPool.tableColumns.secMoney')" align="center" prop="secMoney"  min-width="120"/>
      <el-table-column :label="$t('lottery.wheelPool.tableColumns.limitMoney')" align="center" prop="limitMoney"  min-width="120"/>
      <el-table-column :label="$t('lottery.wheelPool.tableColumns.weight')" align="center" prop="weight"  min-width="120"/>
      <el-table-column :label="$t('global.operationColumn')" align="center" class-name="small-padding fixed-width" fixed="right" min-width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:wheelPool:edit']"
          >{{$t('global.editButton')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改轮池对话框 modify the wheel pool dialog box -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('global.name')" prop="name">
          <el-input v-model="form.name" :placeholder="$t('lottery.wheelPool.dialogForm.namePlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('lottery.wheelPool.dialogForm.secMoneyLabel')" prop="secMoney">
          <el-input v-model="form.secMoney" :placeholder="$t('lottery.wheelPool.dialogForm.secMoneyPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('lottery.wheelPool.dialogForm.limitMoneyLabel')" prop="limitMoney">
          <el-input v-model="form.limitMoney" :placeholder="$t('lottery.wheelPool.dialogForm.limitMoneyPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('lottery.wheelPool.dialogForm.weightLabel')" prop="weight">
          <el-input v-model="form.weight" :placeholder="$t('lottery.wheelPool.dialogForm.weightPlaceholder')" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{$t('global.submitButton')}}</el-button>
        <el-button @click="cancel">{{$t('global.cancelButton')}}</el-button>
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
        this.title = this.$t('lottery.wheelPool.updateTitle');
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateWheelPool(this.form).then(response => {
              this.msgSuccess(this.$t('lottery.wheelPool.updateSuccessMessage'));
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
