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

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['admin:liveVideo:add']"
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
          v-hasPermi="['admin:liveVideo:edit']"
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
          v-hasPermi="['admin:liveVideo:remove']"
        >删除
        </el-button>
      </el-col>
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="warning"-->
<!--          plain-->
<!--          icon="el-icon-download"-->
<!--          size="mini"-->
<!--          @click="handleExport"-->
<!--          v-hasPermi="['admin:liveVideo:export']"-->
<!--        >导出-->
<!--        </el-button>-->
<!--      </el-col>-->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="liveVideoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="主播id" align="center" prop="id"/>
      <el-table-column label="直播标题" align="center" prop="title"/>
      <el-table-column label="主播昵称" align="center" prop="hostName"/>
<!--      <el-table-column label="项目id" align="center" prop="userId"/>-->
      <el-table-column label="房间类型" align="center" prop="roomType"/>
<!--      <el-table-column label="是否直播中" align="center" prop="liveIn"/>-->
      <el-table-column label="当前实时观看人数" align="center" prop="watchNumber"/>
<!--      <el-table-column label="当前虚拟观看人数" align="center" prop="virtualWatchNumber"/>-->
      <el-table-column label="获得票数" align="center" prop="voteNumber"/>
      <el-table-column label="主题id" align="center" prop="cateId"/>
<!--      <el-table-column label="省份" align="center" prop="province"/>-->
<!--      <el-table-column label="城市" align="center" prop="city"/>-->
      <el-table-column label="开始时间" align="center" prop="beginTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.beginTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="结束时间" align="center" prop="endTime" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d}') }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="结束日期" align="center" prop="endDate" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.endDate, '{y}-{m}-{d}') }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="群组ID" align="center" prop="groupId"/>-->
      <el-table-column label="最大观看人数" align="center" prop="maxWatchNumber"/>
