import React, { FC, Fragment, useRef } from "react";
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
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createSite } from "@lib/database";
import { ISite } from "../types/site";

export const AddSiteModal: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ISite>();
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit: SubmitHandler<ISite> = async (values) => {
    console.log({ values, errors });
    const site = await createSite(values);
    console.log({ site });
  };

  return (
    <Fragment>
      <Button onClick={onOpen} fontWeight={"medium"} variant="solid" size="md">
        Add Your First Site
      </Button>

      <Modal initialFocusRef={inputRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader fontWeight={"bold"}>Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="My site"
                {...register("url", {
                  required: true,
                })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                placeholder="https://website.com"
                {...register("link", {
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
