import React, { FC } from "react";
import {
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  Link,
  Stack,
} from "@chakra-ui/react";
import { Logo } from "@styles/icons";
import { useAuth } from "@lib/auth";
import { AddSiteModal } from "@components/AddSiteModal";

const DashboardShell: FC = ({ children }) => {
  const auth = useAuth();

  return (
    <Flex flexDirection="column" height={"100vh"}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        py={4}
        px={8}
        backgroundColor="white"
      >
        <Stack spacing={4} isInline alignItems="center" justifyContent="center">
          <Logo boxSize={6} color={"black"} />
          <Link>Feedback</Link>
          <Link>Sites</Link>
        </Stack>
        <Stack spacing={4} isInline justifyContent="center" alignItems="center">
          <Link>Account</Link>
          <Avatar size="sm" src={auth.user?.photoUrl || ""} />
        </Stack>
      </Flex>
      <Flex backgroundColor="gray.100" p={8} height={"100%"}>
        <Flex
          flexDirection="column"
          maxWidth={"800px"}
          mx={"auto"}
          width={"100%"}
          height={"100%"}
        >
          <Breadcrumb>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color={"gray.700"} fontSize={"sm"}>
                Sites
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex justifyContent="space-between">
            <Heading mb={4}>My Sites</Heading>
            <AddSiteModal>+ Add Site</AddSiteModal>
          </Flex>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
