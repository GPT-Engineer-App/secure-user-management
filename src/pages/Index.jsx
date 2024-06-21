import { useState, useEffect } from "react";
import axios from "axios";
import { Container, VStack, Input, Button, Text, FormControl, FormLabel, FormErrorMessage, Select } from "@chakra-ui/react";
import CryptoJS from "crypto-js";

const Index = () => {
  const [voucherCode, setVoucherCode] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [conversionResult, setConversionResult] = useState(null);
  const [currency, setCurrency] = useState("USD");
  const [conversionRates, setConversionRates] = useState({});

  useEffect(() => {
    // Fetch conversion rates
    const fetchConversionRates = async () => {
      try {
        const response = await axios.get("https://api.exchangerate-api.com/v4/latest/USD");
        setConversionRates(response.data.rates);
      } catch (error) {
        setError("Failed to fetch conversion rates.");
      }
    };

    fetchConversionRates();
  }, []);

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
      const encryptedVoucherCode = CryptoJS.AES.encrypt(voucherCode, 'secret-key').toString();
      const encryptedAmount = CryptoJS.AES.encrypt(amount, 'secret-key').toString();

      const response = await axios.post("https://api.examplebank.com/validate-voucher", {
        voucherCode: encryptedVoucherCode,
        amount: encryptedAmount,
      });

      if (response.data.valid) {
        const conversionResponse = await axios.post("https://api.examplebank.com/convert-voucher", {
          voucherCode: encryptedVoucherCode,
          amount: encryptedAmount,
          currency: currency,
        });

        const convertedAmount = conversionResponse.data.convertedAmount * conversionRates[currency];
        setConversionResult(`Converted Amount: ${currency} ${convertedAmount.toFixed(2)}`);
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
          <FormLabel>Currency</FormLabel>
          <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {Object.keys(conversionRates).map((currencyCode) => (
              <option key={currencyCode} value={currencyCode}>
                {currencyCode}
              </option>
            ))}
          </Select>
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
        <Button colorScheme="blue" onClick={handleConversion}>Convert Voucher</Button>
        {conversionResult && <Text fontSize="xl">{conversionResult}</Text>}
      </VStack>
    </Container>
  );
};

export default Index;