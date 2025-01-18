<template>
  <div class="class-wrap">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <el-icon class="breadcrumb-icon">
            <DataAnalysis/>
          </el-icon>
          <span class="breadcrumb-text">班级管理</span>
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
            <el-input @keyup.enter="query" placeholder="班级名" v-model="queryForm.name"/>
          </el-col>
          <el-col :span="3">
            <el-input @keyup.enter="query" placeholder="学院名" v-model="queryForm.departmentName"/>
          </el-col>
          <el-col :span="3">
            <el-input @keyup.enter="query" placeholder="专业名" v-model="queryForm.majorName"/>
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
        <el-table-column label="班级id" prop="id" sortable/>
        <el-table-column label="班级名" prop="name"/>
        <el-table-column label="年级" prop="grade"/>
        <el-table-column label="所属学院" prop="departmentName"/>
        <el-table-column label="所属专业" prop="majorName"/>

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

    <el-dialog v-model="editing" title="编辑" width="30%">
      <el-form :model="entityForm" label-width="70px" ref="form">
        <el-form-item label="班级名">
          <el-input v-model="entityForm.name"/>
        </el-form-item>
        <el-form-item label="年级">
          <el-input type="number" v-model="entityForm.grade"/>
        </el-form-item>
        <el-form-item label="所属专业">
          <el-select placeholder="请选择专业" v-model="entityForm.majorId">
            <el-option
                v-for="(item,index) in  majors"
                :key="index"
                :label="item.name"
                :value="item.id"
            />
          </el-select>
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
import {Delete, Edit, Plus, Search} from "@element-plus/icons-vue";
import {computed, onMounted, reactive, ref} from "vue";
import * as api from "@/api/admin/class.ts"
import * as majorApi from "@/api/admin/major.ts";
import {ElMessage, ElMessageBox} from "element-plus";

defineOptions({
  name: "AdminClass",
})

const queryForm = reactive({name: "", departmentName: "", majorName: ""})
const tableData = ref([])
const pageIndex = ref(1)
const pageSize = api.pageSize
const pageCount = ref(1)
const editing = ref(false)
let entityForm = reactive({})
let majors = reactive([])

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

// 查询
const query = () => {
  api.getPageCount(
      queryForm.departmentName,
      queryForm.majorName,
      queryForm.name,
  )
      .then((res: any) => {
        pageCount.value = res
        pageIndex.value = 1
        getPage(1)
      })
}

// 获取页面数据
const getPage = (pageIndex: number) => {
  api.getPage(
      pageIndex,
      queryForm.departmentName,
      queryForm.majorName,
      queryForm.name
  )
      .then((res: any) => {
        tableData.value = res;
      })
}

// 获取专业
const getMajors = () => {
  majorApi.listName().then((res: any) => {
    majors = res
  })
}

// 创建
const create = () => {
  entityForm.id = -1
  entityForm.name = ""
  entityForm.grade = 2020
  entityForm.majorId = ""

  editing.value = true
}

// 保存
const save = () => {
  if (entityForm.id === -1) {
    api.create(entityForm).then(() => {
      finishSave()
    })
  } else {
    api.update(entityForm).then(() => {
      finishSave()
    })
  }
}

// 完成保存
const finishSave = () => {
  ElMessage({message: "成功", type: 'success'})
  getPage(pageIndex.value)
  editing.value = false
}

// 编辑
const edit = (id: number) => {
  api.get(id).then((res: any) => {
    Object.assign(entityForm, res)
    editing.value = true
  })
}

// 删除
const deleteItem =async (id: number) => {
  await ElMessageBox.confirm('此操作将永久删除所选项，是否继续？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })

  api.deleteItem(id).then(() => {
    ElMessage({message: "删除成功", type: 'success'})
    getPage(pageIndex.value)
  })
}


onMounted(() => {
  query()
  getMajors()
})
</script>

<style scoped lang="scss">

</style>