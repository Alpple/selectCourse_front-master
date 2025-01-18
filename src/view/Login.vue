<template>
  <div class="login-wrap">
    <div class="login-form" style="margin-left: 10%">
      <div class="form-title">在线选课系统</div>
      <el-form
          :model="form"
          :rules="rules"
          class="form-content"
          label-width="5px"
      >
        <el-form-item prop="swnumber">
          <el-input placeholder="学工号" v-model="form.swnumber" clearable prefix-icon="User"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              placeholder="密码"
              type="password"
              v-model="form.password"
              clearable
              show-password
              prefix-icon="Lock"
              @keyup.enter="submit"
          />
        </el-form-item>
        <el-form-item>
          <el-input
              placeholder="请输入验证码"
              v-model="form.validCode"
              prefix-icon="Key"
              style="width: 50%"
          />
          <ValidCode @input="createValidCode"/>
        </el-form-item>

        <el-form-item prop="userType">
          <el-radio-group v-model="userType">
            <el-radio value="1">学生</el-radio>
            <el-radio value="2">教师</el-radio>
            <el-radio value="3">管理员</el-radio>
          </el-radio-group>
        </el-form-item>

        <div class="login-btn" v-loading="loading">
          <el-button type="primary" @click="submit">登录</el-button>
        </div>
      </el-form>
      <div class="register">
        <el-link :icon="Pointer" type="danger" style="font-size:17px;font-weight: bold" @click="$router.push({name:'register'})">点击注册</el-link>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import ValidCode from "@/components/ValidCode.vue";
import {useRouter} from "vue-router";
import {useStore} from "@/store";
import {login} from "@/api/user.ts";
import {Pointer} from "@element-plus/icons-vue";

defineOptions({
  name: "login",
})

const router = useRouter()
const loading = ref(false)
const store = useStore()

const form = reactive<GlobalModelType>({
  swnumber: '',
  password: '',
  validCode: '',
})

const userType = ref('1')

const rules = reactive<any>({
  swnumber: [{required: true, message: '学工号长度必须为12位', trigger: 'blur'}],
  password: [{required: true, message: '密码必须位8到12位的数字、字母或特殊符号的混合形式', trigger: 'blur'}],
})

// 验证码
const validCode = ref("")

// 子组件用emit传入了input事件，传递了code值
// 接收验证码组件提交的 4位验证码
const createValidCode = (data: string) => {
  validCode.value = data
}

// 点击登录
const submit = () => {
    if (!form.validCode) {
      ElMessage({
        message: '请填写验证码',
        type: 'warning'
      })
      return
    }
    if (form.validCode.toLowerCase() !== validCode.value.toLowerCase()) {
      ElMessage({
        message: '验证码错误',
        type: 'error'
      })
      return
    }

    loading.value = true

    console.log(userType.value)

    login(
        form.swnumber,
        form.password,
        userType.value
    ).then(res => {
      ElMessage.success('登录成功:' + res.swnumber)
      console.log('跳转页面成功', res)
      // 使用pinia进行登录
      store.login(res)
      router.push({name: 'container'})
    })
    loading.value = false

}
</script>

<style scoped lang="scss">
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("../assets/login-background.png");
  background-size: 100% 100%;

  .login-form {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(190, 190, 190, 0.8);
    overflow: hidden;
  }

  .form-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
  }

  .form-content {
    padding: 30px 30px;

    .login-btn {
      text-align: center;

      button {
        width: 100%;
        height: 36px;
      }
    }
  }

  .register {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 20px;
    margin-right: 15px;
  }
}
</style>