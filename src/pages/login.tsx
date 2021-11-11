import {
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import FormCreateAccount from "components/FormCreateAccount";
import FormLogin from "components/FormLogin";
import useTranslation from "hooks/useTranslation";

export default function Home() {
  const { t } = useTranslation();
  return (
    <Container>
      <Container m="auto">
        <Heading as="h1" mb={6} textAlign="center">
          {t("loginPage")}
        </Heading>
        <Tabs
          isFitted
          colorScheme="teal"
          p={6}
          sx={{
            width: "100%",
            borderRadius: 30,
            border: "1px solid",
            borderColor: "gray.700",
          }}
        >
          <TabList>
            <Tab>{t("login")}</Tab>
            <Tab>{t("createAccount")}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <FormLogin />
            </TabPanel>
            <TabPanel>
              <FormCreateAccount />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Container>
  );
}
