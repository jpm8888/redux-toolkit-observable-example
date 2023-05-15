import {fetchUsersEpic} from "./users/userEpic";
import {combineEpics} from "redux-observable";
import {fetchTodoEpic} from "./todos/todoEpic";

const epics = [fetchUsersEpic, fetchTodoEpic];
export const rootEpic = combineEpics(...epics);
