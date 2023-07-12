import instance from "./settings";

const createPost = (formData) => {
    console.log("postData>>>", formData);
    return instance.post('post/add', formData, {
        headers:{
            'Content-Type' : "multipart/form-data"
        }
    })
}

const getPost = (userId) => {
    return instance.get('/post', {
        params:{
            userId: userId
        }
    })
}


export const postServices = {
    createPost,
    getPost
}