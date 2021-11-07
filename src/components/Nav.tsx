import {
  Button,
  Container,
  Flex,
  Grid,
  IconButton,
  Select,
  useColorMode,
} from "@chakra-ui/react";
import Link from "components/Link";
import { useAuth } from "contexts/AuthContext";
import useTranslation from "hooks/useTranslation";
import { useRouter } from "next/router";
import { FiMoon, FiSun } from "react-icons/fi";
import { signUserOut } from "utils/firebaseHelpers";

const languages = {
  en: "English",
  fr: "Français",
};

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();
  const { pathname, asPath, query, locale, locales } = router;

  const handleLocaleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const newLocale = e.currentTarget.value;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <Container maxW="100%" px={4} py={2} width="100%">
      <Flex justifyContent="space-between">
        <Flex
          flexDir={{ sm: "column", md: "row" }}
          width={{ sm: "100%", md: "auto" }}
        >
          <Link
            fontSize={[32, 36]}
            fontWeight="bold"
            mr={{ sm: 0, md: "64px" }}
            textAlign={{ sm: "center" }}
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
            fontSize="2xl"
            fontWeight="bold"
            mt={{ sm: 3, md: 2 }}
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
          display={{ sm: "none", md: "grid" }}
          sx={{
            gridAutoFlow: "column",
            gap: 16,
            alignItems: "center",
          }}
        >
          <Select defaultValue={locale} onChange={handleLocaleChange}>
            {locales.map((language, index) => {
              return (
                <option key={index} value={language}>
                  {languages[language]}
                </option>
              );
            })}
          </Select>
          <IconButton
            aria-label="toggle dark/light mode"
            icon={
              colorMode === "light" ? <FiSun size={18} /> : <FiMoon size={18} />
            }
            onClick={toggleColorMode}
          />
          {user ? (
            <>
              <Link as={Button} href="/profile">
                {t("profile")}
              </Link>
              <Button colorScheme="teal" onClick={signUserOut}>
                {t("logout")}
              </Button>
            </>
          ) : (
            <Link as={Button} href="/login">
              {t("login")}
            </Link>
          )}
        </Grid>
      </Flex>
    </Container>
  );
}
