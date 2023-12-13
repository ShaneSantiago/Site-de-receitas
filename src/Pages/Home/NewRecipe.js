import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

const NewRecipe = ({
  handleOpenModal,
  isModalOpen,
  setIsModalOpen,
  handleCloseModal,
}) => {
  const [title, setTitle] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [description, setDescription] = useState("");

  const toast = useToast();

  const onSubmitForm = (e) => {
    e.preventDefault();
    newRecipe();
  };

  const newRecipe = () => {
    const body = {
      title: title,
      imageUrl: urlImage,
      description: description,
    };

    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    toast({
      title: "Sucesso",
      description: "Sua receita foi adicionada",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    handleCloseModal();

    axios
      .post("https://api-cookenu.onrender.com/recipe", body, config)
      .then((res) => {
        console.log("Sucesso", res.data);
      })
      .catch((erro) => {
        console.log("Erro", erro);
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
    <>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicione uma nova receita</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                mb="10px"
                placeholder="Nome da receita"
              />
              <Input
                value={urlImage}
                onChange={(e) => setUrlImage(e.target.value)}
                mb="10px"
                placeholder="URL da imagem"
              />
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Escreva sua receita"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="orange" mr={3} onClick={onSubmitForm}>
              Adicionar receita
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default NewRecipe;
