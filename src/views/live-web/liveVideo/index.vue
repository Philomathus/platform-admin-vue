<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="直播标题" prop="hostName">
        <el-input
          v-model="queryParams.hostName"
          placeholder="请输入主播昵称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="直播线路">
        <el-select v-model="queryParams.paiId" placeholder="请选择">
          <el-option
            v-for="dict in serverOptions"
            :key="dict.id"
            :label="dict.name"
            :value="dict.id"
          ></el-option>
        </el-select>
      </el-form-item>

<!--      <el-form-item label="房间类型">-->
<!--        <el-checkbox-group v-model="form.roomType">-->
<!--          <el-checkbox>dddd</el-checkbox>-->
<!--          <el-checkbox>dddd</el-checkbox>-->
<!--        </el-checkbox-group>-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="liveVideoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="主播id" align="center" prop="id"/>
      <el-table-column label="主播昵称" align="center" prop="hostName"/>
      <el-table-column label="图标" align="center" prop="liveImage">
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="scope.row.liveImage"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="直播类型" align="center" prop="roomType" :formatter="typeFormat"/>
      <el-table-column label="热度" align="center" prop="voteNumber"/>
      <el-table-column label="在线人数" align="center" prop="watchNumber"/>
      <el-table-column label="推荐" align="center" prop="isRecommend" :formatter="isRecommendFormat"/>
      <el-table-column label="固定位置" align="center" prop="sort"/>
      <el-table-column label="线路名称" align="center" prop="name"/>
      <el-table-column label="直播状态" align="center" prop="liveStatus" :formatter="statusFormat"/>
      <el-table-column label="彩种" align="center" prop="lotteryName"/>
      <el-table-column label="收费" align="center" prop="isLivePay" :formatter="isLivePayFormat"/>
      <el-table-column label="开始时间" align="center" prop="beginTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.beginTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
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

  </div>
</template>

<script>
import {
  listLiveVideo,
  getLiveVideo,
  delLiveVideo,
  addLiveVideo,
  updateLiveVideo,
  exportLiveVideo
} from "@/api/live-web/liveVideo/liveVideo";
import ImageUpload from '@/components/ImageUpload';
import request from "@/utils/request";
import {url} from "@/utils/url";

export default {
  name: "LiveVideo",
  components: {
    ImageUpload,
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
      // 直播表格数据
      liveVideoList: [],
      serverOptions:[],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        hostName: null,
        paiId:null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    };
  },
  created() {
    this.getList();
    debugger;
    this.getServerLine().then(response => {
      this.serverOptions = response.rows
    })
  },
  methods: {
    /** 查询直播列表 */
    getList() {
      this.loading = true;
      listLiveVideo(this.queryParams).then(response => {
        this.liveVideoList = response.rows;
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
        hostName: null,
        paiId:null
      };
      this.queryParams={
        hostName: null,
        paiId:null
      }
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.reset();
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
      this.title = "添加直播";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLiveVideo(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改直播";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLiveVideo(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLiveVideo(this.form).then(response => {
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
      this.$confirm('是否确认删除直播编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delLiveVideo(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      })
    },
    statusFormat(row) {
      if (row.liveStatus == "1") {
        return "播放源正常";
      }else if (row.liveStatus == "0") {
        return "播放源异常";
      }else{
        return "检测中";
      }
    },
    isRecommendFormat(row) {
      if (row.isRecommend == "1") {
        return "是";
      }else{
        return "否";
      }
    },
    isLivePayFormat(row) {
      if (row.isLivePay == "1") {
        return "是";
      }else{
        return "否";
      }
    },
    typeFormat(row) {
      if (row.roomType == "2") {
        return "性感主播";
      }else if (row.roomType == "3") {
        return "大秀直播";
      }else if (row.roomType == "4") {
        return "收费直播";
      }else{
        return "彩票直播";
      }
    },
    getServerLine(){
     return  request({
        url: url.platformWeb + '/server/live/getAlllist',
        method: 'get'
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有直播数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return exportLiveVideo(queryParams);
      }).then(response => {
        this.download(response.msg);
      })
    }
  }
};
</script>
