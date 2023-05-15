import {catchError, debounceTime, filter, from, map, mergeMap, of, takeUntil} from "rxjs";
import {Epic} from "redux-observable";
import axios from "axios";
import {RootState} from "../rootReducer";
import {getUsersFailure, getUsersStart, getUsersSuccess, User, UserActions} from "./userSlice";
import {RootActions} from "../rootActions";

async function fetchUsers(): Promise<User[]>{
    const url = 'https://jsonplaceholder.typicode.com/users';
    const response = await axios.get<User[]>(url);
    return response.data;
}

export const fetchUsersEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
    action$.pipe(
        filter(getUsersStart.match),
        debounceTime(250),
        map((x: UserActions) => x.payload),
        mergeMap((data) =>{
            console.log('-----payload------', data);
            return from(fetchUsers()).pipe(
                map((res: User[]) => {
                    // demo purposes if you need to get the value from reducer in epic.
                    console.log(state$.value.userReducer.users);
                    return getUsersSuccess(res);
                }),
                takeUntil(action$.pipe(filter(getUsersStart.match))),
                catchError(error => {
                    return of(getUsersFailure(error));
                })
            )
            })
    )
