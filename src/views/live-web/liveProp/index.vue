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
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:liveProp:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="livePropList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="道具名" align="center" prop="name" />
      <el-table-column label="积分" align="center" prop="score" />
      <el-table-column label="消费钻石" align="center" prop="diamonds" />
      <el-table-column label="图标" align="center" prop="icon" />
      <el-table-column label="红包" align="center" prop="ticket" />
      <el-table-column label="1:可以连续发送多个;用于小金额礼物" align="center" prop="isMuch" />
      <el-table-column label="排序，从大到小;越大越靠前" align="center" prop="sort" />
      <el-table-column label="1:红包" align="center" prop="isRedEnvelope" />
      <el-table-column label="0:普通礼物 1:gif礼物 2:大型动画礼物" align="center" prop="isAnimated" />
      <el-table-column label="0:禁用;1:启用;默认启用" align="center" prop="isEffect" />
      <el-table-column label="大型道具类型" />
      <el-table-column label="机器人红包" align="center" prop="robotDiamonds" />
      <el-table-column label="PC端图标" align="center" prop="pcIcon" />
      <el-table-column label="PC端动态图标" align="center" prop="pcGif" />
      <el-table-column label="礼物风格" align="center" prop="gifGiftShowStyle" />
      <el-table-column label="svga动画路径" align="center" prop="animatedUrl" />
      <el-table-column label="0:礼物；1:打赏" align="center" prop="type" />
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
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="ID" prop="id">
          <el-input v-model="form.id" placeholder="请输入ID" />
        </el-form-item>
        <el-form-item label="道具名" prop="name">
          <el-input v-model="form.name" placeholder="请输入道具名" />
        </el-form-item>
        <el-form-item label="积分" prop="score">
          <el-input v-model="form.score" placeholder="请输入积分" />
        </el-form-item>
        <el-form-item label="消费钻石" prop="diamonds">
          <el-input v-model="form.diamonds" placeholder="请输入消费钻石" />
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="form.icon" placeholder="请输入图标" />
        </el-form-item>
        <el-form-item label="红包" prop="ticket">
          <el-input v-model="form.ticket" placeholder="机器人红包" />
        </el-form-item>
        <el-form-item label="连续" prop="isMuch">
          <el-input v-model="form.isMuch" placeholder="请输入1:可以连续发送多个;用于小金额礼物" />
        </el-form-item>
        <el-form-item label="排序，从大到小;越大越靠前" prop="sort">
          <el-input v-model="form.sort" placeholder="请输入排序，从大到小;越大越靠前" />
        </el-form-item>
        <el-form-item label="1:红包" prop="isRedEnvelope">
          <el-input v-model="form.isRedEnvelope" placeholder="请输入1:红包" />
        </el-form-item>
        <el-form-item label="0:普通礼物 1:gif礼物 2:大型动画礼物" prop="isAnimated">
          <el-input v-model="form.isAnimated" placeholder="请输入0:普通礼物 1:gif礼物 2:大型动画礼物" />
        </el-form-item>
        <el-form-item label="0:禁用;1:启用;默认启用" prop="isEffect">
          <el-input v-model="form.isEffect" placeholder="请输入0:禁用;1:启用;默认启用" />
        </el-form-item>
        <el-form-item label="大型道具类型">
          <el-select v-model="form.animType" placeholder="请选择大型道具类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="is_red_envelope=1时有效;分红包时,自动分配一些的机器人；剩下的给观众抢；观众可抢钻石=diamonds-ticket-robot_diamods; 如果当直播结束时,钻石未包抢光时,剩余钻石也自动分配给机器人" prop="robotDiamonds">
          <el-input v-model="form.robotDiamonds" placeholder="请输入is_red_envelope=1时有效;分红包时,自动分配一些的机器人；剩下的给观众抢；观众可抢钻石=diamonds-ticket-robot_diamods; 如果当直播结束时,钻石未包抢光时,剩余钻石也自动分配给机器人" />
        </el-form-item>
        <el-form-item label="PC端图标" prop="pcIcon">
          <el-input v-model="form.pcIcon" placeholder="请输入PC端图标" />
        </el-form-item>
        <el-form-item label="PC端动态图标" prop="pcGif">
          <el-input v-model="form.pcGif" placeholder="请输入PC端动态图标" />
        </el-form-item>
        <el-form-item label="GIF礼物模式 0:按像素显示模式 1:全屏显示模式 2:至少两条边贴边模式" prop="gifGiftShowStyle">
          <el-input v-model="form.gifGiftShowStyle" placeholder="请输入GIF礼物模式 0:按像素显示模式 1:全屏显示模式 2:至少两条边贴边模式" />
        </el-form-item>
        <el-form-item label="svga动画路径" prop="animatedUrl">
          <el-input v-model="form.animatedUrl" placeholder="请输入svga动画路径" />
        </el-form-item>
        <el-form-item label="0:礼物；1:打赏" prop="type">
          <el-select v-model="form.type" placeholder="请选择0:礼物；1:打赏">
            <el-option label="请选择字典生成" value="" />
          </el-select>
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

export default {
  name: "LiveProp",
  components: {
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
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        id: [
          { required: true, message: "ID不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "道具名不能为空", trigger: "blur" }
        ],
        score: [
          { required: true, message: "积分不能为空", trigger: "blur" }
        ],
        diamonds: [
          { required: true, message: "消费钻石不能为空", trigger: "blur" }
        ],
        icon: [
          { required: true, message: "图标不能为空", trigger: "blur" }
        ],
        ticket: [
          { required: true, message: "印票或钻石", trigger: "blur" }
        ],
        isMuch: [
          { required: true, message: "1:可以连续发送多个;用于小金额礼物不能为空", trigger: "blur" }
        ],
        sort: [
          { required: true, message: "排序，从大到小;越大越靠前不能为空", trigger: "blur" }
        ],
        isRedEnvelope: [
          { required: true, message: "1:红包不能为空", trigger: "blur" }
        ],
        isAnimated: [
          { required: true, message: "0:普通礼物 1:gif礼物 2:大型动画礼物不能为空", trigger: "blur" }
        ],
        isEffect: [
          { required: true, message: "0:禁用;1:启用;默认启用不能为空", trigger: "blur" }
        ],
        animType: [
          { required: true, message: "大型道具类型", trigger: "change" }
        ],
        robotDiamonds: [
          { required: true, message: "is_red_envelope=1时有效;分红包时,自动分配一些的机器人；剩下的给观众抢；观众可抢钻石=diamonds-ticket-robot_diamods; 如果当直播结束时,钻石未包抢光时,剩余钻石也自动分配给机器人不能为空", trigger: "blur" }
        ],
        pcIcon: [
          { required: true, message: "PC端图标不能为空", trigger: "blur" }
        ],
        pcGif: [
          { required: true, message: "PC端动态图标不能为空", trigger: "blur" }
        ],
        gifGiftShowStyle: [
          { required: true, message: "GIF礼物模式 0:按像素显示模式 1:全屏显示模式 2:至少两条边贴边模式不能为空", trigger: "blur" }
        ],
        type: [
          { required: true, message: "0:礼物；1:打赏不能为空", trigger: "change" }
        ]
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
