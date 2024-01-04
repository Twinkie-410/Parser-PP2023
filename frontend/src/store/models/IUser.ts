export interface IUserRegister {
    // id?: number
    username: string
    email: string
    password: string
    password2: string
    // is_staff?: boolean
    // is_active?: boolean
    // is_verified?: boolean
    // created_at?: string
    // updated_at?: string 
}

export interface IUser {
    id?: number
    username: string
    email: string
    is_staff?: boolean
    is_active?: boolean
    is_verified?: boolean
    created_at?: string
    updated_at?: string 
}