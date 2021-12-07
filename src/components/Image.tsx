import {
  AspectRatio,
  AspectRatioProps,
  Box,
  keyframes,
  useToken,
} from "@chakra-ui/react";
import NextImage from "next/image";
import { useState } from "react";

const shimmer = keyframes({
  "0%": { backgroundPosition: "0% 0%" },
  "50%": { backgroundPosition: "100% 100%" },
  "100%": { backgroundPosition: "0% 0%" },
});

type ImageProps = React.ComponentPropsWithRef<typeof NextImage> &
  AspectRatioProps & { allowZoom?: boolean };

export default function Image({ ratio, allowZoom, ...props }: ImageProps) {
  const [loading, setLoading] = useState(false);
  const [gray1, gray2, gray3] = useToken("colors", [
    "gray.500",
    "gray.600",
    "gray.700",
  ]);

  return (
    <AspectRatio
      ratio={ratio ?? 4 / 3}
      borderRadius="md"
      sx={{
        overflow: "hidden",
        boxShadow: "md",
        transform: allowZoom ? "scale(1.0)" : undefined,
        transition: allowZoom ? "0.3s ease-in-out" : undefined,
        "&:hover": {
          transform: allowZoom ? "scale(1.05)" : undefined,
        },
      }}
    >
      <>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            zIndex: 1,
            opacity: !loading ? 1 : 0,
            transition: "opacity 1s ease-out",
            background: `linear-gradient(145deg, ${gray1}, ${gray2}, ${gray3})`,
            backgroundPosition: "0% 0%",
            backgroundSize: "200% 200%",
            width: "100%",
            height: "100%",
            animation: `${shimmer} 2s ease-in-out infinite`,
          }}
        />
        <NextImage
          layout="fill"
          objectFit="cover"
          onLoadingComplete={() => setLoading(true)}
          {...props}
        />
      </>
    </AspectRatio>
  );
}
