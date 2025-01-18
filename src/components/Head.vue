<template>
  <div class="head-bar">
    <div class="head-ico">
      <House style="width: 1em; height: 1em; margin-right: 8px"/>
    </div>
    <div class="logo">在线选课系统</div>
    <div class="head-right">
      <div class="head-user-con">
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip
              :content="fullscreen?`退出全屏`:`全屏`"
              effect="dark"
              placement="bottom"
          >
            <FullScreen style="width: 1em; height: 1em; margin-right: 8px"/>
          </el-tooltip>
        </div>

        <div class="user-avatar">
          <!--          根据 userType渲染不同的头像-->
          <img src="@/assets/avatar-student.png"
               alt="学生头像"
               style="width: 55px;height: 55px;"
               v-if="store.status.userType === 1"
          />
          <img src="@/assets/avatar-teacher.jpg"
               alt="教师头像"
               style="width: 55px;height: 55px;"
               v-if="store.status.userType === 2"
          />
          <img src="@/assets/avatar-admin.png"
               alt="管理员头像"
               style="width: 55px;height: 55px;"
               v-if="store.status.userType === 3"
          />
        </div>

        <el-dropdown placement="bottom" @command="handleCommand" class="user-name" trigger="click">
          <span class="el-dropdown-link" style="font-size: large">
            {{ swnumber }}
          <CaretBottom style="width: 1em; height: 1em; margin-right: 8px"/>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {CaretBottom, FullScreen, House} from "@element-plus/icons-vue";
import {computed, ref} from "vue";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import {useStore} from "@/store";
import {logout} from "@/api/user.ts";

const router = useRouter()
const store = useStore()
const fullscreen = ref(false)

const swnumber = computed(() => store.status.swnumber)

// 处理全屏
const handleFullScreen = () => {
  const element = document.documentElement;
  const doc: any = document; // 将 document 断言为 any 类型

  if (fullscreen.value) {
    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.webkitCancelFullScreen) {
      doc.webkitCancelFullScreen();
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen();
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen();
    }
  } else {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((element as any).webkitRequestFullScreen) {
      (element as any).webkitRequestFullScreen();
    } else if ((element as any).mozRequestFullScreen) {
      (element as any).mozRequestFullScreen();
    } else if ((element as any).msRequestFullscreen) {
      (element as any).msRequestFullscreen();
    }
  }
  fullscreen.value = !fullscreen.value; // 切换全屏状态
}

// 处理退出登录
const handleCommand =  (command: string) => {
  if (command === "logout") {
    logout().then(()=>{
      store.logout()
      ElMessage.success("退出登录")
       router.push("/login")
    })
  }
}
</script>

<style scoped lang="scss">
.head-bar {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  background-color: #eda2bc;

  .head-ico {
    float: left;
    padding: 5px 21px;
    line-height: 70px;
  }

  .logo {
    float: left;
    width: 250px;
    line-height: 70px;
  }

  .head-right {
    float: right;
    padding-right: 50px;

    .head-user-con {
      display: flex;
      height: 70px;
      align-items: center;

      .btn-fullscreen {
        margin-right: 5px;
        font-size: 24px;
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
      }

      .user-avatar {
        margin-left: 20px;

        img {
          display: block;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }

      .user-name {
        margin-left: 10px;

        .el-dropdown-link {
          color: #fff;
          cursor: pointer;
        }
      }
    }


  }


}
</style>