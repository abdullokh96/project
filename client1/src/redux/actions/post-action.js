import {GET_POST_DATA} from "../types"

export const getPostAction = (data) => {
    return{
        type:GET_POST_DATA,
        payload:data
    }
}