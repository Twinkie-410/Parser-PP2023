import { logInUserReducer } from './reducers/LogInUser';
import { registerProfileReducer } from './reducers/RegisterProfile';
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {userPageReducer} from "./reducers/GetProfileList"

const rootReducer = combineReducers({
    userPageReducer,
    registerUserReducer: registerProfileReducer,
    logInUserReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]