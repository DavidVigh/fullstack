export type User = {
    id: number;
    fullname: string;
    username: string;
    email: string,
    Posts: Post[];
};

export type Post = {
    id: number;
    title: string;
    author: string;
    userId: number;
    Tags: Tag[];
    content: string;
};

export type Tag = {
    id: number;
    name: string;
};