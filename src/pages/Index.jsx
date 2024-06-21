import { useState } from "react";
import axios from "axios";
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

  const handleConversion = async () => {
    if (!validateVoucherDetails()) return;

    try {
      const response = await axios.post("https://api.examplebank.com/validate-voucher", {
        voucherCode,
        amount,
      });

      if (response.data.valid) {
        const conversionResponse = await axios.post("https://api.examplebank.com/convert-voucher", {
          voucherCode,
          amount,
        });

        setConversionResult(`Converted Amount: $${conversionResponse.data.convertedAmount.toFixed(2)}`);
      } else {
        setError("Invalid voucher code or amount.");
      }
    } catch (error) {
      setError("An error occurred while processing the voucher.");
    }
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