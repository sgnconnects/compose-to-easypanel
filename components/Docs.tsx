import { Box, Flex } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/react";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";

const Docs: React.FC = () => {
  return (
    <Flex alignItems="center" flexDirection="column" id="docs">
      <Flex
        gap={4}
        flexDirection="column"
        color="gray.300"
        maxW="800px"
        w="100%"
      >
        <Heading
          bgGradient="linear(to-l, cyan.400, #059669)"
          bgClip="text"
          as="h1"
          marginTop={10}
        >
          Documentation
        </Heading>
        <Heading color="gray.300" as="h3" fontSize="2xl">
          Supported Compose Properties
        </Heading>
        <UnorderedList fontSize="lg" fontWeight="bold">
          <ListItem>Image</ListItem>
          <ListItem>Container Name</ListItem>
          <ListItem>Command</ListItem>
          <ListItem>Volumes</ListItem>
          <ListItem>Ports</ListItem>
          <ListItem>Environment</ListItem>
        </UnorderedList>
      </Flex>
    </Flex>
  );
};

export default Docs;
