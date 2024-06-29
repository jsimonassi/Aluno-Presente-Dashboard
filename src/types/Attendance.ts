export interface AttendanceInProgress {
    id: string;
    date: string;
    courseId: string;
    status: AttendanceInProgressStatus;
    type: AttendanceInProgressType;
    location?: LatLng | null;
}

export type AttendanceInProgressType = "qrCode" | "sessionCode";

export type AttendanceInProgressStatus = "requested" | "started" | "finished";

export interface LatLng {
    latitude: number;
    longitude: number;
}

export interface WebSocketStartRequest {
	courseId: string;
	date: string;
	type: "START";
    location: LatLng | null;
}

export interface WebSocketStopRequest {
    courseId: string;
    type: "STOP";
}

export interface WebSocketResponse {
    value: string;
    type: "CODE" | "WARN" | "MEMBER_INCLUDED" | string;
    description: string;
}