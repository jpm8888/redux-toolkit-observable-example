import {catchError, debounceTime, filter, from, map, mergeMap, of, takeUntil} from "rxjs";
import {Epic} from "redux-observable";
import axios from "axios";
import {RootState} from "../rootReducer";
import {getTodosFailure, getTodosStart, getTodosSuccess, Todo, TodoActions} from "./todoSlice";

async function fetchTodo(): Promise<Todo[]>{
    const url = 'https://jsonplaceholder.typicode.com/todos';
    const response = await axios.get<Todo[]>(url);
    return response.data;
}

export const fetchTodoEpic: Epic<TodoActions, TodoActions, RootState> = (action$, state$) =>
    action$.pipe(
        filter(getTodosStart.match),
        debounceTime(250),
        mergeMap(() =>{
            return from(fetchTodo()).pipe(
                map((res: Todo[]) => {
                    // demo purposes if you need to get the value from reducer in epic.
                    console.log(state$.value.todoReducer.todos);
                    return getTodosSuccess(res);
                }),
                takeUntil(action$.pipe(filter(getTodosStart.match))),
                catchError(error => {
                    return of(getTodosFailure(error));
                })
            )
        })
    )
