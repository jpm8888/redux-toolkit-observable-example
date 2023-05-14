import {catchError, debounceTime, from, map, mergeMap, of, takeUntil} from "rxjs";
import {Epic, ofType} from "redux-observable";
import axios from "axios";
import {RootState} from "../rootReducer";
import {getTodosFailure, getTodosStart, getTodosSuccess, Todo, TodoAction} from "./todoSlice";

async function fetchTodo(): Promise<Todo[]>{
    const url = 'https://jsonplaceholder.typicode.com/todos';
    const response = await axios.get<Todo[]>(url);
    return response.data;
}

export const fetchTodoEpic: Epic<TodoAction, TodoAction, RootState> = (action$, state$) =>
    action$.pipe(
        ofType(getTodosStart.type),
        debounceTime(250),
        mergeMap(() =>{
            return from(fetchTodo()).pipe(
                map((res: Todo[]) => {
                    // demo purposes if you need to get the value from reducer in epic.
                    console.log(state$.value.todoReducer.todos);
                    return getTodosSuccess(res);
                }),
                takeUntil(action$.pipe(ofType(getTodosStart.type))),
                catchError(error => {
                    return of(getTodosFailure(error));
                })
            )
        })
    )
