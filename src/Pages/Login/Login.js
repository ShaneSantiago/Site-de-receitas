import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

// Importe sua imagem de fundo
import backgroundImg from "../../assets/culinaria.jpg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const toast = useToast();

  const onSubmit = (e) => {
    e.preventDefault();
    login();
  };

  const login = () => {
    const body = {
      email: email,
      password: password,
    };

    console.log("Body", body);
    axios
      .post(`https://api-cookenu.onrender.com/user/login`, body)
      .then((res) => {
        console.log("Sucesso", res.data);
        localStorage.setItem("token", res.data.token);
        navigate("/feed");
        toast({
          title: "Sucesso.",
          description: "Login efetuado com sucesso",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((erro) => {
        console.log("erro", erro);
        toast({
          title: "Ops",
          description: "Verifique se email e senha estão corretos",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <Box
      w="100%"
      h="100vh"
      backgroundImage={`url(${backgroundImg})`}
      backgroundSize="140%"
      backgroundPosition="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container
        maxW="lg"
        py={{ base: "12", md: "24" }}
        px={{ base: "0", sm: "8" }}
      >
        <Stack spacing="8">
          <Box
            mt="10px"
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bgGradient="linear(to-r, teal.500, green.500)"
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Stack spacing="6">
              <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
                <Heading color="white" size={{ base: "xs", md: "sm" }}>
                  Faça Login
                </Heading>
                <Text color="white">
                  Não tem uma conta? <Link href="#">Cadastre-se</Link>
                </Text>
              </Stack>
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email" color="white">
                    Email
                  </FormLabel>
                  <Input
                    id="email"
                    color="white"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="password" color="white">
                    Senha
                  </FormLabel>
                  <Input
                    id="password"
                    color="white"
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
              </Stack>
              <HStack justify="space-between">
                <Checkbox defaultChecked color="white">
                  Remember me
                </Checkbox>
                <Button variant="text" size="sm" color="white">
                  Forgot password?
                </Button>
              </HStack>
              <Stack spacing="6">
                <Button onClick={onSubmit}>Sign in</Button>
                <HStack>
                  <Divider />
                  <Divider />
                </HStack>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Login;
