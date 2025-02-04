import * as ajax from "../../common/ajax.ts";

export const get = (id:number) => ajax.get("/admin/course/" + id);

export const deleteItem = (id:number) => ajax.pureDelete("/admin/course/" + id);

export const getPageCount = (departmentName:string, majorName:string, name:string) =>
    ajax.get("/admin/course/page/count", {
        departmentName: departmentName,
        majorName: majorName,
        name: name
    });

export const getPage = (index:number, departmentName:string, majorName:string, name:string) =>
    ajax.get("/admin/course/page/" + index, {
        departmentName: departmentName,
        majorName: majorName,
        name: name
    });

export const listName = () => ajax.pureGet("/admin/course/names");

export const pageSize = 20;