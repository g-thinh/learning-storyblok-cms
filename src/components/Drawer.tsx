import {
  Box,
  Button,
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuth } from "contexts/AuthContext";
import useTranslation from "hooks/useTranslation";
import { useRef } from "react";
import { FiMenu } from "react-icons/fi";
import { signUserOut } from "utils/firebaseHelpers";
import LanguagePicker from "./LanguagePicker";
import Link from "./Link";
import ThemeToggleButton from "./ThemeToggleButton";

export default function Drawer() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement | null>();

  return (
    <Box display={{ sm: "block", md: "none" }}>
      <IconButton
        aria-label="burger menu"
        icon={<FiMenu />}
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
      />
      <ChakraDrawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Main Navigation</DrawerHeader>
          <DrawerBody>
            <Flex flexDir="column" justifyContent="space-between" height="100%">
              <Grid gap={3} fontSize="xl" onClick={onClose}>
                <Link href="/posts">{t("posts")}</Link>
                <Link href="/about">{t("about")}</Link>
              </Grid>
              <LanguagePicker />
            </Flex>
          </DrawerBody>
          <DrawerFooter>
            <Grid gap={3} gridAutoFlow="column">
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
          </DrawerFooter>
        </DrawerContent>
      </ChakraDrawer>
    </Box>
  );
}
