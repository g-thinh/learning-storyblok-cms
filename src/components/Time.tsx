import { Text, TextProps } from "@chakra-ui/react";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/fr";
import "dayjs/locale/zh";
import advancedFormat from "dayjs/plugin/advancedFormat";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { useRouter } from "next/router";

dayjs.extend(advancedFormat);
dayjs.extend(LocalizedFormat);

type TimeFormats = "LL";

type TimeProps = {
  time: string;
  format?: TimeFormats;
} & TextProps;

export default function Time({ time, format = "LL", ...textProps }: TimeProps) {
  const { locale } = useRouter();

  return (
    <Text
      as="time"
      dateTime={dayjs(time).locale(locale).format(format)}
      {...textProps}
    >
      {dayjs(time).locale(locale).format(format)}
    </Text>
  );
}
