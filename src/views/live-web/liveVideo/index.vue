<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="75px">
      <el-form-item :label="$t('liveWeb.liveVideo.queryForm.typeLabel')" prop="type" style="width: auto;margin-right: 30px">
        <el-checkbox-group v-model="queryParams.types" size="medium">
          <el-checkbox v-for="item in typeOptions" :key="item.dictValue" :label="item.dictValue">
            {{ item.dictLabel }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item prop="id" style="width: 160px">
        <el-input
          v-model="queryParams.id"
          :placeholder="$t('liveWeb.liveVideo.queryForm.idPlaceholder')"
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
          :placeholder="$t('liveWeb.liveVideo.queryForm.hostNamePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="paiId" style="width: 150px">
        <el-select v-model="queryParams.paiId" :placeholder="$t('liveWeb.liveVideo.queryForm.paiIdPlaceholder')" clearable>
          <el-option
            v-for="dict in serverOptions"
            :key="dict.id"
            :label="dict.name"
            :value="dict.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('liveWeb.liveVideo.queryForm.searchButton')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('liveWeb.liveVideo.queryForm.resetButton')}}</el-button>
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
        >{{$t('liveWeb.liveVideo.actions.closeIds')}}
        </el-button>
      </el-col>

      <!--      同步主排序按钮 Sync Master Sorting button  -->
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          size="mini"
          @click="synchronizeOrder"
          v-hasPermi="['admin:liveVideo:sync']">{{$t('liveWeb.liveVideo.actions.synchronizeOrder')}}
        </el-button>
      </el-col>

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="liveVideoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column :label="$t('liveWeb.liveVideo.table.id')" min-width="120" align="center" prop="id"/>
      <el-table-column :label="$t('liveWeb.liveVideo.table.hostName')" min-width="120" align="center" prop="hostName" :show-overflow-tooltip="true"/>
      <el-table-column :label="$t('liveWeb.liveVideo.table.title')" min-width="120" align="center" prop="title" :show-overflow-tooltip="true"/>
      <el-table-column :label="$t('liveWeb.liveVideo.table.cateId')" min-width="120" align="center" prop="cateId" :formatter="typeFormat"/>
      <el-table-column :label="$t('liveWeb.liveVideo.table.voteNumber')" min-width="120" align="center" prop="voteNumber"/>
      <el-table-column :label="$t('liveWeb.liveVideo.table.watchNumber')" min-width="120" align="center" prop="watchNumber"/>
      <!--      <el-table-column label="推荐" min-width="120" align="center" prop="isRecommend" :formatter="isRecommendFormat"/>-->
      <!--      <el-table-column label="固定位置" min-width="120" align="center" prop="sort"/>-->
      <el-table-column :label="$t('liveWeb.liveVideo.table.lineName')" min-width="120" align="center" prop="lineName"/>
      <el-table-column :label="$t('liveWeb.liveVideo.table.lineStatus')" align="center" prop="lineStatus" width="100">
        <template slot-scope="scope">
          <span :style="{color: (status = lineStatusOption[parseInt(scope.row.lineStatus)+1]).color}">{{
              status.dictLabel
            }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveVideo.table.liveStatus')" min-width="100" align="center" prop="liveStatus">
        <template slot-scope="scope">
          <span v-if="scope.row.liveStatus === ''">{{$t('liveWeb.liveVideo.table.liveStatusEmpty')}}</span>
          <span v-else :style="{color: (status = liveStatusOption[parseInt(scope.row.liveStatus)]).color}">{{
              status.dictLabel
            }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveVideo.table.openPay')" min-width="65" align="center" prop="openPay">
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
      <el-table-column :label="$t('liveWeb.liveVideo.table.isLivePay')" min-width="65" align="center" prop="isLivePay">
        <template slot-scope="scope">
          <span v-if="scope.row.isLivePay" style="color: #FFB800">{{$t('liveWeb.liveVideo.table.isLivePayTrue')}}</span>
          <span v-else>{{$t('liveWeb.liveVideo.table.isLivePayFalse')}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveVideo.table.beginTime')" align="center" prop="beginTime" width="160">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.beginTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveVideo.table.lotteryName')" min-width="120" align="center" prop="lotteryName"/>
      <el-table-column :label="$t('liveWeb.liveVideo.table.operation')" min-width="355" align="left" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="danger"
            @click="close(scope.row)"
            v-hasPermi="['admin:liveVideo:remove']"
          >{{$t('liveWeb.liveVideo.table.closeButton')}}
          </el-button>
          <el-button
            size="small"
            type="success"
            v-show="scope.row.isRecommend === 0 && scope.row.sort >= 9999000 && scope.row.stick === false"
            @click="setSort(scope.row)"
            v-hasPermi="['admin:liveVideo:edit']"
          >{{$t('liveWeb.liveVideo.table.setSortButton')}}
          </el-button>
          <el-input
            v-model="scope.row.sort"
            size="small"
            style="width: 50px;margin: 0 10px 0 10px"
            readonly
            v-show="scope.row.isRecommend === 0 && scope.row.sort < 9999000 && scope.row.stick === false"
          />
          <el-button
            plain
            size="small"
            type="success"
            v-show="scope.row.isRecommend === 0 && scope.row.sort < 9999000 && scope.row.stick === false"
            @click="closeSort(scope.row)"
            v-hasPermi="['admin:liveVideo:edit']"
          >{{$t('liveWeb.liveVideo.table.closeSortButton')}}
          </el-button>
          <el-button
            size="small"
            type="primary"
            v-show="scope.row.isRecommend === 0 && scope.row.sort >= 9999000 && scope.row.stick === false"
            @click="recommend(scope.row)"
            v-hasPermi="['admin:liveVideo:edit']"
          >{{$t('liveWeb.liveVideo.table.recommendButton')}}
          </el-button>
          <el-button
            :plain="true"
            size="small"
            type="primary"
            v-show="scope.row.isRecommend === 1 && scope.row.sort >= 9999000 && scope.row.stick === false"
            @click="closeRecommend(scope.row)"
            v-hasPermi="['admin:liveVideo:edit']"
          >{{$t('liveWeb.liveVideo.table.closeRecommendButton')}}
          </el-button>
          <el-button
            size="small"
            type="info"
            v-show="scope.row.isRecommend === 0 && scope.row.sort >= 9999000 && scope.row.stick === false"
            @click="stick(scope.row)"
            v-hasPermi="['admin:liveVideo:edit']"
          >{{$t('liveWeb.liveVideo.table.stickButton')}}
          </el-button>
          <el-button
            :plain="true"
            size="small"
            type="info"
            v-show="scope.row.isRecommend === 0 && scope.row.sort >= 9999000 && scope.row.stick === true"
            @click="closeStick(scope.row)"
            v-hasPermi="['admin:liveVideo:edit']"
          >{{$t('liveWeb.liveVideo.table.closeStickButton')}}
          </el-button>
          <el-button
            size="small"
            type="warning"
            v-show="scope.row.openPay === '1' && !scope.row.isLivePay"
            @click="toLivePay(scope.row)"
            v-hasPermi="['admin:liveVideo:edit']"
          >{{$t('liveWeb.liveVideo.table.toLivePayButton')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="350px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="85px">
        <el-form-item :label="$t('liveWeb.liveVideo.addToLivePayDialog.idLabel')" prop="id">
          <el-input v-model="form.id" :placeholder="$t('liveWeb.liveVideo.addToLivePayDialog.idPlaceholder')" readonly disabled/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveVideo.addToLivePayDialog.hostNameLabel')" prop="hostName">
          <el-input v-model="form.hostName" :placeholder="$t('liveWeb.liveVideo.addToLivePayDialog.hostNamePlaceholder')" readonly disabled/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveVideo.addToLivePayDialog.titleLabel')" prop="title">
          <el-input v-model="form.title" :placeholder="$t('liveWeb.liveVideo.addToLivePayDialog.titlePlaceholder')" readonly disabled/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveVideo.addToLivePayDialog.liveFeeLabel')" prop="liveFee">
          <el-input v-model="form.liveFee" :placeholder="$t('liveWeb.liveVideo.addToLivePayDialog.liveFeePlaceholder')"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{$t('liveWeb.liveVideo.addToLivePayDialog.confirmButton')}}</el-button>
        <el-button @click="cancel">{{$t('liveWeb.liveVideo.addToLivePayDialog.cancelButton')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog v-dialogDrag :close-on-click-modal="false" title="是否立即生效" :visible.sync="effectOpen" width="300px"
               append-to-body
    >
      <el-form ref="form" :model="form" label-width="65px">
        <el-form-item prop="effect">
          <el-radio v-model="form.effect" label="1">{{$t('liveWeb.liveVideo.effectDialog.effect1')}}</el-radio>
          <el-radio v-model="form.effect" label="2">{{$t('liveWeb.liveVideo.effectDialog.effect2')}}</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFormEffect">{{$t('liveWeb.liveVideo.effectDialog.confirmButton')}}</el-button>
        <el-button @click="cancel">{{$t('liveWeb.liveVideo.effectDialog.cancelButton')}}</el-button>
      </div>
    </el-dialog>
    <pagination
      v-show="total>0"
      :page-sizes="[200,500]"
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
  exportLiveVideo, resetSynchronizeOrder
} from '@/api/live-web/liveVideo/liveVideo'
import { updateLiveUser } from '@/api/live-web/liveUser'
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
      this.title = this.$t('liveWeb.liveVideo.addToLivePayDialog.addTitle')
    },
    /** 修改按钮操作 */
    toLivePay(row) {
      this.reset()
      const id = row.id || this.ids
      getLiveVideo(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = this.$t('liveWeb.liveVideo.addToLivePayDialog.toLivePayTitle')
      })
    },
    closeIds() {
      const ids = this.ids
      if (ids == null || ids == '') {
        this.msgError(this.$t('liveWeb.liveVideo.messageBox.closeIdsError'))
        return
      }
      this.$confirm(this.$t('liveWeb.liveVideo.confirmCloseIdsDialog.message'), this.$t('liveWeb.liveVideo.confirmCloseIdsDialog.title'), {
        confirmButtonText: this.$t('liveWeb.liveVideo.confirmCloseIdsDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveVideo.confirmCloseIdsDialog.cancelButton'),
        type: 'warning'
      }).then(function () {
        return close(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess(this.$t('liveWeb.liveVideo.messageBox.closeIdsSuccess'))
      })
    },
    close(row) {
      this.$confirm(this.$t('liveWeb.liveVideo.confirmCloseDialog.message', {id: row.id}), this.$t('liveWeb.liveVideo.title.message'), {
        confirmButtonText: this.$t('liveWeb.liveVideo.confirmCloseDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveVideo.confirmCloseDialog.cancelButton'),
        type: 'warning'
      }).then(function () {
        return close(row.id)
      }).then(() => {
        this.getList()
        this.msgSuccess(this.$t('liveWeb.liveVideo.messageBox.closeSuccess'))
      })
    },
    /** 提交按钮 */
    submitForm() {
      if (this.form.liveFee <= 0) {
        this.msgError(this.$t('liveWeb.liveVideo.messageBox.submitFormError'))
        return
      }
      updateLivePay(this.form.id, this.form.liveFee).then(response => {
        if (response.code === 200) {
          this.msgSuccess(response.msg)
          this.open = false
          this.getList()
        } else if (response.code === 500) {
          this.msgError(response.msg)
        }
      })
    },
    typeFormat(row) {
      if (row.cateId == '2') {
        return this.$t('liveWeb.liveVideo.table.cateId2')
      } else if (row.cateId == '3') {
        return this.$t('liveWeb.liveVideo.table.cateId3')
      } else if (row.cateId == '4') {
        return this.$t('liveWeb.liveVideo.table.cateId4')
      } else {
        return this.$t('liveWeb.liveVideo.table.cateIdOthers')
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
      this.$confirm(this.$t('liveWeb.liveVideo.confirmExportDialog.message'), this.$t('liveWeb.liveVideo.confirmExportDialog.title'), {
        confirmButtonText: this.$t('liveWeb.liveVideo.confirmExportDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveVideo.confirmExportDialog.cancelButton'),
        type: 'warning'
      }).then(function () {
        return exportLiveVideo(queryParams)
      }).then(response => {
        this.downloadExcel(response, '直播数据')
      }).catch(() => {
      })
    },
    changeOpenPay(row) {

      this.$confirm(this.$t('liveWeb.liveVideo.confirmChangeOpenPayDialog.message', {openPay: row.openPay === '0' ? '禁' : '启'}), this.$t('liveWeb.liveVideo.confirmChangeOpenPayDialog.title'), {
        confirmButtonText: this.$t('liveWeb.liveVideo.confirmChangeOpenPayDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveVideo.confirmChangeOpenPayDialog.cancelButton'),
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
        stick: true
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
        stick: false
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
      this.$prompt('', this.$t('liveWeb.liveVideo.confirmSetSortPrompt.title'), {
        confirmButtonText: this.$t('liveWeb.liveVideo.confirmSetSortPrompt.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveVideo.confirmSetSortPrompt.cancelButton'),
        inputType: 'number',
        inputPlaceholder: this.$t('liveWeb.liveVideo.confirmSetSortPrompt.inputPlaceholder'),
        inputPattern: /^[1-9][0-9]?$/,
        inputErrorMessage: this.$t('liveWeb.liveVideo.confirmSetSortPrompt.inputErrorMessage')
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
    },

    /** 同步主台排序 Sync Master Sorting */
    synchronizeOrder(){
        this.$confirm(this.$t('liveWeb.liveVideo.synchronizeOrderDialog.message'), {
          confirmButtonText: this.$t('liveWeb.liveVideo.synchronizeOrderDialog.confirmButton'),
          cancelButtonText: this.$t('liveWeb.liveVideo.synchronizeOrderDialog.cancelButton'),
          type: 'warning'
        }).then(() => {
          resetSynchronizeOrder().then(res=>{
            this.getList()
          })
        })
    }


  }
}
</script>
