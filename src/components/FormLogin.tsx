import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import useTranslation from "hooks/useTranslation";
import Router from "next/router";
import { useForm } from "react-hook-form";
import { firebaseAuth } from "services/firebase";
import { UserForm } from "types/api";

export default function FormLogin() {
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UserForm>();

  async function signUserIn({ email, password }: UserForm) {
    return signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => Router.push("/profile"))
      .catch((error) =>
        setError("email", {
          type: "manual",
          message: error.message,
        })
      );
  }

  return (
    <Box as="form" onSubmit={handleSubmit(signUserIn)}>
      <FormControl isInvalid={!!errors.email} mb={4}>
        <FormLabel>{t("email")}</FormLabel>
        <Input
          autoFocus
          id="email"
          type="email"
          {...register("email", {
            required: t("requiredField"),
          })}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.password}>
        <FormLabel>{t("password")}</FormLabel>
        <Input
          id="password"
          type="password"
          {...register("password", {
            required: t("requiredField"),
          })}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        {t("login")}
      </Button>
    </Box>
  );
}
