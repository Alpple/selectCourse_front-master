import * as ajax from "../../common/ajax.ts";

// @ts-ignore
export const get = (id: number) => ajax.get("/admin/department/" + id)

export const create = (entity: any) => ajax.post("/admin/department", entity)

export const deleteItem = (id: number) => ajax.pureDelete("/admin/department/" + id)

export const update = (entity: any) => ajax.put("/admin/department/", entity)

export const getPageCount = (name: string) => ajax.get("/admin/department/page/count" , {
    name: name
})

export const getPage = (index: number, name: string) =>
    ajax.get("/admin/department/page/" + index, {
        name: name
    })

export const listName = () => ajax.pureGet("/admin/department/names")

export const pageSize = 20