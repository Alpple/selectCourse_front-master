//定义状态类型
import SideItem from "../common/sideItem.ts";
import {defineStore} from "pinia";

// 定义状态类型
interface Status {
    loggedIn: boolean;
    userId: number;
    swnumber: string;
    userType: number;
    permission: number
}

interface StoreState {
    status: Status;
    sideBarItems: typeof SideItem.items;
    loading: boolean;
}

//创建 pinia store
export const useStore = defineStore('main', {
    state: (): StoreState => ({
        status: {
            loggedIn: false,
            userId: -1,
            swnumber: '',
            userType: 0,
            permission: 0
        },
        sideBarItems: [],
        loading: true,

    }),

    actions: {
        login(
            res: { loggedIn: boolean; userId: number; swnumber: string; userType: number; permission: number })
        {
            this.status.loggedIn = res.loggedIn
            this.status.userId = res.userId
            this.status.swnumber = res.swnumber
            this.status.userType = res.userType
            this.status.permission = res.permission

            let items = [];
            for (let i = 0; i < SideItem.items.length; i++) {
                let item = SideItem.items[i];
                if (
                    item.userType === res.userType &&
                    (item.permission & res.permission) === item.permission
                ) {
                    items.push(item);
                }
            }
            this.sideBarItems = items;
        },

        logout() {
            this.status = {
                loggedIn: false,
                userId: -1,
                swnumber: '',
                userType: 0,
                permission: 0
            }
        },
    }
})