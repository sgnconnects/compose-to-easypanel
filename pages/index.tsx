import { Box, Flex } from "@chakra-ui/layout";
import type { NextPage } from "next";

import Editor from "../components/Editor";
import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <Box bg="gray.900" w="100%" p={4}>
      <Header />
      {/*<Description /> */}
      <Editor />
    </Box>
  );
};

export default Home;
