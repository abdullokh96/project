import { GET_POST_DATA } from "../types";

const initialState = {
  post: [],
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST_DATA: {
      return {
        ...state,
        post: action.payload,
      };
    }
    default:
      return state;
  }
};
