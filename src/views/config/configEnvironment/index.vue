<template>
  <div class="app-container">
    <template>
      <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
        <el-form-item label="参数名称" prop="envTitle">
          <el-select v-model="titleCode.envTitle" @change="changeType" filterable placeholder="请选择参数名称">
            <el-option
              v-for="(item,index) in titleCodeList"
              :key="index"
              :label="item.envTitle"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参数编码" prop="envCode">
          <el-select v-model="titleCode.envCode" @change="changeType" filterable placeholder="请选择参数编码">
            <el-option
              v-for="(item,index) in titleCodeList"
              :key="index"
              :label="item.envCode"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <!-- <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>-->
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
            v-hasPermi="['admin:configEnvironment:add']"
          >新增
          </el-button>
        </el-col>
        <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
        <el-tab-pane v-for="(item,index) in tabList" :key="index" :label="item.dictLabel" :name="item.dictValue">
          <el-table :stripe="true" v-loading="loading" :data="configEnvironmentList" width="150px"
                    @selection-change="handleSelectionChange">
            <el-table-column label="参数名称" align="center" min-width="70">
              <template v-slot="{row}">
                <el-input
                  :class="row.envStatus === 0  ? 'ban' : ''"
                  v-model="row.envTitle"
                  placeholder="请输入参数名称"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column label="参数编码" align="center">
              <template v-slot="{row}">
                <span>{{row.envCode}}</span>
              </template>
            </el-table-column>

            <el-table-column label="参数值" min-width="80" align="center">
              <template v-slot="{row}">
                <el-input
                  :class="row.envStatus === 0  ? 'ban' : ''"
                  v-model="row.envValue"
                  :type="row.envCode == 'level_2_password' ? 'password' : 'text'"
                  placeholder="请输入参数值"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column label="序列号" width="100" align="center">
              <template v-slot="{row}">
                <el-input
                  type="number"
                  :class="row.envStatus === 0  ? 'ban' : ''"
                  v-model="row.envSort"
                  placeholder="请输入序列号"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column label="状态" width="100" align="center">
              <template v-slot="{row}">
                <el-select :class="row.envStatus === 0  ? 'ban' : ''"
                           v-model="row.envStatus" placeholder="请选择状态" size="small" @change="changeStatusButton(row)">
                  <el-option v-for="(item,index) in statusList" :key="index" :label="item.dictLabel"
                             :value="parseInt(item.dictValue)"
                  />
                </el-select>
              </template>
            </el-table-column>

            <el-table-column label="所属参数组" align="center" min-width="40">
              <template v-slot="{row}">
                <el-select v-model="row.envGroup" placeholder="请选择状态" size="small">
                  <el-option
                    v-for="(dict,i) in tabList"
                    :key="'A'+ i"
                    :label="dict.dictLabel"
                    :value="parseInt(dict.dictValue)"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column label="备注" min-width="100" align="center">
              <template v-slot="{row}">
                <el-input
                  :class="row.envStatus === 0  ? 'ban' : ''"
                  v-model="row.envDes"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="50" align="center">
              <template v-slot="{row}">
<!--                <el-input
                  :class="row.envStatus === 0  ? 'ban' : ''"
                  v-model="row.envDes"
                  size="small"
                />-->
                <el-button type="primary"
                           @click="updateConfigEnvironment(row)">确认修改
                </el-button>
              </template>
            </el-table-column>
          </el-table>
