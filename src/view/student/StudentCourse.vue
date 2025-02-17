<template>
  <div class="course-wrap">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <el-icon class="breadcrumb-icon">
            <CircleCheck/>
          </el-icon>
          <span class="breadcrumb-text">已选课程</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="table">
      <el-table
          :data="sortedTableData"
          border
          height="390px"
          stripe
          @sort-change="handleSortChange"
      >
        <el-table-column label="选课id" prop="studentCourseId" sortable/>
        <el-table-column label="课程名" prop="courseName"/>
        <el-table-column label="教师" prop="teacherName"/>
        <el-table-column label="学分" prop="credit"/>
        <el-table-column label="日常成绩" prop="dailyScore"/>
        <el-table-column label="考试成绩" prop="examScore"/>
        <el-table-column label="总成绩" prop="score"/>

        <el-table-column align="center" label="操作" width="200px">
          <template #default="scope">
            <el-button @click="deleteItem(scope.row.studentCourseId)" size="small" type="danger">退选</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import * as api from "@/api/student/course.ts";
import {ElMessage} from "element-plus";

defineOptions({
  name: "StudentCourse",
})

const tableData = ref([])

const sortedTableData = computed(() => {
  return tableData.value.slice() // 返回一个新数组，避免直接修改原数据
})

// 处理排序
const handleSortChange = (sort: any) => {
  if (sort.prop === 'id') {
    const order = sort.order === 'ascending' ? 1 : -1;
    tableData.value.sort((a, b) => (a.id - b.id) * order);
  }
}

const getList = () => {
  api.list().then((res: any) => {
    tableData.value = res
  })
}

const deleteItem = (studentCourseId: number) => {
  api.deleteItem(studentCourseId).then(() => {
    ElMessage({message: "选课成功", type: 'success'})
    getList()
  })
}

onMounted(() => {
  getList()
})
</script>

<style scoped lang="scss">

</style>