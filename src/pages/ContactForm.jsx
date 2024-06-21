import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, Text } from "@chakra-ui/react";
import axios from "axios";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("/api/contact", { name, email, message });
      setSuccess("Your message has been sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setError("An error occurred while sending your message. Please try again later.");
    }
  };

  return (
    <Box p={4}>
      <VStack as="form" spacing={4} onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Message</FormLabel>
          <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="blue">Send</Button>
        {success && <Text color="green.500">{success}</Text>}
        {error && <Text color="red.500">{error}</Text>}
      </VStack>
    </Box>
  );
};

export default ContactForm;