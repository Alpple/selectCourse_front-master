<template>
  <div
      class="ValidCode disabled-select"
      :style="`width:${width};height:${height}`"
      @click="refreshCode"
  >
    <span
        v-for="(item,index) in codeList"
        :key="index"
        :style="getStyle(item)"
    >
      {{ item.code }}
    </span>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";

defineOptions({
  name: "ValidCode",
})

// 定义 props
const props = withDefaults(defineProps<{
  width?: string;
  height?: string;
  length?: number;
  refresh?: number;
}>(), {
  width: '100px',
  height: '35px',
  length: 4
})

// 定义 emits
const emit = defineEmits<{
  (e: 'input', value: string): void
}>()

const codeList = ref<any[]>([]);

// 生成验证码
const createCode = () => {
  // 如果 length 未定义，则默认为 4
  const len = props.length || 4
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789'
  const charsLen = chars.length
  const newCodeList = []

//   生成随机验证码
  for (let i = 0; i < len; i++) {
    const rgb = [
      Math.round(Math.random() * 220),
      Math.round(Math.random() * 240),
      Math.round(Math.random() * 200),
    ]

    newCodeList.push({
      code: chars.charAt(Math.floor(Math.random() * charsLen)),
      color: `rgb(${rgb})`,
      fonSize: `${10 + Math.floor(Math.random() * 10) + 6}px`,
      padding: `${Math.floor(Math.random() * 10)}px`,
      transform: `rotate(${Math.floor(Math.random() * 90) - Math.floor(Math.random() * 90)}deg`
    })
  }

  codeList.value = newCodeList
  // 将当前数据派发出去，方便父组件使用
  emit('input', newCodeList.map(item => item.code).join(''))
}

// 刷新验证码
const refreshCode = () => {
  createCode()
}

// 监听 refresh prop
watch(() => props.refresh, () => {
  createCode()
})

// 样式函数
const getStyle = (data: any) => {
  return `color: ${data.color}; font-size:${data.fonSize}; padding:${data.padding}; transform:${data.transform};`
}

// 在组件挂载时生成验证码
onMounted(() => {
  createCode()
})
</script>

<style scoped lang="scss">
.ValidCode {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: white;
  margin-left: 5px;
  border-radius: 8px;

  span {
    display: inline-block;
  }
}
</style>