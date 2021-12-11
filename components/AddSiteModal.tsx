import React, { FC, Fragment } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createSite } from "@lib/database";
import { ISite } from "../types/site";
import { useAuth } from "@lib/auth";
import { mutate } from "swr";

export const AddSiteModal: FC = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const auth = useAuth();
  const { handleSubmit, register } = useForm<Pick<ISite, "name" | "url">>();

  const onSubmit: SubmitHandler<ISite> = async ({ name, url }) => {
    const newSite = {
      authorId: auth.user?.uid || "",
      createdAt: new Date().toISOString(),
      name: name,
      url: url,
    };
    await createSite(newSite);

    toast({
      title: "Success",
      description: "We've added your site",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    await mutate(
      ["/api/sites", auth.user?.token],
      async ({ sites }: { sites: ISite[] }) => ({
        sites: [newSite, ...sites],
      }),
      false,
    );
    onClose();
  };

  return (
    <Fragment>
      <Button onClick={onOpen} fontWeight={"medium"} variant="solid" size="md">
        {children}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader fontWeight={"bold"}>Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="My site"
                {...register("name", {
                  required: true,
                })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                placeholder="https://website.com"
                {...register("url", {
                  required: true,
                })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button fontWeight={"medium"} onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button fontWeight={"medium"} colorScheme="teal" type={"submit"}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};
