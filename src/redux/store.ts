import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import {rootReducer, RootState} from "./rootReducer";
import {rootEpic} from "./rootEpics";
import {AnyAction} from "redux";

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootState>();

export const store = configureStore({
    reducer: rootReducer,
    middleware: [epicMiddleware],
});

epicMiddleware.run(rootEpic);
