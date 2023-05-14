import { UserAction } from "./users/userSlice";

interface TestAction {
    type: string;
    payload: null;
}

export type RootActions = UserAction | TestAction ;