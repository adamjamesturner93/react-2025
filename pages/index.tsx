import { useAuth } from "@lib/auth";
import { Button, Code, Heading, Text } from "@chakra-ui/react";

export default function Home(): JSX.Element {
  const auth = useAuth();
  return (
    <div>
      <main>
        <Heading>Fast Feedback!</Heading>
        <Text>
          Current User: <Code>{auth?.user?.email || "None"}</Code>
        </Text>

        {auth.user ? (
          <Button onClick={auth.signout}>Sign Out</Button>
        ) : (
          <Button onClick={auth.signInWithGithub}>Sign In</Button>
        )}
      </main>
    </div>
  );
}
