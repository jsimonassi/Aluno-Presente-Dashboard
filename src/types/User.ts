export interface User {
    name: string;
    email: string;
    photo?: string | null;
    info: {
        about: string;
        contacts: {
            type: string;
            value: string;
        }[];
    };
}