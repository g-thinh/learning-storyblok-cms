import { Button, Container, Flex, Grid } from "@chakra-ui/react";
import Link from "components/Link";
import { useAuth } from "contexts/AuthContext";
import useTranslation from "hooks/useTranslation";
import { signUserOut } from "utils/firebaseHelpers";
import Drawer from "./Drawer";
import LanguagePicker from "./LanguagePicker";
import ThemeToggleButton from "./ThemeToggleButton";

export default function Nav() {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <Container maxW="100%" px={4} py={2} width="100%">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex width={{ base: "100%", md: "auto" }}>
          <Link
            fontSize={[32, 36]}
            fontWeight="bold"
            mr={{ base: 0, md: "48px" }}
            textAlign={{ base: "center" }}
            href="/"
            sx={{
              ":hover": {
                textDecoration: "none",
                color: "teal.500",
              },
            }}
          >
            Simple Hub.
          </Link>
          <Grid
            fontSize="lg"
            fontWeight="bold"
            display={{ base: "none", md: "grid" }}
            mt={{ base: 3, md: 2 }}
            sx={{
              gridAutoFlow: "column",
              gap: 24,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link href="/posts">{t("posts")}</Link>
            <Link href="/about">{t("about")}</Link>
          </Grid>
        </Flex>
        <Grid
          display={{ base: "none", md: "grid" }}
          sx={{
            gridAutoFlow: "column",
            gap: 16,
            alignItems: "center",
          }}
        >
          <LanguagePicker />
          <ThemeToggleButton aria-label="toggle dark/light mode" />
          {user ? (
            <>
              <Link as={Button} href="/profile">
                {t("profile")}
              </Link>
              <Button colorScheme="red" onClick={signUserOut}>
                {t("logout")}
              </Button>
            </>
          ) : (
            <Link
              colorScheme="teal"
              href="/login"
              sx={{ ":hover": { textDecoration: "none" } }}
            >
              <Button colorScheme="teal">{t("login")}</Button>
            </Link>
          )}
        </Grid>
        <Drawer />
      </Flex>
    </Container>
  );
}
