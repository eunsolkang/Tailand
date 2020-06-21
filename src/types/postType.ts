export type Base = {
    id : number,
    createdAt? :any
}
export interface Comment extends Base {
    author : User,
    commnet : string,
}
export interface Category extends Base {
    title : string,
    icon : string,
    posts : [Post]
}
export interface User extends Base {
    username : string,
    password : string,
    nickname : string,
    profile : string
}
export interface Post extends Base {
    title : string,
    content : string,
    author : User,
    category : Category,
    commnet : [],
    images : [],
    likeUser : [],
    disLikeUser : [],
    isAdvertising : string,
    isSpecial : boolean
}