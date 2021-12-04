import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  useColorMode,
} from "@chakra-ui/react";
import useTranslation from "hooks/useTranslation";
import NextImage from "next/image";
import Link from "./Link";

type Image = {
  alt?: string;
  copyright?: string;
  fieldtype?: "asset";
  filename: string;
  id: number;
  name?: string;
  title?: string;
};

export type HeroProps = {
  _uid: string;
  title: string;
  subtitle: string;
  image: Image;
};

export default function Hero(props: HeroProps) {
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  return (
    <Flex mb={8} p={0} flexDir={{ base: "column", md: "row" }}>
      <Flex
        flex={1}
        width={{ base: "100%", md: "40%" }}
        flexDir="column"
        justify="center"
        mr={3}
        mb={{ base: "1rem", md: 0 }}
      >
        <Heading
          as="h1"
          fontSize="5xl"
          color="teal"
          p={4}
          bgGradient="linear(to-r, teal.500, teal.400)"
          bgClip="text"
        >
          {props.title}
        </Heading>
        <Heading
          as="h2"
          fontSize="xl"
          color={colorMode === "light" ? "gray.500" : "gray.300"}
          p={4}
        >
          {props.subtitle}
        </Heading>
        <HStack spacing="16px" p={4}>
          <Link href="/login" sx={{ ":hover": { textDecoration: "none" } }}>
            <Button size="lg" colorScheme="teal">
              {t("tryNow")}
            </Button>
          </Link>
          <Link href="/about" sx={{ ":hover": { textDecoration: "none" } }}>
            <Button size="lg"> {t("learnMore")}</Button>
          </Link>
        </HStack>
      </Flex>

      <AspectRatio
        flex={1}
        display="inline-block"
        ratio={16 / 9}
        sx={{ overflow: "hidden", borderRadius: "xl" }}
      >
        <NextImage
          src={props.image.filename}
          layout="fill"
          placeholder="blur"
          blurDataURL={props.image.filename}
        />
      </AspectRatio>
    </Flex>
  );
}
