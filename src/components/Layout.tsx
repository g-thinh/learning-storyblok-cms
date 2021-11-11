import { Flex, Box, useBreakpoint } from "@chakra-ui/react";
import Nav from "components/Nav";
import Footer from "components/Footer";
import isDev from "utils/isDev";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  const currentBreakpoint = useBreakpoint();
  return (
    <Flex
      sx={{
        flexDirection: "column",
        minHeight: "100vh",
        display: "flex",
      }}
    >
      <Nav />
      <Flex
        mt={6}
        sx={{
          flex: 1,
          minWidth: 0,
        }}
      >
        {children}
      </Flex>
      <Footer />
      {isDev() && (
        <Box
          px={2}
          bg="black"
          color="white"
          sx={{ position: "fixed", right: "0.5rem", bottom: "0.5rem" }}
        >
          {currentBreakpoint}
        </Box>
      )}
    </Flex>
  );
}
