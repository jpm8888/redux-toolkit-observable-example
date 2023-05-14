import {combineReducers} from '@reduxjs/toolkit';
import {userReducer} from "./users/userSlice";

export const rootReducer = combineReducers({
    userReducer: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>

