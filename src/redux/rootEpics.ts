import {fetchUsersEpic} from "./users/userEpic";
import {combineEpics} from "redux-observable";

const epics = [fetchUsersEpic];
export const rootEpic = combineEpics(...epics);
