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
  latestArticles: "Latest Posts",
  whatsNew: "What's New?",
  getStarted: "Get started",
  cta1: "Share Your Story,",
  cta2: "with Simplicity",
  cta3: "A platform built to convey your message and tell your story.",
  error404: "Page Not Found",
  error404message: "The page youre looking for does not seem to exist",
  error404cta: "Return to Home",
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
  latestArticles: "Articles récents",
  whatsNew: "Quoi de neuf?",
  getStarted: "Commencer",
  cta1: "Partagez Votre Histoire,",
  cta2: "avec Simplicité",
  cta3: "Une plateforme conçue pour transmettre votre message et raconter votre histoire.",
  error404: "Page non trouvée",
  error404message: "La page que vous recherchez ne semble pas exister",
  error404cta: "Retourner à l'accueil",
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
