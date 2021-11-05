import {
  Button,
  Container,
  Flex,
  Grid,
  HStack,
  IconButton,
  useColorMode,
  Select,
} from "@chakra-ui/react";
import Link from "components/Link";
import { useAuth } from "contexts/AuthContext";
import { FiMoon, FiSun } from "react-icons/fi";
import { signUserOut } from "utils/firebaseHelpers";
import { useRouter } from "next/router";

const languages = {
  en: "English",
  fr: "Français",
};

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user } = useAuth();
  const router = useRouter();
  const { pathname, asPath, query, locale, locales } = router;

  const handleLocaleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const newLocale = e.currentTarget.value;
    console.log("switching to", newLocale);
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <Container maxW="100%" px={4} py={2}>
      <Flex sx={{ justifyContent: "space-between" }}>
        <Link
          fontSize={[32, 36]}
          fontWeight="bold"
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
          sx={{
            gridAutoFlow: "column",
            gap: 16,
            alignItems: "center",
          }}
        >
          <HStack spacing="16px">
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
                colorMode === "light" ? (
                  <FiSun size={18} />
                ) : (
                  <FiMoon size={18} />
                )
              }
              onClick={toggleColorMode}
            />
            {user ? (
              <>
                <Link as={Button} href="/authenticated">
                  Profile
                </Link>
                <Button colorScheme="teal" onClick={signUserOut}>
                  Log out
                </Button>
              </>
            ) : (
              <Link as={Button} href="/login">
                Login
              </Link>
            )}
          </HStack>
        </Grid>
      </Flex>
    </Container>
  );
}
