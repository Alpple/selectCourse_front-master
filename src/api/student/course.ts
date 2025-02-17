import * as ajax from "../../common/ajax.ts";

export const list = () => ajax.pureGet("/student/course/list");

export const deleteItem = (studentCourseId:number) =>
    ajax.pureDelete("/student/course/" + studentCourseId);