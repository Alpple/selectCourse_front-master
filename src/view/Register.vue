<template>
  <div class="register-wrap">
    <el-form
        class="register-form"
        label-position="left"
        label-width="5px"
    >
      <div class="form-title">注册用户</div>
          <el-form-item prop="swnumber">
            <el-input v-model="entityForm.swnumber" placeholder="学号" clearable prefix-icon="User"/>
          </el-form-item>
          <el-form-item prop="name">
            <el-input v-model="entityForm.name" placeholder="姓名" clearable prefix-icon="Notification"/>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="请选择班级" v-model="entityForm.classId">
              <el-option
                  v-for="(item,index) in  classes"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="entityForm.password" placeholder="登录密码" clearable show-password prefix-icon="Lock"/>
          </el-form-item>
          <el-form-item>
            <el-radio-group v-model="entityForm.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>

      <div class="register-btn" v-loading="loading">
        <el-button type="success" style="width: 100px" @click="register">注册</el-button>
      </div>
      <div class="login">
        <el-link :icon="Pointer" type="danger" style="font-size:17px;font-weight: bold"
                 @click="$router.push({name:'login'})">跳转登录
        </el-link>
      </div>
    </el-form>

  </div>
</template>

<script setup lang="ts">
import {Pointer} from "@element-plus/icons-vue";
import {onMounted, reactive, ref} from "vue";
import { FormInstance} from "element-plus";
import type { TabsPaneContext } from 'element-plus'
import * as registerStudent from "@/api/user.ts"
import * as classApi from "@/api/admin/class"

defineOptions({
  name: 'register'
})

const loading = ref(false)
let classes = reactive([])
let entityForm = reactive({})

const register = () => {

}

const getClasses = () => {
 /* classApi.listName().then((res:any) => {
    classes = res
  })*/
}

onMounted(() => {
  getClasses()
})
</script>

<style scoped lang="scss">
.register-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("../assets/register-background.png");
  background-size: 100% 100%;

  .register-form {
    position: absolute;
    left: 45%;
    top: 45%;
    width: 350px;
    border-radius: 5px;
    padding-right: 10px;
    padding-left: 10px;
    background: rgba(220, 218, 218, 0.8);

    .form-title {
      width: 100%;
      line-height: 50px;
      text-align: center;
      font-size: 20px;
      font-weight: 600;
      color: #08c11f;
      //border-bottom: 1px solid #ddd;
    }

    .user-type-item {
      display: flex;
      justify-content: center;
    }

    .register-btn {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }

  .login {
    position: absolute;
    top: 82%;
    left: 75%;
  }
}
</style>