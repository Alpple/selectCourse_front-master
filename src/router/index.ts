import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'container',
        component: () => import('@/view/Container.vue'),
        children:[
            {
                path:'/student',
                name:'student-home',
                component: () => import('@/view/Home.vue'),
            },
            {
                path:'/student/course/select',
                name:'student-course-select',
                component:()=>import('@/view/student/StudentCourseSelect.vue')
            },
            {
                path:'/student/course',
                name:'student-course',
                component:()=>import('@/view/student/StudentCourse.vue')
            },
            {
                path:'/student/timetable',
                name:'student-timetable',
                component:()=>import('@/view/student/StudentTimeTable.vue')
            },
            {
                path:'/student/score',
                name:'student-score',
                component:()=>import('@/view/student/StudentScore.vue')
            },
            {
                path:'/student/info',
                name:'student-info',
                component:()=>import('@/view/student/StudentInfo.vue')
            },
            {
                path:'/teacher',
                name:'teacher-home',
                component:()=>import('@/view/Home.vue')
            },
            {
                path:'/teacher/course',
                name:'teacher',
                component:()=>import('@/view/teacher/TeacherCourse.vue')
            },
            {
                path:'/teacher/timetable',
                name:'teacher-timetable',
                component:()=>import('@/view/teacher/TeacherTimeTable.vue')
            },
            {
                path:'/teacher/grade',
                name:'teacher-grade',
                component:()=>import('@/view/teacher/TeacherGrade.vue')
            },
            {
                path:'/teacher/info',
                name:'teacher-info',
                component:()=>import('@/view/teacher/TeacherInfo.vue')
            },
            {
                path:'/admin',
                name:'admin-home',
                component:()=>import('@/view/Home.vue')
            },
            {
                path:'/admin/department',
                name:'admin-department',
                component:()=>import('@/view/admin/AdminDepartment.vue')
            },
            {
                path:'/admin/major',
                name:'admin-major',
                component:()=>import('@/view/Admin/AdminMajor.vue')
            },
            {
                path:'/admin/class',
                name:'admin-class',
                component:()=>import('@/view/Admin/AdminClass.vue')
            },
            {
                path:'/admin/student',
                name:'admin-student',
                component:()=>import('@/view/Admin/AdminStudent.vue')
            },
            {
                path:'/admin/teacher',
                name:'admin-teacher',
                component:()=>import('@/view/Admin/AdminTeacher.vue')
            },
            {
                path:'/admin/course',
                name:'admin-course',
                component:()=>import('@/view/Admin/AdminCourse.vue')
            }
        ]
    },
    {
        path:'/login',
        name:'login',
        component:()=>import('@/view/Login.vue')
    },
    {
        path:'/register',
        name:'register',
        component:()=>import('@/view/Register.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router