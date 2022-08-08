import { Box, Flex } from "@chakra-ui/layout";
import { Input, Textarea, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { generateEasypanelFromCompose } from "../packages/parser";

const Editor: React.FC = () => {
  const [yml, setYml] = useState("");
  const [isInvalidYml, setIsInvalidYml] = useState(false);
  const [schema, setSchema] = useState("");
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [warning, setWarning] = useState<string | undefined>();
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    const parsed = generateEasypanelFromCompose(yml, projectName);
    setSchema(parsed.schema || "");
    setError(parsed.error);
    setWarning(parsed.warning);
  }, [yml, projectName]);

  return (
    <Flex flexDirection="column" gap={4}>
      <Box h="50px">
        {error && (
          <Alert status="error" borderRadius={2} variant="solid">
            <AlertIcon />
            <AlertTitle>Parser Error: </AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {warning && (
          <Alert status="warning" borderRadius={5} variant="solid">
            <AlertIcon />
            <AlertTitle>Parser Warning: </AlertTitle>
            <AlertDescription>{warning}</AlertDescription>
          </Alert>
        )}
      </Box>
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
        value={projectName || undefined}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <Flex gap={4} wrap="wrap">
        <Box minW="400px" flex={1} h="600px" bg="gray.800" borderRadius={2}>
          <Textarea
            spellCheck={false}
            value={yml || undefined}
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
            value={schema || undefined}
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
            placeholder="your easypanel schema comes out of the oven here"
            w="100%"
            h="100%"
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Editor;
