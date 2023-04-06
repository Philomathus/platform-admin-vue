<template>
  <div class="app-container">
    <el-row>

      <el-col :span="5" class="card-box">
        <el-card>
          <div slot="header"><span class="fs15">批量手机号更新密码</span></div>
          <el-form :model="phoneFrom" ref="phoneFrom" :rules="phoneRules">
            <el-form-item prop="phones">
              <el-input
                type="textarea"
                :rows="45"
                clearable
                v-model="phoneFrom.phones"
                placeholder="手机号统一以竖行排列,不允许有任何字符"
              />
            </el-form-item>
            <el-form-item prop="password" class="col-100pr">
              <el-input
                class="inline-input"
                type="text"
                clearable
                v-model="phoneFrom.password"
                placeholder="请输入更新的密码"
              ></el-input>
            </el-form-item>
            <el-form-item prop="googleAuthCode" class="col-100pr">
              <el-input
                style="width: 52%"
                clearable
                type="number"
                class="no-number"
                v-model="phoneFrom.googleAuthCode"
                placeholder="请输入谷歌验证码21"
              />
              <el-button type="primary" plain style="width: 23%;" @click="handleUpdate">更新</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="5" class="card-box">
        <el-card>
          <div slot="header"><span class="fs15">批量会员ID查询手机号</span></div>
          <el-form :model="phoneByIdFrom" ref="phoneByIdFrom" :rules="phoneByIdRules">
            <el-form-item prop="userIds" class="col-100pr">
              <el-input
                type="textarea"
                :rows="23"
                clearable
                v-model="phoneByIdFrom.userIds"
                placeholder="会员ID统一以竖行排列,不允许有任何字符"
              />
            </el-form-item>
            <el-form-item prop="googleAuthCode">
              <el-input
                clearable
                style="width: 52%"
                type="number"
                class="no-number"
                v-model="phoneByIdFrom.googleAuthCode"
                placeholder="请输入谷歌验证码"
              />
              <el-button type="primary" plain style="width: 25%;margin-left: 1px" @click="handleQuery">查询</el-button>
              <el-button type="info" size="mini" plain style="width: 18%;padding:11px" @click="handleClear">清除</el-button>
            </el-form-item>
            <el-form-item prop="phonesByIds" class="col-100pr">
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
      <el-col :span="4.5" class="card-box">
        <el-card>
          <div slot="header"><span class="fs15">批量会员ID派送彩金</span></div>
          <el-form :model="memberIdsFrom" ref="memberIdsFrom" :rules="memberIdsRules">
            <el-upload
              class="upload-demo"
              ref="upload"
              :action="uploadFileUrl"
              :headers="headers"
              name="excelFile"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :on-error="uploadFalse"
              :on-success="uploadSuccess"
              :auto-upload="false"
              :before-upload="beforeAvatarUpload">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">批量导入</el-button>
              <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
            </el-upload>
            <el-form-item prop="memberIds" class="col-100pr">
              <el-input
                type="textarea"
                :rows="40"
                clearable
                v-model="memberIdsFrom.memberIds"
                placeholder="会员ID统一以竖行排列,不允许有任何字符"
              />
            </el-form-item>
            <el-form-item prop="money" class="col-100pr">
              <el-input
                class="no-number"
                type="number"
                clearable
                v-model="memberIdsFrom.money"
                placeholder="请输入派送金额"
              ></el-input>
            </el-form-item>
            <el-form-item prop="googleAuthCode" style="width: 110%">
              <el-input
                style="width: 52%"
                clearable
                type="number"
                class="no-number"
                v-model="memberIdsFrom.googleAuthCode"
                placeholder="请输入谷歌验证码"
              />
              <el-button type="primary" plain style="width: 23%;" @click="handleCommit">提交</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { updatePhones, queryPhones, commitMoney } from '@/api/platform-web/member/memberSmallFeatures'
import { url } from '@/utils/url'
import { getToken } from '@/utils/auth'

export default {
  name: "Server",
  data() {
    return {
      uploadFileUrl: url.platformWeb + "/member/memberInfo/batchInsertShops",
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      fileList: null,
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
      // 批量会员ID派送彩金表单参数
      memberIdsFrom: {
        memberIds: null,
        money: null,
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
      },
      memberIdsRules: {
        memberIds: [
          {required: true, message: "批量会员ID不能为空", trigger: "blur"}
        ],
        money: [
          {required: true, message: "派送金额不能为空", trigger: "blur"}
        ],
        googleAuthCode: [
          {required: true, message: "谷歌验证码不能为空", trigger: "blur"}
        ]
      },
    };
  },
  created() {
  },
  methods: {
    uploadSuccess(response, file, fileList) {
      if (response.status) {
        alert("文件导入成功");
      } else {
        alert("文件导入失败");
      }
    },
    uploadFalse(response, file, fileList) {
      alert("文件上传失败！");
    },
    // 上传前对文件的大小的判断
    beforeAvatarUpload(file) {
      const extension = file.name.split(".")[1] === "xls";
      const extension2 = file.name.split(".")[1] === "xlsx";
      const extension3 = file.name.split(".")[1] === "doc";
      const extension4 = file.name.split(".")[1] === "docx";
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!extension && !extension2 && !extension3 && !extension4) {
        alert("上传模板只能是 xls、xlsx、doc、docx 格式!");
      }
      if (!isLt2M) {
        console.log("上传模板大小不能超过 10MB!");
      }
      return extension || extension2 || extension3 || (extension4 && isLt2M);
    },
    submitUpload() {
      if (this.businessType != null) {
        //触发组件的action
        this.$refs.upload.submit();
      }
      if (this.businessType == null) {
        this.businessType = "businessType不能为空";
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      if (file.response.status) {
        alert("此文件导入成功");
      } else {
        alert("此文件导入失败");
      }
    },
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
          const userIds = this.phoneByIdFrom.userIds
          const googleAuthCode = this.phoneByIdFrom.googleAuthCode
          queryPhones(userIds,googleAuthCode).then(res => {
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
    /** 批量会员ID清除手机号按钮 */
    handleClear() {
      this.phonesByIds = ''
    },
    /** 批量会员ID派送彩金按钮 */
    handleCommit() {
      this.$refs['memberIdsFrom'].validate(valid => {
        if (valid) {
          this.loading = true;
          const memberIds = this.memberIdsFrom.memberIds
          const money = this.memberIdsFrom.money
          const googleAuthCode = this.memberIdsFrom.googleAuthCode
          commitMoney(memberIds,money,googleAuthCode).then(res => {
            console.info(res)
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
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
};
</script>
