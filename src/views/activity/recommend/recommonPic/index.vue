<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="recommonPicList">
      <el-table-column :label="$t('activity.recommend.recommonPic.tableDialog.envTitle')" align="center" prop="envTitle"/>
      <el-table-column :label="$t('activity.recommend.recommonPic.tableDialog.envCode')" align="center" prop="envCode"/>
      <el-table-column :label="$t('activity.recommend.recommonPic.tableDialog.envValue')" align="center" prop="envValue">
      <template slot-scope="scope">
        <el-image
          style="height:80px"
          :src="scope.row.envValue"
          fit="contain"
        >
        </el-image>
      </template>
      </el-table-column>
<!--      <el-table-column :label="参数说明" align="center" prop="envDes"/>-->
      <el-table-column :label="$t('activity.recommend.recommonPic.tableDialog.envGroup')" align="center" prop="envGroup"/>
      <el-table-column :label="$t('activity.recommend.recommonPic.tableDialog.envSort')" align="center" prop="envSort"/>
      <el-table-column :label="$t('global.operationColumn')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:recommonPic:edit']"
          >{{ $t('global.editButton') }}
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

    <!-- 修改推广图对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('activity.recommend.recommonPic.tableDialog.envTitle')" prop="envTitle">
          <el-input v-model="form.envTitle"/>
        </el-form-item>
        <el-form-item :label="$t('activity.recommend.recommonPic.tableDialog.envCode')" prop="envCode">
          <el-input v-model="form.envCode" readonly/>
        </el-form-item>
        <el-form-item :label="$t('activity.recommend.recommonPic.tableDialog.envValue')" prop="envValue">
          <imageUpload v-model="form.envValue" path="bannerInfo"/>
        </el-form-item>
<!--        <el-form-item :label="参数说明" prop="envDes">-->
<!--          <el-input v-model="form.envDes"/>-->
<!--        </el-form-item>-->
        <el-form-item :label="$t('activity.recommend.recommonPic.tableDialog.envGroup')" prop="envGroup">
          <el-input v-model="form.envGroup"/>
        </el-form-item>
        <el-form-item :label="$t('activity.recommend.recommonPic.tableDialog.envSort')" prop="envSort">
          <el-input v-model="form.envSort"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{ $t('global.submitButton') }}</el-button>
        <el-button @click="cancel">{{ $t('global.cancelButton') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listRecommonPic,
  getRecommonPic,
  updateRecommonPic
} from "@/api/activity/recommonPic";
import ImageUpload from "@/components/ImageUpload";

export default {
  name: "recommonPic",
  components: {ImageUpload},
  data() {
    return {
      // 遮罩层
      loading: true,
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 推广图表格数据
      recommonPicList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询推广图列表 */
    getList() {
      this.loading = true;
      listRecommonPic(this.queryParams).then(response => {
        this.recommonPicList = response.rows;
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
        envTitle: null,
        envCode: null,
        envValue: null,
        envDes: null,
        envGroup: null,
        envSort: null,
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
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const envCode = row.envCode
      getRecommonPic(envCode).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = this.$t('activity.recommend.recommonPic.editTitle');
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          updateRecommonPic(this.form).then(response => {
            this.msgSuccess(this.$t('global.editSuccessMsg'));
            this.open = false;
            this.getList();
          });
        }
      });
    },
  }
};
</script>
