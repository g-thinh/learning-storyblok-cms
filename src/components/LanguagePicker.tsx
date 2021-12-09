import { Box, Select, SelectFieldProps } from "@chakra-ui/react";
import useTranslation from "hooks/useTranslation";

export default function LanguagePicker(selectProps: SelectFieldProps) {
  const { languages, updateLocale, locale, locales } = useTranslation();

  const handleLocaleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const newLocale = e.currentTarget.value;
    updateLocale(newLocale);
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
