import { CourseAttendance } from "../../../../../../../../types/Course";

export interface EditingInProgress {
    currentDate: string;
    courseAttendance: CourseAttendance[];
}