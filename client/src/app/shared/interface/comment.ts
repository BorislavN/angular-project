import { IUser } from "./user";

export interface IComment {
    text: String;
    authorId: IUser;
    createdAt: Date;
}