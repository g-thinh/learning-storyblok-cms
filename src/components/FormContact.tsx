import {
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useColorModeValue,
  VStack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useTranslation from "hooks/useTranslation";
import { BsPerson } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import emailjs from "emailjs-com";
import { ContactForm, EmailConfig, EmailContactForm } from "types/email";

const emailConfig: EmailConfig = {
  serviceID: "send_grid",
  templateID: "contact_form",
};

export default function FormContact() {
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>();

  async function submit({ user_email, message, user_name }: ContactForm) {
    const emailParams: EmailContactForm = {
      user_email,
      message,
      user_name,
    };

    emailjs.send(emailConfig.serviceID, emailConfig.templateID, emailParams);
  }

  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.700")}
      boxShadow="xl"
      border="1px solid transparent"
      borderRadius="lg"
      m={{ sm: 4, md: 16, lg: 10 }}
      p={{ sm: 5, md: 5, lg: 16 }}
    >
      <Box p={4}>
        <VStack mb={4} spacing={4} align="start">
          <Heading>{t("contactUs")}</Heading>
          <Text fontSize="xl">{t("askUs")}</Text>
        </VStack>
        <Box
          as="form"
          bg={useColorModeValue("white", "gray.600")}
          padding={5}
          borderRadius="md"
          onSubmit={handleSubmit(submit)}
          id="contact-form"
        >
          <VStack spacing={5}>
            <FormControl isInvalid={!!errors.user_name}>
              <FormLabel>{t("yourName")}</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <BsPerson color="gray.800" />
                </InputLeftElement>
                <Input
                  type="text"
                  size="md"
                  {...register("user_name", {
                    required: t("requiredField"),
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.user_name && errors.user_name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.user_email}>
              <FormLabel>{t("yourEmail")}</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdOutlineEmail color="gray.800" />
                </InputLeftElement>
                <Input
                  type="email"
                  size="md"
                  {...register("user_email", {
                    required: t("requiredField"),
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.user_email && errors.user_email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.message}>
              <FormLabel>{t("message")}</FormLabel>
              <Textarea
                placeholder={t("contactFormPlaceholder")}
                {...register("message", {
                  required: t("requiredField"),
                })}
              />
              <FormErrorMessage>
                {errors.message && errors.message.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
              sx={{ alignSelf: "self-start" }}
            >
              {t("submit")}
            </Button>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}
