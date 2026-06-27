export interface Post{
    readonly id : number
    title : string
    body : string
    extends : number
}
export interface PostListResponse extends Array<Post>{}