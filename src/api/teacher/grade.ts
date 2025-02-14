import * as ajax from "../../common/ajax.ts";

export const get = (id:number) => ajax.pureGet("/teacher/grade/" + id);

export const update = (entity:any) => ajax.put("/teacher/grade", entity);

export const getPageCount = (courseName:string, studentName:string) =>
    ajax.get("/teacher/grade/page/count", {
        courseName: courseName,
        studentName: studentName
    });

export const getPage = (index:number, courseName:string, studentName:string) =>
    ajax.get("/teacher/grade/page/" + index, {
        courseName: courseName,
        studentName: studentName
    });

export const pageSize = 20;