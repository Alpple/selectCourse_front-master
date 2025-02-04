<template>
  <div class="course-wrap">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <el-icon class="breadcrumb-icon">
            <Management/>
          </el-icon>
          <span class="breadcrumb-text">课程管理</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!--  <div class="container">-->
    <!--    <div class="query-form">-->
    <!--      <el-row :gutter="20">-->
    <!--      </el-row>-->
    <!--    </div>-->
    <!--  </div>-->

    <div class="table">
      <el-table
          :data="sortedTableData"
          border
          height="390px"
          stripe
          @sort-change="handleSortChange"
      >
        <el-table-column label="学生id" prop="id" sortable/>
        <el-table-column label="课程名" prop="name"/>
        <el-table-column label="教师" prop="teacherName"/>
        <el-table-column label="所属学院" prop="departmentName"/>
        <el-table-column label="年级" prop="grade"/>
        <el-table-column label="学分" prop="credit"/>
        <el-table-column align="center" label="上课时间" prop="time" width="130px"/>
        <el-table-column label="已选人数" prop="selectedCount"/>
        <el-table-column label="最大容量" prop="maxSize"/>

        <el-table-column align="center" label="操作" width="200px">
          <template #default="scope">
            <el-button @click="edit(scope.row.id)" size="small" type="success" :icon="Edit">编辑</el-button>
            <el-button @click="deleteItem(scope.row.id)" size="small" type="danger" :icon="Delete">删除</el-button>
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
import {Delete, Edit, Plus, Search} from "@element-plus/icons-vue";
import {computed, onMounted, reactive, ref} from "vue";
import * as api from "@/api/admin/course";
import {ElMessage, ElMessageBox} from "element-plus";

defineOptions({
  name: "AdminCourse",
})

let queryForm = reactive({departmentName: "", teacherName: "", name: ""})
const tableData = ref([])
const pageIndex = ref(1)
const pageSize = api.pageSize
const pageCount = ref(1)
const editing = ref(false)
const teachers = reactive([])
const courseDay = ref("")
const courseTime = ref("")
const courseLength = ref(0)

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
  api.getPageCount(queryForm.departmentName, queryForm.teacherName, queryForm.name)
      .then(res => {
        pageCount.value = res
        pageIndex.value = 1
        getPage(1)
      })
}

const getPage = (pageIndex: number) => {
  api.getPage(queryForm.departmentName, queryForm.teacherName, queryForm.name)
      .then(res => {
        tableData.value = res
      })
}

const deleteItem = async (id: number) => {
  await ElMessageBox.confirm('此操作将永久删除所选项，是否继续？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })

  api.deleteItem(id).then(res => {
    ElMessage({message: "删除成功", type: 'success'})
    getPage(pageIndex.value)
  })
}

onMounted(() => {
  query()
})
</script>

<style scoped lang="scss">

</style>