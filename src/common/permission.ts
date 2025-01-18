// 定义权限的类型
interface PermissionType {
    no: number;
    department: number;
    major: number;
    class: number;
    student: number;
    teacher: number;
    course: number;
    studentCourse: number;
    admin: number;
    permissionCount: number
}

//创建权限对象
const Permission: PermissionType = {
    no: 0,
    department: 1,
    major: 2,
    class: 4,
    student: 8,
    teacher: 16,
    course: 32,
    studentCourse: 64,
    admin: 128,
    permissionCount: 8 // 权限计数
}

export default Permission