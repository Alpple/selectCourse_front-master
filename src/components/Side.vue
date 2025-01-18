<template>
  <div class="sidebar">
    <el-menu
        :default-active="routePath"
        active-text-color="#85FFBD"
        background-color="#fff"
        class="sidebar-el-menu"
        router
        text-color="#4EACC3"
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-sub-menu :index="item.index" :key="item.index">
            <template slot="title">
              <el-icon><location /></el-icon>
              <span slot="title">{{ item.title }}</span>
            </template>

            <template v-for="subItem in item.subs" :key="subItem.index">
              <el-sub-menu
                  v-if="subItem.subs"
                  :index="subItem.index"
                  :key="subItem.index"
              >
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                    v-for="(threeItem,i) in subItem.subs"
                    :index="threeItem.index"
                    :key="i"
                >
                  {{ threeItem.title }}
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                {{ subItem.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>

        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, toRaw} from "vue";
import {useStore} from "@/store";
import {useRoute} from "vue-router";
import {Location} from '@element-plus/icons-vue'

const store = useStore()
const route = useRoute()

const items = computed(() => store.sideBarItems)
const routePath = computed(() => route.path)

onMounted(()=>{
  console.log("Items data:",toRaw(items.value))
})
</script>

<style scoped lang="scss">
.sidebar {
  display: block;
  position: absolute;
  left: 30px;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 150px;
}

.sidebar > ul {
  height: 100%;
}
</style>