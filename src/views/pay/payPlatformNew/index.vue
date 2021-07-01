<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="平台名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入平台名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="平台编码" prop="code">
        <el-input
          v-model="queryParams.code"
          placeholder="请输入平台编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="下单地址" prop="platPayUrl">
        <el-input
          v-model="queryParams.platPayUrl"
          placeholder="请输入下单接口地址"
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
          v-hasPermi="['pay:payPlatformNew:add']"
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
          v-hasPermi="['pay:payPlatformNew:edit']"
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
          v-hasPermi="['pay:payPlatformNew:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['pay:payPlatformNew:export']"
        >导出
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleConfig"
          v-hasPermi="['pay:payPlatformNew:config']"
        >对接配置
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :stripe="true" v-loading="loading" :data="payPlatformNewList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="平台名称" align="center" prop="name" width="150"/>
      <el-table-column label="平台编码" align="center" prop="code" width="130"/>
      <el-table-column label="平台下单接口地址" :show-overflow-tooltip="true" align="center" prop="platPayUrl"/>
      <el-table-column label="平台订单查询地址" :show-overflow-tooltip="true" align="center" prop="platQueryUrl"/>
      <el-table-column label="操作" align="center" fixed="right" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['pay:payPlatformNew:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['pay:payPlatformNew:remove']"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[20,50,100]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改【支付平台】对话框 -->
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="open" width="770px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="135px">
        <el-form-item label="名称" prop="name">
          <el-input v-model.trim="form.name" placeholder="请输入平台名称"/>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input v-model.trim="form.code" placeholder="请输入平台编码"/>
        </el-form-item>
        <el-form-item label="商户ID" prop="merId">
          <el-input v-model.trim="form.merId" placeholder="请输入商户ID"/>
        </el-form-item>
        <el-form-item label="机构号" prop="orgId">
          <el-input v-model.trim="form.orgId" placeholder="请输入机构号"/>
        </el-form-item>
        <el-form-item label="平台下单接口地址" prop="platPayUrl">
          <el-input v-model.trim="form.platPayUrl" placeholder="请输入平台下单接口地址"/>
        </el-form-item>
        <el-form-item label="平台订单查询地址" prop="platQueryUrl">
          <el-input v-model.trim="form.platQueryUrl" placeholder="请输入平台订单查询地址"/>
        </el-form-item>
        <el-form-item label="MD5_key" prop="signMd5">
          <el-input v-model.trim="form.signMd5" placeholder="请输入MD5_key"/>
        </el-form-item>
        <el-form-item label="加密公钥" prop="signPublicKey">
          <el-input v-model.trim="form.signPublicKey" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="解密私钥" prop="signPrivateKey">
          <el-input v-model.trim="form.signPrivateKey" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="平台IP白名单" prop="platWhiteIpList">
          <el-input v-model.trim="form.platWhiteIpList" type="textarea" placeholder="请输入平台IP白名单"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 对接配置 -->
    <el-dialog :close-on-click-modal="false" title="对接配置" :visible.sync="configOpen" width="900px" append-to-body>
      <el-form ref="configForm" :model="configForm" :rules="configFormRules" label-width="210px">
        <el-form-item label="支付平台名称" prop="payPlatfrom">
          <el-input v-model="configForm.payPlatfrom" placeholder="请输入支付平台名称" />
        </el-form-item>
        <el-form-item label="支付平台编码" prop="payCode">
          <el-input v-model="configForm.payCode" placeholder="请输入支付平台编码" />
        </el-form-item>
        <el-form-item label="下单商户ID参数名称" prop="payMerid">
          <el-input v-model="configForm.payMerid" placeholder="请输入下单商户ID参数名称" />
        </el-form-item>
        <el-form-item label="支付通道参数名称" prop="payMethod">
          <el-input v-model="configForm.payMethod" placeholder="请输入支付通道参数名称" />
        </el-form-item>
        <el-form-item label="下单订单号参数名称" prop="payOrderno">
          <el-input v-model="configForm.payOrderno" placeholder="请输入下单订单号参数名称" />
        </el-form-item>
        <el-form-item label="下单金额参数名称" prop="payMoney">
          <el-input v-model="configForm.payMoney" placeholder="请输入下单金额参数名称,以逗号分隔,后面0为元，1为分" />
        </el-form-item>
        <el-form-item label="回调地址参数名称" prop="payCallbackurl">
          <el-input v-model="configForm.payCallbackurl" placeholder="请输入回调地址参数名称" />
        </el-form-item>
        <el-form-item label="下单成功跳转地址参数名称" prop="payReturnurl">
          <el-input v-model="configForm.payReturnurl" placeholder="请输入下单成功跳转地址参数名称" />
        </el-form-item>
        <el-form-item label="下单IP参数名称" prop="payIp">
          <el-input v-model="configForm.payIp" placeholder="请输入下单IP参数名称" />
        </el-form-item>
        <el-form-item label="下单应用ID参数名称" prop="payAppid">
          <el-input v-model="configForm.payAppid" placeholder="请输入下单应用ID参数名称" />
        </el-form-item>
        <el-form-item label="下单时间戳参数名称" prop="payTimesecond">
          <el-input v-model="configForm.payTimesecond" placeholder="请输入下单时间戳参数名称,以逗号分隔,后面0为秒，1为毫秒" />
        </el-form-item>
        <el-form-item label="下单时间格式参数" prop="payTime">
          <el-input v-model="configForm.payTime" placeholder="请输入下单时间格式参数,以逗号分隔,后面 0为yyyy-mm-dd HH:mm:ss, 1为yyyyMMddHHmmss" />
        </el-form-item>
        <el-form-item label="下单UUID任意值参数名称" prop="payUuidname">
          <el-input v-model="configForm.payUuidname" placeholder="请输入下单UUID任意值参数名称" />
        </el-form-item>
        <el-form-item label="下单额外参数param1" prop="payParam1">
          <el-input v-model="configForm.payParam1" placeholder="请输入下单额外参数param1" />
        </el-form-item>
        <el-form-item label="下单额外参数param2" prop="payParam2">
          <el-input v-model="configForm.payParam2" placeholder="请输入下单额外参数param2" />
        </el-form-item>
        <el-form-item label="下单额外参数param3" prop="payParam3">
          <el-input v-model="configForm.payParam3" placeholder="请输入下单额外参数param3" />
        </el-form-item>
        <el-form-item label="下单固定值额外参数param4" prop="payParam4">
          <el-input v-model="configForm.payParam4" placeholder="请输入下单固定值额外参数param4,以逗号分割" />
        </el-form-item>
        <el-form-item label="下单固定值额外参数param5" prop="payParam5">
          <el-input v-model="configForm.payParam5" placeholder="请输入下单固定值额外参数param5,以逗号分割" />
        </el-form-item>
        <el-form-item label="下单签名参数名称" prop="paySign">
          <el-input v-model="configForm.paySign" placeholder="请输入下单签名参数名称" />
        </el-form-item>
        <el-form-item label="下单加密排序方式" prop="paySort">
          <el-select v-model="paySort" placeholder="请选择下单加密排序方式" clearable>
            <el-option
              v-for="item in paysortOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下单拼接密钥方式" prop="paySplice">
          <el-select v-model="paySplice" placeholder="请选择下单拼接密钥方式 0为&key= 1为key= 2为直接拼接" clearable>
            <el-option
              v-for="item in payspliceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下单MD5加密转大小写" prop="payCase">
          <el-select v-model="payCase" placeholder="下单MD5加密转大小写 0转大写 1转小写" clearable>
            <el-option
              v-for="item in paycaseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下单请求方式" prop="payHttpmethod">
          <el-select v-model="payHttpmethod" placeholder="下单请求方式 0为FORM_URLENCODED 1为FROM_DATA 2为JSON 3为Get" clearable>
            <el-option
              v-for="item in payhttpmethodOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下单返回值类型" prop="payReturntype">
          <el-select v-model="payReturntype" placeholder="下单返回值类型 0为String 1为Map 2为html页面" clearable>
            <el-option
              v-for="item in payreturntypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下单返回状态判断参数名称" prop="payStatus">
          <el-input v-model="configForm.payStatus" placeholder="请输入下单返回状态判断参数名称,以逗号分隔,后面是成功下单的值" />
        </el-form-item>
        <el-form-item label="下单返回嵌套map的参数名称" prop="payMapname">
          <el-input v-model="configForm.payMapname" placeholder="请输入下单返回嵌套map的参数名称，如没有为空" />
        </el-form-item>
        <el-form-item label="返回链接参数名称" prop="payUrl">
          <el-input v-model="configForm.payUrl" placeholder="请输入返回链接参数名称" />
        </el-form-item>
        <el-form-item label="返回失败原因参数名称" prop="payFailreason">
          <el-input v-model="configForm.payFailreason" placeholder="请输入返回失败原因参数名称" />
        </el-form-item>
        <el-form-item label="回调请求方式" prop="callbackMethod">
          <el-select v-model="callbackMethod" placeholder="回调请求方式 0为FORM_URLENCODED 1为FROM_DATA 2为JSON 3为Get" clearable>
            <el-option
              v-for="item in callbackmethodOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回调加密排序方式" prop="callbackSort">
          <el-select v-model="callbackSort" placeholder="请选择回调加密排序方式 0为ASCII码排序" clearable>
            <el-option
              v-for="item in callbacksortOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回调拼接密钥方式" prop="callbackSplice">
          <el-select v-model="callbackSplice" placeholder="请选择回调拼接密钥方式 0为&key= 1为key= 2为直接拼接" clearable>
            <el-option
              v-for="item in callbackspliceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回调商户订单号参数名称" prop="callbackOrderno">
          <el-input v-model="configForm.callbackOrderno" placeholder="请输入回调商户订单号参数名称" />
        </el-form-item>
        <el-form-item label="回调三方平台订单号参数名称" prop="callbackSanorderno">
          <el-input v-model="configForm.callbackSanorderno" placeholder="请输入回调三方平台订单号参数名称" />
        </el-form-item>
        <el-form-item label="回调去除参数param1名称" prop="callbackParam1">
          <el-input v-model="configForm.callbackParam1" placeholder="请输入回调去除参数param1名称" />
        </el-form-item>
        <el-form-item label="回调去除参数param2名称" prop="callbackParam2">
          <el-input v-model="configForm.callbackParam2" placeholder="请输入回调去除参数param2名称" />
        </el-form-item>
        <el-form-item label="回调状态判断参数名称" prop="callbackStatus">
            <el-input v-model="configForm.callbackStatus" placeholder="请输入回调状态判断参数名称,以逗号分隔，后面成功回调的值" />
        </el-form-item>
        <el-form-item label="回调金额参数名称" prop="callbackMoney">
          <el-input v-model="configForm.callbackMoney" placeholder="请输入回调金额参数名称,以逗号分隔，后面0为元，1为分 " />
        </el-form-item>
        <el-form-item label="回调成功返回参数名称" prop="callbackSuccess">
          <el-input v-model="configForm.callbackSuccess" placeholder="请输入回调成功返回参数名称,以逗号分隔，后面是回调成功的值" />
        </el-form-item>
        <el-form-item label="查询商户ID参数名称" prop="queryMerid">
          <el-input v-model="configForm.queryMerid" placeholder="请输入查询商户ID参数名称" />
        </el-form-item>
        <el-form-item label="查询订单号参数名称" prop="queryOrderno">
          <el-input v-model="configForm.queryOrderno" placeholder="请输入查询订单号参数名称" />
        </el-form-item>
        <el-form-item label="查询时间戳参数名称" prop="queryTimesecond">
          <el-input v-model="configForm.queryTimesecond" placeholder="请输入查询时间戳参数名称,以逗号分隔,后面0为秒，1为毫秒" />
        </el-form-item>
        <el-form-item label="查询时间格式参数" prop="queryTime">
          <el-input v-model="configForm.queryTime" placeholder="请输入查询时间格式参数,以逗号分隔,后面 0为yyyy-mm-dd HH:mm:ss, 1为yyyyMMddHHmmss" />
        </el-form-item>
        <el-form-item label="查询UUID任意值参数名称" prop="queryUuidname">
          <el-input v-model="configForm.queryUuidname" placeholder="请输入查询UUID任意值参数名称" />
        </el-form-item>
        <el-form-item label="查询应用ID参数名称" prop="queryAppid">
          <el-input v-model="configForm.queryAppid" placeholder="请输入查询应用ID参数名称" />
        </el-form-item>
        <el-form-item label="查询固定值额外参数param1" prop="queryParam1">
          <el-input v-model="configForm.queryParam1" placeholder="请输入查询额外参数param1，以逗号分隔" />
        </el-form-item>
        <el-form-item label="查询签名参数名称" prop="querySign">
          <el-input v-model="configForm.querySign" placeholder="请输入查询签名参数名称" />
        </el-form-item>
        <el-form-item label="查询加密排序方式" prop="querySort">
          <template>
           <el-select v-model="querySort" placeholder="请选择查询加密排序方式 0为ASCII码排序" clearable>
            <el-option
              v-for="item in querysortOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
           </el-select>
          </template>
        </el-form-item>
        <el-form-item label="查询拼接密钥方式" prop="querySplice">
          <el-select v-model="querySplice" placeholder="请选择查询拼接密钥方式 0为&key= 1为key= 2为直接拼接" clearable>
            <el-option
              v-for="item in queryspliceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="查询MD5加密转大小写" prop="queryCase">
          <el-select v-model="queryCase" placeholder="查询MD5加密转大小写 0转大写 1转小写" clearable>
            <el-option
              v-for="item in querycaseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="查询请求方式" prop="queryHttpmethod">
          <el-select v-model="queryHttpmethod" placeholder="查询请求方式 0为FORM_URLENCODED 1为FROM_DATA 2为JSON 3为Get" clearable>
            <el-option
              v-for="item in queryhttpmethodOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="查询返回值类型" prop="queryReturntype">
          <el-select v-model="queryReturntype" placeholder="查询返回值类型 0为String 1为Map" clearable>
            <el-option
              v-for="item in queryreturntypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="查询返回状态判断参数名称" prop="queryStatus">
          <el-input v-model="configForm.queryStatus" placeholder="请输入查询返回状态判断参数名称,以逗号分隔，后面是查询成功的值" />
        </el-form-item>
        <el-form-item label="查询返回嵌套map的参数名称" prop="queryMapname">
          <el-input v-model="configForm.queryMapname" placeholder="请输入查询返回嵌套map的参数名称，如没有为空" />
        </el-form-item>
        <el-form-item label="查询返回金额参数名称" prop="queryMoney">
          <el-input v-model="configForm.queryMoney" placeholder="请输入查询返回金额参数名称" />
        </el-form-item>
        <el-form-item label="查询返回平台订单号参数名称" prop="querySanorderno">
          <el-input v-model="configForm.querySanorderno" placeholder="请输入查询返回平台订单号参数名称" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitConfigForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listPayPlatformNew,
  getPayPlatformNew,
  delPayPlatformNew,
  addPayPlatformNew,
  updatePayPlatformNew,
  exportPayPlatformNew,
  addPayPlatformConfig
} from "@/api/platform-web/pay/payPlatformNew";

