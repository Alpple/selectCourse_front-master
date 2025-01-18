// @ts-nocheck
import axios, {AxiosResponse} from "axios";
import Config from "./config.ts";
import {ElMessage} from "element-plus";
import {ComponentPublicInstance} from "vue";
import {useStore} from "../store";

// 配置vue实例
export const vueInstance = {
    instance: null as ComponentPublicInstance | null,
    store: null as ReturnType<typeof useStore> | null
}

let runningRequest = 0

// axios实例配置,设置基本 URL、请求超时和凭证
const axiosInstance = axios.create({
    baseURL: Config.backEndUrl,
    timeout: 3000,
    withCredentials: true,
})

//封装请求方法
const addRequestCount = () => {
    runningRequest++
    if (runningRequest > 0 && vueInstance.store != null) {
        vueInstance.store.$state.loading = true
    }
}

const subtractRequestCount = () => {
    runningRequest--
    if (runningRequest <= 0 && vueInstance.store != null) {
        vueInstance.store.$state.loading = false
    }
}

//消息提示函数
function innerMessage(type: 'success' | 'warning' | 'info' | 'error', message: string) {
    ElMessage({
        showClose: true,
        duration: 2000,
        message: message,
        type: type
    })
}

//响应拦截器
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        let data = response.data.data
        subtractRequestCount()
        return data
    },
    (error) => {
        const code = error.response?.data.code
        const message = error.response?.data.message
        const data = error.response?.data.data
        subtractRequestCount()

        // 错误处理逻辑
        if (code === -1) {
            innerMessage("info", "需要登录")
            setTimeout(() => (window.location.href = "/login"), 250)
            return Promise.reject(new Error("NO_LOGIN"))
        } else if (code === 1) {
            innerMessage("error", "错误" + message)
            return Promise.reject(new Error("FAIL"))
        } else if (code === 2) {
            innerMessage("info", "您不是此角色")
            setTimeout(() => (window.location.href = "/login"), 250)
            return Promise.reject(new Error("ERROR_ROLE"))
        } else if (code === 3) {
            innerMessage("info", "您没有此权限")
            setTimeout(() => (window.location.href = "/login"), 250)
            return Promise.reject(new Error("NO_PERMISSION"))
        } else if (code === 4) {
            let errorMessage = "请求参数错误"
            if (data.length > 0) {
                errorMessage = "参数错误：" + data[0].message
            }
            innerMessage("error", errorMessage)
            return Promise.reject(new Error("INVALID_PARAMETER"))
        } else if (code === 10) {
            innerMessage("error", "内部服务器错误")
            return Promise.reject(new Error("INTERNAL_SERVER_ERROR"))
        }

        if (typeof error.response === "undefined") {
            innerMessage("error", "与后端服务器通信失败")
            // vueInstance.instance?.$router.push({name: 'login'})
        } else if (error.response.status >= 400) {
            innerMessage("error", "HTTP错误:" + error.response.status)
        }
        return Promise.reject(error)
    }
)

const dataHandle = (response:any) => {
    return response
}

const innerGet = function() {
    addRequestCount()
    return axiosInstance.get.apply(this, arguments).then(dataHandle)
}

const innerPost = function() {
    addRequestCount();
    return axiosInstance.post.apply(this, arguments).then(dataHandle)
}

const innerDelete = function() {
    addRequestCount();
    return axiosInstance.delete.apply(this, arguments).then(dataHandle)
}

const innerPut = function() {
    addRequestCount();
    return axiosInstance.put.apply(this, arguments).then(dataHandle)
}

export const pureGet = function(url:any) {
    return innerGet(url)
}

export const pureDelete = function(url) {
    return innerDelete(url)
}

export const get = function(url, params) {
    return innerGet(url, {
        params: params
    })
}

export const post = function(url, data) {
    return innerPost(url, data, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const del = function(url, params) {
    return innerDelete(url, {
        params: params
    })
}

export const put = function(url, data) {
    return innerPut(url, data, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}
