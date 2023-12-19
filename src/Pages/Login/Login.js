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
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

import backgroundImg from "../../assets/culinaria.jpg";
import { useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const showPassword = () => {
    setShow(!show);
  };

  const navigate = useNavigate();

  const toast = useToast();

  const onSubmit = (e) => {
    e.preventDefault();
    login();
  };

  const login = () => {
    setLoading(true);
    const body = {
      email: email,
      password: password,
    };

    axios
      .post(`https://api-cookenu.onrender.com/user/login`, body)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/feed");
        toast({
          title: "Sucesso.",
          description: "Login efetuado com sucesso",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);
      })
      .catch((erro) => {
        console.log("erro", erro);
        setLoading(false);
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
                <Text color="white" onClick={(e) => navigate("/signup")}>
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
                  <InputGroup>
                    <Input
                      id="password"
                      color="white"
                      type={show ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <IconButton
                        h="1.75rem"
                        size="sm"
                        onClick={() => setShow(!show)}
                        icon={show ? <ViewIcon /> : <ViewOffIcon />}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Stack>
              <HStack justify="space-between">
                <Checkbox defaultChecked color="white">
                  Remember me
                </Checkbox>
                <Button variant="text" size="sm" color="white">
                  Esqueceu sua senha?
                </Button>
              </HStack>
              <Stack spacing="6">
                <Button onClick={onSubmit}>
                  {loading ? <Spinner /> : "Entrar"}
                </Button>
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
