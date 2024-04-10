export interface StaticAttendanceInfos {
    courseId: string;
    date?: string;
    type: "START" | "STOP";
    latitude?: number;
    longitude?: number;
}