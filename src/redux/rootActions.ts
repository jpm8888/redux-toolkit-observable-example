import {UserActions} from "./users/userSlice";
import {TodoActions} from "./todos/todoSlice";

export type RootActions = UserActions | TodoActions; // | TestAction;
