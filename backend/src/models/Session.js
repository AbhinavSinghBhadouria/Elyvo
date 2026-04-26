import mongoose from "mongoose"

const sessionSchema= new mongoose.Schema({
    problem:{
        type:String,
        required: true
    },
    difficulty:{
        type:String,
        enum:["easy","medium","hard", "Easy", "Medium", "Hard"],
        required: true
    },
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    participant:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        default: null
    },
    status:{
        type:String,
        enum:["completed", "active"],
        default: "active"
    },
    joinCode: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        default: ""
    },
    callId:{
        type: String,
        default: "",
    },
},{timestamps: true})

const Session = mongoose.model("Session", sessionSchema)

export default Session