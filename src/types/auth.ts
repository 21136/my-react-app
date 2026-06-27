export interface AuthUser {
    username : string
}

export interface Authstate {
    token: string | null
    user:string
    login:(token:string,user:string)=>void
    logout: () =>void
}
export type LoginResult = 
| {ok:true;token:string;username:string}
| {ok:false;message:string}