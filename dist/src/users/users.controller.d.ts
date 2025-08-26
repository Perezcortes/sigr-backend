interface User {
    id: number;
    name: string;
    email: string;
}
export declare class UsersController {
    private users;
    getUsers(): User[];
    getUserById(id: string): User | undefined;
}
export {};
