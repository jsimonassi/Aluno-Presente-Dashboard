export interface AttendanceInProgress {
    id: string;
    date: string;
    courseId: string;
    status: AttendanceInProgressStatus;
    type: AttendanceInProgressType;
    useLocation: boolean;
}

export type AttendanceInProgressType = "qrCode" | "sessionCode";

export type AttendanceInProgressStatus = "requested" | "started" | "finished";

export interface WebSocketStartRequest {
	courseId: string;
	date: string;
	type: "START";
    useLocation: boolean;
}

export interface WebSocketStopRequest {
    courseId: string;
    type: "STOP";
}

export interface WebSocketResponse {
    value: string;
    type: "CODE" | "WARN" | string;
    description: string;
}