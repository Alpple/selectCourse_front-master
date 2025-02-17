<template>
  <div class="score-wrap">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <el-icon class="breadcrumb-icon">
            <Finished/>
          </el-icon>
          <span class="breadcrumb-text">成绩查询</span>
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
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import * as  api from "@/api/student/score.ts";

defineOptions({
  name: "StudentScore"
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

const getList = ()=>{
  api.list().then((res:any)=>{
    tableData.value = scoreFilter(res)
  })
}

/*定义过滤函数 scoreFilter，接收一个数组 data 作为参数。
使用 filter 方法返回一个新数组，其中只包含日常成绩、考试成绩或总成绩不为 null 的项。*/
const scoreFilter=(data:any[])=>{
  return data.filter(item =>
      item.dailyScore != null ||
      item.examScore != null ||
      item.score != null
  )
}

onMounted(()=>{
  getList()
})
</script>

<style scoped lang="scss">

</style>