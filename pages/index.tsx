import { useAuth } from "@lib/auth";
import { Button, Flex } from "@chakra-ui/react";
import { Logo } from "@styles/icons";
import Head from "next/head";

export default function Home(): JSX.Element {
  const auth = useAuth();
  return (
    <Flex
      as="main"
      direction={"column"}
      align={"center"}
      justify={"center"}
      height={"100vh"}
    >
      <Head>
        <title>Fast Feedback</title>
      </Head>

      <Logo color={"black"} boxSize={7} />

      {auth.user ? (
        <Button onClick={auth.signout}>Sign Out</Button>
      ) : (
        <Button mt={4} size={"sm"} onClick={auth.signInWithGithub}>
          Sign In
        </Button>
      )}
    </Flex>
  );
}
