<template>
  <div>
    <el-carousel :interval="4000" type="card" height="150px">
      <el-carousel-item v-for="item in imgList" :key="item.id">
        <img :src="item.idView" alt="这是图片" class="image">
      </el-carousel-item>
    </el-carousel>
  </div>

  <!--  不同的身份看到的帮助手册内容不同-->
  <div v-if="userType===3">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item disabled>
        <template #title>
          <div style="font-size: 15px;margin-left: 10px">帮助手册</div>
        </template>
      </el-collapse-item>
      <el-collapse-item>
        <template #title>
          <div class="header box">
            <el-icon class="header-icon">
              <Notebook/>
            </el-icon>
            <div class="text">学院、专业及班级的管理</div>
          </div>
        </template>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">您可以对系统的学院、专业及班级进行新建、编辑和删除</div>
        </div>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">在学院管理界面系统会自动为您统计不同学院下的专业数与教师数。
            <span>请注意：</span>在进行删除操作时确保当前学院下的所有专业都已被清空，否则将无法进行删除操作
          </div>
        </div>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">在专业管理界面对专业进行操作。
            <span>请注意：</span>在进行删除操作时确保当前专业下的所有班级都已被清空，否则将无法进行删除操作
          </div>
        </div>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">在班级管理界面对班级进行操作。
            <span>请注意：</span>在进行删除操作时确保当前班级下的所有学生都已被清空，否则将无法进行删除操作
          </div>
        </div>
      </el-collapse-item>

      <el-collapse-item>
        <template #title>
          <div class="header box">
            <el-icon class="header-icon">
              <Notebook/>
            </el-icon>
            <div class="text">教师管理</div>
          </div>
        </template>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">您可以对系统的教师进行新建、编辑和删除</div>
        </div>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">点击新建添加一位教师的信息。
            <span>请注意：</span>如果您没有为教师设置密码，系统将自动设置初始密码为“A12345678”
          </div>
        </div>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">点击删除将一位教师的信息删除。
            <span>请注意：</span>在进行删除操作时确保当前教师所设的所有课程都已被清空，否则将无法进行删除操作
          </div>
        </div>
      </el-collapse-item>

      <el-collapse-item>
        <template #title>
          <div class="header box">
            <el-icon class="header-icon">
              <Notebook/>
            </el-icon>
            <div class="text">学生管理</div>
          </div>
        </template>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">您可以对系统的学生进行新建、编辑和删除</div>
        </div>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">点击新建添加一位学生的信息。
            <span>请注意：</span>如果您没有为学生设置密码，系统将自动设置初始密码为“A12345678”
          </div>
        </div>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">点击删除将一位学生的信息删除。
            <span>请注意：</span>在进行删除操作时确保当前学生所选的所有课程都已被退选，否则将无法进行删除操作
          </div>
        </div>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">在班级管理界面对班级进行操作。
            <span>请注意：</span>在进行删除操作时确保当前班级下的所有学生都已被清空，否则将无法进行删除操作
          </div>
        </div>
      </el-collapse-item>

      <el-collapse-item>
        <template #title>
          <div class="header box">
            <el-icon class="header-icon">
              <Notebook/>
            </el-icon>
            <div class="text">课程管理</div>
          </div>
        </template>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">您可以对所有课程进行查看和删除</div>
        </div>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">当一位教师创建新的课程后，该课程的详细信息将会出现在课程管理的列表中</div>
        </div>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">点击删除将一门已创建的课程删除。
            <span>请注意：</span>在进行删除操作时确保选择当前课程的所有学生都已退选，否则将无法进行删除操作
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>

  <div v-if="userType===2">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item disabled>
        <template #title>
          <div style="font-size: 15px;margin-left: 10px">帮助手册</div>
        </template>
      </el-collapse-item>
      <el-collapse-item>
        <template #title>
          <div class="header box">
            <el-icon class="header-icon">
              <Notebook/>
            </el-icon>
            <div class="text">授课查询</div>
          </div>
        </template>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">在此界面您可以查看自己所开设的所有课程以及选课人数</div>
        </div>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">点击创建添加一门新的课程。
            <span>请注意：</span>课程一旦创建将无法更改，请详细核查信息后再点击确定
          </div>
        </div>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">根据实际需要，系统允许您创建上课时间相同的不同课程</div>
        </div>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">如需删除课程请联系管理员进行操作</div>
        </div>
      </el-collapse-item>

      <el-collapse-item>
        <template #title>
          <div class="header box">
            <el-icon class="header-icon">
              <Notebook/>
            </el-icon>
            <div class="text">教师课表</div>
          </div>
        </template>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">在此界面您可以查看自己所授课程的可视化课表
            <span>请注意：</span>当两门课程的上课时间相同时，课表显示的是您最后创建的课程，这并不代表您同时间的其他课程未在系统中，只是没有显示
          </div>
        </div>
      </el-collapse-item>

      <el-collapse-item>
        <template #title>
          <div class="header box">
            <el-icon class="header-icon">
              <Notebook/>
            </el-icon>
            <div class="text">成绩录入</div>
          </div>
        </template>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">在此界面您可以对选课学生的成绩进行录入</div>
        </div>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">您可以通过搜索框查看同一课程的不同学生或同一学生的不同课程，使您的操作更加便捷</div>
        </div>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">
            <span>请注意：</span>平时分与笔试分只是便于学生查看与参考，系统并不会自动生成最终成绩，您可以根据课程的需要按不同权重录入最终成绩
          </div>
        </div>
      </el-collapse-item>

      <el-collapse-item>
        <template #title>
          <div class="header box">
            <el-icon class="header-icon">
              <Notebook/>
            </el-icon>
            <div class="text">课程管理</div>
          </div>
        </template>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">信息维护</div>
        </div>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">在此界面您可以对自己的个人信息进行修改</div>
        </div>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">
            <span>请注意：</span>工号、姓名与学院如需修改，请联系管理员操作
          </div>
        </div>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">您也可以通过输入新的密码以修改密码</div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>

  <div v-if="userType===1">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item disabled>
        <template #title>
          <div style="font-size: 15px;margin-left: 10px">帮助手册</div>
        </template>
      </el-collapse-item>
      <el-collapse-item>
        <template #title>
          <div class="header box">
            <el-icon class="header-icon">
              <Notebook/>
            </el-icon>
            <div class="text">进入选课</div>
          </div>
        </template>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">在此界面您可以查看学院为您的年级开设的所有课程，但您已经选择的课程将不会出现在这里</div>
        </div>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">通过搜索可以根据课程名或者开课教师检索您想查找的课程，使您的操作更加便捷</div>
        </div>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">点击课程后的选课按钮可以选课。
            <span>请注意：</span>您在每日的同一时段至多选择一门课程，课程时间冲突将导致选课失败
          </div>
        </div>
      </el-collapse-item>

      <el-collapse-item>
        <template #title>
          <div class="header box">
            <el-icon class="header-icon">
              <Notebook/>
            </el-icon>
            <div class="text">已选课程</div>
          </div>
        </template>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">在此界面您可以查看自己的所有选课</div>
        </div>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">点击退选进行课程退选操作。
            <span>请注意：</span>授课教师已经录入成绩的课程无法被退选
          </div>
        </div>
      </el-collapse-item>

      <el-collapse-item>
        <template #title>
          <div class="header box">
            <el-icon class="header-icon">
              <Notebook/>
            </el-icon>
            <div class="text">信息维护</div>
          </div>
        </template>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">在此界面您可以对自己的个人信息进行修改</div>
        </div>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">
            <span>请注意：</span>学号、姓名、学院、专业和班级如需修改，请联系管理员操作
          </div>
        </div>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">您也可以通过输入新的密码以修改密码</div>
        </div>
      </el-collapse-item>

      <el-collapse-item>
        <template #title>
          <div class="header box">
            <el-icon class="header-icon">
              <Notebook/>
            </el-icon>
            <div class="text">其他</div>
          </div>
        </template>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">信息维护</div>
        </div>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">在查看课表界面您可以查看自己所修课程的可视化课表：包括课程名称、授课教师以及上课地点</div>
        </div>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">在成绩查询界面您可以查看自己所修课程的成绩，包括平时分、笔试分和最终成绩。
            <span>请注意：</span>如果成绩未显示，则说明教师还未录入成绩
          </div>
        </div>
        <div class="box">
          <el-icon class="header-icon">
            <info-filled/>
          </el-icon>
          <div class="text">您也可以通过输入新的密码以修改密码</div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import {useStore} from "@/store";
