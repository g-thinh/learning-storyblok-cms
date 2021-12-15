import {
  Box,
  Container,
  Flex,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import useTranslation from "hooks/useTranslation";
import { FiGithub } from "react-icons/fi";

function ListHeader({ children }: React.PropsWithChildren<{}>) {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
}

export default function Footer() {
  const { t, languages, updateLocale, locales } = useTranslation();

  const handleLocaleChange = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const newLocale = (e.target as HTMLAnchorElement).lang;
    updateLocale(newLocale);
  };

  return (
    <Box
      mt={24}
      bg={useColorModeValue("gray.100", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={"flex-start"}>
            <ListHeader>{t("navigation")}</ListHeader>
            <Link href="/posts">{t("posts")}</Link>
            <Stack direction={"row"} align={"center"} spacing={2}>
              <Link href="/about">{t("about")}</Link>
              <Tag
                size={"sm"}
                bg={useColorModeValue("red.300", "red.800")}
                ml={2}
                color={"white"}
              >
                {t("underConstruction")}
              </Tag>
            </Stack>
            <Link href="/contact">{t("contactUs")}</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>{t("languages")}</ListHeader>
            {locales.map((language) => (
              <Link key={language} lang={language} onClick={handleLocaleChange}>
                {languages[language]}
              </Link>
            ))}
          </Stack>
        </SimpleGrid>
      </Container>
      <Box py={10}>
        <Flex
          align={"center"}
          _before={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.300", "gray.700"),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.300", "gray.700"),
            flexGrow: 1,
            ml: 8,
          }}
        >
          <Text fontWeight="medium" fontSize="xl">
            Simple Story.
          </Text>
        </Flex>
        <Flex
          mt={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "xs",
            color: "gray.600",
          }}
        >
          <Text mr={1}>{t("footer")}</Text>
          <Link
            sx={{ display: "inline-flex", alignItems: "center" }}
            href="https://github.com/g-thinh/simple-story"
          >
            Gia Thinh Nguyen <Icon ml={1} as={FiGithub} />
          </Link>
        </Flex>
      </Box>
    </Box>
  );
}
