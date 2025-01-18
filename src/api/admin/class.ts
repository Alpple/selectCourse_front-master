import * as ajax from "../../common/ajax.ts";

// @ts-ignore
export const get = (id: number) => ajax.get("/admin/class/" + id);

export const create = (entity: any) => ajax.post("/admin/class", entity);

export const deleteItem = (id: number) => ajax.pureDelete("/admin/class/" + id);

export const update = (entity: any) => ajax.put("/admin/class", entity);

export const getPageCount = (departmentName: string, majorName: string, name: string) =>
    ajax.get("/admin/class/page/count", {
        departmentName: departmentName,
        majorName: majorName,
        name: name
    });

export const getPage = (index: number, departmentName: string, majorName: string, name: string) =>
    ajax.get("/admin/class/page/" + index, {
        departmentName: departmentName,
        majorName: majorName,
        name: name
    });

export const listName = () => ajax.pureGet("/admin/class/names");

export const pageSize = 20;
