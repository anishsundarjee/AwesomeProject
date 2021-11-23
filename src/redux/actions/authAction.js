import { 
    ADD_USER, 
    AUTH_USER, 
    REMOVE_USER,
} from './types';

export const addUser = (user) => (
    {
        type: ADD_USER,
        user: user,
    }
);

export const authUser = (user) => (
    {
        type: AUTH_USER,
        user: user,
    }
);

export const removeUser = (user) => (
    {
        type: REMOVE_USER,
        user: user,
    }
);