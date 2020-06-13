export type Base = {
    id : number,
    createdAt? :any
}
export interface Category extends Base {
    title : string,
    icon : string,
    posts : [],
    division : string,
    name: string,
}
export interface SubCategory extends Base {
    title : string,
    icon : string,
    posts : [],
    name: string,
    isOnlyAdmin : boolean
}