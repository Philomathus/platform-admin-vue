<template>
  <div class="app-container">
    <el-row>

      <el-col :span="4" class="card-box">
        <el-card>
          <div slot="header"><span>批量手机号更新密码</span></div>
          <el-form :model="phoneFrom" ref="phoneFrom" :rules="phoneRules">
            <el-form-item prop="phones" style="width: 100%;">
              <el-input
                type="textarea"
                :rows="40"
                clearable
                v-model="phoneFrom.phones"
                placeholder="手机号统一以竖行排列,不允许有任何字符"
              />
            </el-form-item>
            <el-form-item prop="password" style="width: 55%;">
              <el-input
                type="text"
                clearable
                v-model="phoneFrom.password"
                placeholder="请输入更新的密码"
              />
            </el-form-item>
            <el-form-item prop="inviterCode" style="width: 55%;">
              <el-input
                clearable
                type="number"
                class="no-number"
                v-model="phoneFrom.googleAuthCode"
                placeholder="请输入谷歌验证码"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleUpdate">更新</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

    </el-row>
  </div>
</template>

<script>

import { updatePhones } from '@/api/platform-web/member/memberSmallFeatures'


export default {
  name: "Server",
  data() {
    return {
      // 手机号更新密码表单参数
      phoneFrom: {
        phones: null,
        password: null,
        googleAuthCode: null
      },
      phoneRules: {
        title: [
          {phones: true, message: "批量手机号不能为空", trigger: "blur"}
        ],
        icon: [
          {password: true, message: "密码不能为空", trigger: "blur"}
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
  },
};
</script>
