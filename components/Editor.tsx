import { Box, Flex } from "@chakra-ui/layout";
import { Input, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Editor: React.FC = () => {
  const [yml, setYml] = useState<string | undefined>(undefined);
  const [isInvalidYml, setIsInvalidYml] = useState(false);
  const [schema, setSchema] = useState<string | undefined>(undefined);
  const [projectName, setProjectName] = useState<string | undefined>(undefined);

  useEffect(() => {
    const converted = yml; // for now
    setSchema(yml);
  }, [yml, projectName]);

  return (
    <Flex flexDirection="column" p={4} gap={4}>
      <Input
        padding={5}
        fontWeight="bold"
        fontSize="lg"
        borderColor="gray.800"
        variant="outline"
        focusBorderColor="cyan.500"
        color="gray.400"
        placeholder="Project Name"
        bg="gray.800"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <Flex gap={4} wrap="wrap">
        <Box minW="400px" flex={1} h="600px" bg="gray.800" borderRadius={2}>
          <Textarea
            spellCheck={false}
            value={yml}
            onChange={(e) => setYml(e.target.value)}
            padding={5}
            fontWeight="bold"
            fontSize="lg"
            borderColor="gray.800"
            variant="outline"
            focusBorderColor="cyan.500"
            color="gray.400"
            resize="none"
            outline={0}
            placeholder="your docker compose comes in the oven here."
            w="100%"
            h="100%"
            isInvalid={isInvalidYml}
          />
        </Box>
        <Box minW="400px" flex={1} h="600px" bg="gray.800" borderRadius={2}>
          <Textarea
            spellCheck={false}
            value={schema}
            onChange={(e) => setSchema(e.target.value)}
            padding={5}
            fontWeight="bold"
            fontSize="lg"
            borderColor="gray.800"
            variant="outline"
            focusBorderColor="cyan.500"
            color="gray.400"
            resize="none"
            outline={0}
            placeholder="your schema comes out of the oven here"
            w="100%"
            h="100%"
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Editor;
