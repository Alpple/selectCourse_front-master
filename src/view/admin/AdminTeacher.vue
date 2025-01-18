<template>
  <div class="teacher-wrap">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <el-icon class="breadcrumb-icon">
            <Avatar/>
          </el-icon>
          <span class="breadcrumb-text">教师管理</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="query-form">
        <el-row :gutter="20">
          <el-col :span="2">
            <el-button @click="create" :icon="Plus">创建</el-button>
          </el-col>
          <el-col :offset="10" :span="3">
            <el-input @keyup.enter="query" placeholder="教师" v-model="queryForm.name"/>
          </el-col>
          <el-col :span="3">
            <el-input @keyup.enter="query" placeholder="学院名" v-model="queryForm.departmentName"/>
          </el-col>
          <el-col :span="3">
            <el-button @click="query" :icon="Search" type="primary">搜索</el-button>
          </el-col>
        </el-row>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {Plus, Search} from "@element-plus/icons-vue";
import {reactive} from "vue";

defineOptions({
  name: "AdminTeacher",
})

const queryForm=reactive({name:"",departmentName:""})

const query = () => {

}

const create = () => {

}
</script>

<style scoped lang="scss">

</style>