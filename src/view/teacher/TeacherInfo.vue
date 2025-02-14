<template>
  <div class="info-wrap">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <el-icon class="breadcrumb-icon">
            <List/>
          </el-icon>
          <span class="breadcrumb-text">信息维护</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <el-form :model="entityForm" class="info-form" label-width="80px">
        <el-form-item label="工号">
          <el-input disabled v-model="entityForm.number"/>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input disabled v-model="entityForm.name"/>
        </el-form-item>
        <el-form-item label="学院">
          <el-input disabled v-model="entityForm.departmentName"/>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="entityForm.email"/>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker
              placeholder="选择生日"
              type="date"
              v-model="entityForm.birthday"
          />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="entityForm.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" show-password v-model="entityForm.password"/>
        </el-form-item>
        <el-form-item label="操作">
          <el-button @click="update" type="primary">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive} from "vue";
import * as api from "@/api/teacher/info.ts";
import {ElMessage} from "element-plus";

defineOptions({
  name: "TeacherInfo",
})

const entityForm = reactive({
  number: "",
  name: "",
  departmentName: "",
  email: "",
  birthday: "",
  sex: "",
  password: ""
})

const get = () => {
  api.get().then((res: any) => {
    Object.assign(entityForm, res)
  })
}

const update = () => {
  api.update(entityForm).then(() => {
    ElMessage({message: "更新信息成功", type: 'success'})
  })
}

onMounted(() => {
  get()
})
</script>

<style scoped lang="scss">
.info-form {
  min-width: 400px;
  width: 35%;
  margin: auto;
}
</style>