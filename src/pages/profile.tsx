import {
  Button,
  Container,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { GetServerSidePropsContext, InferGetStaticPropsType } from "next";
import nookies from "nookies";
import { adminAuth } from "services/firebaseAdmin";
import useTranslation from "hooks/useTranslation";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const cookies = nookies.get(context);
    const token = await adminAuth.verifyIdToken(cookies.token);

    return {
      props: { token, preview: context.preview || false },
    };
  } catch (error) {
    context.res.writeHead(302, { Location: "/login" }).end();
    return { props: {} };
  }
}

export default function Authenticated(
  props: InferGetStaticPropsType<typeof getServerSideProps>
) {
  const { t } = useTranslation();
  const [isPreview, setIsPreview] = useState(props.preview);
  const [loading, setLoading] = useState(false);
  const { email, uid } = props.token;

  const handleEnablePreview = async () => {
    setLoading(true);
    if (!isPreview) {
      const response = await fetch(
        `/api/preview?secret=${process.env.storyblokPreviewSecret}`
      );
      const success = await response.ok;
      if (success) {
        setIsPreview(!isPreview);
        setLoading(false);
      }
    } else {
      await fetch("/api/exit-preview");
      setIsPreview(false);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Heading as="h1" mb={6} textAlign="center">
        {t("welcome")}
      </Heading>
      <VStack
        my={4}
        spacing="16px"
        align="stretch"
        bg={useColorModeValue("gray.700", "gray.200")}
        p={4}
        borderRadius={12}
        boxShadow="md"
      >
        <Text fontSize="xl">Email: {email}</Text>
        <Text fontSize="xl">UID: {uid}</Text>
        <Button
          onClick={handleEnablePreview}
          isLoading={loading}
          width="fit-content"
        >
          {isPreview ? "Disable Preview" : "Enable Preview"}
        </Button>
      </VStack>
    </Container>
  );
}
