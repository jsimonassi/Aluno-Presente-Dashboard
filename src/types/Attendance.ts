export interface AttendanceInProgress {
    id: string;
    date: string;
    courseId: string;
    status: AttendanceInProgressStatus;
    type: AttendanceInProgressType;
}

export type AttendanceInProgressType = "qrCode" | "sessionCode";

export type AttendanceInProgressStatus = "requested" | "started" | "finished";

export interface WebSocketRequest {
	courseId: string;
	date: string;
	type: "START" | "STOP";
}