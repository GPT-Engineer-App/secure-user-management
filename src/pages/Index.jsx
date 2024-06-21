import { useState } from "react";
import { Container, VStack, Input, Button, Text, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";

const Index = () => {
  const [voucherCode, setVoucherCode] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [conversionResult, setConversionResult] = useState(null);

  const validateVoucherDetails = () => {
    if (!voucherCode || !amount) {
      setError("Both voucher code and amount are required.");
      return false;
    }
    if (isNaN(amount) || amount <= 0) {
      setError("Amount must be a positive number.");
      return false;
    }
    setError("");
    return true;
  };

  const handleConversion = () => {
    if (!validateVoucherDetails()) return;

    // Conversion logic (for demonstration purposes, we'll just multiply the amount by a fixed rate)
    const conversionRate = 1.2; // Example conversion rate
    const convertedAmount = amount * conversionRate;

    setConversionResult(`Converted Amount: $${convertedAmount.toFixed(2)}`);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <FormControl isInvalid={error}>
          <FormLabel>Voucher Code</FormLabel>
          <Input
            placeholder="Enter voucher code"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
          />
          <FormLabel>Amount</FormLabel>
          <Input
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
        <Button colorScheme="blue" onClick={handleConversion}>Convert Voucher</Button>
        {conversionResult && <Text fontSize="xl">{conversionResult}</Text>}
      </VStack>
    </Container>
  );
};

export default Index;