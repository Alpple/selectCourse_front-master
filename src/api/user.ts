import {post, pureGet} from "../common/ajax.ts";

export const login = (swnumber: string, password: string, userType: number) =>
    post("/user/login", {
        swnumber: swnumber,
        password: password,
        userType: userType
    })

export const getLoginStatus = () => pureGet("/user/login/status")

export const logout = () => pureGet("/user/logout")