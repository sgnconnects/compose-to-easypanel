import { Box, Flex } from "@chakra-ui/layout";
import type { NextPage } from "next";
import Description from "../components/Description";
import Docs from "../components/Docs";
import Editor from "../components/Editor";
import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <Box bg="gray.900" w="100%">
      <Header />
      {/*<Description /> */}
      <Editor />
      <Docs />
    </Box>
  );
};

export default Home;
