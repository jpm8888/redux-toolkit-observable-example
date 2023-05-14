import {catchError, debounceTime, from, map, mergeMap, of, takeUntil} from "rxjs";
import {getUsersFailure, getUsersStart, getUsersSuccess, User} from "./userSlice";
import {Epic, ofType} from "redux-observable";
import axios from "axios";
import {RootState} from "../rootReducer";
import {AnyAction} from "redux";


async function fetchUsers(): Promise<User[]>{
    const url = 'https://jsonplaceholder.typicode.com/users';
    const response = await axios.get<User[]>(url);
    return response.data;
}


export const fetchUsersEpic: Epic<AnyAction, AnyAction, RootState> = (action$, state$) =>
    action$.pipe(
        ofType(getUsersStart.type),
        debounceTime(250),
        mergeMap(() =>
            from(fetchUsers()).pipe(
                map((res: User[]) => {
                    // demo purposes if you need to get the value from reducer in epic.
                    console.log(state$.value.userReducer.users);
                    return getUsersSuccess(res);
                }),
                takeUntil(action$.pipe(ofType(getUsersStart.type))),
                catchError(error => {
                    return of(getUsersFailure(error));
                })
            )
        )
    )
