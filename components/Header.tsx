import { Box, Flex } from "@chakra-ui/layout";
import { Button, Heading } from "@chakra-ui/react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <Flex w="100%" bg="gray.900" p={5} justifyContent="space-between">
      <Heading
        as="h1"
        bgGradient="linear(to-l, cyan.400, #059669)"
        bgClip="text"
      >
        Compose To Easypanel
      </Heading>
      <Flex gap={2}>
        <Link href="#docs">
          <Button bg="red.300">Docs</Button>
        </Link>
        <a
          href="https://github.com/ravenbroetzmann/compose-to-easypanel"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Button bg="cyan.300">Github</Button>
        </a>
      </Flex>
    </Flex>
  );
};

export default Header;
