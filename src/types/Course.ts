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