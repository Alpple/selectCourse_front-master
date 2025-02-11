import * as ajax from "../../common/ajax.ts";

export const list = () => ajax.pureGet("/teacher/course/list");

export const create = (entity:any) => ajax.post("/teacher/course", entity);