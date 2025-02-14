import * as ajax from "../../common/ajax.ts";

export const select = (id:number) => ajax.post("/student/course/select/" + id, {});

export const getPageCount = (courseName:string, teacherName:string) =>
    ajax.get("/student/course/select/page/count", {
        courseName: courseName,
        teacherName: teacherName
    });

export const getPage = (index:number, courseName:string, teacherName:string) =>
    ajax.get("/student/course/select/page/" + index, {
        courseName: courseName,
        teacherName: teacherName
    });

export const pageSize = 20;