<!--          <el-button type="primary" v-show="configEnvironmentList.length>0" style="float: right;margin-top: 20px"
                     @click="handleConfirm">确定
          </el-button>-->
        </el-tab-pane>

      </el-tabs>
      <!-- 添加或修改会员上下分对话框  Add or Modify Membership Dialog Box-->
      <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="600px"
                 append-to-body>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="类型" prop="menuType">
                <el-radio-group v-model="form.menuType">
                  <el-radio label="M">类型</el-radio>
                  <el-radio label="C">属性</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="form.menuType == 'C'">
              <el-form-item label="所属参数组" prop="envGroup" label-width="130px">
                <el-select v-model="form.envGroup" filterable placeholder="请选择参数组">
                  <el-option
                    v-for="(item,index) in tabList"
                    :key="index"
                    :label="item.dictLabel"
                    :value="item.dictSort"
                  >
                  </el-option>
                </el-select>
                <!--                <el-input v-model="form.envGroup" placeholder="请输入参数组"/>-->
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="名称" prop="envTitle">
                <el-input v-model="form.envTitle" placeholder="请输入名称"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="编码" prop="envCode" v-if="form.menuType == 'C'">
                <el-input v-model="form.envCode" placeholder="请输入编码"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="显示排序" prop="envSort">
                <el-input-number v-model="form.envSort" controls-position="right" :min="0"/>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="form.menuType == 'C'">
              <el-form-item label="参数值" prop="envValue">
                <el-input v-model="form.envValue" placeholder="请输入参数值"/>
              </el-form-item>
            </el-col>

            <el-col :span="12" v-if="form.menuType == 'C'">
              <el-form-item label="状态" prop="envStatus">
                <el-select v-model="titleCode.envStatus" filterable placeholder="请选择状态">
                  <el-option
                    v-for="(item,index) in types"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <!--                <el-input v-model="form.envStatus" placeholder="请输入参数状态"/>-->
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="form.menuType == 'C'">
              <el-form-item label="参数说明" prop="envDes">
                <el-input v-model="form.envDes" placeholder="请参数说明" maxlength="50"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </el-dialog>
    </template>

  </div>
</template>

