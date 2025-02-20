import * as ajax from "../../common/ajax.ts";

export const list = () => ajax.pureGet("/teacher/assess/student/page");

// @ts-ignore
export const get = (id: number) => ajax.get("/teacher/assess/teacher/page?id=" + id);

export const save = (entity: any) => ajax.put("/teacher/assess/save", entity);

