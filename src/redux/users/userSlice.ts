import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';

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

export const getUsersStart = createAction('users/getUsersStart');
export const getUsersSuccess = createAction<PayloadAction<User[]>>('users/getUsersSuccess');
export const getUsersFailure = createAction<PayloadAction<string>>('users/getUsersFailure');


export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        [getUsersStart.type]: (state)=> {
            state.isLoading = true;
            state.error = null;
        },
        [getUsersSuccess.type]: (state, action: PayloadAction<User[]>) => {
            state.isLoading = false;
            state.users = action.payload;
        },
        [getUsersFailure.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

// export const { getUsersStart, getUsersSuccess, getUsersFailure } = userSlice.actions;
export const userReducer = userSlice.reducer;

console.log('----------------');
// console.log(<typeof getUsersStart>);

export type UserActions =
    | ReturnType<typeof getUsersStart>
    | ReturnType<typeof getUsersSuccess>
    | ReturnType<typeof getUsersFailure>;

// export interface UserAction {
//     type: string;
//     payload: string | null | User[] | undefined;
// }
