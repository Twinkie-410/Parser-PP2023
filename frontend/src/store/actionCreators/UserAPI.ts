import axios from "axios";
import { AppDispatch } from "../store";
import { IUserRegister } from "../models/IUser";
import { API } from "./API";

import getErrorMessage from "../functions/getErrorMessage";
import { userPageSlice } from "../reducers/GetUserPage";
import { registerUserSlice } from "../reducers/RegisterUser";
import { logInUserSlice } from "../reducers/LogInUser";

interface IResponse {
    count: number
    next?: string
    previous?: string
    results: IUserRegister[]
}
export interface ILogIn {
    username: string
    password: string
    tokens?: string
}

export const getUserList = (page: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userPageSlice.actions.userPageFetching())
        const response = await axios.get<IResponse>(`${API}/user/?page=${page}`)
        dispatch(userPageSlice.actions.userPageFetchingSuccess(response.data.results))
    } catch (e) {
        dispatch(userPageSlice.actions.userPageFetchingError(getErrorMessage(e)))    
    }
}

export const postRegisterUser = (
    username: string,
    email: string,
    password: string,
    password2:string
) => async (dispatch: AppDispatch) => {
    try {
        dispatch(registerUserSlice.actions.userRegister())
        const response = await API.post<IUserRegister>(`/user/register/`, {username, email, password, password2},)
        // console.log(response.headers)
        dispatch(registerUserSlice.actions.userRegisterSuccess(response.data))
    } catch (e) {
        dispatch(registerUserSlice.actions.userRegisterError(getErrorMessage(e)))
    }
}

export const postLogInUser = (
    username: string,
    password: string
) =>async (dispatch:AppDispatch) => {
    try {
        dispatch(logInUserSlice.actions.userLogIn())
        const response = await API.post<ILogIn>('/user/login/', {username, password})
        dispatch(logInUserSlice.actions.userLogInSuccess(response.data))
    } catch (e) {
        dispatch(logInUserSlice.actions.userLogInError(getErrorMessage(e)))
    }
}

