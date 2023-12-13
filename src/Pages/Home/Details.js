import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Details = () => {
  const params = useParams();
  const [detailsRecipe, setDetailsRecipe] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    details();
  }, []);

  const details = () => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    axios
      .get(`https://api-cookenu.onrender.com/recipe/${params.id}`, config)
      .then((res) => {
        console.log("Details", res);
        setDetailsRecipe(res.data);
      })
      .catch((erro) => {
        console.log("Erro");
      });
  };

  console.log(detailsRecipe);
  return (
    <Box
      h="100vh"
      backgroundColor="black"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        width="100%"
        h="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Box
          display="flex"
          alignItems="flex-start"
          // bg="red"
          mt="30px"
          w={{ base: "100%", md: "78%" }}
          borderRadius="20px"
          padding="10px"
        >
          <Heading color="white" fontWeight="300">
            Detalhes da receita
          </Heading>
        </Box>
        <Divider w="80%" />

        <Box display="flex" alignItems="flex-start" w="80%" mt="10px">
          <Button ml="30px" onClick={(e) => navigate("/feed")}>
            <ChevronLeftIcon boxSize={6} />
          </Button>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          flexDirection={{ base: "column", md: "row" }}
          alignItems="center"
          width={{ base: "100%", md: "80%" }}
        >
          <Box
            width={{ base: "100%", md: "60%" }}
            // m={{ base: "30px", md: "30px" }}
            h="380px"
          >
            <Heading color="white" m="30px" fontWeight="300">
              {detailsRecipe.title}
            </Heading>
            <Text color="white" ml="30px" fontWeight="300" w="450px">
              {detailsRecipe.description}
            </Text>
          </Box>

          <Box m={{ base: "20px", md: "100px" }}>
            <Image
              src={detailsRecipe.imageUrl}
              alt="Imagem"
              w={{ base: "100%", md: "850px" }}
              borderRadius="70px"
            />
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          w="80%"
          mb="20px"
          alignItems="flex-start"
        >
          <HStack display="flex" ml="20px">
            <Text style={{ color: "white" }} fontWeight="300">
              Criada por: {detailsRecipe.creatorName} em
            </Text>

            <Text style={{ color: "white" }} fontWeight="300">
              {detailsRecipe.createdAt}
            </Text>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

export default Details;
