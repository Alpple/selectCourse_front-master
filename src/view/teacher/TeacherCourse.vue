<template>
  <div class="course-wrap">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <el-icon class="breadcrumb-icon">
            <Management/>
          </el-icon>
          <span class="breadcrumb-text">授课查询</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="query-form">
        <el-row :gutter="20">
          <el-col :span="2">
            <el-button @click="create" :icon="Plus">创建</el-button>
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
        <el-table-column label="课程id" prop="id" sortable/>
        <el-table-column label="课程名" prop="name"/>
        <el-table-column label="年级" prop="grade"/>
        <el-table-column label="学分" prop="credit"/>
        <el-table-column label="上课时间" prop="time"/>
        <el-table-column label="上课地点" prop="location"/>
        <el-table-column label="选课人数" prop="selectedCount"/>
      </el-table>
    </div>

    <el-dialog v-model="editing" title="编辑" width="30%">
      <el-form :model="entityForm" label-width="70px" ref="form">
        <el-form-item label="课程名">
          <el-input v-model="entityForm.name"/>
        </el-form-item>
        <el-form-item label="授课教师">
          <el-input disabled v-model="entityForm.teacherName"/>
        </el-form-item>
        <el-form-item label="年级">
          <el-input type="number" v-model="entityForm.grade"/>
        </el-form-item>
        <el-form-item label="上课时间">
          <el-select v-model="courseDay">
            <el-option
                v-for="(item, index) in days"
                :key="index"
                :value="index"
                :label="item"
            />
          </el-select>
          <el-select v-model="courseTime">
            <el-option
                v-for="(item,index) in times"
                :key="index"
                :value="index"
                :label="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="时长(节)">
          <el-input type="number" v-model="courseLength"/>
        </el-form-item>
        <el-form-item label="上课地点">
          <el-input v-model="entityForm.location"/>
        </el-form-item>
        <el-form-item label="学分">
          <el-input type="number" v-model="entityForm.credit"/>
        </el-form-item>
        <el-form-item label="最大容量">
          <el-input type="number" v-model="entityForm.maxSize"/>
        </el-form-item>
        <el-form-item label="课程简介">
          <el-input type="textarea" :rows="3" v-model="entityForm.introduction"/>
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
import { Plus} from "@element-plus/icons-vue";
import {computed, onMounted, reactive, ref} from "vue";
import * as api from "@/api/teacher/course.ts"
import * as api2 from "@/api/teacher/info.ts"
import {ElMessage} from "element-plus";

defineOptions({
  name: "TeacherCourse",
})

const tableData = ref([])
const editing = ref(false)
let entityForm = reactive({})
const teachername = ref('')
const courseDay = ref('')
const courseTime = ref('')
const courseLength = ref(0)

const days = [
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
  '星期日'
]

const times = [
  '第一节',
  '第二节',
  '第三节',
  '第四节',
  '第六节',
  '第七节',
  '第八节',
  '第九节'
]

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

const create = () => {
  entityForm.id = -1
  entityForm.teacherName = teachername.value
  entityForm.teacherId = 999
  entityForm.name = ""
  entityForm.grade = 2023
  entityForm.time = ""
  entityForm.lcation = ""
  entityForm.credit = 2
  entityForm.maxSize = 50
  entityForm.introduction = ""

  courseDay.value = 1
  courseTime.value = 1
  courseLength.value = 2

  editing.value = true
}

const save = () => {
  let day = courseDay.value + 1
  let time = courseTime.value + 1
  entityForm.time = day + "-" + time + "-" + courseLength.value
  api.create(entityForm).then(() => {
    finishSave()
  })
}

const finishSave = () => {
  ElMessage({message: "成功", type: 'success'})
  getList()
  editing.value = false
}

onMounted(() => {
  getList()
  api2.get().then((res: any) => {
    teachername.value = res.name
  })
})
</script>

<style scoped lang="scss">

</style>