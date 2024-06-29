export interface BatchProcess {
    id: string;
    target: "ADD_MEMBER";
    options: {
        [key: string]: string;
    };
    isViewed?: boolean;
    isFinished?: boolean;
    endAt?: string;
    successes?: string[];
    failures?: Failures[];
    createdAt: string;
}

export interface Failures {
    reason: string;
    email: string;
    registration: string;
    alias: string;
}