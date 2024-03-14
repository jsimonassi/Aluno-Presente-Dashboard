export interface User {
    name: string;
    email: string;
    photo?: string | null;
    info: {
        about: string;
        contacts: {
            id: number;
            value: string;
        }[];
    };
}