import { useRouter } from "next/router";

type DefaultLanguageResource = typeof en;
type LanguageKey = keyof typeof en;

const en = {
  login: "Login",
  loginPage: "Login Page",
  logout: "Logout",
  profile: "Profile",
  email: "Email address",
  password: "Password",
  createAccount: "Create account",
  requiredField: "This field is required",
  footer: "Made with 💙 by",
};

const fr: DefaultLanguageResource = {
  login: "Connexion",
  loginPage: "Page de Connexion",
  logout: "Déconnexion",
  profile: "Profil",
  email: "Addresse courriel",
  password: "Mot de passe",
  createAccount: "Créer un compte",
  requiredField: "Ce champs est obligatoire",
  footer: "Fait avec amour 💙 par",
};

const resources = {
  en,
  fr,
} as const;

export default function useTranslation() {
  const { locales, locale } = useRouter();

  function t(key: LanguageKey) {
    return resources[locale][key];
  }

  return { t, locales, locale };
}
