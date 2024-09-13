export interface IUser {
    id?: string;
    userName: string;
    password?: string;
    phone: string;
    bio?: string;
    email: string;
    token?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IContact {
    id?: string;
    userId: string;
    contactId: string;
    accepted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IMessage {
    id?: string;
    from: string;
    to: string;
    isRead: boolean;
    body: string;
    createdAt?: Date;
    updatedAt?: Date;
}