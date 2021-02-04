<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
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
          v-hasPermi="['game:type:add']"
        >新增
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :stripe="true" v-loading="loading" :data="typeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="名称" align="center" prop="name"/>
      <el-table-column label="图标" align="center" prop="icon">
        <template slot-scope="scope">
          <a :href="scope.row.icon" target="_blank">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.icon"
            >
            </el-image>
          </a>
        </template>
      </el-table-column>
      <el-table-column label="图标类型" align="center" prop="iconType" :formatter="iconTypeFormat"/>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            @change="handleStatusChangeisWH(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="排序号" align="center" prop="indexs"/>
      <el-table-column label="操作" fixed = "right" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            style="color: #FF5722"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['game:type:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            style="color: #FF5722"
            @click="handleDelete(scope.row)"
            v-hasPermi="['game:type:remove']"
          >删除
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-menu"
            style="color: #FF5722"
            @click="relation_Game(scope.row)"
            v-hasPermi="['game:type:edit']"
          >关联游戏
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

    <!-- 添加或修改游戏类型对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称"/>
        </el-form-item>
        <el-form-item label="排序号" prop="indexs">
          <el-input v-model="form.indexs" placeholder="请输入排序号"/>
        </el-form-item>
        <el-form-item label="图标">
          <imageUpload v-model="form.icon" path="gameType"/>
        </el-form-item>
        <el-form-item label="图标类型" prop="iconType">
          <el-select v-model="form.iconType" placeholder="请选择图标类型">
            <el-option
              v-for="dict in iconTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改游戏类型对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="relationGame" width="1000px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <template >
          <div style="text-align: center">
            <el-transfer
              style="text-align: left; display: inline-block"
              v-model="value"
              filterable
              :left-default-checked="[2, 3]"
              :right-default-checked="[1]"
              :titles="['未关联', '已关联']"
              :button-texts="['到左边', '到右边']"
              :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
              @change="handleChange"
              :data="data">
            </el-transfer>
          </div>

        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="relationGameList">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listType,
  getType,
  delType,
  addType,
  updateType,
  exportType,
  changeStatus,
  upddataGameTypeInfo,
  getRelationGame
} from "@/api/platform-web/game/type";
import ImageUpload from '@/components/ImageUpload';


export default {
  name: "Type",
  components: {
    ImageUpload
  },


  data() {
    const generateData = _ => {
      const data = [];
      const cities = [];
      const pinyin = [];
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index]
        });
      });
      return data;
    };
    return {
      data: generateData(),
      value: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      },
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
      // 游戏类型表格数据
      typeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
       relationGame: false,
      id: null,
      // 状态字典
      statusOptions: [],
      // 图标类型字典
      iconTypeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    };
  },

  created() {
    this.getList();
    this.getDicts("game_type_status").then(response => {
      this.statusOptions = response.data;
    });
    this.getDicts("game_icon_type").then(response => {
      this.iconTypeOptions = response.data;
    });
  },
  methods: {
    /** 查询游戏类型列表 */
    getList() {
      this.loading = true;
      listType(this.queryParams).then(response => {
        this.typeList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },
    // 状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 图标类型字典翻译
    iconTypeFormat(row, column) {
      return this.selectDictLabel(this.iconTypeOptions, row.iconType);
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
        status: 0,
        indexs: null,
        icon: null,
        gameType: null,
        iconType: null
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
      this.title = "添加游戏类型";
    },
    /** 关联游戏按钮 */
    relation_Game(row) {

      var that = this;
      const id = row.id || this.ids
      this.relationGame = true;
      this.title = "关联游戏类型";
      getRelationGame(id).then(response => {
        console.log(response.data)
        that.data = [];
        that.value = [];
        response.data.all_games.forEach(item => {
          var item2 = {}
          item2.label = item.name;
          item2.key = item.id;
          that.data.push(item2)
        })
        that.value =response.data.type_games;
        this.title = "关联游戏类型";
        this.relationGame = true;
      })
      this.id=row.id
    },
    relationGameList() {
      var typeId = this.id;
      var type_games = this.value;
      upddataGameTypeInfo(typeId,type_games).then(response => {
        this.relationGame = false;
        this.msgSuccess("修改成功");
        this.getList();
      })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getType(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改游戏类型";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateType(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addType(this.form).then(response => {
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
      this.$confirm('是否确认删除游戏类型编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delType(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(() => {
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有游戏类型数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return exportType(queryParams);
      }).then(response => {
        this.download(response.msg);
      }).catch(() => {
      });
    },
    // 维护状态修改
    handleStatusChangeisWH(row) {
      let text = row.status === "1" ? '启用' : '停用'
      this.$confirm('确认要更改"' + text + '""' + row.name + '"吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return changeStatus(row.id, row.status)
      }).then(() => {
        this.msgSuccess(text + '成功')
      }).catch(function () {
        row.status = row.status === '0' ? '1' : '0'
      })
    }
  }
};
</script>
