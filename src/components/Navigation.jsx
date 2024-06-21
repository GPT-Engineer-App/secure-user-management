import { Link } from "react-router-dom";
import { Box, HStack, Button } from "@chakra-ui/react";

const Navigation = () => {
  return (
    <Box p={4} bg="gray.100" borderBottomWidth="1px">
      <HStack spacing={4}>
        <Button as={Link} to="/">Home</Button>
        <Button as={Link} to="/faq">FAQ</Button>
        <Button as={Link} to="/contact">Contact</Button>
        <Button as={Link} to="/live-chat">Live Chat</Button>
        <Button as={Link} to="/tickets">Tickets</Button>
      </HStack>
    </Box>
  );
};

export default Navigation;