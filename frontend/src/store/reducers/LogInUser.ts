import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IUserRegister } from "../models/IUser"
import { ILogIn } from "../actionCreators/UserAPI"

interface ILogInState{
   result: ILogIn
   isLoading: boolean
   error: string
}

const initialState:ILogInState = {
    result:{
        username: "",
        password: "",
        tokens: ''
    },
    isLoading: false,
    error: ''
}
export const logInUserSlice= createSlice({
    name:'postloginuser',
    initialState,
    reducers:{
        userLogIn(state) {
            state.isLoading = true
        },
        userLogInSuccess(state, action: PayloadAction<ILogIn>) {
            state.isLoading= false
            state.error = ''
            state.result= action.payload
        },
        userLogInError(state, action: PayloadAction<string>) {
            state.isLoading= false
            state.error = action.payload
        }
    }
})

export const logInUserReducer = logInUserSlice.reducer