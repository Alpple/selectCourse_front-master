<template>
  <div class="home">
    <head-bar/>
    <side-bar/>

    <div class="content-box">
      <div class="content" v-loading="loading">
        <router-view/>
        <el-backtop target=".content"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeadBar from "@/components/Head.vue";
import SideBar from "@/components/Side.vue";
import {useStore} from "@/store";
import UserType from "@/common/userType.ts";
import {storeToRefs} from "pinia";
import {useRoute, useRouter} from "vue-router";
import {onMounted} from "vue";
import {getLoginStatus} from "@/api/user.ts";

defineOptions({
  name: "container",
})

const router = useRouter();
const store = useStore()
const route = useRoute();

const {loading} = storeToRefs(store)

// 重定向到相应的主页
const redirectHome = (userType: number) => {
  if (userType === UserType.student) {
    router.push({name: 'student-home'})
  } else if (userType === UserType.teacher) {
    router.push({name: 'teacher-home'})
  } else if (userType === UserType.admin) {
    router.push({name: 'admin-home'})
  }
}

// 在组件挂载时获取登录状态
onMounted(() => {
  getLoginStatus().then((res:any) => {
    store.login(res) // 调用 Pinia 的登录方法
    if (!res.loggedIn) {
      router.push({name: 'login'})
    } else if (route.path === '/') {
      redirectHome(res.userType)
    }
  })
})

</script>

<style scoped lang="scss">
.content-box {
  position: absolute;
  left: 200px;
  right: 0;
  top: 70px;
  bottom: 0;
  background: #f0f0f0;

  .content {
    width: auto;
    height: 100%;
    padding: 10px;
    overflow-y: scroll;
    box-sizing: border-box;
  }
}
</style>