<template>
  <div class="course-select-wrap">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <el-icon class="breadcrumb-icon">
            <Mouse/>
          </el-icon>
          <span class="breadcrumb-text">课程管理</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="query-form">
        <el-row :gutter="20">
          <el-col :offset="15" :span="3">
            <el-input @keyup.enter="query" placeholder="课程名" v-model="queryForm.courseName"/>
          </el-col>
          <el-col :span="3">
            <el-input @keyup.enter="query" placeholder="教师名" v-model="queryForm.teacherName"/>
          </el-col>
          <el-col :span="3">
            <el-button @click="query" :icon="Search" type="primary">搜索</el-button>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="table">
      <el-table
          :data="sortedTableData"
          border
          height="390px"
          stripe
          @sort-change="handleSortChange"
      >
        <el-table-column label="课程id" prop="courseId" sortable/>
        <el-table-column label="课程名" width="180">
          <template #default="scope">
            <el-popover
                placement="top-start"
                :width="200"
                trigger="hover"
            >
              <div>
                <p>课程名: {{ scope.row.courseName }}</p>
                <p>简介: {{ scope.row.introduction }}</p>
              </div>
              <template #reference>
                <el-button class="m-2">{{ scope.row.courseName }}</el-button>
              </template>
            </el-popover>
          </template>

        </el-table-column>

        <el-table-column label="教师" prop="teacherName"/>
        <el-table-column label="学分" prop="credit"/>
        <el-table-column
            align="center"
            label="上课时间"
            prop="time"
            width="130px"
        />
        <el-table-column label="已选人数" prop="selectedCount"/>
        <el-table-column label="课程容量" prop="maxSize"/>

        <el-table-column align="center" label="操作" width="200px">
          <template #default="scope">
            <el-button @click="select(scope.row.courseId)" size="small" type="success">选课</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-row justify="center" type="flex" style="padding-top: 10px">
      <el-pagination
          v-model:current-page="pageIndex"
          :page-size="pageSize"
          :total="pageSize * pageCount"
          @current-change="getPage"
          background
          layout="prev, pager, next"
      />
    </el-row>

  </div>
</template>

<script setup lang="ts">
import {Search} from "@element-plus/icons-vue";
import {computed, onMounted, reactive, ref} from "vue";
import * as api from "@/api/student/courseSelect.ts";
import {ElMessage} from "element-plus";

defineOptions({
  name: 'StudentCourseSelect'
})

const queryForm = reactive({courseName: "", teacherName: ""})
const tableData = ref([])
const pageIndex = ref(1)
const pageSize = api.pageSize
const pageCount = ref(1)

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

const query = () => {
  api.getPageCount(queryForm.courseName, queryForm.teacherName)
      .then((res: any) => {
        pageCount.value = res
        pageIndex.value = 1
        getPage(1)
      })
}

const getPage = (pageIndex: number) => {
  api.getPage(pageIndex, queryForm.courseName, queryForm.teacherName)
      .then((res: any) => {
        tableData.value = res
      })
}

const select = (id: number) => {
  api.select(id).then(() => {
    ElMessage({message: "选课成功", type: 'success'})
    getPage(pageIndex.value)
  })
}

onMounted(() => {
  query()
})
</script>

<style scoped lang="scss">

</style>