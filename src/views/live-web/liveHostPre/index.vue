<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item prop="dateDay">
        <el-date-picker clearable size="small"
                        v-model="queryParams.dateDay"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :placeholder="$t('liveWeb.liveHostPre.queryForm.dateDayPlaceholder')"
                        style="width: 150px"
                        :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-select v-model="queryParams.live" :placeholder="$t('liveWeb.liveHostPre.queryForm.livePlaceholder')" style="width: 150px" size="small" clearable multiple collapse-tags>
          <el-option :label="$t('liveWeb.liveHostPre.queryForm.liveLabel', {num:0})" value="0"></el-option>
          <el-option :label="$t('liveWeb.liveHostPre.queryForm.liveLabel', {num:1})" value="1"></el-option>
          <el-option :label="$t('liveWeb.liveHostPre.queryForm.liveLabel', {num:2})" value="2"></el-option>
          <el-option :label="$t('liveWeb.liveHostPre.queryForm.liveLabel', {num:3})" value="3"></el-option>
          <el-option :label="$t('liveWeb.liveHostPre.queryForm.liveLabel', {num:4})" value="4"></el-option>
          <el-option :label="$t('liveWeb.liveHostPre.queryForm.liveLabel', {num:5})" value="5"></el-option>
          <el-option :label="$t('liveWeb.liveHostPre.queryForm.liveLabel', {num:6})" value="6"></el-option>
          <el-option :label="$t('liveWeb.liveHostPre.queryForm.liveLabel', {num:7})" value="7"></el-option>
          <el-option :label="$t('liveWeb.liveHostPre.queryForm.liveLabel', {num:8})" value="8"></el-option>
          <el-option :label="$t('liveWeb.liveHostPre.queryForm.liveLabel', {num:9})" value="9"></el-option>
          <el-option :label="$t('liveWeb.liveHostPre.queryForm.liveLabel', {num:10})" value="10"></el-option>
          <el-option :label="$t('liveWeb.liveHostPre.queryForm.liveLabel', {num:11})" value="11"></el-option>
          <el-option :label="$t('liveWeb.liveHostPre.queryForm.liveLabel', {num:12})" value="12"></el-option>
          <el-option :label="$t('liveWeb.liveHostPre.queryForm.liveLabel', {num:13})" value="13"></el-option>
          <el-option :label="$t('liveWeb.liveHostPre.queryForm.liveLabel', {num:14})" value="14"></el-option>
          <el-option :label="$t('liveWeb.liveHostPre.queryForm.liveLabel', {num:15})" value="15"></el-option>
          <el-option :label="$t('liveWeb.liveHostPre.queryForm.liveLabel', {num:16})" value="16"></el-option>
          <el-option :label="$t('liveWeb.liveHostPre.queryForm.liveLabel', {num:17})" value="17"></el-option>
          <el-option :label="$t('liveWeb.liveHostPre.queryForm.liveLabel', {num:18})" value="18"></el-option>
          <el-option :label="$t('liveWeb.liveHostPre.queryForm.liveLabel', {num:19})" value="19"></el-option>
          <el-option :label="$t('liveWeb.liveHostPre.queryForm.liveLabel', {num:20})" value="20"></el-option>
          <el-option :label="$t('liveWeb.liveHostPre.queryForm.liveLabel', {num:21})" value="21"></el-option>
          <el-option :label="$t('liveWeb.liveHostPre.queryForm.liveLabel', {num:22})" value="22"></el-option>
          <el-option :label="$t('liveWeb.liveHostPre.queryForm.liveLabel', {num:23})" value="23"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="familyId">
        <el-input
          style="width: 150px"
          v-model="queryParams.familyId"
          :placeholder="$t('liveWeb.liveHostPre.queryForm.familyIdPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="hostId">
        <el-input
          style="width: 150px"
          v-model="queryParams.hostId"
          :placeholder="$t('liveWeb.liveHostPre.queryForm.hostId')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="hostName">
        <el-input
          style="width: 150px"
          v-model="queryParams.hostName"
          :placeholder="$t('liveWeb.liveHostPre.queryForm.hostName')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="status">
        <el-select
          v-model="queryParams.status"
          :placeholder="$t('liveWeb.liveHostPre.queryForm.statusPlaceholder')"
          clearable
          size="small"
          style="width: 130px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('liveWeb.liveHostPre.queryForm.searchButton')}}</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:liveHostPre:export']"
        >{{$t('liveWeb.liveHostPre.actions.export')}}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="liveHostPreList" @selection-change="handleSelectionChange">
      <el-table-column :label="$t('liveWeb.liveHostPre.table.id')" align="center" prop="id" min-width="160"/>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.familyId')" align="center" prop="familyId"/>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.hostId')" align="center" prop="hostId"/>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.hostName')" align="center" prop="hostName" min-width="100"/>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.status')" align="center" prop="status">
        <template slot-scope="scope">
        <span :style="{color: (status = statusOptions[scope.row.status]).color}">
            {{ status.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.live', {num:0})" align="center" prop="live0">
        <template slot-scope="scope">
          <span :style="{color: (live0 = liveOptions[parseInt(scope.row.live0)]).color}">
            {{ live0.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.live', {num:1})" align="center" prop="live1">
        <template slot-scope="scope">
          <span :style="{color: (live1 = liveOptions[parseInt(scope.row.live1)]).color}">
            {{ live1.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.live', {num:2})" align="center" prop="live2">
        <template slot-scope="scope">
          <span :style="{color: (live2 = liveOptions[parseInt(scope.row.live2)]).color}">
            {{ live2.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.live', {num:3})" align="center" prop="live3">
        <template slot-scope="scope">
          <span :style="{color: (live3 = liveOptions[parseInt(scope.row.live3)]).color}">
            {{ live3.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.live', {num:4})" align="center" prop="live4">
        <template slot-scope="scope">
          <span :style="{color: (live4 = liveOptions[parseInt(scope.row.live4)]).color}">
            {{ live4.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.live', {num:5})" align="center" prop="live5">
        <template slot-scope="scope">
          <span :style="{color: (live5 = liveOptions[parseInt(scope.row.live5)]).color}">
            {{ live5.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.live', {num:6})" align="center" prop="live6">
        <template slot-scope="scope">
          <span :style="{color: (live6 = liveOptions[parseInt(scope.row.live6)]).color}">
            {{ live6.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.live', {num:7})" align="center" prop="live7">
        <template slot-scope="scope">
          <span :style="{color: (live7 = liveOptions[parseInt(scope.row.live7)]).color}">
            {{ live7.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.live', {num:8})" align="center" prop="live8">
        <template slot-scope="scope">
          <span :style="{color: (live8 = liveOptions[parseInt(scope.row.live8)]).color}">
            {{ live8.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.live', {num:9})" align="center" prop="live9">
        <template slot-scope="scope">
          <span :style="{color: (live9 = liveOptions[parseInt(scope.row.live9)]).color}">
            {{ live9.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.live', {num:10})" align="center" prop="live10">
        <template slot-scope="scope">
          <span :style="{color: (live10 = liveOptions[parseInt(scope.row.live10)]).color}">
            {{ live10.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.live', {num:11})" align="center" prop="live11">
        <template slot-scope="scope">
          <span :style="{color: (live11 = liveOptions[parseInt(scope.row.live11)]).color}">
            {{ live11.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.live', {num:12})" align="center" prop="live12">
        <template slot-scope="scope">
          <span :style="{color: (live12 = liveOptions[parseInt(scope.row.live12)]).color}">
            {{ live12.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.live', {num:13})" align="center" prop="live13">
        <template slot-scope="scope">
          <span :style="{color: (live13 = liveOptions[parseInt(scope.row.live13)]).color}">
            {{ live13.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.live', {num:14})" align="center" prop="live14">
        <template slot-scope="scope">
          <span :style="{color: (live14 = liveOptions[parseInt(scope.row.live14)]).color}">
            {{ live14.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.live', {num:15})" align="center" prop="live15">
        <template slot-scope="scope">
          <span :style="{color: (live15 = liveOptions[parseInt(scope.row.live15)]).color}">
            {{ live15.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.live', {num:16})" align="center" prop="live16">
        <template slot-scope="scope">
          <span :style="{color: (live16 = liveOptions[parseInt(scope.row.live16)]).color}">
            {{ live16.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.live', {num:17})" align="center" prop="live17">
        <template slot-scope="scope">
          <span :style="{color: (live17 = liveOptions[parseInt(scope.row.live17)]).color}">
            {{ live17.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.live', {num:18})" align="center" prop="live18">
        <template slot-scope="scope">
          <span :style="{color: (live18 = liveOptions[parseInt(scope.row.live18)]).color}">
            {{ live18.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.live', {num:19})" align="center" prop="live19">
        <template slot-scope="scope">
          <span :style="{color: (live19 = liveOptions[parseInt(scope.row.live19)]).color}">
            {{ live19.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.live', {num:20})" align="center" prop="live20">
        <template slot-scope="scope">
          <span :style="{color: (live20 = liveOptions[parseInt(scope.row.live20)]).color}">
            {{ live20.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.live', {num:21})" align="center" prop="live21">
        <template slot-scope="scope">
          <span :style="{color: (live21 = liveOptions[parseInt(scope.row.live21)]).color}">
            {{ live21.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.live', {num:22})" align="center" prop="live22">
        <template slot-scope="scope">
          <span :style="{color: (live22 = liveOptions[parseInt(scope.row.live22)]).color}">
            {{ live22.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.live', {num:23})" align="center" prop="live23">
        <template slot-scope="scope">
          <span :style="{color: (live23 = liveOptions[parseInt(scope.row.live23)]).color}">
            {{ live23.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.remark')" align="center" prop="remark" min-width="120"/>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.createTime')" align="center" prop="createTime" min-width="200"/>
      <el-table-column :label="$t('liveWeb.liveHostPre.table.operation')" align="center" class-name="small-padding fixed-width" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="success"
            v-show="scope.row.status == 0"
            @click="handleUpdateStatus(scope.row,1)"
          >{{$t('liveWeb.liveHostPre.table.passButton')}}
          </el-button>
          <el-button
            size="small"
            type="danger"
            v-show="scope.row.status == 0"
            @click="handleUpdateStatus(scope.row,2)"
          >{{$t('liveWeb.liveHostPre.table.rejectButton')}}
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

    <!-- 添加或修改主播开播时间预约对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('liveWeb.liveHostPre.addDialog.familyIdLabel')" prop="familyId">
          <el-input v-model="form.familyId" :placeholder="$t('liveWeb.liveHostPre.addDialog.familyIdPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveHostPre.addDialog.hostIdLabel')" prop="hostId">
          <el-input v-model="form.hostId" :placeholder="$t('liveWeb.liveHostPre.addDialog.hostIdPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveHostPre.addDialog.hostNameLabel')" prop="hostName">
          <el-input v-model="form.hostName" :placeholder="$t('liveWeb.liveHostPre.addDialog.hostNamePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveHostPre.addDialog.statusLabel')">
          <el-radio-group v-model="form.status">
            <el-radio label="1">{{$t('liveWeb.liveHostPre.addDialog.statusPlaceholder')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveHostPre.addDialog.liveLabel')" prop="live0">
          <el-input v-model="form.live0" :placeholder="$t('liveWeb.liveHostPre.addDialog.livePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveHostPre.addDialog.liveLabel')" prop="live1">
          <el-input v-model="form.live1" :placeholder="$t('liveWeb.liveHostPre.addDialog.livePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveHostPre.addDialog.liveLabel')" prop="live2">
          <el-input v-model="form.live2" :placeholder="$t('liveWeb.liveHostPre.addDialog.livePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveHostPre.addDialog.liveLabel')" prop="live3">
          <el-input v-model="form.live3" :placeholder="$t('liveWeb.liveHostPre.addDialog.livePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveHostPre.addDialog.liveLabel')" prop="live4">
          <el-input v-model="form.live4" :placeholder="$t('liveWeb.liveHostPre.addDialog.livePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveHostPre.addDialog.liveLabel')" prop="live5">
          <el-input v-model="form.live5" :placeholder="$t('liveWeb.liveHostPre.addDialog.livePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveHostPre.addDialog.liveLabel')" prop="live6">
          <el-input v-model="form.live6" :placeholder="$t('liveWeb.liveHostPre.addDialog.livePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveHostPre.addDialog.liveLabel')" prop="live7">
          <el-input v-model="form.live7" :placeholder="$t('liveWeb.liveHostPre.addDialog.livePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveHostPre.addDialog.liveLabel')" prop="live8">
          <el-input v-model="form.live8" :placeholder="$t('liveWeb.liveHostPre.addDialog.livePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveHostPre.addDialog.liveLabel')" prop="live9">
          <el-input v-model="form.live9" :placeholder="$t('liveWeb.liveHostPre.addDialog.livePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveHostPre.addDialog.liveLabel')" prop="live10">
          <el-input v-model="form.live10" :placeholder="$t('liveWeb.liveHostPre.addDialog.livePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveHostPre.addDialog.liveLabel')" prop="live11">
          <el-input v-model="form.live11" :placeholder="$t('liveWeb.liveHostPre.addDialog.livePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveHostPre.addDialog.liveLabel')" prop="live12">
          <el-input v-model="form.live12" :placeholder="$t('liveWeb.liveHostPre.addDialog.livePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveHostPre.addDialog.liveLabel')" prop="live13">
          <el-input v-model="form.live13" :placeholder="$t('liveWeb.liveHostPre.addDialog.livePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveHostPre.addDialog.liveLabel')" prop="live14">
          <el-input v-model="form.live14" :placeholder="$t('liveWeb.liveHostPre.addDialog.livePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveHostPre.addDialog.liveLabel')" prop="live15">
          <el-input v-model="form.live15" :placeholder="$t('liveWeb.liveHostPre.addDialog.livePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveHostPre.addDialog.liveLabel')" prop="live16">
          <el-input v-model="form.live16" :placeholder="$t('liveWeb.liveHostPre.addDialog.livePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveHostPre.addDialog.liveLabel')" prop="live17">
          <el-input v-model="form.live17" :placeholder="$t('liveWeb.liveHostPre.addDialog.livePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveHostPre.addDialog.liveLabel')" prop="live18">
          <el-input v-model="form.live18" :placeholder="$t('liveWeb.liveHostPre.addDialog.livePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveHostPre.addDialog.liveLabel')" prop="live20">
          <el-input v-model="form.live20" :placeholder="$t('liveWeb.liveHostPre.addDialog.livePlaceholder')"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{$t('liveWeb.liveHostPre.addDialog.confirmButton')}}</el-button>
        <el-button @click="cancel">{{$t('liveWeb.liveHostPre.addDialog.cancelButton')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listLiveHostPre,
  getLiveHostPre,
  delLiveHostPre,
  addLiveHostPre,
  updateLiveHostPre,
  exportLiveHostPre
} from "@/api/live-web/liveHostPre/liveHostPre";
import {concat} from "lodash";
import {toyesDayshortcuts} from "@/utils/dateUtils";

export default {
  name: "LiveHostPre",
  components: {},
  data() {
    return {
      pickerOptions: {shortcuts: toyesDayshortcuts},
      // 遮罩层
      loading: true,
      // 状态字典
      statusOptions: [],
      liveOptions: [],
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
      // 主播开播时间预约表格数据
      liveHostPreList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        dateDay: this.parseTime(new Date(), '{y}-{m}-{d}'),
        pageNum: 1,
        pageSize: 10,
        familyId: null,
        hostId: null,
        hostName: null,
        status: null,
        live: null,
        live0: null,
        live1: null,
        live2: null,
        live3: null,
        live4: null,
        live5: null,
        live6: null,
        live7: null,
        live8: null,
        live9: null,
        live10: null,
        live11: null,
        live12: null,
        live13: null,
        live14: null,
        live15: null,
        live16: null,
        live17: null,
        live18: null,
        live19: null,
        live20: null,
        live21: null,
        live22: null,
        live23: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    };
  },
  created() {
    this.getList();
    this.getDicts('liveHostPre_status').then(response => {
      this.statusOptions = response.data
    })
    this.getDicts('liveHostPre_live').then(response => {
      this.liveOptions = response.data
    })
  },
  methods: {
    /** 查询主播开播时间预约列表 */
    getList() {
      this.loading = true;
      listLiveHostPre(this.queryParams).then(response => {
        this.liveHostPreList = response.rows;
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
        hostName: null,
        status: 0,
        live: 0,
        live0: null,
        live1: null,
        live2: null,
        live3: null,
        live4: null,
        live5: null,
        live6: null,
        live7: null,
        live8: null,
        live9: null,
        live10: null,
        live11: null,
        live12: null,
        live13: null,
        live14: null,
        live15: null,
        live16: null,
        live17: null,
        live18: null,
        live19: null,
        live20: null,
        live21: null,
        live22: null,
        live23: null
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
      this.title = this.$t('liveWeb.liveHostPre.addDialog.title');
    },
    /** 通过驳回按钮操作 */
    handleUpdateStatus(row, flag) {
      var data = {}
      data.id = row.id
      if (flag == 1) {
        data.status = 1

        this.$confirm(this.$t('liveWeb.liveHostPre.confirmUpdateStatusFlag1Dialog.message', {hostName: row.hostName}), this.$t('liveWeb.liveHostPre.confirmUpdateStatusFlag1Dialog.title'), {
          confirmButtonText: this.$t('liveWeb.liveHostPre.confirmUpdateStatusFlag1Dialog.confirmButton'),
          cancelButtonText: this.$t('liveWeb.liveHostPre.confirmUpdateStatusFlag1Dialog.cancelButton'),
          type: 'warning'
        }).then(function () {
          return updateLiveHostPre(data)
        }).then(() => {
          this.getList()
          this.msgSuccess(this.$t('liveWeb.liveHostPre.messageBox.updateStatusFlag1Success'))
        })
      } else if (flag == 2) {
        data.status = 2
        this.$prompt(this.$t('liveWeb.liveHostPre.confirmUpdateStatusFlag2Prompt.message'), this.$t('liveWeb.liveHostPre.confirmUpdateStatusFlag2Prompt.title'), {
          confirmButtonText: this.$t('liveWeb.liveHostPre.confirmUpdateStatusFlag2Prompt.confirmButton'),
          cancelButtonText: this.$t('liveWeb.liveHostPre.confirmUpdateStatusFlag2Prompt.cancelButton'),
          inputPattern: /\S/,
          inputErrorMessage: this.$t('liveWeb.liveHostPre.confirmUpdateStatusFlag2Prompt.inputErrorMessage'),
          type: 'warning'
        }).then(({value}) => {
          data.remark = value
          updateLiveHostPre(data).then(response => {
            this.msgSuccess(this.$t('liveWeb.liveHostPre.messageBox.updateStatusFlag2Success'))
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('liveWeb.liveHostPre.messageBox.updateStatusFlag2Cancel')
          });
        })
      }
    },
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLiveHostPre(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改主播开播时间预约";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLiveHostPre(this.form).then(response => {
              this.msgSuccess(this.$t('liveWeb.liveHostPre.messageBox.updateLiveHostPreSuccess'));
              this.open = false;
              this.getList();
            });
          } else {
            addLiveHostPre(this.form).then(response => {
              this.msgSuccess(this.$t('liveWeb.liveHostPre.messageBox.addLiveHostPreSuccess'));
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
      this.$confirm('是否确认删除主播开播时间预约编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delLiveHostPre(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;

      this.$confirm(this.$t('liveWeb.liveHostPre.confirmExportDialog.message'), this.$t('liveWeb.liveHostPre.confirmExportDialog.title'), {
        confirmButtonText: this.$t('liveWeb.liveHostPre.confirmExportDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveHostPre.confirmExportDialog.cancelButton'),
        type: "warning"
      }).then(function () {
        return exportLiveHostPre(queryParams);
      }).then(response => {
        this.downloadExcel(response, '主播开播时间预约');
      }).catch(() => {
      })
    }
  }
};
</script>
