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
    date: string;
    content: string;
    User: User;
};

export type Tag = {
    id: number;
    name: string;
};

export type TagsDestruct = {
    tags: Tag[];
};