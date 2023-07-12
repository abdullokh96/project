import { Schema,model, Types } from 'mongoose'


const UserSchema = new Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatarUrl:String,
    posts: {
        type: Types.ObjectId,
        ref: 'Post'
    },
    create:{
        type:Date,
        default:Date.now()
    }
})
export default model('User',UserSchema)