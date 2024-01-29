import axios from "axios";
import { AppDispatch } from "../store";
import { IUserRegister } from "../models/IUser";
import { API } from "./API";

import getErrorMessage from "../functions/getErrorMessage";
import { profileListSlice } from "../reducers/GetProfileList";
import { registerProfileSlice } from "../reducers/RegisterProfile";
import { logInUserSlice } from "../reducers/LogInUser";

interface IListResponse {
    count: number
    next?: string
    previous?: string
    results: IUserRegister[]
}
export interface ILogInResponse {
    username: string
    password: string
    tokens?: string
}

export const getUserList = (page: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(profileListSlice.actions.userPageFetching())
        const response = await axios.get<IListResponse>(`${API}/user/?page=${page}`)
        dispatch(profileListSlice.actions.userPageFetchingSuccess(response.data.results))
    } catch (e) {
        dispatch(profileListSlice.actions.userPageFetchingError(getErrorMessage(e)))    
    }
}

export const postRegisterUser = (
    // other_contacts:string,
    username: string,
    email: string,
    password: string,
    password2:string,
    phone:string,
    first_name?:string,
    last_name?:string,
    city?:string,
    favorite_genre?:string,
    
) => async (dispatch: AppDispatch) => {
    try {
        dispatch(registerProfileSlice.actions.userRegister())
        const response = await API.post<IUserRegister>(`/profile/register/`, {
            first_name, last_name, phone, city, favorite_genre,
            user :{username, email, password, password2}},)
        // console.log(response.headers)
        dispatch(registerProfileSlice.actions.userRegisterSuccess(response.data))
    } catch (e) {
        dispatch(registerProfileSlice.actions.userRegisterError(getErrorMessage(e)))
    }
}

export const postLogInUser = (
    username: string,
    password: string
) =>async (dispatch:AppDispatch) => {
    try {
        dispatch(logInUserSlice.actions.userLogIn())
        const response = await API.post<ILogInResponse>('/user/login/', {username, password})
        dispatch(logInUserSlice.actions.userLogInSuccess(response.data))
    } catch (e) {
        dispatch(logInUserSlice.actions.userLogInError(getErrorMessage(e)))
    }
}

