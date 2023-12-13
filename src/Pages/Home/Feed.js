import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import culinaria from "../../assets/bgCulinaria.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NewRecipe from "./NewRecipe";
import { AddIcon } from "@chakra-ui/icons";

const Feed = () => {
  const [receitas, setReceitas] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const goToDetails = (id) => {
    navigate(`/details/${id}`);
  };

  useEffect(() => {
    todasReceitas();
  }, [receitas]);

  const todasReceitas = () => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    axios
      .get(`https://api-cookenu.onrender.com/recipe/all`, config)
      .then((res) => {
        setReceitas(res.data);
        console.log("Sucesso", res.data);
      })
      .catch((erro) => {
        console.log("Erro", erro.response);
      });
  };

  return (
    <>
      <Box h="100%" bg="black" w="100%">
        <Button
          position="fixed"
          right="20px"
          top="50%"
          transform="translateY(-50%)"
          ml="2"
          bg="orange.500"
          color="white"
          onClick={handleOpenModal}
        >
          <AddIcon boxSize={3} />
        </Button>

        <NewRecipe
          handleOpenModal={handleOpenModal}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleCloseModal={handleCloseModal}
        />

        <Box
          width="100%"
          backgroundImage={`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${culinaria})`}
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          height="500px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            w={{ base: "100%", md: "80%" }}
            display="flex"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Flex
              direction={{ base: "column", md: "row" }}
              justifyContent={{ base: "center", md: "space-between" }}
              m="10px"
              w="100%"
            >
              <VStack
                spacing={{ base: 5, md: 0 }}
                align={{ base: "center", md: "flex-start" }}
              >
                <Card
                  bg="white"
                  w={{ base: "100%", md: "450px" }}
                  h="120px"
                  mb={{ base: "10px", md: "10px" }}
                >
                  <Box display="flex">
                    <Image src={culinaria} alt="imagem" w="160px" h="120px" />
                    <Text m="5px" fontWeight="300">
                      Descubra deliciosas receitas e segredos culinários para
                      transformar suas refeições em experiências inesquecíveis.
                    </Text>
                  </Box>
                </Card>

                <Card bg="white" w={{ base: "100%", md: "450px" }} h="120px">
                  <Box display="flex">
                    <Image src={culinaria} alt="imagem" w="160px" h="120px" />
                    <Text m="5px" fontWeight="300">
                      Explore o mundo da culinária com dicas práticas e receitas
                      irresistíveis que vão surpreender o seu paladar.
                    </Text>
                  </Box>
                </Card>
              </VStack>

              <Box m={{ base: "10px", md: "0" }}>
                <Card
                  bg="transparent"
                  w={{ base: "100%", md: "500px" }}
                  h="200px"
                  padding="0px 20px 0px 20px"
                >
                  <Heading color="#fff" mb="10px" fontWeight="300">
                    Receitas
                  </Heading>
                  <Text mt="10px" color="white" fontWeight="300">
                    Desvende os segredos culinários de chefs renomados e
                    apaixone-se pela arte da gastronomia. Explore receitas
                    inovadoras e técnicas avançadas que transformarão sua
                    cozinha em um laboratório de sabores. Embarque em uma
                    jornada gastronômica única, onde cada prato conta uma
                    história de criatividade e excelência culinária.
                  </Text>
                </Card>
              </Box>
            </Flex>
          </Box>
        </Box>

        <Box
          w={{ base: "100%", md: "100%" }}
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="center"
            flexDirection="column"
            w="80%"
          >
            <Heading mt="20px" color="white" fontWeight="300">
              Receitas
            </Heading>
            <Text color="white" mt="10px" fontWeight="300">
              Aqui você encontra várias receitas saborosas
            </Text>
            <Input
              w="100%"
              border="2px solid #CCC"
              bg="white"
              mt="30px"
              placeholder="Buscar"
              value={filtroNome}
              onChange={(e) => setFiltroNome(e.target.value)}
            />
          </Box>

          <Box
            display="flex"
            w="87%"
            flexWrap="wrap"
            justifyContent="center"
            mt="30px"
          >
            {receitas
              .filter((filter) => {
                return filter.title
                  .toLowerCase()
                  .includes(filtroNome.toLowerCase());
              })
              .map((item) => (
                <Box
                  mt="30px"
                  key={item.id}
                  w={{ base: "100%", md: "30%" }}
                  m="10px"
                >
                  <Card
                    w="100%"
                    m="10px"
                    bg="white"
                    alignItems="center"
                    borderRadius="50px 10px"
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      w="100%"
                      h="180px"
                    />
                    <Heading fontSize="20px" textAlign="center" mt="20px">
                      {item.title}
                    </Heading>
                    <Button
                      w="80%"
                      mt="20px"
                      mb="20px"
                      bg="orange"
                      onClick={() => goToDetails(item.id)}
                    >
                      Saiba mais
                    </Button>
                  </Card>
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Feed;