<script>
  import {
    listConfigEnvironment,
    getConfigEnvironment,
    delConfigEnvironment,
    addConfigEnvironment,
    updateConfigEnvironment,
    updateConfigEnvironmentList,
    exportConfigEnvironment,
    changeStatus,
    getTitleIndex
  } from '@/api/platform-web/config/configEnvironment'

  export default {
    name: 'ConfigEnvironment',
    components: {},
    data() {
      return {
        //status集合
        statusList: [],
        //最上面的提示
        titleCodeList: [],
        //最上面的搜索对象
        titleCode: {
          envTitle: '',
          envCode: ''
        },
        //tab的选中
        activeName: '1',
        //tab的集合
        tabList: [],
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
        // 环境参数表格数据
        configEnvironmentList: [],
        types: [{label: '启用', value: 1}, {label: '禁用', value: 0}],
        // 弹出层标题
        title: '',
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 50,
          envValue: null,
          envDes: null,
          envGroup: null,
          envSort: null,
          envStatus: null
        },
        // 表单参数
        form: {
          menuType: 'C'
        },
        // 表单校验
        rules: {
          envGroup: [
            {required: true, message: '参数组不能为空', trigger: 'blur'}
          ],
          envSort: [
            {required: true, message: '排序不能为空', trigger: 'blur'}
          ],
          envStatus: [
            {required: true, message: '状态 1启用 0禁用不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      //获取提示列表
      this.getTitleCodeList();
      //获取对应页面的列表
      this.getDicts('config_environment_group').then(response => {
        this.tabList = response.data.sort((v1, v2) => {
          return v1.dictSort - v2.dictSort
        })
        //通过tabList的对应的类型的groupId来查询对应的类型
        this.getList()
      })
      //获取开关按钮提示
      this.getDicts('server_sms_status').then(response => {
        this.statusList = response.data
      })
    },
    methods: {
      //修改环境变量状态
      changeStatusButton(data) {
        this.loading=true
          changeStatus(data).then(res => {
            this.msgSuccess('修改成功')
            this.getList()
            this.loading=false
          })
      },
      /*选中值之后调用的事件*/
      changeType(item) {
        this.titleCode.envCode = item.envCode
        this.titleCode.envTitle = item.envTitle
      },
      /*切换调用的方法*/
      handleClick(tab, event) {
        this.activeName = tab.name
        this.getList()
      },
      /** 查询环境参数列表 */
      getList() {
        this.loading = true
        var that = this
        var tabItem = {}
        this.tabList.forEach((item, index, array) => {
          if (item.dictValue == this.activeName) {
            tabItem = item
          }
        })
        var dictValue = tabItem.dictValue
        this.queryParams.envGroup = dictValue
        listConfigEnvironment(this.queryParams).then(response => {
          this.configEnvironmentList = response.rows.sort(function (a, b) {
            return a.envSort - b.envSort
          })
          this.total = response.total
          this.loading = false
        })
      },
      getTitleCodeList(){
        listConfigEnvironment({}).then(response => {
          this.configEnvironmentList = response.rows.sort(function (a, b) {
            return a.envSort - b.envSort
          })
          this.titleCodeList = this.configEnvironmentList
        })
      },
      // 取消按钮
      cancel() {
        this.open = false
        this.reset()
      },
      // 表单重置
      reset() {
        this.form = {
          menuType: 'C',
          envCode: null,
          envValue: null,
          envDes: null,
          envGroup: null,
          envSort: null,
          envStatus: 1
        }
        this.resetForm('form')
      },
      handleQueryTitle() {
        this.queryParams.pageNum = 1
        this.getList()
      },
      /** 搜索按钮操作 */
      handleQuery() {
        debugger;
        if (!this.titleCode.envTitle && !this.titleCode.envCode) {
          this.$notify.warning('参数标题和参数编码不能同时为空')
          return
        }
        // this.queryParams.pageNum = 1;
        getTitleIndex({title: this.titleCode.envTitle, code: this.titleCode.envCode}).then((res) => {
          if (res.code === 200) {
            console.log(res)
            if (res.data) {
              this.activeName = res.data + ''
              this.getList()
            } else {
              this.$notify.warning('没有对应的功能')
            }
            // this.activeName = tab.index
            // this.getList();
          }
        }).catch(() => {
          this.$notify.error('网络异常')
        })
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm('queryForm')
        this.handleQuery()
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.envCode)
        this.single = selection.length !== 1
        this.multiple = !selection.length
      },
      updateConfigEnvironment(data){
        this.$confirm('确认修改'+ data.envTitle +'吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.loading=true
          updateConfigEnvironment(data).then(response => {
            this.msgSuccess('修改成功')
            this.getList()
            this.loading=false
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });
        });
      },
      handleConfirm() {
        this.loading=true
        updateConfigEnvironmentList(this.configEnvironmentList).then(response => {
          this.msgSuccess('修改成功')
          this.getList()
          this.loading=false
        })
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset()
        this.open = true
        this.title = '添加环境参数'
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset()
        const envCode = row.envCode || this.ids
        getConfigEnvironment(envCode).then(response => {
          this.form = response.data
          this.open = true
          this.title = '修改环境参数'
        })
      },
      /** 提交按钮 */
      submitForm() {
        var that = this
        this.$refs['form'].validate(valid => {
          if (valid) {
            addConfigEnvironment(this.form).then(response => {
              that.msgSuccess('修改成功')
              that.open = false
              that.getDicts('config_environment_group').then(response => {
                that.tabList = response.data
                //通过tabList的对应的类型的groupId来查询对应的类型
                that.getList(1)
                //获取对应页面的列表
                that.getDicts('config_environment_group').then(response => {
                  that.tabList = response.data
                  //通过tabList的对应的类型的groupId来查询对应的类型
                  that.getList()
                })
              })
            })

          }
        })
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const envCodes = row.envCode || this.ids
        this.$confirm('是否确认删除环境参数编号为"' + envCodes + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          return delConfigEnvironment(envCodes)
        }).then(() => {
          this.getList()
          this.msgSuccess('删除成功')
        })
      },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams
        this.$confirm('是否确认导出所有环境参数数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          return exportConfigEnvironment(queryParams)
        }).then(response => {
          (response.msg)
        })
      }
    }
  }
</script>

<style>
  /*  .ban{
      background-color: #909399
    }*/
  .ban {
    -webkit-text-fill-color: #ededed !important;
    /*    -webkit-box-shadow: 0 0 0px 1000px transparent  inset !important;
        background-color:transparent;
        background-image: none;
        !* //背景色透明  生效时长  过渡效果  启用时延迟的时间 *!
        transition: background-color 50000s ease-in-out 0s;*/
  }
</style>
