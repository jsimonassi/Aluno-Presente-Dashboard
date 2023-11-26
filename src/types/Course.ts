import { Moment } from "moment";
import { Student } from "./Student";

export interface Course {
    id: number;
    name: string;
    period?: string;
    daysOfWeek?: ClassTime[];
    about?: string;
}

export interface ClassTime {
    start: Moment;
    end: Moment;
}

export interface CourseFrequency extends Student {
    frequencies: {
        date: string,
        status: FrequencyStatus,
    } []
}

enum FrequencyStatus {
    PRESENT = 1,
    ABSENT = 2,
    JUSTIFIED = 3,
    OTHER = 4
}