<!--      <el-table-column label="房间类型群" align="center" prop="roomType"/>-->
<!--      <el-table-column label="视频地址" align="center" prop="videoVid"/>-->
<!--      <el-table-column label="心跳" align="center" prop="monitorTime" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.monitorTime, '{y}-{m}-{d}') }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:liveVideo:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:liveVideo:remove']"
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

    <!-- 添加或修改直播对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="直播标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入直播标题"/>
        </el-form-item>
        <el-form-item label="项目id" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入项目id"/>
        </el-form-item>
        <el-form-item label="是否直播中 1-直播中 0-已停止;2:正在创建直播;3:历史数据" prop="liveIn">
          <el-input v-model="form.liveIn" placeholder="请输入是否直播中 1-直播中 0-已停止;2:正在创建直播;3:历史数据"/>
        </el-form-item>
        <el-form-item label="当前实时观看人数" prop="watchNumber">
          <el-input v-model="form.watchNumber" placeholder="请输入当前实时观看人数"/>
        </el-form-item>
        <el-form-item label="当前虚拟观看人数" prop="virtualWatchNumber">
          <el-input v-model="form.virtualWatchNumber" placeholder="请输入当前虚拟观看人数"/>
        </el-form-item>
        <el-form-item label="获得票数" prop="voteNumber">
          <el-input v-model="form.voteNumber" placeholder="请输入获得票数"/>
        </el-form-item>
        <el-form-item label="主题id" prop="cateId">
          <el-input v-model="form.cateId" placeholder="请输入主题id"/>
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-input v-model="form.province" placeholder="请输入省份"/>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="form.city" placeholder="请输入城市"/>
        </el-form-item>
        <el-form-item label="开始时间" prop="beginTime">
          <el-date-picker clearable size="small"
                          v-model="form.beginTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker clearable size="small"
                          v-model="form.endTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期" prop="endDate">
          <el-date-picker clearable size="small"
                          v-model="form.endDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="群组ID,通过create_group后返回的值;直播结束后解散群" prop="groupId">
          <el-input v-model="form.groupId" placeholder="请输入群组ID,通过create_group后返回的值;直播结束后解散群"/>
        </el-form-item>
        <el-form-item label="1：未解散;0:已解散;其它为ErrorCode错码">
          <el-radio-group v-model="form.destroyGroupStatus">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="通过create_group后返回的LongPollingKey值" prop="longPollingKey">
          <el-input v-model="form.longPollingKey" placeholder="请输入通过create_group后返回的LongPollingKey值"/>
        </el-form-item>
        <el-form-item label="最大观看人数(每进来一人次加1）实际,不含虚拟人数,不包含机器人" prop="maxWatchNumber">
          <el-input v-model="form.maxWatchNumber" placeholder="请输入最大观看人数(每进来一人次加1）实际,不含虚拟人数,不包含机器人"/>
        </el-form-item>
        <el-form-item label="房间类型 : 1私有群" prop="roomType">
          <el-select v-model="form.roomType" placeholder="请选择房间类型 : 1私有群">
            <el-option label="请选择字典生成" value=""/>
          </el-select>
        </el-form-item>
        <el-form-item label="是否可回放 0-否 ；1-是" prop="isPlayback">
          <el-input v-model="form.isPlayback" placeholder="请输入是否可回放 0-否 ；1-是"/>
        </el-form-item>
        <el-form-item label="视频地址" prop="videoVid">
          <el-input v-model="form.videoVid" placeholder="请输入视频地址"/>
        </el-form-item>
        <el-form-item label="最后心跳监听时间；如果超过监听时间，则说明主播已经掉线了" prop="monitorTime">
          <el-date-picker clearable size="small"
                          v-model="form.monitorTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择最后心跳监听时间；如果超过监听时间，则说明主播已经掉线了">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="1:删除;0:未删除;私有聊天或小于5分钟的视频，不保存" prop="isDelete">
          <el-input v-model="form.isDelete" placeholder="请输入1:删除;0:未删除;私有聊天或小于5分钟的视频，不保存"/>
        </el-form-item>
        <el-form-item label="聊天群中机器人数量" prop="robotNum">
          <el-input v-model="form.robotNum" placeholder="请输入聊天群中机器人数量"/>
        </el-form-item>
        <el-form-item label="添加机器人时间" prop="robotTime">
          <el-input v-model="form.robotTime" placeholder="请输入添加机器人时间"/>
        </el-form-item>
        <el-form-item label="旁路直播,频道ID" prop="channelid">
          <el-input v-model="form.channelid" placeholder="请输入旁路直播,频道ID"/>
        </el-form-item>
        <el-form-item label="1:被服务器异常终止结束(主要是心跳超时)" prop="isAborted">
          <el-input v-model="form.isAborted" placeholder="请输入1:被服务器异常终止结束(主要是心跳超时)"/>
        </el-form-item>
        <el-form-item label="1:表示已经清空了,录制视频;0:未做清空操作" prop="isDelVod">
          <el-input v-model="form.isDelVod" placeholder="请输入1:表示已经清空了,录制视频;0:未做清空操作"/>
        </el-form-item>
        <el-form-item label="主播在线状态;1:在线(默认); 0:离开">
          <el-radio-group v-model="form.onlineStatus">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="举报次数" prop="tipoffCount">
          <el-input v-model="form.tipoffCount" placeholder="请输入举报次数"/>
        </el-form-item>
        <el-form-item label="私密直播key" prop="privateKey">
          <el-input v-model="form.privateKey" placeholder="请输入私密直播key"/>
        </el-form-item>
        <el-form-item label="分享类型WEIXIN,WEIXIN_CIRCLE,QQ,QZONE,SINA" prop="shareType">
          <el-select v-model="form.shareType" placeholder="请选择分享类型WEIXIN,WEIXIN_CIRCLE,QQ,QZONE,SINA">
            <el-option label="请选择字典生成" value=""/>
          </el-select>
        </el-form-item>
        <el-form-item label="热门排序" prop="sort">
          <el-input v-model="form.sort" placeholder="请输入热门排序"/>
        </el-form-item>
        <el-form-item label="竞拍id" prop="paiId">
          <el-input v-model="form.paiId" placeholder="请输入竞拍id"/>
        </el-form-item>
        <el-form-item label="性别 0:未知, 1-男，2-女" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别 0:未知, 1-男，2-女">
            <el-option label="请选择字典生成" value=""/>
          </el-select>
        </el-form-item>
        <el-form-item label="0:腾讯云互动直播;1:腾讯云直播" prop="videoType">
          <el-select v-model="form.videoType" placeholder="请选择0:腾讯云互动直播;1:腾讯云直播">
            <el-option label="请选择字典生成" value=""/>
          </el-select>
        </el-form-item>
        <el-form-item label="0:APP端创建的直播;1:PC端创建的直播" prop="createType">
          <el-select v-model="form.createType" placeholder="请选择0:APP端创建的直播;1:PC端创建的直播">
            <el-option label="请选择字典生成" value=""/>
          </el-select>
        </el-form-item>
        <el-form-item label="默认最大机器人头像数" prop="maxRobotNum">
          <el-input v-model="form.maxRobotNum" placeholder="请输入默认最大机器人头像数"/>
        </el-form-item>
        <el-form-item label="分享数,每个用户只记录一次" prop="shareCount">
          <el-input v-model="form.shareCount" placeholder="请输入分享数,每个用户只记录一次"/>
        </el-form-item>
        <el-form-item label="点赞数,每个用户只记录一次" prop="likeCount">
          <el-input v-model="form.likeCount" placeholder="请输入点赞数,每个用户只记录一次"/>
        </el-form-item>
        <el-form-item label="本场直播净添加的粉丝数即：被关注数，关注加1，取消减1" prop="fansCount">
          <el-input v-model="form.fansCount" placeholder="请输入本场直播净添加的粉丝数即：被关注数，关注加1，取消减1"/>
        </el-form-item>
        <el-form-item
          label="sort_init(初始排序权重) = (用户可提现印票：fanwe_user.ticket - fanwe_user.refund_ticket) * 保留印票权重+ 直播/回看[回看是：0; 直播：9000000000 直播,需要排在最上面 ]+ fanwe_user.user_level * 等级权重+ fanwe_user.fans_count * 当前有的关注数权重"
          prop="sortInit">
          <el-input v-model="form.sortInit"
                    placeholder="请输入sort_init(初始排序权重) = (用户可提现印票：fanwe_user.ticket - fanwe_user.refund_ticket) * 保留印票权重+ 直播/回看[回看是：0; 直播：9000000000 直播,需要排在最上面 ]+ fanwe_user.user_level * 等级权重+ fanwe_user.fans_count * 当前有的关注数权重"/>
        </el-form-item>
        <el-form-item label="推流地址" prop="pushRtmp">
          <el-input v-model="form.pushRtmp" placeholder="请输入推流地址"/>
        </el-form-item>
        <el-form-item label="播放地址；当video_type=0时，记录：傍路直播地址" prop="playFlv">
          <el-input v-model="form.playFlv" placeholder="请输入播放地址；当video_type=0时，记录：傍路直播地址"/>
        </el-form-item>
        <el-form-item label="播放地址；当video_type=0时，记录：傍路直播地址" prop="playRtmp">
          <el-input v-model="form.playRtmp" placeholder="请输入播放地址；当video_type=0时，记录：傍路直播地址"/>
        </el-form-item>
        <el-form-item label="播放地址；当video_type=0时，记录：傍路直播地址" prop="playMp4">
          <el-input v-model="form.playMp4" placeholder="请输入播放地址；当video_type=0时，记录：傍路直播地址"/>
        </el-form-item>
        <el-form-item label="播放地址；当video_type=0时，记录：傍路直播地址" prop="playHls">
          <el-input v-model="form.playHls" placeholder="请输入播放地址；当video_type=0时，记录：傍路直播地址"/>
        </el-form-item>
        <el-form-item label="x座标(用来计算：附近)" prop="xpoint">
          <el-input v-model="form.xpoint" placeholder="请输入x座标(用来计算：附近)"/>
        </el-form-item>
        <el-form-item label="y座标(用来计算：附近)" prop="ypoint">
          <el-input v-model="form.ypoint" placeholder="请输入y座标(用来计算：附近)"/>
        </el-form-item>
        <el-form-item label="直播时，可自定义封面图; 如果不存在,则取会员头像">
          <imageUpload v-model="form.headImage"/>
        </el-form-item>
        <el-form-item label="模糊图片">
          <imageUpload v-model="form.thumbHeadImage"/>
        </el-form-item>
        <el-form-item label="播放地址" prop="playUrl">
          <el-input v-model="form.playUrl" placeholder="请输入播放地址"/>
        </el-form-item>
        <el-form-item label="推荐视频 0不推荐、1推荐" prop="isRecommend">
          <el-input v-model="form.isRecommend" placeholder="请输入推荐视频 0不推荐、1推荐"/>
        </el-form-item>
        <el-form-item label="视频封面">
          <imageUpload v-model="form.liveImage"/>
        </el-form-item>
        <el-form-item label="最大虚拟人数" prop="virtualNumber">
          <el-input v-model="form.virtualNumber" placeholder="请输入最大虚拟人数"/>
        </el-form-item>
        <el-form-item label="开始收费时间" prop="livePayTime">
          <el-input v-model="form.livePayTime" placeholder="请输入开始收费时间"/>
        </el-form-item>
        <el-form-item label="是否收费模式  1是 0否" prop="isLivePay">
          <el-input v-model="form.isLivePay" placeholder="请输入是否收费模式  1是 0否"/>
        </el-form-item>
        <el-form-item label="付费直播 收取多少费用； 每分钟收取多少钻石，主播端设置" prop="liveFee">
          <el-input v-model="form.liveFee" placeholder="请输入付费直播 收取多少费用； 每分钟收取多少钻石，主播端设置"/>
        </el-form-item>
        <el-form-item label="是否已经提档 1是、0否" prop="liveIsMention">
          <el-input v-model="form.liveIsMention" placeholder="请输入是否已经提档 1是、0否"/>
        </el-form-item>
        <el-form-item label="收费类型 0按时收费，1按场次收费 (is_live_pay 是1时候有效)" prop="livePayType">
          <el-select v-model="form.livePayType" placeholder="请选择收费类型 0按时收费，1按场次收费 (is_live_pay 是1时候有效)">
            <el-option label="请选择字典生成" value=""/>
          </el-select>
        </el-form-item>
        <el-form-item label="付费人数" prop="livePayCount">
          <el-input v-model="form.livePayCount" placeholder="请输入付费人数"/>
        </el-form-item>
        <el-form-item label="直播礼物表" prop="propTable">
          <el-input v-model="form.propTable" placeholder="请输入直播礼物表"/>
        </el-form-item>
        <el-form-item label="直播间名称" prop="roomTitle">
          <el-input v-model="form.roomTitle" placeholder="请输入直播间名称"/>
        </el-form-item>
        <el-form-item label="付费直播的ID , 用于标示直播间付费 模式 " prop="payRoomId">
          <el-input v-model="form.payRoomId" placeholder="请输入付费直播的ID , 用于标示直播间付费 模式 "/>
        </el-form-item>
        <el-form-item label="直播的时长" prop="lenTime">
          <el-input v-model="form.lenTime" placeholder="请输入直播的时长"/>
        </el-form-item>
        <el-form-item label="视频是否合并 0 未合并，1 已合并" prop="isConcatvideo">
          <el-input v-model="form.isConcatvideo" placeholder="请输入视频是否合并 0 未合并，1 已合并"/>
        </el-form-item>
        <el-form-item label="是否置顶 0 不置顶 1 置顶" prop="stick">
          <el-input v-model="form.stick" placeholder="请输入是否置顶 0 不置顶 1 置顶"/>
        </el-form-item>
        <el-form-item label="分类id" prop="classifiedId">
          <el-input v-model="form.classifiedId" placeholder="请输入分类id"/>
        </el-form-item>
        <el-form-item label="游戏记录id" prop="gameLogId">
          <el-input v-model="form.gameLogId" placeholder="请输入游戏记录id"/>
        </el-form-item>
        <el-form-item label="上庄状态">
          <el-radio-group v-model="form.bankerStatus">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上庄id" prop="bankerId">
          <el-input v-model="form.bankerId" placeholder="请输入上庄id"/>
        </el-form-item>
        <el-form-item label="是否自动开启游戏" prop="autoStart">
          <el-input v-model="form.autoStart" placeholder="请输入是否自动开启游戏"/>
        </el-form-item>
        <el-form-item label="自动开始游戏id" prop="autoGameId">
          <el-input v-model="form.autoGameId" placeholder="请输入自动开始游戏id"/>
        </el-form-item>
        <el-form-item label="绑定彩票ID" prop="lotteryId">
          <el-input v-model="form.lotteryId" placeholder="请输入绑定彩票ID"/>
        </el-form-item>
        <el-form-item label="MD5加密推流地址(弃用)" prop="newPlayFlv">
          <el-input v-model="form.newPlayFlv" placeholder="请输入MD5加密推流地址(弃用)"/>
        </el-form-item>
        <el-form-item label="MD5加密推流地址" prop="nPlayFlv">
          <el-input v-model="form.nPlayFlv" placeholder="请输入MD5加密推流地址"/>
        </el-form-item>
        <el-form-item label="主播昵称" prop="hostName">
          <el-input v-model="form.hostName" placeholder="请输入主播昵称"/>
        </el-form-item>
        <el-form-item label="彩票名称" prop="lotteryName">
          <el-input v-model="form.lotteryName" placeholder="请输入彩票名称"/>
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
      rules: {
        title: [
          {required: true, message: "直播标题不能为空", trigger: "blur"}
        ],
        userId: [
          {required: true, message: "项目id不能为空", trigger: "blur"}
        ],
        virtualWatchNumber: [
          {required: true, message: "当前虚拟观看人数不能为空", trigger: "blur"}
        ],
        groupId: [
          {required: true, message: "群组ID,通过create_group后返回的值;直播结束后解散群不能为空", trigger: "blur"}
        ],
        destroyGroupStatus: [
          {required: true, message: "1：未解散;0:已解散;其它为ErrorCode错码不能为空", trigger: "blur"}
        ],
        longPollingKey: [
          {required: true, message: "通过create_group后返回的LongPollingKey值不能为空", trigger: "blur"}
        ],
        maxWatchNumber: [
          {required: true, message: "最大观看人数(每进来一人次加1）实际,不含虚拟人数,不包含机器人不能为空", trigger: "blur"}
        ],
        roomType: [
          {required: true, message: "房间类型 : 1私有群不能为空", trigger: "change"}
        ],
        monitorTime: [
          {required: true, message: "最后心跳监听时间；如果超过监听时间，则说明主播已经掉线了不能为空", trigger: "blur"}
        ],
        isDelete: [
          {required: true, message: "1:删除;0:未删除;私有聊天或小于5分钟的视频，不保存不能为空", trigger: "blur"}
        ],
        robotNum: [
          {required: true, message: "聊天群中机器人数量不能为空", trigger: "blur"}
        ],
        robotTime: [
          {required: true, message: "添加机器人时间不能为空", trigger: "blur"}
        ],
        channelid: [
          {required: true, message: "旁路直播,频道ID不能为空", trigger: "blur"}
        ],
        isAborted: [
          {required: true, message: "1:被服务器异常终止结束(主要是心跳超时)不能为空", trigger: "blur"}
        ],
        isDelVod: [
          {required: true, message: "1:表示已经清空了,录制视频;0:未做清空操作不能为空", trigger: "blur"}
        ],
        onlineStatus: [
          {required: true, message: "主播在线状态;1:在线(默认); 0:离开不能为空", trigger: "blur"}
        ],
        tipoffCount: [
          {required: true, message: "举报次数不能为空", trigger: "blur"}
        ],
        shareType: [
          {required: true, message: "分享类型WEIXIN,WEIXIN_CIRCLE,QQ,QZONE,SINA不能为空", trigger: "change"}
        ],
        sort: [
          {required: true, message: "热门排序不能为空", trigger: "blur"}
        ],
        sex: [
          {required: true, message: "性别 0:未知, 1-男，2-女不能为空", trigger: "change"}
        ],
        videoType: [
          {required: true, message: "0:腾讯云互动直播;1:腾讯云直播不能为空", trigger: "change"}
        ],
        sortNum: [
          {
            required: true,
            message: "sort_init + share_count * 分享权重 + like_count * 点赞权重 + fans_count * 关注权重 + sort * 排序权重 + ticket(本场收到的印票) * 印票权重不能为空",
            trigger: "blur"
          }
        ],
        createType: [
          {required: true, message: "0:APP端创建的直播;1:PC端创建的直播不能为空", trigger: "change"}
        ],
        maxRobotNum: [
          {required: true, message: "默认最大机器人头像数不能为空", trigger: "blur"}
        ],
        shareCount: [
          {required: true, message: "分享数,每个用户只记录一次不能为空", trigger: "blur"}
        ],
        likeCount: [
          {required: true, message: "点赞数,每个用户只记录一次不能为空", trigger: "blur"}
        ],
        fansCount: [
          {required: true, message: "本场直播净添加的粉丝数即：被关注数，关注加1，取消减1不能为空", trigger: "blur"}
        ],
        sortInit: [
          {
            required: true,
            message: "sort_init(初始排序权重) = (用户可提现印票：fanwe_user.ticket - fanwe_user.refund_ticket) * 保留印票权重+ 直播/回看[回看是：0; 直播：9000000000 直播,需要排在最上面 ]+ fanwe_user.user_level * 等级权重+ fanwe_user.fans_count * 当前有的关注数权重不能为空",
            trigger: "blur"
          }
        ],
        pushRtmp: [
          {required: true, message: "推流地址不能为空", trigger: "blur"}
        ],
        playFlv: [
          {required: true, message: "播放地址；当video_type=0时，记录：傍路直播地址不能为空", trigger: "blur"}
        ],
        playRtmp: [
          {required: true, message: "播放地址；当video_type=0时，记录：傍路直播地址不能为空", trigger: "blur"}
        ],
        playHls: [
          {required: true, message: "播放地址；当video_type=0时，记录：傍路直播地址不能为空", trigger: "blur"}
        ],
        headImage: [
          {required: true, message: "直播时，可自定义封面图; 如果不存在,则取会员头像不能为空", trigger: "blur"}
        ],
        playUrl: [
          {required: true, message: "播放地址不能为空", trigger: "blur"}
        ],
        isRecommend: [
          {required: true, message: "推荐视频 0不推荐、1推荐不能为空", trigger: "blur"}
        ],
        liveImage: [
          {required: true, message: "视频封面不能为空", trigger: "blur"}
        ],
        virtualNumber: [
          {required: true, message: "最大虚拟人数不能为空", trigger: "blur"}
        ],
        isLivePay: [
          {required: true, message: "是否收费模式  1是 0否不能为空", trigger: "blur"}
        ],
        liveFee: [
          {required: true, message: "付费直播 收取多少费用； 每分钟收取多少钻石，主播端设置不能为空", trigger: "blur"}
        ],
        liveIsMention: [
          {required: true, message: "是否已经提档 1是、0否不能为空", trigger: "blur"}
        ],
        livePayType: [
          {required: true, message: "收费类型 0按时收费，1按场次收费 (is_live_pay 是1时候有效)不能为空", trigger: "change"}
        ],
        livePayCount: [
          {required: true, message: "付费人数不能为空", trigger: "blur"}
        ],
        propTable: [
          {required: true, message: "直播礼物表不能为空", trigger: "blur"}
        ],
        lenTime: [
          {required: true, message: "直播的时长不能为空", trigger: "blur"}
        ],
        isConcatvideo: [
          {required: true, message: "视频是否合并 0 未合并，1 已合并不能为空", trigger: "blur"}
        ],
        stick: [
          {required: true, message: "是否置顶 0 不置顶 1 置顶不能为空", trigger: "blur"}
        ],
        classifiedId: [
          {required: true, message: "分类id不能为空", trigger: "blur"}
        ],
      }
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