import {computed, onMounted, ref} from "vue";
import {Notebook} from '@element-plus/icons-vue'

const store = useStore();

const imgList = [
  {id: 0, idView: new URL('@/assets/swiper1.png', import.meta.url).href},
  {id: 1, idView: new URL('@/assets/swiper2.png', import.meta.url).href},
  {id: 2, idView: new URL('@/assets/swiper3.png', import.meta.url).href},
  {id: 3, idView: new URL('@/assets/swiper4.png', import.meta.url).href},
  {id: 4, idView: new URL('@/assets/swiper5.png', import.meta.url).href},
]

// 计算属性获取用户类型
const userType = computed(() => store.status.userType)
const activeName = ref('1')
const screenWidth = ref(0)
const bannerHeight = ref(0)

// 计算banner图高度
const setSize = () => {
  bannerHeight.value = (400 / 1920) * screenWidth.value
}

// 组件挂载时
onMounted(() => {
  // 首次加载时需要调用一次
  screenWidth.value = window.innerWidth
  setSize()

  // 窗口大小变化时调用一次
  window.onresize = () => {
    screenWidth.value = window.innerWidth
    setSize()
  }
})
</script>

<style scoped lang="scss">
img {
  width: 100%;
  height: inherit;
}

.header {
  display: flex;
  align-items: center;
  color: #4EACC3;
  font-size: 14px;
}

.box {
  display: flex;
  align-items: center;

  .text {
    padding-left: 6px;

    span {
      color: #ed5d32
    }
  }
}


</style>