import {StreamChat} from "stream-chat"
import {ENV} from "./env.js"

const apiKey = ENV.STREAM_API_KEY
const apiSecret = ENV.STREAM_API_SECRET

if(!apiKey || !apiSecret){
    console.error("Stream Credentials are missing");
    throw new Error("Stream API credentials are required. Please set STREAM_API_KEY and STREAM_API_SECRET environment variables.");
}

// Create server-side client for admin operations
export const chatClient = new StreamChat(apiKey, apiSecret);

// upsert ka mtlb hi hota h create and update the data
export const upsertStreamUser = async(userData)=>{
    try{
        if (!userData.id) {
            throw new Error("User ID is required for Stream user creation");
        }
        await chatClient.upsertUser(userData)
        console.log("Stream user upserted Successfully",userData);
    }
    catch(error){
        console.error("Error Upserting Stream User : ", error);
        throw error; // Re-throw so Inngest can see the error
    }
}

export const deleteStreamUser = async(userId)=>{
    try{
        if (!userId) {
            throw new Error("User ID is required for Stream user deletion");
        }
        await chatClient.deleteUser(userId)
        console.log("Stream User Deleted Successfully: ", userId); 
    }
    catch(error){
        console.error("Error deleting the Stream User : ", error);
        throw error; // Re-throw so Inngest can see the error
    }
}


// add another method to generateToken