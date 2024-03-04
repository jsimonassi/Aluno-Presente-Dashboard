import { Moment } from "moment";
import { Student } from "./Student";


export interface Course {
    id: string;
    name: string;
    period?: string;
    daysOfWeek: ClassTime[];
    about?: string;
    members?: Student[];
    createdAt?: string;
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

enum FrequencyStatus {
    PRESENT = 1,
    ABSENT = 2,
    JUSTIFIED = 3,
    OTHER = 4
}
