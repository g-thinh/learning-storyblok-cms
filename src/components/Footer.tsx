import {
  Box,
  Container,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "components/Link";
import { FiGithub } from "react-icons/fi";
import useTranslation from "hooks/useTranslation";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <Box
      width="100%"
      mt={5}
      p={3}
      bg={useColorModeValue("gray.200", "gray.900")}
    >
      <Container textAlign="center">
        <Flex
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
            href="https://github.com/g-thinh/simple-hub"
          >
            Gia Thinh Nguyen <Icon ml={1} as={FiGithub} />
          </Link>
        </Flex>
      </Container>
    </Box>
  );
}
