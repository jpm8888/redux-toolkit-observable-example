import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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
            console.log('--todos success--', action.payload);
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


export type TodoActions =
    | ReturnType<typeof getTodosStart>
    | ReturnType<typeof getTodosSuccess>
    | ReturnType<typeof getTodosFailure>;
