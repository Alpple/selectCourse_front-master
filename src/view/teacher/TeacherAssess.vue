<template>
  <div class="assess-wrap">
    <div class="back" @click="goBack">
      <span class="ico"><el-icon><ArrowLeftBold /></el-icon></span>
      <span class="text">返回</span>
    </div>

    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <el-icon class="breadcrumb-icon">
            <Edit/>
          </el-icon>
          <span class="breadcrumb-text">查看评教</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="table">
      <el-table
          :data="tableData"
          border
          height="390px"
          stripe
      >
        <el-table-column label="课程名" prop="courseName"/>
        <el-table-column label="学生姓名" prop="studentName"/>
        <el-table-column label="上课质量" prop="quality"/>
        <el-table-column label="教学风格" prop="style"/>
        <el-table-column label="师生互动" prop="interaction"/>
        <el-table-column label="知识传达清晰度" prop="clarity"/>
        <el-table-column label="评价内容" prop="comment"/>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Edit} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";
import * as assessApi from "@/api/student/assess.ts"
import {useRoute} from "vue-router";
import {ElMessage} from "element-plus";

const tableData = ref([])
const route = useRoute();

const getData = () => {
  const id = route.query.id; // 获取传递的 id
  if (id) {
    assessApi.get(id).then((response:any) => {
      tableData.value = response; // 假设返回的数据结构
      ElMessage({ message: "查询成功", type: 'success' });
    }).catch((error:any) => {
      // ElMessage({ message: "失败: " + error.message, type: 'error' });
      console.log('查询失败',error.message)
    });
  }
}

const goBack = () => {
  window.history.back();
}

onMounted(() => {
  getData()
})
</script>

<style scoped lang="scss">
.back {
  display: flex;              /* 使用 Flexbox */
  align-items: center;
  font-size:20px;
  margin-bottom: 20px;
  color: #4fadc3;

  padding: 10px 15px;         /* 内边距，使其看起来像按钮 */
  background-color: #f0f8ff;  /* 背景色 */
  border: 1px solid #4fadc3;  /* 边框 */
  border-radius: 5px;         /* 圆角 */
  cursor: pointer;             /* 鼠标悬停时显示为手指 */
  transition: background-color 0.3s; /* 背景色过渡效果 */

  /* 鼠标悬停时改变背景色 */
  &:hover {
    background-color: #e0eaff; /* 悬停时背景颜色 */
  }
  .ico {
    margin-right: 5px;
  }
  .text {
    margin-top: -8px;
  }
}
</style>