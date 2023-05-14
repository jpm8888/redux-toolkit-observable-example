import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
    id: number;
    name: string;
    email:   string;
}

interface UserState {
    users: User[];
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    isLoading: false,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUsersStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        getUsersSuccess(state, action: PayloadAction<User[]>) {
            state.isLoading = false;
            state.users = action.payload;
        },
        getUsersFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { getUsersStart, getUsersSuccess, getUsersFailure } = userSlice.actions;
export const userReducer = userSlice.reducer;

export interface UserAction {
    type: string;
    payload: string | null | User[] | undefined;
}
