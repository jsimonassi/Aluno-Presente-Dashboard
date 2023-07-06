import { Student } from "./Student";

export interface Course {
    id: number;
    courseName: string;
    period?: string;
    daysOfWeek?: ClassTime[];
    about?: string;
}

export interface ClassTime {
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
    dayOfWeek: number;
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
