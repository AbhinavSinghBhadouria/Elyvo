import { useEffect, useState } from "react";
import { StreamVideoClient } from "@stream-io/video-react-sdk";
import { StreamChat } from "stream-chat";
import { chatApi } from "../api/chat";

const useStreamClient = (session, loadingSession, isHost, isParticipant) => {
  const [streamClient, setStreamClient] = useState(null);
  const [call, setCall] = useState(null);
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [isInitializingCall, setIsInitializingCall] = useState(false);

  useEffect(() => {
    // Don't initialize if session is loading or doesn't exist
    if (loadingSession || !session) return;
    
    // Only initialize if user is host or participant
    if (!isHost && !isParticipant) return;

    const initializeStreamClients = async () => {
      setIsInitializingCall(true);

      try {
        // 1. Fetch Token and User Info from Backend
        const { token: userToken, userID: userId, userName, userImage } = await chatApi.getToken();
        
        const apiKey = import.meta.env.VITE_STREAM_API_KEY;
        const callId = session.callId; // Use the callId from the session DB

        if (!apiKey) {
          throw new Error("VITE_STREAM_API_KEY is missing in frontend env");
        }

        // 2. Initialize Video Client
        const videoClient = new StreamVideoClient({
          apiKey,
          user: {
            id: userId,
            name: userName || userId,
            image: userImage || "",
          },
          token: userToken,
        });

        // 3. Create or join call
        const videoCall = videoClient.call("default", callId);
        
        if (isHost) {
          await videoCall.getOrCreate({
            data: {
              custom: {
                sessionId: session._id,
                problem: session.problem,
              },
            },
          });
        } else {
          await videoCall.join();
        }

        // 4. Initialize Chat Client
        const chatClientInstance = StreamChat.getInstance(apiKey);
        
        await chatClientInstance.connectUser(
          {
            id: userId,
            name: userName || userId,
            image: userImage || "",
          },
          userToken
        );

        // 5. Create or get channel
        const chatChannel = chatClientInstance.channel("messaging", callId, {
          name: `Session: ${session.problem}`,
          members: [userId],
        });

        await chatChannel.watch();

        setStreamClient(videoClient);
        setCall(videoCall);
        setChatClient(chatClientInstance);
        setChannel(chatChannel);
      } catch (error) {
        console.error("Failed to initialize Stream clients:", error);
      } finally {
        setIsInitializingCall(false);
      }
    };

    initializeStreamClients();

    // Cleanup function
    return () => {
      const cleanup = async () => {
        if (call) await call.leave().catch(console.error);
        if (chatClient) await chatClient.disconnectUser().catch(console.error);
        if (streamClient) await streamClient.disconnectUser().catch(console.error);
      };
      cleanup();
    };

  }, [session, loadingSession, isHost, isParticipant]); // Removed call/chatClient/streamClient from deps to avoid infinite loop

  return {
    streamClient,
    call,
    chatClient,
    channel,
    isInitializingCall,
  };
};

export default useStreamClient;