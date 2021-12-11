import { GetStaticPaths, GetStaticProps } from "next";
import { getAllFeedback, getAllSites } from "@lib/db-admin";
import { EventHandler, FC, useRef, useState } from "react";
import Feedback from "@components/feedback/Feedback";
import { IFeedback } from "@typings";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useAuth } from "@lib/auth";
import { useRouter } from "next/router";
import { createFeedback } from "@lib/database";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const siteId = params?.siteId as string;

  const { feedback } = await getAllFeedback(siteId);
  return {
    props: {
      initialFeedback: feedback,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { sites } = await getAllSites();
  const paths = (sites || []).map((site) => ({
    params: {
      siteId: site.id.toString(),
    },
  }));
  return {
    paths,
    fallback: true,
  };
};

const SiteFeedback: FC<{ initialFeedback: IFeedback[] }> = ({
  initialFeedback,
}) => {
  const auth = useAuth();
  const router = useRouter();
  const inputEl = useRef<HTMLInputElement>(null);

  const [allFeedback, setAllFeedback] = useState<IFeedback[]>(initialFeedback);

  const onSubmit: EventHandler<any> = async (event) => {
    event.preventDefault();

    const newFeedback: Omit<IFeedback, "id"> = {
      author: auth.user?.name || "",
      authorId: auth.user?.uid || "",
      siteId: router.query.siteId as string,
      text: inputEl?.current?.value as string,
      createdAt: new Date().toISOString(),
      provider: auth.user?.provider || "",
      status: "pending",
      rating: 5,
    };

    setAllFeedback([
      ...allFeedback,
      { id: `${Math.random()}`, ...newFeedback },
    ]);

    await createFeedback(newFeedback);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={"full"}
      maxWidth={"700px"}
      margin={"0 auto"}
    >
      <Box as="form" onSubmit={onSubmit}>
        <FormControl my={8}>
          <FormLabel htmlFor={"comment"}>Comment</FormLabel>
          <Input id={"comment"} type={"comment"} ref={inputEl} />
          <Button mt={2} type={"submit"} fontWeight={"medium"}>
            Add comment
          </Button>
        </FormControl>
      </Box>
      {allFeedback.map((feedback) => (
        <Feedback
          key={feedback.id}
          author={feedback.author}
          text={feedback.text}
          createdAt={feedback.createdAt}
        />
      ))}
    </Box>
  );
};

export default SiteFeedback;
