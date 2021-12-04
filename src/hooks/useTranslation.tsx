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
  about: "About Us",
  posts: "Posts",
  welcome: "Welcome",
  tryNow: "Try Now",
  learnMore: "Learn More",
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
  about: "Découvrez-nous",
  posts: "Nos articles",
  welcome: "Bienvenue",
  tryNow: "Essayez maintenant",
  learnMore: "Apprendre plus",
};

const resources = {
  en,
  fr,
} as const;

type Resources = keyof typeof resources;

type TranslatedLanguageName = {
  [language in Resources]: string;
};

export default function useTranslation() {
  const { locales, locale } = useRouter();

  const languages: TranslatedLanguageName = {
    en: "English",
    fr: "Français",
  };

  function t(key: LanguageKey) {
    return resources[locale][key];
  }

  return { t, locales, locale, languages };
}
