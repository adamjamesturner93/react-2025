import React, { FC } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { AddSiteModal } from "@components/AddSiteModal";

const EmptyState: FC = () => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    p={16}
    backgroundColor="white"
    width={"100%"}
    borderRadius={8}
  >
    <Heading size="lg" mb={2}>
      You haven&apos;t added any sites
    </Heading>
    <Text mb={4}>Welcome, let&apos;s get started!</Text>
    <AddSiteModal>Add Your First Site</AddSiteModal>
  </Box>
);

export default EmptyState;
