<template>
  <div class="app-container">
    <el-row>

      <el-col :span="4" class="card-box">
        <el-card>
          <div slot="header"><span>批量手机号更新密码</span></div>
          <el-form :model="phoneFrom" ref="phoneFrom" :rules="phoneRules">
            <el-form-item prop="phones" style="width: 100%">
              <el-input
                type="textarea"
                :rows="45"
                clearable
                v-model="phoneFrom.phones"
                placeholder="手机号统一以竖行排列,不允许有任何字符"
              />
            </el-form-item>
            <el-form-item prop="password" style="width: 100%">
              <el-autocomplete
                class="inline-input"
                :fetch-suggestions="querySearch"
                type="text"
                clearable
                v-model="phoneFrom.password"
                placeholder="请输入更新的密码"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item prop="inviterCode" style="width: 100%">
              <el-input
                style="width: 52%"
                clearable
                type="number"
                class="no-number"
                v-model="phoneFrom.googleAuthCode"
                placeholder="请输入谷歌验证码"
              />
              <el-button type="primary" plain style="width: 23%;" @click="handleUpdate">更新</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="4" class="card-box">
        <el-card>
          <div slot="header"><span>批量会员ID查询手机号</span></div>
          <el-form :model="phoneByIdFrom" ref="phoneByIdFrom" :rules="phoneByIdRules">
            <el-form-item prop="userIds" style="width: 100%">
              <el-input
                type="textarea"
                :rows="23"
                clearable
                v-model="phoneByIdFrom.userIds"
                placeholder="会员ID统一以竖行排列,不允许有任何字符"
              />
            </el-form-item>
            <el-form-item prop="inviterCode">
              <el-input
                clearable
                style="width: 52%"
                type="number"
                class="no-number"
                v-model="phoneByIdFrom.googleAuthCode"
                placeholder="请输入谷歌验证码"
              />
              <el-button type="primary" plain style="width: 25%" @click="handleQuery">查询</el-button>
              <el-button type="info" size="mini" plain style="width: 18%" @click="handleClear">清除</el-button>
            </el-form-item>
            <el-form-item prop="phonesByIds" style="width: 100%;">
                <el-input
                  v-model="this.phonesByIds"
                  type="textarea"
                  :rows="23"
                >
                  {{ this.phonesByIds }}
                </el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { updatePhones, queryPhones } from '@/api/platform-web/member/memberSmallFeatures'


export default {
  name: "Server",
  data() {
    return {
      restaurants: [],
      phonesByIds: '',
      phonesByIdsList: null,
      // 手机号更新密码表单参数
      phoneFrom: {
        phones: null,
        password: null,
        googleAuthCode: null
      },
      // 批量会员ID查询手机号表单参数
      phoneByIdFrom: {
        userIds: null,
        googleAuthCode: null
      },
      phoneByIdRules: {
        userIds: [
          {required: true, message: "批量会员ID不能为空", trigger: "blur"}
        ],
        googleAuthCode: [
          {required: true, message: "谷歌验证码不能为空", trigger: "blur"}
        ]
      },
      phoneRules: {
        phones: [
          {required: true, message: "批量手机号不能为空", trigger: "blur"}
        ],
        password: [
          {required: true, message: "密码不能为空", trigger: "blur"}
        ],
        googleAuthCode: [
          {required: true, message: "谷歌验证码不能为空", trigger: "blur"}
        ]
      }
    };
  },
  created() {
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [
        {"value": "123456"},
      ];
    },
    /** 手机号更新密码更新按钮 */
    handleUpdate() {
      this.$refs['phoneFrom'].validate(valid => {
        if (valid) {
          this.loading = true;
          updatePhones(this.phoneFrom).then(res => {
            if (res.code === 0) {
              this.msgError((res.msg))
            } else {
              this.msgSuccess((res.msg))
            }
          }).catch(() => {
            this.$notify.error('网络异常')
          })
        }
      })
    },
    /** 批量会员ID查询手机号按钮 */
    handleQuery() {
      this.$refs['phoneByIdFrom'].validate(valid => {
        if (valid) {
          this.loading = true;
          queryPhones(this.phoneByIdFrom).then(res => {
            if (res.code === 0) {
              this.msgError((res.msg))
            } else {
              this.phonesByIdsList = res.data
              if (this.phonesByIdsList.length !== 0) {
                this.phonesByIdsList.data.forEach(value => {
                  this.phonesByIds = value + '\n' + this.phonesByIds
                })
              }
              this.msgSuccess((res.msg))
            }
          }).catch(() => {
            this.$notify.error('网络异常')
          })
        }
      })
    },
    /** 批量会员ID查询手机号按钮 */
    handleClear() {
      this.phonesByIds = ''
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
};
</script>
