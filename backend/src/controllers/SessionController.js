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

        res.status(201).json({session: session})
    }
    catch(error){
        console.error("Error in createSession controller", error.message);
        res.status(500).json({msg:"Internal Server Error"});
    }
}

export async function getActiveSessions(req,res){
    try{
        // FIXED: Changed EmailAddress to email
        const sessions = await Session.find({status: "active"})
            .populate("host", "name profileImage email clerkId")
            .sort({createdAt: -1})
            .limit(20);

        res.status(200).json({sessions});
    }
    catch(error){
        console.log("Error in getActiveSessions controller", error.message);
        res.status(500).json({msg:"Internal Server Error"});
    }
}

export async function getMyRecentSessions(req,res){
    try{
        const userId = req.user._id

        // FIXED: Added 'const sessions =' 
        const sessions = await Session.find({
            status: "completed",
            $or:[{host: userId}, {participant: userId}]
        })
        .sort({createdAt: -1})
        .limit(20);

        res.status(200).json({sessions});
    }
    catch(error){
        console.log("Error in getMyRecentSessions controller", error.message);
        res.status(500).json({msg:"Internal Server Error"});
    }
}

export async function getSessionById(req,res){
    try{
       const {id}= req.params
       // FIXED: Changed ppopulate to populate
       const session = await Session.findById(id)
           .populate("host","name profileImage email clerkId")
           .populate("participant","name email profileImage clerkId");

       if(!session) return res.status(404).json({msg:"Session Not found"})

        res.status(200).json({session})
    }
    catch(error){
        console.log("Error in gettingSessionById controller", error.message);
        res.status(500).json({msg:"Internal Server Error"});
    }
}

export async function joinSession(req,res){
    try{
        const {id}= req.params
        const userId= req.user._id
        const clerkId= req.user.clerkId   
        
        const session = await Session.findById(id);
        if(!session) return res.status(404).json({msg:"Session not found"});

        if(session.status != "active"){
            return res.status(400).json({msg:"Cannot join a completed session"})
        }

        if(session.host.toString()=== userId.toString()){
            return res.status(400).json({msg:"Host cannot join their own meeting as Participants"});
        }

        // Check if the session is already filled
        if(session.participant) return res.status(409).json({msg:"Session is full"})

        session.participant = userId
        await session.save()

        const channel = chatClient.channel("messaging", session.callId)
        await channel.addMembers([clerkId])

        res.status(200).json({session})
    }
    catch(error){
        console.log("Error in joinSession controller", error.message);
        res.status(500).json({msg:"Internal Server Error"});
    }
}

export async function endSession(req,res){
    try{
        const {id} = req.params
        const userId = req.user._id
        const session = await Session.findById(id)

        if(!session){
            return res.status(404).json({msg:"Session not found"});
        }

        // checking if the user is host or not
        if(session.host.toString() != userId.toString()){
            return res.status(403).json({msg:"Only the host can end the session"})
        }

        // if the session is already completed
        if(session.status === "completed"){
            return res.status(400).json({msg:"Session is already completed"});
        }

        // FIXED: Changed 'dafault' to 'default'
        const call = streamClient.video.call("default",session.callId);
        await call.delete({hard:true});

        const channel = chatClient.channel("messaging", session.callId);
        await channel.delete();

        session.status = "completed"
        await session.save()

        res.status(200).json({session, msg:"Session ended successfully"});
    }
    catch(error){
        console.log("Error in endSession controller:", error.message);
        res.status(500).json({msg: "Internal Server Error"});
    }
}