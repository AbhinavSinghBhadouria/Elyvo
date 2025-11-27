import { useEffect, useState } from "react";
import { StreamVideoClient } from "@stream-io/video-react-sdk";
import { StreamChat } from "stream-chat";

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
        // You'll need to get these from your backend
        const apiKey = import.meta.env.VITE_STREAM_API_KEY;
        const userToken = session.streamToken; // This should come from your session data
        const userId = session.currentUserId; // This should come from your session data
        const callId = session.id;

        // Initialize Video Client
        const videoClient = new StreamVideoClient({
          apiKey,
          user: {
            id: userId,
            name: session.currentUserName,
            image: session.currentUserImage,
          },
          token: userToken,
        });

        // Create or join call
        const videoCall = videoClient.call("default", callId);
        
        if (isHost) {
          await videoCall.getOrCreate({
            ring: true,
            data: {
              custom: {
                sessionId: session.id,
              },
            },
          });
        } else {
          await videoCall.join();
        }

        // Initialize Chat Client
        const chatClientInstance = StreamChat.getInstance(apiKey);
        
        await chatClientInstance.connectUser(
          {
            id: userId,
            name: session.currentUserName,
            image: session.currentUserImage,
          },
          userToken
        );

        // Create or get channel
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
      if (call) {
        call.leave().catch(console.error);
      }
      if (chatClient) {
        chatClient.disconnectUser().catch(console.error);
      }
      if (streamClient) {
        streamClient.disconnectUser().catch(console.error);
      }
    };
  }, [session, loadingSession, isHost, isParticipant]);

  return {
    streamClient,
    call,
    chatClient,
    channel,
    isInitializingCall,
  };
};

export default useStreamClient;