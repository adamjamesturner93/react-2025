import React, { FC } from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import DashboardShell from "@components/DashboardShell";

const FreePlanEmptyState: FC = () => (
  <DashboardShell>
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={8}
      backgroundColor="white"
      width={"100%"}
    >
      <Heading size="md" as="h2">
        Get feedback on your site instantly
      </Heading>
      <Text>Start today, then grow with us!</Text>
      <Button variant="solid" size="md">
        Upgrade to Starter
      </Button>
    </Box>
  </DashboardShell>
);

export default FreePlanEmptyState;
