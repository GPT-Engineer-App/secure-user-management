import { Box, Button, Text } from "@chakra-ui/react";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <Box role="alert" p={4} borderWidth="1px" borderRadius="lg" textAlign="center">
      <Text fontSize="xl" mb={4}>Something went wrong:</Text>
      <Text mb={4}>{error.message}</Text>
      <Button colorScheme="blue" onClick={resetErrorBoundary}>Try again</Button>
      <Button colorScheme="red" ml={4} onClick={() => window.location.href = "mailto:support@example.com"}>Contact Support</Button>
    </Box>
  );
};

export default ErrorFallback;