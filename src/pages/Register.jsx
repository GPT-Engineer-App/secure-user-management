import { useState } from "react";
import CryptoJS from "crypto-js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Container, VStack, Input, Button, Text, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    setError("");
    setSuccess("");
    try {
      const encryptedEmail = CryptoJS.AES.encrypt(email, 'secret-key').toString();
      const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret-key').toString();

      const userCredential = await createUserWithEmailAndPassword(auth, encryptedEmail, encryptedPassword);
      setSuccess("User registered successfully!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <FormControl isInvalid={error}>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
        <Button colorScheme="blue" onClick={handleRegister}>Register</Button>
        {success && <Text fontSize="xl" color="green.500">{success}</Text>}
      </VStack>
    </Container>
  );
};

export default Register;