<template>
  <div class="register-wrap">
    <el-form
        :model="form"
        :rules="rules"
        class="register-form"
        label-position="left"
        ref="formRef"
        label-width="5px"
    >
      <div class="form-title">注册用户</div>
      <el-form-item prop="swnumber">
        <el-input v-model="form.swnumber" placeholder="学工号" clearable prefix-icon="User"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" placeholder="密码" clearable show-password prefix-icon="Lock"/>
      </el-form-item>
      <el-form-item prop="userType">
        <el-radio-group v-model="userType">
          <el-radio value="1">学生</el-radio>
          <el-radio value="2">教师</el-radio>
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
import {reactive, ref} from "vue";
import {ElMessage, FormInstance} from "element-plus";
import {registerStudent} from "@/api/user.ts";

defineOptions({
  name: 'register'
})

const loading = ref(false)
const formRef = ref<FormInstance>()

const form = reactive<any>({
  swnumber: '',
  password: '',
})

const userType = ref('1')

const rules = reactive<any>({
  swnumber: [
    {message: '请输入学工号 ', trigger: 'blur'},
    {min: 12, max: 12, message: '学工号长度必须为12位'}
  ],
  password: [
    {message: '请输入密码', trigger: 'blur'},
    {require: true, min: 8, max: 12, message: '密码必须位8到12位的数字、字母或特殊符号的混合形式'}
  ],
})

const register = () => {
  const valid = formRef.value?.validate()
  loading.value = true

  if (valid) {
    if (userType.value === '1') {
      registerStudent(
          form.swnumber,
          form.password,
          userType.value,
      ).then(res=>{
        ElMessage.success('注册用户成功',res.swnumber)
      })
      loading.value = false
    } else if (userType.value === '2') {

      ElMessage.success('注册用户成功')
      loading.value = false
    }

    rest()
    console.log(userType.value)
  }
}

const rest = () => {
  form.swnumber = ''
  form.password = ''
}
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
      border-bottom: 1px solid #ddd;
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