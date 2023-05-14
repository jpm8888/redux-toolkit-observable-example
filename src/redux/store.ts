import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import {rootReducer, RootState} from "./rootReducer";
import {rootEpic} from "./rootEpics";
import { CommonAction } from './CommonActionType';



const epicMiddleware = createEpicMiddleware<CommonAction, CommonAction, RootState>();

export const store = configureStore({
    reducer: rootReducer,
    middleware: [epicMiddleware],
});

epicMiddleware.run(rootEpic);
