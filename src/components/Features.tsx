import {
  Box,
  Container,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FiCheckCircle } from "react-icons/fi";
import { Feature, FeaturesList } from "types/api";

type FeaturesProps = {
  features?: Feature[];
  name?: FeaturesList["features_headline"];
  description?: FeaturesList["features_description"];
};

export default function Features({
  features,
  name,
  description,
}: FeaturesProps) {
  const featureTextColor = useColorModeValue("gray.500", "gray.400");
  return (
    <Box
      as="section"
      bg={useColorModeValue("gray.100", "gray.700")}
      px={4}
      py={10}
    >
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={"3xl"}>{name}</Heading>
        <Text fontSize={"xl"}>{description}</Text>
      </Stack>
      <Container maxW={"5xl"} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {features.map((feature) => (
            <HStack key={feature.name} align={"top"}>
              <Box color={"green.400"} px={2}>
                <Icon as={FiCheckCircle} boxSize="1.5em" />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>{feature.name}</Text>
                <Text color={featureTextColor}>{feature.description}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
