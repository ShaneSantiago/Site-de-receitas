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
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

// Importe sua imagem de fundo
import backgroundImg from "../../assets/culinaria.jpg";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
      name: name,
      password: password,
    };

    axios
      .post(`https://api-cookenu.onrender.com/user/signup`, body)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/feed");
        toast({
          title: "Sucesso.",
          description: "Cadastro efetuado com sucesso",
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
          description: erro.response.data.message,
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
      //   bg="red"
      backgroundPosition="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container
        maxW="lg"
        py={{ base: "12", md: "10" }}
        px={{ base: "0", sm: "8" }}
      >
        <Stack spacing="8">
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bgGradient="linear(to-r, teal.500, green.500)"
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Stack>
              <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
                <Heading color="white" size={{ base: "xs", md: "sm" }}>
                  Faça seu cadastro
                </Heading>
                <Text color="white" onClick={(e) => navigate("/")}>
                  Já possui conta? <Link href="#">Faça login</Link>
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
                  <FormLabel htmlFor="name" color="white">
                    Nome
                  </FormLabel>
                  <Input
                    id="name"
                    color="white"
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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

              <Stack spacing="6" mt="30px">
                <Button onClick={onSubmit}>
                  {loading ? <Spinner /> : "Cadastrar"}
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

export default Signup;
