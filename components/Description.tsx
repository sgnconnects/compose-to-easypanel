import { Box, Flex } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";

const Description: React.FC = () => {
  return (
    <Box p={5}>
      <Text
        color="gray.200"
        textAlign="center"
        fontWeight="bold"
        fontSize="xl"
        letterSpacing={1.2}
      >
        Create your Easypanel Schemas from Docker Compose Files you already use
      </Text>
    </Box>
  );
};

export default Description;
