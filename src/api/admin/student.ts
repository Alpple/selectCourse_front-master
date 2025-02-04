import * as ajax from "../../common/ajax.ts";

export const get = (id:number) => ajax.get("/admin/student/" + id);

export const create = (entity:any) => ajax.post("/admin/student", entity);

export const deleteItem = (id:number) => ajax.pureDelete("/admin/student/" + id);

export const update = (entity:any) => ajax.put("/admin/student", entity);

export const getPageCount = (majorName:string, className:string, name:string) =>
    ajax.get("/admin/student/page/count", {
        majorName: majorName,
        className: className,
        name: name
    });

export const getPage = (index:number, majorName:string, className:string, name:string) =>
    ajax.get("/admin/student/page/" + index, {
        majorName: majorName,
        className: className,
        name: name
    });

export const listName = () => ajax.pureGet("/admin/student/names");

export const pageSize = 20;