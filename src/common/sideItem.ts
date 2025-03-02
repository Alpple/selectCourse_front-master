// 定义单个菜单项的类型
import UserType from "./userType.ts";
import Permission from "./permission.ts";

interface SideItemType {
    // 路由路径
    index: string;
    // 菜单标题
    title: string;
    // 用户类型
    userType: number;
    // 权限
    permission: number;
}

//定义侧边栏项的类型
interface SideItem {
    items: SideItemType[];
}

//初始化菜单栏
const sideItem: SideItem = {
    items: [
        {
            index: "/student",
            title: "学生首页",
            userType: UserType.student,
            permission: Permission.no
        },
        {
            index: "/student/course/select",
            title: "进入选课",
            userType: UserType.student,
            permission: Permission.no
        },
        {
            index: "/student/course",
            title: "已选课程",
            userType: UserType.student,
            permission: Permission.no
        },
        {
            index: "/student/timetable",
            title: "查看课表",
            userType: UserType.student,
            permission: Permission.no
        },
        {
            index: "/student/score",
            title: "成绩查询",
            userType: UserType.student,
            permission: Permission.no
        },
        {
            index: "/student/assess",
            title: "教师评价",
            userType: UserType.student,
            permission: Permission.no
        },
        {
            index: "/student/info",
            title: "信息维护",
            userType: UserType.student,
            permission: Permission.no
        },
        {
            index: "/teacher",
            title: "教师首页",
            userType: UserType.teacher,
            permission: Permission.no
        },
        {
            index: "/teacher/course",
            title: "授课管理",
            userType: UserType.teacher,
            permission: Permission.no
        },
        {
            index: "/teacher/timetable",
            title: "教师课表",
            userType: UserType.teacher,
            permission: Permission.no
        },
        {
            index: "/teacher/grade",
            title: "成绩录入",
            userType: UserType.teacher,
            permission: Permission.no
        },
        {
            index: "/teacher/info",
            title: "信息维护",
            userType: UserType.teacher,
            permission: Permission.no
        },
        {
            index: "/admin",
            title: "管理员首页",
            userType: UserType.admin,
            permission: Permission.no
        },
        {
            index: "/admin/department",
            title: "学院管理",
            userType: UserType.admin,
            permission: Permission.department
        },
        {
            index: "/admin/major",
            title: "专业管理",
            userType: UserType.admin,
            permission: Permission.major
        },
        {
            index: "/admin/class",
            title: "班级管理",
            userType: UserType.admin,
            permission: Permission.class
        },
        {
            index: "/admin/teacher",
            title: "教师管理",
            userType: UserType.admin,
            permission: Permission.teacher
        },
        {
            index: "/admin/student",
            title: "学生管理",
            userType: UserType.admin,
            permission: Permission.student
        },
        {
            index: "/admin/course",
            title: "课程管理",
            userType: UserType.admin,
            permission: Permission.course
        },
    ]
}

export default sideItem