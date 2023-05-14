import { createAction } from "@reduxjs/toolkit";

const moduleKey = 'userReducer';

export type User = {
    id: number;
    name: string;
    email:   string;
};

const GET_USER_START = `${moduleKey}_get_user_start`;
const GET_USER_SUCCESS = `${moduleKey}_get_user_success`;
const GET_USER_FAILURE = `${moduleKey}_get_user_failure`;

export const getUserStart = createAction(GET_USER_START);
export const getUserSuccess = createAction<User[]>(GET_USER_SUCCESS);
export const getUserFailure = createAction<string>(GET_USER_FAILURE);


export interface ActionUser {
    type: string;
    payload: User[] | string | null | undefined;
}
