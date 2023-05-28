export interface StudentsClass {
    id: number;
    courseName: string;
    period?: string;
    daysOfWeek?: ClassTime[];
    about?: string;
}

export interface ClassTime {
    start: string;
    end: string;
    dayOfWeek: string;
}