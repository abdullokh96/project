import {
  GET_ME,
  SHOW_LOADING,
  SHOW_ERROR,
  HIDDEN_LOADING,
  HIDDEN_ERROR,
  LOGOUT
} from "../types";

export const getMeAction = (user) => {
    return {
        type : GET_ME,
        payload : user
    }
};

export const logoutAction = () => {
    return {
        type : LOGOUT
    }
}

export const showLoadingAction = () => {
    return {
        type : SHOW_LOADING
    }
}

export const hiddenLoadingAction = () => {
    return {
        type : HIDDEN_LOADING
    }
}

export const hiddenErrorAction = () => {
    return {
        type : HIDDEN_ERROR
    }
}

export const showErrorAction = () => {
    return {
        type : SHOW_ERROR
    }
}