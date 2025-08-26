interface User {
    id: number;
    name: string;
    email: string;
}
export declare class UsersController {
    private users;
    getUsers(): User[];
    findUser(id: string): User | {
        error: string;
    };
    createUser(body: User): User;
}
export {};
