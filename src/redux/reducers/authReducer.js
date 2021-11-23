import { 
    ADD_USER, 
    AUTH_USER, 
    REMOVE_USER,
} from '../actions/types';

const initalState = {
    users : [],
    loggedInUser : null,
}

const authReducer = (prevState = initalState, action) => {
    switch (action.type) {
        case ADD_USER: 
            return {
                ...prevState,
                users: [...prevState.users, action.user],
            }
        case AUTH_USER: 
            return {
                ...prevState,
                loggedInUser: action.user,
            }
        case REMOVE_USER: 
            return {
                ...prevState,
                users: prevState.users.filter(userName => userName === action.user.userName),
            }
        default:
            return prevState;
    }
}

export default authReducer;