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

const zh = {
  login: "登录",
  loginPage: "登录页面",
  logout: "登出",
  profile: "帐户",
  email: "电子邮件",
  password: "密码",
  createAccount: "创建账户",
  requiredField: "此表格为必填项",
  footer: "Made with 💙 by",
  about: "关于我们",
  posts: "文章",
  welcome: "欢迎",
  tryNow: "现在试试",
  learnMore: "了解更多",
  latestArticles: "最新的文章",
  whatsNew: "什么是新的?",
  getStarted: "开始",
  cta1: "简单分享",
  cta2: "你的故事",
  cta3: "一个旨在传达您的信息并讲述您的故事的网站。",
  error404: "找不到网页",
  error404message: "您要找的页面似乎不存在",
  error404cta: "返回主页",
};

const resources = {
  en,
  fr,
  zh,
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
    zh: "简体中文",
  };

  function t(key: LanguageKey) {
    return resources[locale][key];
  }

  return { t, locales, locale, languages };
}
