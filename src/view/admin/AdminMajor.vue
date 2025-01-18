<template>
  <div class="major-wrap">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <el-icon class="breadcrumb-icon">
            <Management/>
          </el-icon>
          <span class="breadcrumb-text">专业管理</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="query-form">
        <el-row :gutter="20">
          <el-col :span="2">
            <el-button @click="create" :icon="Plus">创建</el-button>
          </el-col>
          <el-col :offset="13" :span="3">
            <el-input @keyup.enter="query" placeholder="专业名" v-model="queryForm.name"/>
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

    <div class="table">
      <el-table
          :data="sortedTableData"
          border
          height="390px"
          stripe
          @sort-change="handleSortChange"
      >
        <el-table-column label="专业id" prop="id" sortable/>
        <el-table-column label="专业名" prop="name"/>
        <el-table-column label="所属学院" prop="departmentName"/>

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
        <el-form-item label="专业名">
          <el-input v-model="entityForm.name"/>
        </el-form-item>
        <el-form-item label="所属学院">
          <el-select placeholder="请选择学院" v-model="entityForm.departmentId">
            <el-option
                v-for="(item,index) in  departments"
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
import * as api from "@/api/admin/major.ts";
import * as departmentApi from "@/api/admin/department.ts";
import {ElMessage, ElMessageBox} from "element-plus";

defineOptions({
  name: "AdminMajor",
})

const queryForm = reactive({departmentName: "", name: ""})
const tableData = ref([])
const pageIndex = ref(1)
const pageSize = api.pageSize
const pageCount = ref(1)
const editing = ref(false)
let entityForm = reactive({})
let departments = reactive([])

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
  api.getPageCount(queryForm.departmentName, queryForm.name)
      .then((res: any) => {
        pageCount.value = res
        pageIndex.value = 1
        getPage(1)
      })
}

// 获取页面数据
const getPage = (pageIndex: number) => {
  api.getPage(pageIndex, queryForm.departmentName, queryForm.name)
      .then((res: any) => {
        tableData.value = res
      })
}

// 获取学院
const getDepartments = () => {
  departmentApi.listName().then((res:any) => {
    departments = res
  })
}

// 创建
const create = () => {
  entityForm.id = -1
  entityForm.name = ""
  entityForm.departmentId = ""
  editing.value = true
}

// 保存
const save = () => {
  if(entityForm.id === -1) {
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
  ElMessage({message:"成功",type:'success'})
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
const deleteItem = async (id: number) => {
  await ElMessageBox.confirm('此操作将永久删除所选项，是否继续？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })

  api.deleteItem(id).then((res: any) => {
    ElMessage({message: '删除成功', type: 'success'})
    departments = res
    query()
  })
}

onMounted(() => {
  query()
  getDepartments()
})
</script>

<style scoped lang="scss">

</style>