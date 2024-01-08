import { Moment } from "moment";
import { Student } from "./Student";
import Periods from "../services/api/Periods";

export interface Course {
    id: string;
    name: string;
    period?: string;
    daysOfWeeks: ClassTime[];
    about?: string;
}

export interface ClassTime {
    momentStart: Moment;
    momentEnd: Moment;
    start? : string;
    end? : string;
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
