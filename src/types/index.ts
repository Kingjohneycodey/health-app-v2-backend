export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: string;
}

export interface Task {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    userId: string;
}
