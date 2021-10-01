<template>
  <div class="app-container">
    <el-row>

      <el-col :span="40" class="card-box">
        <el-card>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-change="handleChange"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-card>
      </el-col>
      <el-col :span="40" class="card-box">
        <div slot="header"><span>选择视频上传</span></div>
        <el-card>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-progress="uploadVideoProcess">
            <img v-if="videoUrl" :src="videoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<script>

import { updatePhones, queryPhones } from '@/api/platform-web/member/memberVideo'


export default {
  name: "Server",
  data() {
    return {
      fileList: [],
      videoUrl: ''
    };
  },
  created() {
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },

    handleAvatarSuccess(res, file) {
      this.videoUrl = URL.createObjectURL(file.raw);
    },
    uploadVideoProcess(event, file, fileList){
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0);
    },
    beforeAvatarUpload(file) {
      const fileSize = file.size / 1024 / 1024 < 300
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file
        .type) === -1) {
        this.$message.error('请上传正确的视频格式')
        return false
      }
      if (!fileSize) {
        this.$message.error('上传视频大小不能超过300MB!');
      }
      return isMP4 && isLt2M;
    }
  }
};
</script>
