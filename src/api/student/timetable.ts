import * as ajax from "../../common/ajax.ts";

export const get = () => ajax.pureGet("/student/timetable")