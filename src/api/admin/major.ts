import * as ajax from "../../common/ajax.ts";

// @ts-ignore
export const get = (id: number) => ajax.get("/admin/major/" + id);

export const create = (entity: any) => ajax.post("/admin/major", entity);

export const deleteItem = (id: number) => ajax.pureDelete("/admin/major/" + id);

export const update = (entity: any) => ajax.put("/admin/major", entity);

export const getPageCount = (departmentName: string, name: string) =>
    ajax.get("/admin/major/page/count", {
        departmentName: departmentName,
        name: name
    });

export const getPage = (index: number, departmentName: string, name: string) =>
    ajax.get("/admin/major/page/" + index, {
        departmentName: departmentName,
        name: name
    });

export const listName = () => ajax.pureGet("/admin/major/names");

export const pageSize = 20;

