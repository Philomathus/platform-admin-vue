<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="直播标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入直播标题"
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

    <el-table v-loading="loading" :data="liveVideoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="主播id" align="center" prop="id"/>
      <el-table-column label="主播昵称" align="center" prop="hostName"/>
      <el-table-column label="房间类型" align="center" prop="roomType"/>
      <el-table-column label="热度" align="center" prop="voteNumber"/>
      <el-table-column label="推荐" align="center" prop="isRecommend"/>
      <el-table-column label="固定位置" align="center" prop="sort"/>
      <el-table-column label="当前实时观看人数" align="center" prop="watchNumber"/>
      <el-table-column label="开始时间" align="center" prop="beginTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.beginTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最大观看人数" align="center" prop="maxWatchNumber"/>
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
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: null,
        userId: null,
        liveIn: null,
        watchNumber: null,
        virtualWatchNumber: null,
        voteNumber: null,
        cateId: null,
        province: null,
        city: null,
        beginTime: null,
        endTime: null,
        endDate: null,
        groupId: null,
        destroyGroupStatus: null,
        longPollingKey: null,
        maxWatchNumber: null,
        roomType: null,
        isPlayback: null,
        videoVid: null,
        monitorTime: null,
        isDelete: null,
        robotNum: null,
        robotTime: null,
        channelid: null,
        isAborted: null,
        isDelVod: null,
        onlineStatus: null,
        tipoffCount: null,
        privateKey: null,
        shareType: null,
        sort: null,
        paiId: null,
        sex: null,
        videoType: null,
        sortNum: null,
        createType: null,
        maxRobotNum: null,
        shareCount: null,
        likeCount: null,
        fansCount: null,
        sortInit: null,
        pushRtmp: null,
        playFlv: null,
        playRtmp: null,
        playMp4: null,
        playHls: null,
        xpoint: null,
        ypoint: null,
        headImage: null,
        thumbHeadImage: null,
        playUrl: null,
        isRecommend: null,
        liveImage: null,
        virtualNumber: null,
        livePayTime: null,
        isLivePay: null,
        liveFee: null,
        liveIsMention: null,
        livePayType: null,
        livePayCount: null,
        propTable: null,
        roomTitle: null,
        payRoomId: null,
        lenTime: null,
        isConcatvideo: null,
        stick: null,
        classifiedId: null,
        gameLogId: null,
        bankerStatus: null,
        bankerId: null,
        autoStart: null,
        autoGameId: null,
        lotteryId: null,
        newPlayFlv: null,
        nPlayFlv: null,
        hostName: null,
        lotteryName: null
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
        id: null,
        title: null,
        userId: null,
        liveIn: null,
        watchNumber: null,
        virtualWatchNumber: null,
        voteNumber: null,
        cateId: null,
        province: null,
        city: null,
        createTime: null,
        beginTime: null,
        endTime: null,
        endDate: null,
        groupId: null,
        destroyGroupStatus: 0,
        longPollingKey: null,
        maxWatchNumber: null,
        roomType: null,
        isPlayback: null,
        videoVid: null,
        monitorTime: null,
        isDelete: null,
        robotNum: null,
        robotTime: null,
        channelid: null,
        isAborted: null,
        isDelVod: null,
        onlineStatus: 0,
        tipoffCount: null,
        privateKey: null,
        shareType: null,
        sort: null,
        paiId: null,
        sex: null,
        videoType: null,
        sortNum: null,
        createType: null,
        maxRobotNum: null,
        shareCount: null,
        likeCount: null,
        fansCount: null,
        sortInit: null,
        pushRtmp: null,
        playFlv: null,
        playRtmp: null,
        playMp4: null,
        playHls: null,
        xpoint: null,
        ypoint: null,
        headImage: null,
        thumbHeadImage: null,
        playUrl: null,
        isRecommend: null,
        liveImage: null,
        virtualNumber: null,
        livePayTime: null,
        isLivePay: null,
        liveFee: null,
        liveIsMention: null,
        livePayType: null,
        livePayCount: null,
        propTable: null,
        roomTitle: null,
        payRoomId: null,
        lenTime: null,
        isConcatvideo: null,
        stick: null,
        classifiedId: null,
        gameLogId: null,
        bankerStatus: 0,
        bankerId: null,
        autoStart: null,
        autoGameId: null,
        lotteryId: null,
        newPlayFlv: null,
        nPlayFlv: null,
        hostName: null,
        lotteryName: null
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
