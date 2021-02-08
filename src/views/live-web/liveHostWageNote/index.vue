<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="日期范围" prop="selectDate">
        <el-date-picker type="daterange" v-model="queryParams.selectDate" format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd" start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        range-separator="至" clearable></el-date-picker>
      </el-form-item>
      <el-form-item label="散户结算率" prop="settlementRate" label-width="100px">
        <el-input
          v-model="queryParams.settlementRate"
          placeholder="请输入散户结算率"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="家族ID" prop="familyId">
        <el-input
          v-model="queryParams.familyId"
          placeholder="请输入家族ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="家族名称" prop="familyName">
        <el-input
          v-model="queryParams.familyName"
          placeholder="请输入家族名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="族长昵称" prop="familyNickName">
        <el-input
          v-model="queryParams.familyNickName"
          placeholder="请输入族长昵称"
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
<!--      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['admin:liveHostWageNote:add']"
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
          v-hasPermi="['admin:liveHostWageNote:edit']"
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
          v-hasPermi="['admin:liveHostWageNote:remove']"
        >删除</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="exportExcel"
          v-hasPermi="['admin:liveHostWageNote:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table id="out-table" stripe v-loading="loading" :data="liveHostWageNoteList" @selection-change="handleSelectionChange"
    >
<!--      <el-table-column type="selection" width="55" align="center" />-->
<!--      <el-table-column label="家族长ID" align="center" prop="id" />-->
      <el-table-column label="家族ID/主播ID" align="center" prop="familyId" >
        <template v-slot="{row}">
          <a style="color: #00afff" @click="familyShow(row.familyId)">{{ row.familyId }}</a>
        </template>
      </el-table-column>
      <el-table-column label="家族名称" align="center" prop="familyName" />
      <el-table-column label="组长昵称/主播昵称" align="center" prop="familyNickName" />
<!--      <el-table-column label="主播ID" align="center" prop="hostId" />-->
      <el-table-column label="直播总时长(小时)" align="center" prop="alltimeDes" />
      <el-table-column label="直播礼物总结算" align="center" prop="allticket" />
      <el-table-column label="直播礼物折扣结算" align="center" prop="allticketRes" />
      <el-table-column label="结算率" align="center" prop="settlementRate" />
      <el-table-column label="统计日期" align="center" prop="timedata" />
<!--      <el-table-column label="直播开始时间" align="center" prop="startTime" />
      <el-table-column label="直播结束时间" align="center" prop="endTime" />
      <el-table-column label="主播直播结算印票" align="center" prop="ticket" />
      <el-table-column label="历史印票总数" align="center" prop="beforeTotalTicket" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="彩票投注" align="center" prop="cpCost" />
      <el-table-column label="彩票派奖" align="center" prop="cpPrize" />-->
      <!--<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:liveHostWageNote:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:liveHostWageNote:remove']"
          >删除</el-button>
        </template>
      </el-table-column>-->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <more ref="more" @liveHostWageNoteMore="handleQuery"></more>
  </div>
</template>

<script>
import { listLiveHostWageNote,listFamilyPage,getPage, getLiveHostWageNote, delLiveHostWageNote, addLiveHostWageNote, updateLiveHostWageNote, exportLiveHostWageNote } from "@/api/live-web/liveHostWageNote";
import more from './more'
// 引入导出Excel表格依赖
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
export default {
  name: "LiveHostWageNote",
  components: {
    more: more
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
      // 主播时长表格数据
      liveHostWageNoteList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        selectDate: null,
        familyName: null,
        familyNickName: null,
        settlementRate: 0.7,
        pageNum: 1,
        pageSize: 10,
        familyId: null,
        orderByColumn: 'lhwn.family_id',
        isAsc: 'asc',
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
    familyShow(familyId) {
      console.log(familyId)
      this.$refs.more.show(familyId)
    },
    // 定义导出Excel表格事件
    exportExcel () {
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'));
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      });
      try {
        FileSaver.saveAs(
          // Blob 对象表示一个不可变、原始数据的类文件对象。
          // Blob 表示的不一定是JavaScript原生格式的数据。
          // File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          // 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: 'application/octet-stream' }),
          // 设置导出文件名称
          '直播时长.xlsx'
        );
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout);
      }
      return wbout;
    },
    load(tree, treeNode, resolve) {
      console.log(tree)
      getPage({familyId: tree.familyId}).then((res) => {
        // resolve(res.rows)
        var arr = []
        res.rows.forEach((value, index, array) => {
          var item = {"familyId": value.familyId || 0,
            "alltime": value.alltime || 0,
            "alltimeDes": value.alltimeDes || 0,
            "allticket": value.allticket || 0,
            "shijian": value.shijian || 0,
            "allCpCost": value.allCpCost || 0,
            "allPrize": value.allPrize || 0,
            "timedata": value.timedata || 0,
            "familyName": value.familyName || 0,
            "familyNickName": value.familyNickName || 0,
            "nickName": value.nickName || 0,
            "allticketRes": value.allticketRes || 0,
            "settlementRate": value.settlementRate || 0};
          arr.push(item)
        });
            })
    },
    /** 查询主播时长列表 */
    getList() {
      this.loading = true;
      listFamilyPage(this.queryParams).then(response => {
        this.liveHostWageNoteList = response.rows;
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
        familyId: null,
        hostId: null,
        startTime: null,
        endTime: null,
        liveTimeSec: null,
        ticket: null,
        beforeTotalTicket: null,
        createTime: null,
        remark: null,
        cpCost: null,
        cpPrize: null
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
      this.title = "添加主播时长";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLiveHostWageNote(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改主播时长";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLiveHostWageNote(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLiveHostWageNote(this.form).then(response => {
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
      this.$confirm('是否确认删除主播时长编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delLiveHostWageNote(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(() => {
	  })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有主播时长数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return exportLiveHostWageNote(queryParams);
      }).then(response => {
        this.download(response.msg);
      }).catch(() => {
      })
    }
  }
};
</script>
