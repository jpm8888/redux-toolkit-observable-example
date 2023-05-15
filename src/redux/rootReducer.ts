import {combineReducers} from '@reduxjs/toolkit';
import {userReducer} from "./users/userSlice";
import {todoReducer} from "./todos/todoSlice";

export const rootReducer = combineReducers({
    userReducer: userReducer,
    todoReducer: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>

