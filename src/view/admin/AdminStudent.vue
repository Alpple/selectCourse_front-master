<template>
  <div class="student-wrap">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <el-icon class="breadcrumb-icon">
            <UserFilled/>
          </el-icon>
          <span class="breadcrumb-text">学生管理</span>
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
            <el-input @keyup.enter="query" placeholder="学生姓名" v-model="queryForm.name"/>
          </el-col>
          <el-col :span="3">
            <el-input @keyup.enter="query" placeholder="专业名" v-model="queryForm.majorName"/>
          </el-col>
          <el-col :span="3">
            <el-input @keyup.enter="query" placeholder="班级名" v-model="queryForm.className"/>
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
        <el-table-column label="学生id" prop="id" sortable/>
        <el-table-column label="学号" prop="number"/>
        <el-table-column label="姓名" prop="name"/>
        <el-table-column label="班级" prop="className"/>
        <el-table-column label="专业" prop="majorName" min-width="150px"/>
        <el-table-column label="性别" prop="sex" width="80px"/>
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
        <el-form-item label="学号">
          <el-input v-model="entityForm.number" clearable/>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="entityForm.name" clearable/>
        </el-form-item>
        <el-form-item label="所属班级">
          <el-select placeholder="请选择班级" v-model="entityForm.classId">
            <el-option
                v-for="(item,index) in  classes"
                :key="index"
                :label="item.name"
                :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" show-password v-model="entityForm.password" clearable/>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="entityForm.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
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
import * as api from "@/api/admin/student";
import * as classApi from "@/api/admin/class"
import {ElMessage, ElMessageBox} from "element-plus";

defineOptions({
  name: "AdminStudent",
})

const queryForm = reactive({name: "", majorName: "", className: ""})
const tableData = ref([])
const pageIndex = ref(1)
const pageSize = api.pageSize
const pageCount = ref(1)
const editing = ref(false)
let entityForm = reactive({})
let classes = reactive([])

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
  api.getPageCount(queryForm.majorName, queryForm.className, queryForm.name)
      .then(res => {
        pageCount.value = res
        pageIndex.value = 1
        getPage(1)
      })
}

const getPage = (pageIndex: number) => {
  api.getPage(pageIndex, queryForm.majorName, queryForm.className, queryForm.name)
      .then(res => {
        for (let i = 0; i < res.length; i++) {
          res[i].sex = res[i].sex === 1 ? "男" : "女"
        }
        tableData.value = res
      })

}

const create = () => {
  entityForm.id = -1
  entityForm.number = ""
  entityForm.name = ""
  entityForm.classId = ""
  entityForm.password = ""
  entityForm.sex = 1

  editing.value = true
}

const edit = (id: number) => {
  api.get(id).then(res => {
    Object.assign(entityForm, res)

    editing.value = true
  })
}

const save = () => {
  if (entityForm.password === "") {
    entityForm.password = "A12345678"
  }
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
  ElMessage({message: "成功", type: 'success'})
  getPage(pageIndex.value)
  editing.value = false
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

const getClasses = () => {
  classApi.listName().then(res => {
    classes = res
  })
}

onMounted(() => {
  query()
  getClasses()
})
</script>

<style scoped lang="scss">

</style>