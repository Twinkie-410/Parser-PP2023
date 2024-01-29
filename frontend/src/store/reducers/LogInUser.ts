import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ILogInResponse } from "../actionCreators/UserAPI"

interface ILogInState{
   result: ILogInResponse
   isAuth: boolean
   isLoading: boolean
   error: string
}

const initialState:ILogInState = {
    result:{
        username: "",
        password: "",
        tokens: ''
    },
    isAuth:false,
    isLoading: false,
    error: ''
}
export const logInUserSlice= createSlice({
    name:'postloginuser',
    initialState,
    reducers:{
        userLogIn(state) {
            state.isLoading = true
            state.isAuth = false
        },
        userLogInSuccess(state, action: PayloadAction<ILogInResponse>) {
            state.isLoading= false
            state.error = ''
            state.result= action.payload
            state.isAuth= true
        },
        userLogInError(state, action: PayloadAction<string>) {
            state.isLoading= false
            state.isAuth= false
            state.error = action.payload
        },
        userLogOut(state) {
            state.isAuth=false
        }
    }
})

export const logInUserReducer = logInUserSlice.reducer