import instance from "./settings";

const registerServices = (data) => {
    console.log("registerServices>>>",data);
    return instance.post('users/register',data, {
        headers:{
          "Content-Type": "multipart/form-data"
        }
      })
}

const loginServices = (data) => {
    return instance.post('users/login', data)
}

const getMe = () => {
  return instance.get('users/me')
}

const createPost = (data) => {
  return instance.post('/image/add', data)
}

export const authServices = {
    registerServices,
    loginServices,
    getMe,
    createPost
}