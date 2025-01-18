// 定义一个类型来表示用户类型
type UserType = {
    student: number;
    teacher: number;
    admin: number;
}

//创建一个对象并赋值
const userType: UserType = {
    student: 1,
    teacher: 2,
    admin: 3
}

//导出对象
export default userType;