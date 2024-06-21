import { Box, Heading, Text, VStack } from "@chakra-ui/react";

const FAQ = () => {
  return (
    <Box p={4}>
      <Heading as="h1" mb={6}>Frequently Asked Questions</Heading>
      <VStack spacing={4} align="start">
        <Box>
          <Heading as="h2" size="md">Question 1: How do I reset my password?</Heading>
          <Text>Answer: To reset your password, go to the login page and click on "Forgot Password". Follow the instructions to reset your password.</Text>
        </Box>
        <Box>
          <Heading as="h2" size="md">Question 2: How do I contact support?</Heading>
          <Text>Answer: You can contact support by filling out the contact form on the support page or by using the live chat feature.</Text>
        </Box>
        <Box>
          <Heading as="h2" size="md">Question 3: Where can I find the user manual?</Heading>
          <Text>Answer: The user manual can be found in the knowledge base section of the support portal.</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default FAQ;