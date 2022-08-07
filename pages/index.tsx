import { Box, Flex } from "@chakra-ui/layout";
import type { NextPage } from "next";
import Head from "next/head";

import Editor from "../components/Editor";
import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Compose To Easypanel</title>
      </Head>
      <Box bg="gray.900" w="100%" p={4}>
        <Header />
        {/*<Description /> */}
        <Editor />
      </Box>
    </>
  );
};

export default Home;
