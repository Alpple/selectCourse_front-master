<template>
  <div class="grade-wrap">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <el-icon class="breadcrumb-icon">
            <Edit/>
          </el-icon>
          <span class="breadcrumb-text">授课查询</span>
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
            <el-input @keyup.enter="query" placeholder="学生名" v-model="queryForm.studentName"/>
          </el-col>
          <el-col :span="3">
            <el-button @click="query" :icon="Search" type="primary">搜索</el-button>
          </el-col>
        </el-row>
      </div>

      <div class="table">
        <el-table
            :data="sortedTableData"
            border
            height="390px"
            stripe
            @sort-change="handleSortChange"
        >
          <el-table-column label="选课id" prop="id" sortable/>
          <el-table-column label="课程名" prop="courseName"/>
          <el-table-column label="学生姓名" prop="studentName"/>
          <el-table-column label="日常分" prop="dailyScore"/>
          <el-table-column label="笔试分" prop="examScore"/>
          <el-table-column label="成绩" prop="score"/>

          <el-table-column align="center" label="操作" width="200px">
            <template #default="scope">
              <el-button @click="edit(scope.row.id)" size="small" type="success" :icon="Edit">打分</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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

    <el-dialog v-model="editing" title="编辑" width="30%">
      <el-form :model="entityForm" label-width="70px" ref="form">
        <el-form-item label="选课id">
          <el-input disabled type="number" v-model="entityForm.studentCourseId"/>
        </el-form-item>
        <el-form-item label="日常成绩">
          <el-input type="number" v-model="entityForm.dailyScore"/>
        </el-form-item>
        <el-form-item label="笔试成绩">
          <el-input type="number" v-model="entityForm.examScore"/>
        </el-form-item>
        <el-form-item label="总成绩">
          <el-input type="number" v-model="entityForm.score"/>
        </el-form-item>

      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="save" type="primary">确定</el-button>
        <el-button @click="editing = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {Edit, Search} from "@element-plus/icons-vue";
import {computed, onMounted, reactive, ref} from "vue";
import * as api from "@/api/teacher/grade.ts";
import {ElMessage} from "element-plus";

defineOptions({
  name: "TeacherGrade",
})

const queryForm = reactive({courseName: '', studentName: ''})
const tableData = ref([])
const pageIndex = ref(1)
const pageSize = api.pageSize
const pageCount = ref(1)
const editing = ref(false)
let entityForm = reactive({})

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
  api.getPageCount(queryForm.courseName, queryForm.studentName)
      .then((res: any) => {
        pageCount.value = res
        pageIndex.value = 1
        getPage(1)
      })
}

const getPage = (pageIndex: number) => {
  api.getPage(pageIndex, queryForm.courseName, queryForm.studentName)
      .then((res: any) => {
        tableData.value = res
      })
}

const edit = (id: number) => {
  api.get(id).then((res: any) => {
    Object.assign(entityForm, res)
    editing.value = true
  })
}

const save = () => {
  api.update(entityForm).then(() => {
    ElMessage({message: "成功", type: 'success'})
    getPage(pageIndex.value)
    editing.value = false
  })
}

onMounted(() => {
  query()
})
</script>

<style scoped lang="scss">

</style>