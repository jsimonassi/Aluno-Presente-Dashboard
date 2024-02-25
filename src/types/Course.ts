import { Moment } from "moment";
import { Student } from "./Student";


export interface Course {
    id: string;
    name: string;
    period?: string;
    daysOfWeek: ClassTime[];
    about?: string;
    members?: Student[];
}

export interface ClassTime {
    momentStart: Moment;
    momentEnd: Moment;
    start? : string;
    end? : string;
}

export interface CourseAttendance extends Student {
    frequencies: {
        id: string,
        date: string,
        status: FrequencyStatus,
    } []
}

export interface CacheByMonthCourseAttendance {
    [compositeKeyDateCourseId: string]: CourseAttendance[];
}

export interface AttendanceUpdateQueueItem {
    backupState: CacheByMonthCourseAttendance;
    promise: Promise<void>;
}

enum FrequencyStatus {
    PRESENT = 1,
    ABSENT = 2,
    JUSTIFIED = 3,
    OTHER = 4
}
