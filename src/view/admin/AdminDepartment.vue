<template>
  <div class="department-wrap">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <el-icon class="breadcrumb-icon">
            <OfficeBuilding/>
          </el-icon>
          <span class="breadcrumb-text">学院管理</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="query-form">
        <el-row :gutter="20">
          <el-col :span="2">
            <el-button @click="create" :icon="Plus">创建</el-button>
          </el-col>
          <el-col :offset="13" :span="6">
            <el-input @keyup.enter="query" placeholder="学院名" v-model="queryForm.name"/>
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
        <el-table-column label="学院id" prop="id" sortable />
        <el-table-column label="学院名" prop="name"/>
        <el-table-column label="专业数" prop="majorCount"/>
        <el-table-column label="教师数" prop="teacherCount"/>

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
        <el-form-item label-width="学院名">
          <el-input v-model="entityForm.name"/>
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
import * as api from "@/api/admin/department.ts"
import {ElMessage, ElMessageBox} from "element-plus";

defineOptions({
  name: "AdminDepartment",
})

const queryForm = reactive({name: ""})
const pageIndex = ref(1)
const pageSize = api.pageSize
const pageCount = ref(1)
const tableData = ref([])
const editing = ref(false)
let entityForm = reactive({})

const sortedTableData = computed(() => {
  return tableData.value.slice() // 返回一个新数组，避免直接修改原数据
})

// 处理排序
const handleSortChange = (sort:any) => {
  if (sort.prop === 'id') {
    const order = sort.order === 'ascending' ? 1 : -1;
    tableData.value.sort((a, b) => (a.id - b.id) * order);
  }
};

// 查询方法
const query = () => {
  api.getPageCount(queryForm.name).then((res: any) => {
    pageCount.value = res
    pageIndex.value = 1
    getPage(1)
  })
}

// 获取页面数据方法
const getPage = (pageIndex: number) => {
  api.getPage(pageIndex, queryForm.name).then((res: any) => {
    tableData.value = res;
  });
}

// 创建方法
const create = () => {
  entityForm.id = -1
  entityForm.name = ""
  editing.value = true
}

// 编辑
const edit = (id: number) => {
  api.get(id).then((res: any) => {
    Object.assign(entityForm, res)
    editing.value = true
  })
}

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

const finishSave = () => {
  ElMessage({message: '成功', type: 'success'})

  getPage(pageIndex.value)
  editing.value = false
}

const deleteItem = async (id: number) => {
  await ElMessageBox.confirm('此操作将永久删除所选项，是否继续？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })

  await api.deleteItem(id).then(() => {
    ElMessage({message: '删除成功', type: 'success'})
    getPage(pageIndex.value)
    query()
  })
}

onMounted(() => {
  query()
})
</script>

<style scoped lang="scss"></style>