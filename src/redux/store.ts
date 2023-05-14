import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import {rootReducer, RootState} from "./rootReducer";
import {rootEpic} from "./rootEpics";
import {RootActions} from "./rootActions";

const epicMiddleware = createEpicMiddleware<RootActions, RootActions, RootState>();

export const store = configureStore({
    reducer: rootReducer,
    middleware: [epicMiddleware],
});

epicMiddleware.run(rootEpic);
