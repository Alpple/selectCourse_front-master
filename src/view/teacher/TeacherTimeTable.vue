<template>
<div class="timetable-wrap">
  <div class="crumbs">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
        <el-icon class="breadcrumb-icon">
          <Grid />
        </el-icon>
        <span class="breadcrumb-text">教师课表</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>

  <div class="container">
    <time-table ref="timeTable"/>
  </div>
</div>
</template>

<script setup lang="ts">
import TimeTable from "@/components/TimeTable.vue";
import {onMounted, ref} from "vue";
import * as api from "@/api/teacher/timtable";

defineOptions({
  name: "TeacherTimeTable",
})

const timeTable = ref(null);

onMounted(()=>{
  api.get().then((res:any)=>{
    timeTable.value.updateData(res)
  })
})
</script>

<style scoped lang="scss">

</style>