export default {
  name: "PayPlatformNew",
  components: {},
  data() {
    return {
      paysortOptions: [{
        value: 0,
        label: 'ASCII码排序'
      }],
      payspliceOptions: [{
        value: 0,
        label: '&key='
      } , {
        value: 1,
        label: '&key'
      } , {
        value: 2,
        label: '直接拼接'
      }],
      paycaseOptions: [{
        value: 0,
        label: '大写'
      } , {
        value: 1,
        label: '小写'
      }],
      payhttpmethodOptions: [{
        value: 0,
        label: 'FORM_URLENCODED'
      } , {
        value: 1,
        label: 'FROM_DATA'
      } , {
        value: 2,
        label: 'JSON'
      } , {
        value: 3,
        label: 'GET'
      }],
      payreturntypeOptions: [{
        value: 0,
        label: 'String'
      } , {
        value: 1,
        label: 'Map'
      }],

      callbacksortOptions: [{
        value: 0,
        label: 'ASCII码排序'
      }],
      callbackmethodOptions: [{
        value: 0,
        label: 'FORM_URLENCODED'
      } , {
        value: 1,
        label: 'FROM_DATA'
      } , {
        value: 2,
        label: 'JSON'
      } , {
        value: 3,
        label: 'GET'
      }],
      callbackspliceOptions: [{
        value: 0,
        label: '&key='
      } , {
        value: 1,
        label: '&key'
      } , {
        value: 2,
        label: '直接拼接'
      }],

      querysortOptions: [{
        value: 0,
        label: 'ASCII码排序'
      }],
      queryspliceOptions: [{
        value: 0,
        label: '&key='
      } , {
        value: 1,
        label: '&key'
      } , {
        value: 2,
        label: '直接拼接'
      }],
      querycaseOptions: [{
        value: 0,
        label: '大写'
      } , {
        value: 1,
        label: '小写'
      }],
      queryhttpmethodOptions: [{
        value: 0,
        label: 'FORM_URLENCODED'
      } , {
        value: 1,
        label: 'FROM_DATA'
      } , {
        value: 2,
        label: 'JSON'
      } , {
        value: 3,
        label: 'GET'
      }],
      queryreturntypeOptions: [{
        value: 0,
        label: 'String'
      } , {
        value: 1,
        label: 'Map'
      }],

      //对接配置参数
      payPlatfrom: null,
      payCode: null,
      payMerid: null,
      payMethod: null,
      payOrderno: null,
      payMoney: null,
      payCallbackurl: null,
      payReturnurl: null,
      payIp: null,
      payAppid: null,
      payTimesecond: null,
      payTime: null,
      payUuidname: null,
      payParam1: null,
      payParam2: null,
      payParam3: null,
      payParam4: null,
      payParam5: null,
      paySign: null,
      paySort: null,
      paySplice: null,
      payCase: null,
      payHttpmethod: null,
      payReturntype: null,
      payStatus: null,
      payMapname: null,
      payUrl: null,
      payFailreason: null,
      callbackOrderno: null,
      callbackSanorderno: null,
      callbackParam1: null,
      callbackParam2: null,
      callbackMethod: null,
      callbackSort: null,
      callbackSplice: null,
      callbackStatus: null,
      callbackMoney: null,
      callbackSuccess: null,
      queryMerid: null,
      queryOrderno: null,
      queryTimesecond: null,
      queryTime: null,
      queryUuidname: null,
      queryAppid: null,
      queryParam1: null,
      querySign: null,
      querySort: null,
      querySplice: null,
      queryCase: null,
      queryHttpmethod: null,
      queryReturntype: null,
      queryStatus: null,
      queryMapname: null,
      queryMoney: null,
      querySanorderno: null,

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
      // 【支付平台】表格数据
      payPlatformNewList: [],
      // 弹出层标题
      title: "支付平台",
      // 是否显示弹出层
      open: false,
      configOpen: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        name: null,
        code: null,
        merId: null,
        orgId: null,
        platPayUrl: null,
        platQueryUrl: null,
        signMd5: null,
        signPublicKey: null,
        signPrivateKey: null,
        platWhiteIpList: null,
        creator: null,
        updator: null,
        orderByColumn: 'createTime',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      //对接配置表单
      configForm: {},
      // 表单校验
      rules: {
        name: [
          {required: true, message: "平台名称不能为空", trigger: "blur"}
        ],
        code: [
          {required: true, message: "平台编码不能为空", trigger: "blur"}
        ],
        merId: [
          {required: true, message: "商户ID不能为空", trigger: "blur"}
        ],
        platPayUrl: [
          {required: true, message: "平台下单接口地址不能为空", trigger: "blur"}
        ],
      },
      configFormRules: {
        payPlatfrom: [
          {required: true, message: "支付平台名称不能为空", trigger: "blur"}
        ],
        payCode: [
          {required: true, message: "支付平台编码不能为空", trigger: "blur"}
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询【支付平台】列表 */
    getList() {
      this.loading = true;
      listPayPlatformNew(this.queryParams).then(response => {
        this.payPlatformNewList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.configOpen = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        name: null,
        code: null,
        merId: null,
        orgId: null,
        platPayUrl: null,
        platQueryUrl: null,
        signMd5: null,
        signPublicKey: null,
        signPrivateKey: null,
        platWhiteIpList: null,
        creator: null,
        createTime: null,
        updator: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    // 表单重置
    resetConfig() {
      this.configForm = {
        payPlatfrom: null,
        payCode: null,
        payMerid: null,
        payMethod: null,
        payOrderno: null,
        payMoney: null,
        payCallbackurl: null,
        payReturnurl: null,
        payIp: null,
        payAppid: null,
        payTimesecond: null,
        payTime: null,
        payUuidname: null,
        payParam1: null,
        payParam2: null,
        payParam3: null,
        payParam4: null,
        payParam5: null,
        paySign: null,
        paySort: null,
        paySplice: null,
        payCase: null,
        payHttpmethod: null,
        payReturntype: null,
        payStatus: null,
        payMapname: null,
        payUrl: null,
        payFailreason: null,
        callbackOrderno: null,
        callbackSanorderno: null,
        callbackParam1: null,
        callbackParam2: null,
        callbackMethod: null,
        callbackSort: null,
        callbackSplice: null,
        callbackStatus: null,
        callbackMoney: null,
        callbackSuccess: null,
        queryMerid: null,
        queryOrderno: null,
        queryTimesecond: null,
        queryTime: null,
        queryUuidname: null,
        queryAppid: null,
        queryParam1: null,
        querySign: null,
        querySort: null,
        querySplice: null,
        queryCase: null,
        queryHttpmethod: null,
        queryReturntype: null,
        queryStatus: null,
        queryMapname: null,
        queryMoney: null,
        querySanorderno: null
      };
      this.resetForm("configForm");
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
      this.title = "添加【支付平台】";
    },
    /** 对接配置按钮操作 */
    handleConfig() {
      this.resetConfig();
      this.configOpen = true;
      this.title = "支付平台对接配置";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getPayPlatformNew(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改【支付平台】";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updatePayPlatformNew(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPayPlatformNew(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 对接配置提交按钮 */
    submitConfigForm() {
      this.$refs["configForm"].validate(valid => {
        if (valid) {
          addPayPlatformConfig(this.configForm).then(response => {
            this.msgSuccess("配置提交成功");
            this.configOpen = false;
          });
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除【支付平台】编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delPayPlatformNew(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return exportPayPlatformNew(queryParams);
      }).then(response => {
        this.downloadExcel(response, '支付平台')
      }).catch(() => {
      })
    }
  }
};
</script>
