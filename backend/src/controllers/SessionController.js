import Session from "../models/Session.js"
import {chatClient, streamClient} from "../lib/stream.js"
export async function createSession(req,res){
    try{
        const {problem, difficulty}= req.body
        const userId = req.user._id
        const clerkId= req.user.clerkId

        if(!problem || !difficulty){
            return res.status(400).json({msg: "Problem and difficulty are required"})
        }

        // generate a unique call id for stream video
        const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`


        // creating session in Db 
        const session = await Session.create({problem,difficulty,host:userId, callId})

        if (!streamClient || !chatClient) {
            return res.status(503).json({msg: "Stream service is not available. Please configure STREAM_API_KEY and STREAM_API_SECRET."});
        }

        // creating a stream video call
        await streamClient.video.call("default", callId).getOrCreate({
            data:{
                created_by_id:clerkId,
                custom: {problem, difficulty, sessionId:session._id.toString()}
            }
        });

        //now for chat messaging
        const channel= chatClient.channel("messaging",callId,{
            name:`${problem} Session`,
            created_by_id:clerkId,
            members:[clerkId]
        })

        await channel.create()
        // todo: may be we can send some notification

        res.status(201).json({session: session})
    }
    catch(error){
        console.error("Error in createSession controller", error.message);
        res.status(500).json({msg:"Internal Server Error"});
    }
}

export async function getActiveSessions(req,res){
    try{
        
    }
    catch(error){
        
    }
}

export async function getMyRecentSessions(req,res){
    try{

    }
    catch(error){
        
    }
}

export async function getSessionById(req,res){
    try{

    }
    catch(error){
        
    }
}

export async function joinSession(req,res){
    try{

    }
    catch(error){
        
    }
}

export async function endSession(req,res){
    try{

    }
    catch(error){
        
    }
}
