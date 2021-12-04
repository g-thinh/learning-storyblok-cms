import { Box, Select, SelectFieldProps } from "@chakra-ui/react";
import useTranslation from "hooks/useTranslation";
import { useRouter } from "next/router";

export default function LanguagePicker(selectProps: SelectFieldProps) {
  const { languages } = useTranslation();
  const router = useRouter();
  const { pathname, asPath, query, locale, locales } = router;

  const handleLocaleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const newLocale = e.currentTarget.value;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <Select
      defaultValue={locale}
      onChange={handleLocaleChange}
      {...selectProps}
    >
      {locales.map((language, index) => {
        return (
          <Box as="option" key={index} value={language}>
            {languages[language]}
          </Box>
        );
      })}
    </Select>
  );
}
