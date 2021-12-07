import { IconButton, IconButtonProps, useColorMode } from "@chakra-ui/react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeToggleButton({
  ...iconButtonProps
}: IconButtonProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      icon={colorMode === "light" ? <FiSun size={18} /> : <FiMoon size={18} />}
      onClick={toggleColorMode}
      {...iconButtonProps}
    />
  );
}
