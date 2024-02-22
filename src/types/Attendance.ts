export interface AttendanceInProgress {
    id: string;
    date: string;
    courseId: string;
    status: AttendanceInProgressStatus;
    type: AttendanceInProgressType;
    useLocation: boolean;
    location: LatLng | null;
}

export type AttendanceInProgressType = "qrCode" | "sessionCode";

export type AttendanceInProgressStatus = "requested" | "started" | "finished";

export interface LatLng {
    lat: number;
    lng: number;
}

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