<template>
  <div class="assess-wrap">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <el-icon class="breadcrumb-icon">
            <Edit/>
          </el-icon>
          <span class="breadcrumb-text">教师评价</span>
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
        <el-table-column label="教师姓名" prop="teacherName"/>
        <el-table-column label="上课质量" prop="quality"/>
        <el-table-column label="教学风格" prop="style"/>
        <el-table-column label="师生互动" prop="interaction"/>
        <el-table-column label="知识传达清晰度" prop="clarity"/>
        <el-table-column label="评价内容" prop="comment"/>

        <el-table-column align="center" label="操作" width="200px">
          <template #default="scope">
            <el-button
                v-if="scope.row.assessId"
                disabled
                size="small"
                type="success"
                :icon="Edit"
            >
              评分
            </el-button>
            <el-button
                v-else
                @click="edit(scope.row)"
                size="small"
                type="success"
                :icon="Edit"
            >
              评分
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog v-model="editing" title="编辑" width="30%">
      <el-form :model="entityForm" label-width="70px" ref="form">
        <el-form-item label="上课质量">
          <el-input type="number" v-model="entityForm.quality"/>
        </el-form-item>
        <el-form-item label="教学风格">
          <el-input type="number" v-model="entityForm.style"/>
        </el-form-item>
        <el-form-item label="师生互动">
          <el-input type="number" v-model="entityForm.interaction"/>
        </el-form-item>
        <el-form-item label="知识传达清晰度">
          <el-input type="number" v-model="entityForm.clarity"/>
        </el-form-item>
        <el-form-item label="评价内容">
          <el-input type="textarea" v-model="entityForm.comment"/>
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
import {Edit} from "@element-plus/icons-vue";
import {onMounted, reactive, ref} from "vue";
import * as api from '@/api/student/assess.ts'
import {ElMessage} from "element-plus";

const tableData = ref([])
const editing = ref(false)
let entityForm = reactive({})

const query = () => {
  api.list().then((res: any) => {
    tableData.value = res
  })
}

const save = () => {
  const entity = {
    ...entityForm,
    courseId: entityForm.courseId,
    studentId: entityForm.studentId
  }

  api.save(entity).then(()=>{
    finishSave()
  })
  console.log('@@@', entity)
}

const finishSave = () => {
  ElMessage({message: "成功", type: 'success'})
  query()
  editing.value = false
}

const edit = (row) => {
  entityForm.quality = 0
  entityForm.style = 0
  entityForm.interaction = 0
  entityForm.clarity = 0
  entityForm.comment = ""

  // 赋值 courseId 和 studentId
  entityForm.courseId = row.courseId
  entityForm.studentId = row.studentId

  editing.value = true
}

onMounted(() => {
  query()
})
</script>

<style scoped lang="scss">

</style>