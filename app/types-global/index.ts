export type Post = {
    prompt: string;
    tag: string;
    __v: number;
    _id: string;
    creator?: {
        email: string;
        username: string;
        image: string;
        __v: number;
        _id: string;
    };
}