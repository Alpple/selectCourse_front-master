<template>
  <div class="timeTable">
    <table>
      <thead>
      <tr>
        <th>节次</th>
        <th v-for="(item,index) in tableData.length" :key="index">
          {{ "周" + digital2Chinese(item, "week") }}
        </th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(lesson,index) in tableData[0].length" :key="index">
        <td>
          <p>{{ "第" + digital2Chinese(lesson) + "节" }}</p>
        </td>
        <td v-for="(course,courseIndex) in tableData" :key="courseIndex">
          <span class="course-name">
            {{ tableData[courseIndex][index].courseName }}
          </span>
          <p class="teacher-name">
            {{ tableData[courseIndex][index].teacherName }}
          </p>
          <p class="location-name">
            {{ tableData[courseIndex][index].location }}
          </p>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";

const tableData = ref([[{courseName: '', teacherName: '', location: ''}]])

// 数字转中文
const digital2Chinese = (num: number, identifier: string) => {
  const characters = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"]
  return identifier === "week" && num === 7 ? "日" : characters[num]
}

// 初始化表格数据
const clearTable = () => {
  let table = []
  for (let i = 0; i < 7; i++) {
    let arr = []
    for (let j = 0; j < 10; j++) {
      arr.push({courseName: '', teacherName: '', location: ''})
    }
    table.push(arr)
  }
  tableData.value = table
}

// 设置课程信息
const setLesson = (item: any) => {
  const split = item.time.split("-")
  const week = parseInt(split[0])
  const lesson = parseInt(split[1])
  const length = parseInt(split[2])

  for (let i = 0; i < length; i++) {
    tableData.value[week - 1][lesson - 1 + i] = {
      courseName: item.courseName,
      teacherName: item.teacherName,
      location: item.location
    }
  }
}

// 更新数据
const updateData = (data: any[]) => {
  clearTable()
  for (let i = 0; i < data.length; i++) {
    setLesson(data[i])
  }
}

// 暴露 updateData 方法
defineExpose({ updateData })

onMounted(() => {
  clearTable()
})
</script>

<style scoped lang="scss">
table {
  table-layout: fixed;
  width: 100%;

  thead {
    background-color: #4EACC3;

    th {
      color: #fff;
      line-height: 17px;
      font-weight: normal;
    }
  }

  tbody {
    background-color: #eaf2ff;

    td {
      line-height: 0;
      color: #678798;
      height: 50px;

      span {
        line-height: 0.9;
      }
    }

    .course-name {
      color: #000;
      font-size: 16px;
      font-weight: 200;
    }
  }

  th,
  td {
    width: 60px;
    padding: 2px 2px;
    font-size: 12px;
    text-align: center;
  }

  tr td:first-child {
    color: #333;

    .period {
      font-size: 8px;
    }
  }
}
</style>