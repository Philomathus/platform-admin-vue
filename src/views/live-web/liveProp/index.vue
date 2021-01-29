<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="道具名" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入道具名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['admin:liveProp:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['admin:liveProp:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['admin:liveProp:remove']"
        >删除</el-button>
      </el-col>
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="warning"-->
<!--          plain-->
<!--          icon="el-icon-download"-->
<!--          size="mini"-->
<!--          @click="handleExport"-->
<!--          v-hasPermi="['admin:liveProp:export']"-->
<!--        >导出</el-button>-->
<!--      </el-col>-->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="livePropList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="消费钻石" align="center" prop="diamonds" />
      <el-table-column label="RMB/钻石" align="center" prop="ticket" />
      <el-table-column label="是否连送" align="center" prop="isMuch" :formatter="isMuchFormat"/>
      <el-table-column label="类型" align="center" prop="type" :formatter="typeFormat"/>
      <el-table-column label="展示动画" align="center" prop="isAnimated" :formatter="animatedFormat"/>
      <el-table-column label="状态" align="center" key="isEffect" v-if="columns[0].visible">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isEffect"
            active-value="1"
            inactive-value="0"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:liveProp:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:liveProp:remove']"
          >删除</el-button>
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

    <!-- 添加或修改礼物列对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入道具名" />
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <imageUpload v-model="form.icon" path="give"/>
        </el-form-item>
        <el-form-item label="消费钻石" prop="diamonds">
          <el-input v-model="form.diamonds" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="主播获得热度:" prop="ticket">
          <el-input v-model="form.ticket" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="连续">
          <el-radio-group v-model="form.isMuch">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="展示动画" prop="isAnimated">
          <el-input v-model="form.isAnimated" placeholder="请选择" />
        </el-form-item>
        <el-form-item label="展示动画">
          <el-radio-group v-model="form.isAnimated">
            <el-radio label="0">普通礼物</el-radio>
            <el-radio label="1">gif礼物</el-radio>
            <el-radio label="2">大型动画礼物</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="大型道具类型">
          <el-input v-model="form.animType" placeholder="请输入大型道具类型" />
        </el-form-item>
        <el-form-item label="svga动画" prop="animatedUrl">
          <imageUpload v-model="form.animatedUrl" path="give"/>
        </el-form-item>

        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" placeholder="请输入排序" />
        </el-form-item>

        <el-form-item label="类型">
          <el-radio-group v-model="form.type">
            <el-radio label="0">礼物</el-radio>
            <el-radio label="1">打赏</el-radio>
            <el-radio label="2">守护</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.isEffect">
            <el-radio label="1">有效</el-radio>
            <el-radio label="0">无效</el-radio>
          </el-radio-group>
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
import { listLiveProp, getLiveProp, delLiveProp, addLiveProp, updateLiveProp, exportLiveProp } from "@/api/live-web/liveProp/liveProp";
import ImageUpload from '@/components/ImageUpload';
import Editor from "@/components/Editor";
export default {
  name: "LiveProp",
  components: {
    ImageUpload,
    Editor
  },
  data() {
    return {
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
      // 礼物列表格数据
      livePropList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        score: null,
        diamonds: null,
        icon: null,
        ticket: null,
        isMuch: null,
        sort: null,
        isRedEnvelope: null,
        isAnimated: null,
        isEffect: null,
        animType: null,
        robotDiamonds: null,
        pcIcon: null,
        pcGif: null,
        gifGiftShowStyle: null,
        animatedUrl: null,
        type: null
      },
      // 列信息
      columns: [
        {key: 0, label: `状态`, visible: true}
      ],
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
    /** 查询礼物列列表 */
    getList() {
      this.loading = true;
      listLiveProp(this.queryParams).then(response => {
        this.livePropList = response.rows;
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
        name: null,
        score: null,
        diamonds: null,
        icon: null,
        ticket: null,
        isMuch: null,
        sort: null,
        isRedEnvelope: null,
        isAnimated: null,
        isEffect: null,
        animType: null,
        robotDiamonds: null,
        pcIcon: null,
        pcGif: null,
        gifGiftShowStyle: null,
        animatedUrl: null,
        type: null
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
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加礼物列";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLiveProp(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改礼物列";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLiveProp(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLiveProp(this.form).then(response => {
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
      this.$confirm('是否确认删除礼物列编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delLiveProp(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    isMuchFormat(row, column) {
      if (row.isMuch == "1") {
        return "是";
      }else{
        return "否";
      }
    },
    typeFormat(row, column) {
      if (row.type == "0") {
        return "礼物";
      }else if (row.type == "1") {
        return "打赏";
      }else{
        return "守护";
      }
    },
    animatedFormat(row, column) {
      if (row.isAnimated == "0") {
        return "普通礼物";
      }else if (row.isAnimated == "1") {
        return "gif礼物";
      }else{
        return "大型动画礼物";
      }
    },
    // 状态修改
    handleStatusChange(row) {
      let text = row.isEffect === '0' ? '停用' : '启用'
      this.$confirm('确认要' + text + '"' + row.name + '"吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        var data={};
        data.id=row.id;
        data.isEffect=row.isEffect;
        return updateLiveProp(data)
      }).then(() => {
        this.msgSuccess(text + '成功')
      }).catch(function () {
        row.isEffect = row.isEffect === '0' ? '1' : '0'
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有礼物列数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportLiveProp(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
