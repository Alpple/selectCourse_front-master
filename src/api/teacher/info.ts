import * as ajax from "../../common/ajax.ts";

export const get = () => ajax.pureGet("/teacher/info");

export const update = (entity:any) => ajax.put("/teacher/info", entity);