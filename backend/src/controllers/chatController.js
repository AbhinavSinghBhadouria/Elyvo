import {chatClient} from "../lib/stream.js";
export async function getStreamToken(req,res){
    try{
        //we are using clerkId for Stream not mongoDB id because stream is taking our clerkId and the id present in the stream dashboard will match to the clerID
        const token = chatClient.createToken(req.user.clerkId)

        res.status(200).json({
            token,
            userID: req.user.clerkId,
            userName: req.user.name,
            userImage: req.user.image
        })
    }
    catch(error){
        console.log("Error in getStreamToken controller", error.message);
        res.status(500).json({msg:"Interal Server Error"});
    }
}