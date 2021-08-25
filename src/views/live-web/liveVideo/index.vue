<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="75px">
      <el-form-item label="直播类型:" prop="type" style="width: auto;margin-right: 30px">
        <el-checkbox-group v-model="queryParams.types" size="medium">
          <el-checkbox v-for="item in typeOptions" :key="item.dictValue" :label="item.dictValue">
            {{ item.dictLabel }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item prop="id" style="width: 160px">
        <el-input
          v-model="queryParams.id"
          placeholder="主播ID"
          clearable
          size="small"
          type="number"
          class="no-number"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="hostName" style="width: 160px">
        <el-input
          v-model="queryParams.hostName"
          placeholder="主播昵称/直播标题"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="paiId" style="width: 150px">
        <el-select v-model="queryParams.paiId" placeholder="直播线路" clearable>
          <el-option
            v-for="dict in serverOptions"
            :key="dict.id"
            :label="dict.name"
            :value="dict.id"
          ></el-option>
        </el-select>
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
          @click="closeIds"
          v-hasPermi="['admin:liveVideo:remove']"
        >批量关播
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="liveVideoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="主播ID" min-width="120" align="center" prop="id"/>
      <el-table-column label="主播昵称" min-width="120" align="center" prop="hostName" :show-overflow-tooltip="true"/>
      <el-table-column label="直播间标题" min-width="120" align="center" prop="title" :show-overflow-tooltip="true"/>
      <el-table-column label="直播类型" min-width="120" align="center" prop="cateId" :formatter="typeFormat"/>
      <el-table-column label="热度" min-width="120" align="center" prop="voteNumber"/>
      <el-table-column label="在线人数" min-width="120" align="center" prop="watchNumber"/>
      <!--      <el-table-column label="推荐" min-width="120" align="center" prop="isRecommend" :formatter="isRecommendFormat"/>-->
      <!--      <el-table-column label="固定位置" min-width="120" align="center" prop="sort"/>-->
      <el-table-column label="线路名称" min-width="120" align="center" prop="lineName"/>
      <el-table-column label="直播性质" align="center" prop="lineStatus" width="100">
        <template slot-scope="scope">
          <span :style="{color: (status = lineStatusOption[parseInt(scope.row.lineStatus)+1]).color}">{{
              status.dictLabel
            }}</span>
        </template>
      </el-table-column>
      <el-table-column label="直播状态" min-width="100" align="center" prop="liveStatus">
        <template slot-scope="scope">
          <span v-if="scope.row.liveStatus === ''">检测中...</span>
          <span v-else :style="{color: (status = liveStatusOption[parseInt(scope.row.liveStatus)]).color}">{{
              status.dictLabel
            }}</span>
        </template>
      </el-table-column>
      <el-table-column label="禁收费" min-width="65" align="center" prop="openPay">
        <template slot-scope="scope">
          <el-switch
            active-value="0"
            inactive-value="1"
            active-color="#5B7BFA"
            inactive-color="#dadde5"
            v-model="scope.row.openPay"
            @change="changeOpenPay(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="收费" min-width="65" align="center" prop="isLivePay">
        <template slot-scope="scope">
          <span v-if="scope.row.isLivePay" style="color: #FFB800">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" align="center" prop="beginTime" width="160">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.beginTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="彩种" min-width="120" align="center" prop="lotteryName"/>
      <el-table-column label="操作" min-width="355" align="left" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="danger"
            @click="close(scope.row)"
            v-hasPermi="['admin:liveVideo:remove']"
          >关播
          </el-button>
          <el-button
            size="small"
            type="success"
            v-show="scope.row.isRecommend === 0 && scope.row.sort >= 9999000 && scope.row.stick === 0"
            @click="setSort(scope.row)"
            v-hasPermi="['admin:liveVideo:edit']"
          >固定定位
          </el-button>
          <el-input
            v-model="scope.row.sort"
            size="small"
            style="width: 50px;margin: 0 10px 0 10px"
            readonly
            v-show="scope.row.isRecommend === 0 && scope.row.sort < 9999000 && scope.row.stick === 0"
          />
          <el-button
            plain
            size="small"
            type="success"
            v-show="scope.row.isRecommend === 0 && scope.row.sort < 9999000 && scope.row.stick === 0"
            @click="closeSort(scope.row)"
            v-hasPermi="['admin:liveVideo:edit']"
          >取消固定定位
          </el-button>
          <el-button
            size="small"
            type="primary"
            v-show="scope.row.isRecommend === 0 && scope.row.sort >= 9999000 && scope.row.stick === 0"
            @click="recommend(scope.row)"
            v-hasPermi="['admin:liveVideo:edit']"
          >推荐
          </el-button>
          <el-button
            :plain="true"
            size="small"
            type="primary"
            v-show="scope.row.isRecommend === 1 && scope.row.sort >= 9999000 && scope.row.stick === 0"
            @click="closeRecommend(scope.row)"
            v-hasPermi="['admin:liveVideo:edit']"
          >取消推荐
          </el-button>
          <el-button
            size="small"
            type="info"
            v-show="scope.row.isRecommend === 0 && scope.row.sort >= 9999000 && scope.row.stick === 0"
            @click="stick(scope.row)"
            v-hasPermi="['admin:liveVideo:edit']"
          >置底
          </el-button>
          <el-button
            :plain="true"
            size="small"
            type="info"
            v-show="scope.row.isRecommend === 0 && scope.row.sort >= 9999000 && scope.row.stick === 1"
            @click="closeStick(scope.row)"
            v-hasPermi="['admin:liveVideo:edit']"
          >取消置底
          </el-button>
          <el-button
            size="small"
            type="warning"
            v-show="scope.row.openPay === '1' && !scope.row.isLivePay"
            @click="toLivePay(scope.row)"
            v-hasPermi="['admin:liveVideo:edit']"
          >收费
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="350px"
               append-to-body
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="85px">
        <el-form-item label="主播ID" prop="id">
          <el-input v-model="form.id" placeholder="主播ID" readonly disabled/>
        </el-form-item>
        <el-form-item label="主播昵称" prop="hostName">
          <el-input v-model="form.hostName" placeholder="主播昵称" readonly disabled/>
        </el-form-item>
        <el-form-item label="直播间标题" prop="title">
          <el-input v-model="form.title" placeholder="直播间标题" readonly disabled/>
        </el-form-item>
        <el-form-item label="观看费用" prop="liveFee">
          <el-input v-model="form.liveFee" placeholder="观看费用"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog v-dialogDrag :close-on-click-modal="false" title="是否立即生效" :visible.sync="effectOpen" width="300px"
               append-to-body
    >
      <el-form ref="form" :model="form" label-width="65px">
        <el-form-item prop="effect">
          <el-radio v-model="form.effect" label="1">是</el-radio>
          <el-radio v-model="form.effect" label="2">否</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFormEffect">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <pagination
      v-show="total>0"
      :page-sizes="[50,100,200,500]"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
import {
  close,
  updateLivePay,
  listLiveVideo,
  getLiveVideo,
  updateVideoSort,
  exportLiveVideo
} from '@/api/live-web/liveVideo/liveVideo'
import {
  updateLiveUser
} from '@/api/live-web/liveUser'
import request from '@/utils/request'
import {url} from '@/utils/url'

export default {
  name: 'LiveVideo',
  components: {},
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
      statusOptions: [],
      // 直播表格数据
      liveVideoList: [],
      serverOptions: [],
      typeOptions: [],
      lineStatusOption: [],
      liveStatusOption: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      effectOpen: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 50,
        hostName: null,
        paiId: null,
        id: null,
        types: []
      },
      // 表单参数
      form: {
        effect: '1',
      },
      // 表单校验
      rules: {}
    }
  },
  created() {
    this.getList()
    this.getServerLine().then(response => {
      this.serverOptions = response.rows
    })
    this.getDicts('videoType').then(response => {
      this.typeOptions = response.data
    })
    this.getDicts('liveStatus').then(response => {
      this.liveStatusOption = response.data
    })
    this.getDicts('lineStatus').then(response => {
      this.lineStatusOption = response.data
    })
  },
  methods: {
    /** 查询直播列表 */
    getList() {
      this.loading = true
      listLiveVideo(this.queryParams).then(response => {
        this.liveVideoList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.effectOpen = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        hostName: null,
        paiId: null,
        effect: '1',
        types: []
      }
      this.queryParams = {
        hostName: null,
        paiId: null,
        types: []
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.reset()
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加直播'
    },
    /** 修改按钮操作 */
    toLivePay(row) {
      this.reset()
      const id = row.id || this.ids
      getLiveVideo(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '付费设置'
      })
    },
    closeIds() {
      const ids = this.ids
      if (ids == null || ids == '') {
        this.msgError('请选择关闭直播间')
        return
      }
      this.$confirm('是否确认批量关闭直播?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return close(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('关播成功')
      })
    },
    close(row) {
      this.$confirm('是否确认关闭直播编号为"' + row.id + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return close(row.id)
      }).then(() => {
        this.getList()
        this.msgSuccess('关播成功')
      })
    },
    /** 提交按钮 */
    submitForm() {
      if (this.form.liveFee <= 0) {
        this.msgError('付费金额必须大于0!')
        return
      }
      updateLivePay(this.form.id, this.form.liveFee).then(response => {
        this.msgSuccess(response.msg)
        this.open = false
        this.getList()
      })
    },
    typeFormat(row) {
      if (row.cateId == '2') {
        return '性感主播'
      } else if (row.cateId == '3') {
        return '大秀直播'
      } else if (row.cateId == '4') {
        return '收费直播'
      } else {
        return '彩票直播'
      }
    },
    getServerLine() {
      return request({
        url: url.platformWeb + '/server/live/getAlllist',
        method: 'get'
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有直播数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return exportLiveVideo(queryParams)
      }).then(response => {
        this.downloadExcel(response, '直播数据')
      }).catch(() => {
      })
    },
    changeOpenPay(row) {
      this.$confirm('是否' + (row.openPay === '0' ? '禁' : '启') + '用主播收费权限?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return updateLiveUser({
          id: row.id,
          openPay: row.openPay
        })
      }).then(response => {
        if (response.code === 200) {
          this.msgSuccess(response.msg)
        } else if (response.code === 500) {
          this.msgError(response.msg)
        }
        this.getList()
      }).catch(function () {
        row.openPay = row.openPay === '0' ? '1' : '0'
      })
    },
    // 推荐
    recommend(row) {
       this.id = row.id
       this.isRecommend = 1
       this.effectOpen = true
    },
    // 取消推荐
    closeRecommend(row) {
      this.id = row.id
      this.isRecommend = 0
      this.effectOpen = true
    },
    submitFormEffect(){
      updateVideoSort({
        id: this.id,
        isRecommend: this.isRecommend,
        effect: this.form.effect
      }).then(response => {
        if (response.code === 200) {
          this.msgSuccess(response.msg)
        } else if (response.code === 500) {
          this.msgError(response.msg)
        }
        this.getList()
        this.effectOpen = false
      })
    },

    // 置底
    stick(row) {
      updateVideoSort({
        id: row.id,
        stick: 1
      }).then(response => {
        if (response.code === 200) {
          this.msgSuccess(response.msg)
        } else if (response.code === 500) {
          this.msgError(response.msg)
        }
        this.getList()
      })
    },
    // 取消置底
    closeStick(row) {
      updateVideoSort({
        id: row.id,
        stick: 0
      }).then(response => {
        if (response.code === 200) {
          this.msgSuccess(response.msg)
        } else if (response.code === 500) {
          this.msgError(response.msg)
        }
        this.getList()
      })
    },
    // 固定定位
    setSort(row) {
      this.$prompt('', '固定定位', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'number',
        inputPlaceholder: '请输入大于0小于100的整数值',
        inputPattern: /^[1-9][0-9]?$/,
        inputErrorMessage: '固定位数据格式不正确，请输入大于0小于100的整数值'
      }).then(({value}) => {
        updateVideoSort({
          id: row.id,
          sort: value
        }).then(response => {
          if (response.code === 200) {
            this.msgSuccess(response.msg)
          } else if (response.code === 500) {
            this.msgError(response.msg)
          }
          this.getList()
        })
      }).catch(() => {
      })
    },
    // 取消固定定位
    closeSort(row) {
      updateVideoSort({
        id: row.id,
        sort: 9999999
      }).then(response => {
        if (response.code === 200) {
          this.msgSuccess(response.msg)
        } else if (response.code === 500) {
          this.msgError(response.msg)
        }
        this.getList()
      })
    }
  }
}
</script>
