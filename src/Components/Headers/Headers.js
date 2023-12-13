import React from "react";
import { Box, Flex, Spacer, Button, Image, Heading } from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const token = localStorage.getItem("token");

  console.log("Token", token);
  return (
    <Box bg="orange.500" p={4} color="white">
      <Flex align="center">
        {/* <Image src={logo} alt="Logo" boxSize="50px" /> */}
        <Heading>Logo</Heading>

        <Spacer />

        {token ? (
          <Button
            variant="ghost"
            mr={4}
            color="white"
            onClick={(e) => navigate("/feed")}
          >
            Início
          </Button>
        ) : null}
        <Button variant="ghost" color="white" onClick={logout}>
          {token ? "Sair" : "Login"}
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
