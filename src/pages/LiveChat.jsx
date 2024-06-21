import { useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";

const LiveChat = () => {
  useEffect(() => {
    // Initialize live chat widget
    const script = document.createElement("script");
    script.src = "https://example-live-chat-widget.com/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Box p={4}>
      <Heading as="h1" mb={6}>Live Chat</Heading>
      <Box id="live-chat-widget">
        {/* Live chat widget will be embedded here */}
      </Box>
    </Box>
  );
};

export default LiveChat;