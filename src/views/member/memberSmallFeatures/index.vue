<template>
  <div class="app-container">
    <el-row>

      <el-col :span="5" class="card-box">
        <el-card>
          <div slot="header"><span class="fs15">{{ $t('members.memberSmallFeatures.bcp') }}</span></div>
          <el-form :model="phoneFrom" ref="phoneFrom" :rules="phoneRules">
            <el-form-item prop="phones">
              <el-input
                type="textarea"
                :rows="45"
                clearable
                v-model="phoneFrom.phones"
                :placeholder=" $t('members.memberSmallFeatures.tcpn') "
              />
            </el-form-item>
            <el-form-item prop="password" class="col-100pr">
              <el-input
                class="inline-input"
                type="text"
                clearable
                v-model="phoneFrom.password"
                :placeholder=" $t('members.memberSmallFeatures.peup') "
              ></el-input>
            </el-form-item>
            <el-form-item prop="googleAuthCode" class="col-100pr">
              <el-input
                style="width: 52%"
                clearable
                type="number"
                class="no-number"
                v-model="phoneFrom.googleAuthCode"
                :placeholder=" $t('members.memberSmallFeatures.pega') "
              />
              <el-button type="primary" plain style="width: 23%;" @click="handleUpdate">{{ $t('members.memberSmallFeatures.upd') }}</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="5" class="card-box">
        <el-card>
          <div slot="header"><span class="fs15">{{ $t('members.memberSmallFeatures.bmqc') }}</span></div>
          <el-form :model="phoneByIdFrom" ref="phoneByIdFrom" :rules="phoneByIdRules">
            <el-form-item prop="userIds" class="col-100pr">
              <el-input
                type="textarea"
                :rows="23"
                clearable
                v-model="phoneByIdFrom.userIds"
                :placeholder=" $t('members.memberSmallFeatures.muv') "
              />
            </el-form-item>
            <el-form-item prop="googleAuthCode">
              <el-input
                clearable
                style="width: 52%"
                type="number"
                class="no-number"
                v-model="phoneByIdFrom.googleAuthCode"
                :placeholder=" $t('members.memberSmallFeatures.pegac') "
              />
              <el-button type="primary" plain style="width: 25%;margin-left: 1px" @click="handleQuery">{{ $t('global.searchButton') }}</el-button>
              <el-button type="info" size="mini" plain style="width: 18%;padding:11px" @click="handleClear">{{ $t('members.memberSmallFeatures.clear') }}</el-button>
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
          <div slot="header"><span class="fs15">{{ $t('members.memberSmallFeatures.bmib') }}</span></div>
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
              <el-button slot="trigger" size="small" type="primary">{{ $t('members.memberSmallFeatures.sf') }}</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">{{ $t('members.memberSmallFeatures.bi') }}</el-button>
              <div slot="tip" class="el-upload__tip">{{ $t('members.memberSmallFeatures.oef') }}</div>
            </el-upload>
            <el-form-item prop="memberIds" class="col-100pr">
              <el-input
                type="textarea"
                :rows="40"
                clearable
                v-model="memberIdsFrom.memberIds"
                :placeholder=" $t('members.memberSmallFeatures.muv') "
              />
            </el-form-item>
            <el-form-item prop="money" class="col-100pr">
              <el-input
                class="no-number"
                type="number"
                clearable
                v-model="memberIdsFrom.money"
                :placeholder=" $t('members.memberSmallFeatures.peda') "
              ></el-input>
            </el-form-item>
            <el-form-item prop="googleAuthCode" style="width: 110%">
              <el-input
                style="width: 52%"
                clearable
                type="number"
                class="no-number"
                v-model="memberIdsFrom.googleAuthCode"
                :placeholder=" $t('members.memberSmallFeatures.pegac') "
              />
              <el-button type="primary" plain style="width: 23%;" @click="handleCommit">{{ $t('global.submitButton') }}</el-button>
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
          {required: true, message: this.$t('members.memberSmallFeatures.bmcb') , trigger: "blur"}
        ],
        googleAuthCode: [
          {required: true, message: this.$t('members.memberSmallFeatures.gccb') , trigger: "blur"}
        ]
      },
      phoneRules: {
        phones: [
          {required: true, message: this.$t('members.memberSmallFeatures.bpnc') , trigger: "blur"}
        ],
        password: [
          {required: true, message: this.$t('members.memberSmallFeatures.pcbe') , trigger: "blur"}
        ],
        googleAuthCode: [
          {required: true, message: this.$t('members.memberSmallFeatures.gccb') , trigger: "blur"}
        ]
      },
      memberIdsRules: {
        memberIds: [
          {required: true, message: this.$t('members.memberSmallFeatures.bmcb') , trigger: "blur"}
        ],
        money: [
          {required: true, message: this.$t('members.memberSmallFeatures.dacb') , trigger: "blur"}
        ],
        googleAuthCode: [
          {required: true, message: this.$t('members.memberSmallFeatures.gccb') , trigger: "blur"}
        ]
      },
    };
  },
  created() {
  },
  methods: {
    uploadSuccess(response, file, fileList) {
      if (response.status) {
        alert( this.$t('members.memberSmallFeatures.fis') );
      } else {
        alert( this.$t('members.memberSmallFeatures.fif') );
      }
    },
    uploadFalse(response, file, fileList) {
      alert( this.$t('members.memberSmallFeatures.fuf') );
    },
    // 上传前对文件的大小的判断
    beforeAvatarUpload(file) {
      const extension = file.name.split(".")[1] === "xls";
      const extension2 = file.name.split(".")[1] === "xlsx";
      const extension3 = file.name.split(".")[1] === "doc";
      const extension4 = file.name.split(".")[1] === "docx";
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!extension && !extension2 && !extension3 && !extension4) {
        alert( this.$t('members.memberSmallFeatures.ut') );
      }
      if (!isLt2M) {
        console.log( this.$t('members.memberSmallFeatures.tsut') );
      }
      return extension || extension2 || extension3 || (extension4 && isLt2M);
    },
    submitUpload() {
      if (this.businessType != null) {
        //触发组件的action
        this.$refs.upload.submit();
      }
      if (this.businessType == null) {
        this.businessType = this.$t('members.memberSmallFeatures.bce') ;
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      if (file.response.status) {
        alert( this.$t('members.memberSmallFeatures.tfis') );
      } else {
        alert( this.$t('members.memberSmallFeatures.tfif') );
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
            this.$notify.error( this.$t('members.memberSmallFeatures.na') )
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
            this.$notify.error( this.$t('members.memberSmallFeatures.na') )
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
            this.$notify.error( this.$t('members.memberSmallFeatures.na') )
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
