import { registerUserReducer } from './reducers/RegisterUserSlice';
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {userPageReducer} from "./reducers/GetUserPage"

const rootReducer = combineReducers({
    userPageReducer,
    registerUserReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]