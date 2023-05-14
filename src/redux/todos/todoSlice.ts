import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Todo = {
    id: number;
    title: string;
    completed: boolean;
}

interface TodosState {
    todos: Todo[];
    isLoading: boolean;
    error: string | null;
}

const initialState: TodosState = {
    todos: [],
    isLoading: false,
    error: null,
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        getTodosStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        getTodosSuccess(state, action: PayloadAction<Todo[]>) {
            state.isLoading = false;
            state.todos = action.payload;
        },
        getTodosFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { getTodosStart, getTodosSuccess, getTodosFailure } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;

type MyType<T extends string> = T extends `${infer A}` | `${infer B}` ? A | B : never;
const values = [getTodosStart.type, getTodosSuccess.type, getTodosFailure.type] as const;
type AllowedValues = typeof values[number];

export interface TodoAction {
    type: MyType<AllowedValues>;
    payload: string | null | Todo[] | undefined;
}
