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
  const [sourceBank, setSourceBank] = useState("");
  const [destinationBank, setDestinationBank] = useState("");

  const banks = [
    "JPMorgan Chase (United States)",
    "Bank of America (United States)",
    "Wells Fargo (United States)",
    "Citigroup (United States)",
    "Goldman Sachs (United States)",
    "Morgan Stanley (United States)",
    "HSBC (United Kingdom)",
    "Barclays (United Kingdom)",
    "Lloyds Banking Group (United Kingdom)",
    "Royal Bank of Scotland (United Kingdom)",
    "BNP Paribas (France)",
    "Crédit Agricole (France)",
    "Société Générale (France)",
    "Deutsche Bank (Germany)",
    "Commerzbank (Germany)",
    "UBS (Switzerland)",
    "Credit Suisse (Switzerland)",
    "Mitsubishi UFJ Financial Group (Japan)",
    "Sumitomo Mitsui Financial Group (Japan)",
    "Mizuho Financial Group (Japan)",
    "Industrial and Commercial Bank of China (ICBC) (China)",
    "China Construction Bank (China)",
    "Agricultural Bank of China (China)",
    "Bank of China (China)",
    "Banco Santander (Spain)",
    "BBVA (Spain)",
    "ING Group (Netherlands)",
    "Rabobank (Netherlands)",
    "Toronto-Dominion Bank (Canada)",
    "Royal Bank of Canada (Canada)",
    "Bank of Montreal (Canada)",
    "Scotiabank (Canada)",
    "National Australia Bank (Australia)",
    "Commonwealth Bank (Australia)",
    "Westpac Banking Corporation (Australia)",
    "ANZ Bank (Australia)",
    "Sberbank (Russia)",
    "VTB Bank (Russia)",
    "State Bank of India (India)",
    "HDFC Bank (India)",
    "ICICI Bank (India)",
    "Axis Bank (India)",
    "Banco do Brasil (Brazil)",
    "Itaú Unibanco (Brazil)",
    "Bradesco (Brazil)",
    "Santander Brasil (Brazil)",
    "DBS Bank (Singapore)",
    "United Overseas Bank (UOB) (Singapore)",
    "Oversea-Chinese Banking Corporation (OCBC) (Singapore)",
    "Standard Chartered (United Kingdom)",
    "NatWest Group (United Kingdom)",
    "UniCredit (Italy)",
    "Intesa Sanpaolo (Italy)",
    "Banco Bilbao Vizcaya Argentaria (BBVA) (Spain)",
    "CaixaBank (Spain)",
    "Nordea (Sweden/Finland)",
    "SEB (Skandinaviska Enskilda Banken) (Sweden)",
    "Swedbank (Sweden)",
    "Danske Bank (Denmark)",
    "KBC Group (Belgium)",
    "ING Bank (Netherlands)",
    "ABN AMRO (Netherlands)",
    "Commonwealth Bank of Australia (Australia)",
    "Westpac Banking Corporation (Australia)",
    "ANZ Banking Group (Australia)",
    "Macquarie Group (Australia)",
    "Bank of New York Mellon (United States)",
    "State Street Corporation (United States)",
    "PNC Financial Services (United States)",
    "U.S. Bancorp (United States)",
    "Standard Bank",
    "Absa Bank",
    "First National Bank (FNB)",
    "Nedbank",
    "Capitec Bank",
    "Investec Bank",
    "African Bank",
    "TymeBank",
    "Bank Zero",
    "Discovery Bank",
    "Sasfin Bank",
    "Grindrod Bank",
    "Bidvest Bank",
    "GroBank",
    "Mercantile Bank",
    "Ubank"
  ];

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
    if (!voucherCode || !amount || !sourceBank || !destinationBank) {
      setError("All fields are required.");
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
        sourceBank: sourceBank,
        destinationBank: destinationBank
      });

      if (response.data.valid) {
        const conversionResponse = await axios.post("https://api.examplebank.com/convert-voucher", {
          voucherCode: encryptedVoucherCode,
          amount: encryptedAmount,
          currency: currency,
          sourceBank: sourceBank,
          destinationBank: destinationBank
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
          <FormLabel>Source Bank</FormLabel>
          <Select value={sourceBank} onChange={(e) => setSourceBank(e.target.value)}>
            <option value="" disabled>Select source bank</option>
            {banks.map((bank, index) => (
              <option key={index} value={bank}>
                {bank}
              </option>
            ))}
          </Select>
          <FormLabel>Destination Bank</FormLabel>
          <Select value={destinationBank} onChange={(e) => setDestinationBank(e.target.value)}>
            <option value="" disabled>Select destination bank</option>
            {banks.map((bank, index) => (
              <option key={index} value={bank}>
                {bank}
              </option>
            ))}
          </Select>
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