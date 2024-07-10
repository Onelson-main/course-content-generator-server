export interface Course_type {
    title: string;
    overview: string;
    duration: number;
    modules?: {
        title: string;
        topics?: (string)[] | null;
    }
}
export interface Modules_type {
    title: string;
    topics?: (string)[] | null;
}
