import { IUserRegister } from '../models/IUser';
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface userState {
    count: number
    next?: string
    previous?: string
    results: IUserRegister[]
    isLoading: boolean
    error: string
}

const initialState: userState = {
    count: 0,
    next:'',
    previous:'',
    results: [],
    isLoading: false,
    error: ""
}

export const profileListSlice= createSlice({
    name: "getUserPage",
    initialState,
    reducers: {
        userPageFetching(state) {
            state.isLoading= true
        },
        userPageFetchingError(state, action: PayloadAction<string>) {
            state.isLoading= false
            state.error = action.payload
        },
        userPageFetchingSuccess(state, action: PayloadAction<IUserRegister[]>) {
            state.isLoading= false
            state.error=''
            state.results = action.payload
        },
    },
})

export const userPageReducer = profileListSlice.reducer