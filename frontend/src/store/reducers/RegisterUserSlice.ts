import { IUserRegister } from './../models/IUser';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface RegisterState {
    result: IUserRegister
    isLoading: boolean
    error: string
}

const initialState: RegisterState= {
    result:{
        username: '',
        email: '',
        password: '',
        password2: ''
    },
    isLoading: false,
    error: ''
}

export const registerUserSlice = createSlice({
    name: 'postRegisterUser',
    initialState,
    reducers: {
        userRegister(state) {
            state.isLoading = true
        },
        userRegisterSuccess(state, action: PayloadAction<IUserRegister>) {
            state.isLoading= false
            state.error = ''
            state.result= action.payload
        },
        userRegisterError(state, action: PayloadAction<string>) {
            state.isLoading= false
            state.error = action.payload
        }
    }
})

export const registerUserReducer = registerUserSlice.reducer