import * as ajax from "../../common/ajax.ts";

export const get = () => ajax.pureGet("/student/info")

export const update = (entity:any) => ajax.put("/student/info", entity)