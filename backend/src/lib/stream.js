import {StreamChat} from "stream-chat"
import {ENV} from "./env.js"

const apiKey = ENV.STREAM_API_KEY
const apiSecret = ENV.STREAM_API_SECRET

if(!apiKey || !apiSecret){
    console.error("Stream Credentials are missing");
}

export const chatClient= StreamChat.getInstance(apiKey, apiSecret);

// upsert ka mtlb hi hota h create and update the data
export const upsertStreamUser = async(userData)=>{
    try{
        await chatClient.upsertUser(userData)
        console.log("Stream user upserted Successfully",userData);
    }
    catch(error){
        console.log("Error Upserting Stream User : ", error);
    }
}

export const deleteStreamUser = async(userId)=>{
    try{
        await chatClient.deleteUser(userId)
       console.log("Stream User Deleted Successfully: ", userId); 
    }
    catch(error){
        console.log("Error deleting the Stream User : ", error);
    }
}


// add another method to generateToken