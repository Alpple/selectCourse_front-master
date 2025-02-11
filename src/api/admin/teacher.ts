import * as ajax from "../../common/ajax.ts";

// @ts-ignore
export const get = (id:number) => ajax.get("/admin/teacher/" + id);

export const create = (entity:any) => ajax.post("/admin/teacher", entity);

export const deleteItem = (id:number) => ajax.pureDelete("/admin/teacher/" + id);

export const update = (entity:any) => ajax.put("/admin/teacher", entity);

export const getPageCount = (departmentName:string, name:string) =>
    ajax.get("/admin/teacher/page/count", {
        departmentName: departmentName,
        name: name
    });

export const getPage = (index:number, departmentName:String, name:string) =>
    ajax.get("/admin/teacher/page/" + index, {
        departmentName: departmentName,
        name: name
    });

export const listName = () => ajax.pureGet("/admin/teacher/names");

export const pageSize = 20;