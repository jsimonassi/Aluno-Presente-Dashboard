export interface BatchAddResponseModel {
    failed: FailAddedStudent[];
}

export interface FailAddedStudent {
    email: string;
    registration: string;
    alias: string;
    reason: string;
}