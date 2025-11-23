import {StreamChat} from "stream-chat"
import {ENV} from "./env.js"
import {StreamClient} from "@stream-io/node-sdk";

const apiKey = ENV.STREAM_API_KEY
const apiSecret = ENV.STREAM_API_SECRET

// Create server-side clients for admin operations (only if credentials are available)
let chatClient = null;
let streamClient = null;

if(apiKey && apiSecret){
    try {
        chatClient = new StreamChat(apiKey, apiSecret);
        streamClient = new StreamClient(apiKey, apiSecret);
        console.log("Stream Chat and Video clients initialized successfully");
    } catch(error) {
        console.error("Error initializing Stream clients:", error);
    }
} else {
    console.warn("Stream API credentials are missing. Stream features will be disabled.");
    console.warn("Please set STREAM_API_KEY and STREAM_API_SECRET environment variables to enable Stream features.");
}

export { chatClient, streamClient };

// upsert ka mtlb hi hota h create and update the data
export const upsertStreamUser = async(userData)=>{
    try{
        if (!chatClient) {
            console.warn("Stream client not initialized. Skipping user creation.");
            return;
        }
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
        if (!chatClient) {
            console.warn("Stream client not initialized. Skipping user deletion.");
            return;
        }
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