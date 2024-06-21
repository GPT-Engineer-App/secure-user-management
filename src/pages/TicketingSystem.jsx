import { useState, useEffect } from "react";
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, Text, Table, Thead, Tbody, Tr, Th, Td, Heading } from "@chakra-ui/react";
import axios from "axios";

const TicketingSystem = () => {
  const [tickets, setTickets] = useState([]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch existing tickets
    const fetchTickets = async () => {
      try {
        const response = await axios.get("/api/tickets");
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("/api/tickets", { subject, description });
      setSuccess("Your ticket has been submitted successfully!");
      setTickets([...tickets, response.data]);
      setSubject("");
      setDescription("");
    } catch (error) {
      setError("An error occurred while submitting your ticket. Please try again later.");
    }
  };

  return (
    <Box p={4}>
      <VStack as="form" spacing={4} onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Subject</FormLabel>
          <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="blue">Submit Ticket</Button>
        {success && <Text color="green.500">{success}</Text>}
        {error && <Text color="red.500">{error}</Text>}
      </VStack>

      <Box mt={8}>
        <Heading as="h2" size="lg" mb={4}>Your Tickets</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Subject</Th>
              <Th>Description</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tickets.map((ticket, index) => (
              <Tr key={index}>
                <Td>{ticket.subject}</Td>
                <Td>{ticket.description}</Td>
                <Td>{ticket.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default TicketingSystem;